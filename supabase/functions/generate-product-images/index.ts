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
    const { productName } = await req.json()
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    if (!productName) {
      return new Response(
        JSON.stringify({ error: 'Product name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Generating images for:', productName)

    // Check cache first
    const { data: cachedData } = await supabase
      .from('product_images_cache')
      .select('image_urls')
      .eq('product_name', productName)
      .maybeSingle()

    if (cachedData?.image_urls && cachedData.image_urls.length > 0) {
      console.log('Using cached images for:', productName)
      return new Response(
        JSON.stringify({ images: cachedData.image_urls.map((url: string) => ({ url })) }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate 3 professional product images with AI
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')
    const imageUrls: string[] = []

    const prompts = [
      `Professional product photo of ${productName}, studio lighting, white background, centered, high quality, ultra realistic, 4k resolution`,
      `${productName} product photography, detailed close-up shot, premium look, professional lighting, clean white background`,
      `${productName} showcase image, modern e-commerce style, perfect lighting, white backdrop, sharp focus, commercial photography`
    ]

    for (const prompt of prompts) {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image-preview',
          messages: [{
            role: 'user',
            content: prompt
          }],
          modalities: ['image', 'text']
        })
      })

      if (!response.ok) {
        console.error('AI Gateway error:', await response.text())
        continue
      }

      const data = await response.json()
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url
      
      if (imageUrl) {
        imageUrls.push(imageUrl)
        console.log(`Generated image ${imageUrls.length} for ${productName}`)
      }
    }

    if (imageUrls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate images' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Cache the generated images
    const { error: cacheError } = await supabase
      .from('product_images_cache')
      .upsert({
        product_name: productName,
        search_query: productName,
        image_urls: imageUrls
      }, {
        onConflict: 'product_name'
      })
    
    if (cacheError) {
      console.error('Error caching images:', cacheError)
    } else {
      console.log(`Cached ${imageUrls.length} AI-generated images for: ${productName}`)
    }

    return new Response(
      JSON.stringify({ images: imageUrls.map(url => ({ url })) }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-product-images:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
