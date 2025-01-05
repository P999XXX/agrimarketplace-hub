import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "./PasswordInput";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthCard } from "./AuthCard";
import { NameFields } from "./NameFields";
import { EmailField } from "./EmailField";
import { CompanyField } from "./CompanyField";
import { AuthDivider } from "./AuthDivider";
import { SignUpButton } from "./SignUpButton";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { supabase } from "@/integrations/supabase/client";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      
      // 1. Erst den Benutzer registrieren
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
          const waitTime = signUpError.message.match(/\d+/)?.[0] || "few";
          toast({
            title: "Bitte warten",
            description: `Aus Sicherheitsgründen müssen Sie ${waitTime} Sekunden warten, bevor Sie es erneut versuchen können.`,
            variant: "destructive",
          });
          return;
        }
        throw signUpError;
      }

      if (!authData.user) {
        throw new Error("No user data returned after signup");
      }

      // 2. Warten auf die Session, um sicherzustellen, dass der Benutzer authentifiziert ist
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;
      if (!session) throw new Error("No session available");

      // 3. Jetzt das Unternehmen erstellen
      const { error: companyError } = await supabase
        .from('companies')
        .insert({
          name: formData.companyName,
          created_by: authData.user.id,
        });

      if (companyError) throw companyError;

      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });
      
      navigate("/dashboard");
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

  return (
    <AuthCard 
      title="Sign up for Cropio" 
      subtitle="Enter your information to get started"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CompanyField
          companyName={formData.companyName}
          onChange={handleChange}
        />

        <NameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          onChange={handleChange}
        />

        <EmailField
          email={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <ConfirmPasswordInput
          confirmPassword={formData.confirmPassword}
          onChange={handleChange}
        />

        <SignUpButton isLoading={isLoading} />

        <AuthDivider />

        <GoogleSignInButton />
      </form>
    </AuthCard>
  );
};