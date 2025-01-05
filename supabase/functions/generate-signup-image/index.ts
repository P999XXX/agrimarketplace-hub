import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting image generation...')
    
    // Check if HuggingFace token is set
    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!hfToken) {
      console.error('HuggingFace token not found')
      throw new Error('HuggingFace configuration missing')
    }

    const hf = new HfInference(hfToken)
    
    console.log('Initializing image generation with HuggingFace...')
    
    const image = await hf.textToImage({
      inputs: "A distant view of an Indian farmer working in lush green agricultural fields during golden hour. Wide landscape shot showing vast farmland with crops. Professional composition, warm lighting, agricultural business theme.",
      model: "black-forest-labs/FLUX.1-schnell",
    })

    console.log('Image generated successfully')
    const imageData = new Uint8Array(await image.arrayBuffer())
    const base64 = btoa(String.fromCharCode(...imageData))

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        } 
      }
    )
  } catch (error) {
    console.error('Error during image generation:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image', 
        details: error.message,
        shouldRetry: false
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }, 
        status: 500 
      }
    )
  }
})