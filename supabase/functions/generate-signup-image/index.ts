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
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))
    console.log('Starting image generation...')

    const image = await hf.textToImage({
      inputs: "A distant view of an Indian farmer working in lush green agricultural fields during golden hour. Wide landscape shot showing vast farmland with crops. Professional composition, warm lighting, agricultural business theme.",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      parameters: {
        negative_prompt: "close up, selfie, portrait, text, words, letters, signs, logos, watermarks, dark, gloomy, cartoon style",
        num_inference_steps: 30,
        guidance_scale: 7.5,
      }
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
    console.error('Error:', error)
    
    const errorMessage = error.message || 'Unknown error'
    const shouldRetry = errorMessage.includes('Max requests')
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image', 
        details: errorMessage,
        shouldRetry
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