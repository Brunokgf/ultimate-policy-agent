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
    console.log('=== Starting storage cleanup ===');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // List all folders in the bucket
    const { data: folders, error: listError } = await supabase.storage
      .from('product-images')
      .list('', {
        limit: 1000,
        offset: 0,
      });

    if (listError) {
      console.error('Error listing folders:', listError);
      throw listError;
    }

    let deletedCount = 0;

    // Delete all files in each folder
    for (const folder of folders || []) {
      if (!folder.name) continue;

      console.log(`Cleaning folder: ${folder.name}`);

      // List files in the folder
      const { data: files, error: filesError } = await supabase.storage
        .from('product-images')
        .list(folder.name);

      if (filesError) {
        console.error(`Error listing files in ${folder.name}:`, filesError);
        continue;
      }

      if (files && files.length > 0) {
        // Delete all files in this folder
        const filePaths = files.map(file => `${folder.name}/${file.name}`);
        const { error: deleteError } = await supabase.storage
          .from('product-images')
          .remove(filePaths);

        if (deleteError) {
          console.error(`Error deleting files in ${folder.name}:`, deleteError);
        } else {
          deletedCount += files.length;
          console.log(`✓ Deleted ${files.length} files from ${folder.name}`);
        }
      }
    }

    console.log(`=== Cleanup complete: ${deletedCount} files deleted ===`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        deletedCount,
        message: `${deletedCount} imagens removidas com sucesso`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in clear-product-images:', error);
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
