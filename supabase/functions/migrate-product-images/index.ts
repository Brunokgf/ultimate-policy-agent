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
    const { productId, productName, productDescription, categoria } = await req.json();
    
    console.log(`=== Migrating images for ${productName} (${productId}) ===`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if images already exist
    const { data: existingFiles } = await supabase.storage
      .from('product-images')
      .list(productId);

    if (existingFiles && existingFiles.length > 0) {
      console.log(`Product ${productId} already has ${existingFiles.length} images, skipping...`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          skipped: true, 
          message: 'Product already has images' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate 4 images using Lovable AI
    const imagePrompts = [
      `Professional product photo of ${productName}, ${productDescription}, centered on white background, high quality, e-commerce style`,
      `${productName} ${productDescription} front view, studio lighting, white background, product photography`,
      `${productName} ${productDescription} side angle view, professional photography, clean white background`,
      `${productName} ${productDescription} detail close-up, high resolution, white background, sharp focus`
    ];

    const generatedImages: string[] = [];

    for (let i = 0; i < imagePrompts.length; i++) {
      console.log(`Generating image ${i + 1}/4 for ${productName}...`);
      
      try {
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-image-preview',
            messages: [
              {
                role: 'user',
                content: imagePrompts[i]
              }
            ],
            modalities: ['image', 'text']
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Image generation failed (${response.status}):`, errorText);
          continue;
        }

        const data = await response.json();
        const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (imageUrl) {
          // Extract base64 data
          const base64Data = imageUrl.split(',')[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

          // Upload to storage
          const fileName = `${i + 1}.jpg`;
          const filePath = `${productId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, imageBuffer, {
              contentType: 'image/jpeg',
              upsert: false
            });

          if (uploadError) {
            console.error(`Upload error for image ${i + 1}:`, uploadError);
          } else {
            generatedImages.push(filePath);
            console.log(`✓ Image ${i + 1}/4 uploaded successfully`);
          }
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
      }
    }

    console.log(`=== Migration complete for ${productName}: ${generatedImages.length} images ===`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        imagesGenerated: generatedImages.length,
        productId,
        productName
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in migrate-product-images:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
