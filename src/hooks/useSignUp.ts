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
    // Warten für 1 Sekunde, um sicherzustellen, dass die Session initialisiert ist
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { error: companyError } = await supabase
      .from('companies')
      .insert({
        name: formData.companyName,
        created_by: userId,
      });

    if (companyError) throw companyError;
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
      
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
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

      if (!authData.user) {
        throw new Error("No user data returned after signup");
      }

      // Warten auf die Session und mehrere Versuche, falls nötig
      let sessionData;
      for (let i = 0; i < 3; i++) {
        sessionData = await supabase.auth.getSession();
        if (sessionData?.data?.session) break;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (sessionData?.data?.session) {
        await createCompany(authData.user.id);
        navigate("/thank-you");
      } else {
        throw new Error("No session available after signup");
      }
      
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