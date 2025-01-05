import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "./PasswordInput";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthCard } from "./AuthCard";
import { NameFields } from "./NameFields";
import { supabase } from "@/integrations/supabase/client";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

      if (signUpError) throw signUpError;

      if (authData.user) {
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
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
            hd: 'cropio.app'
          }
        },
      });

      if (error) {
        console.error('Google Sign Up Error:', error);
        throw error;
      }
    } catch (error: any) {
      console.error('Google Sign Up Error:', error);
      toast({
        title: "Error",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthCard 
      title="Bei Cropio registrieren" 
      subtitle="Geben Sie Ihre Informationen ein, um loszulegen"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Firmenname</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Ihr Firmenname"
            required
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <NameFields
          firstName={formData.firstName}
          lastName={formData.lastName}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ihre@email.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <PasswordInput
          id="password"
          label="Passwort"
          value={formData.password}
          onChange={handleChange}
          placeholder="Geben Sie Ihr Passwort ein"
        />

        <PasswordInput
          id="confirmPassword"
          label="Passwort bestätigen"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Bestätigen Sie Ihr Passwort"
        />

        <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600">
          Registrieren
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Oder fortfahren mit
            </span>
          </div>
        </div>

        <GoogleSignInButton onClick={handleGoogleSignUp} />
      </form>
    </AuthCard>
  );
};