import { useState } from "react";
import { useToast } from "./use-toast";

interface FormData {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuliere einen Login-Versuch
    setTimeout(() => {
      toast({
        title: "Demo Mode",
        description: "This is a demo version without backend functionality",
      });
      setIsLoading(false);
    }, 1000);
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};