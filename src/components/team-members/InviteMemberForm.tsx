import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { InviteFormFields } from "./invite/InviteFormFields";
import { InviteFormActions } from "./invite/InviteFormActions";

export const InviteMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const { data: invitation, error } = await supabase
        .from('invitations')
        .insert({
          name,
          email,
          role,
          message,
          company_id: profile.company_id,
          invited_by: user.id,
        })
        .select()
        .single();

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

      // Schließe das Sheet
      closeButtonRef.current?.click();

      // Zeige den Toast nach einer kurzen Verzögerung
      setTimeout(() => {
        toast({
          title: "Invitation sent",
          description: "Team member has been invited successfully.",
        });
      }, 100);

      queryClient.invalidateQueries({ queryKey: ['team-members'] });

    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <InviteFormFields
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        role={role}
        setRole={setRole}
        message={message}
        setMessage={setMessage}
      />
      <InviteFormActions isLoading={isLoading} />
      <SheetClose ref={closeButtonRef} className="hidden" />
    </form>
  );
};