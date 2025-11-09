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
    
    const images = data.items?.map((item: any) => ({
      url: item.link,
      thumbnail: item.image?.thumbnailLink,
      title: item.title,
      width: item.image?.width,
      height: item.image?.height,
    })) || []

    console.log(`Found ${images.length} images for query: ${query}`)

    // Save images to cache
    if (images.length > 0) {
      const imageUrls = images.map((img: any) => img.url)
      
      const { error: cacheError } = await supabase
        .from('product_images_cache')
        .upsert({
          product_name: query,
          search_query: query,
          image_urls: imageUrls
        }, {
          onConflict: 'product_name'
        })
      
      if (cacheError) {
        console.error('Error caching images:', cacheError)
      } else {
        console.log(`Cached ${imageUrls.length} images for product: ${query}`)
      }
    }

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
