import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const apiKey = Deno.env.get('GOOGLE_SEARCH_API_KEY')
    const searchEngineId = Deno.env.get('GOOGLE_SEARCH_ENGINE_ID')

    if (!apiKey || !searchEngineId) {
      console.error('Missing Google API credentials')
      return new Response(
        JSON.stringify({ error: 'API credentials not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image&num=3`

    console.log('Searching for:', query)

    const response = await fetch(searchUrl)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch images from Google', details: errorText }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    
    const googleImages = data.items?.map((item: any) => ({
      url: item.link,
      thumbnail: item.image?.thumbnailLink,
      title: item.title,
      width: item.image?.width,
      height: item.image?.height,
    })) || []

    console.log(`Found ${googleImages.length} images for query: ${query}`)

    // Download and save images to storage
    const savedImageUrls: string[] = []
    
    if (googleImages.length > 0) {
      for (let i = 0; i < googleImages.length; i++) {
        const googleImage = googleImages[i]
        try {
          console.log(`Downloading image ${i + 1}/${googleImages.length}: ${googleImage.url}`)
          
          // Download the image
          const imageResponse = await fetch(googleImage.url)
          if (!imageResponse.ok) {
            console.error(`Failed to download image: ${imageResponse.statusText}`)
            continue
          }
          
          const imageBlob = await imageResponse.blob()
          const imageBuffer = await imageBlob.arrayBuffer()
          
          // Generate a unique filename
          const fileExtension = googleImage.url.split('.').pop()?.split('?')[0] || 'jpg'
          const fileName = `${query.replace(/\s+/g, '-').toLowerCase()}-${i + 1}-${Date.now()}.${fileExtension}`
          const filePath = `products/${fileName}`
          
          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, imageBuffer, {
              contentType: imageBlob.type || 'image/jpeg',
              upsert: true
            })
          
          if (uploadError) {
            console.error(`Error uploading image to storage:`, uploadError)
            continue
          }
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath)
          
          savedImageUrls.push(publicUrl)
          console.log(`✅ Saved image to storage: ${publicUrl}`)
        } catch (error) {
          console.error(`Error processing image ${i + 1}:`, error)
        }
      }
      
      // Cache the saved image URLs
      if (savedImageUrls.length > 0) {
        const { error: cacheError } = await supabase
          .from('product_images_cache')
          .upsert({
            product_name: query,
            search_query: query,
            image_urls: savedImageUrls
          }, {
            onConflict: 'product_name'
          })
        
        if (cacheError) {
          console.error('Error caching images:', cacheError)
        } else {
          console.log(`✅ Cached ${savedImageUrls.length} images for product: ${query}`)
        }
      }
    }
    
    const images = savedImageUrls.map(url => ({
      url,
      thumbnail: url,
      title: query
    }))

    return new Response(
      JSON.stringify({ images }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error in google-image-search:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
