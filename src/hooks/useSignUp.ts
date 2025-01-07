import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSignUpForm } from "./useSignUpForm";
import { useWaitTime } from "./useWaitTime";
import { useSupabaseSignUp } from "./useSupabaseSignUp";
import { AuthError } from "@supabase/supabase-js";

export const useSignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { formData, handleChange } = useSignUpForm();
  const { waitTime, setWaitTime } = useWaitTime();
  const { createCompany, sendWelcomeEmail } = useSupabaseSignUp();

  const handleRateLimitError = (error: AuthError) => {
    try {
      const errorBody = JSON.parse(error.message);
      const seconds = parseInt(errorBody.message.match(/\d+/)?.[0] || "60", 10);
      setWaitTime(seconds);
      return `Please wait ${seconds} seconds before trying again.`;
    } catch {
      setWaitTime(60); // Fallback wait time
      return "Too many attempts. Please wait before trying again.";
    }
  };

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine E-Mail-Adresse mit @ ein",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: formData.userType,
          },
        },
      });

      if (signUpError) {
        let errorMessage = signUpError.message;
        
        if (signUpError.message.includes('over_email_send_rate_limit')) {
          errorMessage = handleRateLimitError(signUpError);
        }

        toast({
          title: "Sign Up Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (!signUpData.user) {
        throw new Error("No user data returned after signup");
      }

      await createCompany(signUpData.user.id, formData.companyName);
      await sendWelcomeEmail(formData.email, formData.firstName, formData.companyName);
      
      setIsSuccess(true);
      navigate('/thank-you');

      toast({
        title: "Success",
        description: "Account created successfully",
      });

    } catch (error: any) {
      console.error('Sign Up Error:', error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    isSuccess,
    waitTime,
    handleChange,
    handleSubmit,
  };
};