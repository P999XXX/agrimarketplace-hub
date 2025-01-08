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
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: profiles, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('*')

    if (profilesError) throw profilesError

    console.log(`Found ${profiles?.length} profiles to update`)

    const results = []
    
    // Verschiedene Stile für mehr Vielfalt
    const styles = [
      'minimalist vector art',
      'modern line art',
      'geometric vector design',
      'abstract business portrait',
      'contemporary digital illustration'
    ]

    // Verschiedene Hintergründe für mehr Vielfalt
    const backgrounds = [
      'clean white background',
      'subtle gradient background',
      'minimal geometric background',
      'soft neutral background',
      'abstract business background'
    ]
    
    for (const profile of profiles || []) {
      try {
        console.log(`Generating avatar for profile ${profile.id}`)
        
        // Zufällige Auswahl von Stil und Hintergrund
        const randomStyle = styles[Math.floor(Math.random() * styles.length)]
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)]
        
        // Geschlechtsneutrale Beschreibung basierend auf der Rolle
        const roleDescription = profile.user_type === 'supplier' 
          ? 'agricultural supplier professional'
          : profile.user_type === 'buyer' 
            ? 'agricultural buyer professional'
            : 'agribusiness professional'

        const prompt = `Professional ${randomStyle} business portrait, ${roleDescription} in modern B2B marketplace setting, 
          wearing professional business attire, ${randomBg}, inspired by name ${profile.first_name || ''} ${profile.last_name || ''}, 
          high quality professional headshot, modern corporate style, focusing on professionalism and authenticity`

        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: {
              Authorization: `Bearer ${Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                negative_prompt: "cartoon, anime, 3d, ((photograph)), ((photo)), ((realistic)), low quality, blurry, distorted, text, watermark, signature, frame, multiple people, group photo",
                num_inference_steps: 50,
                guidance_scale: 8.5,
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

        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ avatar_url: avatarUrl })
          .eq('id', profile.id)

        if (updateError) throw updateError

        results.push({ id: profile.id, status: 'success' })
        console.log(`Successfully generated and updated avatar for profile ${profile.id}`)
        
        // Delay zwischen den Generierungen um Rate Limiting zu vermeiden
        await new Promise(resolve => setTimeout(resolve, 2000))
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