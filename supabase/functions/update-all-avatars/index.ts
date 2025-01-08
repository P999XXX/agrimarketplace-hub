import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting avatar update process for all profiles')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch all profiles
    const { data: profiles, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('*')

    if (profilesError) throw profilesError

    console.log(`Found ${profiles?.length} profiles to update`)

    const results = []
    
    // Generate avatar for each profile
    for (const profile of profiles || []) {
      try {
        console.log(`Generating avatar for profile ${profile.id}`)
        
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: {
              Authorization: `Bearer ${Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: `A professional business avatar in modern vector art style, ${profile.user_type || 'professional'} in B2B marketplace, wearing business attire, minimalist corporate style, clean background, inspired by ${profile.first_name || ''} ${profile.last_name || ''}, professional headshot, high quality, modern corporate style, vector illustration`,
              parameters: {
                negative_prompt: "cartoon, anime, 3d, low quality, blurry, distorted, photographic, realistic, photo",
                num_inference_steps: 50,
                guidance_scale: 7.5,
                width: 512,
                height: 512,
              }
            }),
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to generate avatar: ${response.statusText}`)
        }

        const imageData = await response.arrayBuffer()
        const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageData)))
        const avatarUrl = `data:image/png;base64,${base64Image}`

        // Update profile with new avatar
        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ avatar_url: avatarUrl })
          .eq('id', profile.id)

        if (updateError) throw updateError

        results.push({ id: profile.id, status: 'success' })
        console.log(`Successfully generated and updated avatar for profile ${profile.id}`)
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error processing profile ${profile.id}:`, error)
        results.push({ id: profile.id, status: 'error', error: error.message })
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Processed ${profiles?.length} profiles`,
        results 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})