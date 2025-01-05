import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignUpFormData {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (waitTime !== null && waitTime > 0) {
      const timer = setTimeout(() => {
        setWaitTime(waitTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (waitTime === 0) {
      setWaitTime(null);
    }
  }, [waitTime]);

  useEffect(() => {
    if (waitTime !== null) {
      toast({
        title: "Bitte warten",
        description: `Noch ${waitTime} Sekunden bis zum nächsten Versuch...`,
        variant: "destructive",
      });
    }
  }, [waitTime, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createCompany = async (userId: string) => {
    const { error: companyError } = await supabase
      .from('companies')
      .insert({
        name: formData.companyName,
        created_by: userId,
      });

    if (companyError) throw companyError;
  };

  const sendWelcomeEmail = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          to: formData.email,
          firstName: formData.firstName,
          companyName: formData.companyName,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

      // 1. Sign up the user
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
          const seconds = parseInt(signUpError.message.match(/\d+/)?.[0] || "0", 10);
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

      // 2. Set up a listener for auth state changes
      const authListener = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            // 3. Create company after successful sign in
            await createCompany(session.user.id);
            // 4. Send welcome email
            await sendWelcomeEmail();
            // 5. Navigate to thank you page
            navigate("/thank-you");
          } catch (error: any) {
            console.error('Error during post-signup process:', error);
            toast({
              title: "Error",
              description: error.message || "An error occurred during sign up",
              variant: "destructive",
            });
          }
          // 6. Clean up listener
          authListener.data.subscription.unsubscribe();
        }
      });

      // Show success message
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
    waitTime,
    handleChange,
    handleSubmit,
  };
};