import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSignUpForm } from "./useSignUpForm";
import { useWaitTime } from "./useWaitTime";
import { useSupabaseSignUp } from "./useSupabaseSignUp";

export const useSignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { formData, handleChange } = useSignUpForm();
  const { waitTime, setWaitTime } = useWaitTime();
  const { createCompany, sendWelcomeEmail } = useSupabaseSignUp();

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
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('over_email_send_rate_limit')) {
          const seconds = parseInt(signUpError.message.match(/\d+/)?.[0] || "60", 10);
          setWaitTime(seconds);
          toast({
            title: "Bitte warten",
            description: `Aus Sicherheitsgründen müssen Sie ${seconds} Sekunden warten, bevor Sie es erneut versuchen können.`,
            variant: "destructive",
          });
          return;
        }
        throw signUpError;
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