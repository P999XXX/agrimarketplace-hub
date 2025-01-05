import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/dashboard");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return <SignUpForm />;
};

export default Index;