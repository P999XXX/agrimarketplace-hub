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
    // Check if HuggingFace token is set
    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!hfToken) {
      throw new Error('HuggingFace token not configured')
    }

    const hf = new HfInference(hfToken)
    
    const image = await hf.textToImage({
      inputs: "A distant view of an Indian farmer working in lush green agricultural fields during golden hour. Wide landscape shot showing vast farmland with crops. Professional composition, warm lighting, agricultural business theme.",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      parameters: {
        num_inference_steps: 30,
        guidance_scale: 7.5
      }
    })

    if (!image) {
      throw new Error('No image generated')
    }

    const imageData = new Uint8Array(await image.arrayBuffer())
    const base64 = btoa(String.fromCharCode(...imageData))

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Image generation error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image',
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})