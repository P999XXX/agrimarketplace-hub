import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const useInviteMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const inviteMember = async (
    name: string,
    email: string,
    role: string,
    message: string,
    onSuccess?: () => void
  ) => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id, first_name, last_name')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error("No company found");

      const { data: company } = await supabase
        .from('companies')
        .select('name')
        .eq('id', profile.company_id)
        .single();

      if (!company) throw new Error("Company not found");

      const { error } = await supabase
        .from('invitations')
        .insert({
          name,
          email,
          role,
          message,
          company_id: profile.company_id,
          invited_by: user.id,
        });

      if (error) throw error;

      const inviterName = `${profile.first_name} ${profile.last_name}`.trim();
      await supabase.functions.invoke('send-invitation-email', {
        body: {
          to: email,
          inviterName,
          companyName: company.name,
          role,
          message,
        },
      });

      onSuccess?.();

      setTimeout(() => {
        toast({
          title: "Invitation sent",
          description: "Team member has been invited successfully.",
          className: "border-green-500 bg-green-50 dark:bg-green-950/50",
        });
      }, 100);

      queryClient.invalidateQueries({ queryKey: ['team-members'] });

    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
        className: "border-red-500 bg-red-50 dark:bg-red-950/50",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    inviteMember
  };
};