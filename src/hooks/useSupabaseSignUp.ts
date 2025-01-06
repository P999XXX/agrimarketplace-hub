import { supabase } from "@/integrations/supabase/client";

export const useSupabaseSignUp = () => {
  const createCompany = async (userId: string, companyName: string) => {
    const { error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyName,
        created_by: userId,
      });

    if (companyError) throw companyError;
  };

  const sendWelcomeEmail = async (email: string, firstName: string, companyName: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          to: email,
          firstName: firstName,
          companyName: companyName,
        },
      });

      if (error) {
        console.error('Error sending welcome email:', error);
      } else {
        console.log('Welcome email sent successfully:', data);
      }
    } catch (error) {
      console.error('Error invoking send-welcome-email function:', error);
    }
  };

  return {
    createCompany,
    sendWelcomeEmail,
  };
};