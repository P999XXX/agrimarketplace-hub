import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, role } = await req.json()

    // Generate a professional B2B avatar prompt based on user details
    const prompt = `A professional business avatar in vector style, ${role.toLowerCase()} in B2B marketplace, wearing business attire, minimalist corporate style, clean background, inspired by ${name}, professional headshot, high quality, modern corporate style`

    // Call Hugging Face API to generate the image
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: "cartoon, anime, 3d, low quality, blurry, distorted",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: 512,
          height: 512,
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`)
    }

    const imageData = await response.arrayBuffer()
    
    return new Response(
      JSON.stringify({ image: Array.from(new Uint8Array(imageData)) }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    )
  }
})