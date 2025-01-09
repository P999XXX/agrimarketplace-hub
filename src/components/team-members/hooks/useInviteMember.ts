import { useState } from "react";
import { toast } from "sonner";

export const useInviteMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const inviteMember = async (
    name: string,
    email: string,
    role: string,
    message: string,
    onSuccess?: () => void
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Team member invited successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to invite team member");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, inviteMember };
};