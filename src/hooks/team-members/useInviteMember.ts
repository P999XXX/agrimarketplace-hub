import { useState } from "react";

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Invite member", { name, email, role, message });
    setIsLoading(false);
    onSuccess?.();
  };

  return { isLoading, inviteMember };
};