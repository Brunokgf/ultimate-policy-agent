import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image&num=10&imgSize=large&safe=active`

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
