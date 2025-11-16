import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log(`=== Scraping products from ${url} ===`);

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the webpage content
    console.log('Fetching webpage...');
    const pageResponse = await fetch(url);
    const html = await pageResponse.text();
    console.log(`Fetched ${html.length} characters`);

    // Use Lovable AI to extract products from HTML
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    console.log('Extracting products with AI...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a product data extraction expert. Extract product information from HTML and return it as a structured JSON array.'
          },
          {
            role: 'user',
            content: `Extract ALL products from this HTML. For each product, extract:
- nome (product name)
- descricao (detailed description)
- preco (price as number, extract just the numeric value)
- categoria (category: "celulares", "notebooks", "fones", "acessorios", "games", "computadores", "escritorio", "impressoras")
- imagens (array of image URLs)

HTML:
${html.substring(0, 50000)}

Return ONLY a JSON array of products, no other text. Example format:
[
  {
    "nome": "iPhone 15 Pro",
    "descricao": "Smartphone Apple com chip A17 Pro",
    "preco": 7999.90,
    "categoria": "celulares",
    "imagens": ["https://example.com/img1.jpg"]
  }
]`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_products",
              description: "Extract products from HTML",
              parameters: {
                type: "object",
                properties: {
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        nome: { type: "string" },
                        descricao: { type: "string" },
                        preco: { type: "number" },
                        categoria: { 
                          type: "string",
                          enum: ["celulares", "notebooks", "fones", "acessorios", "games", "computadores", "escritorio", "impressoras"]
                        },
                        imagens: { 
                          type: "array",
                          items: { type: "string" }
                        }
                      },
                      required: ["nome", "descricao", "preco", "categoria"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["products"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_products" } }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI extraction failed:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to extract products', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    console.log('AI Response:', JSON.stringify(aiData));
    
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error('No tool call in response');
      return new Response(
        JSON.stringify({ error: 'No products extracted', products: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const productsData = JSON.parse(toolCall.function.arguments);
    const products = productsData.products || [];
    
    console.log(`✓ Extracted ${products.length} products`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        products,
        count: products.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scraping products:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});