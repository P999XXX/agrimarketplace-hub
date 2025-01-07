import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const InviteMemberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

      // Get company name
      const { data: company } = await supabase
        .from('companies')
        .select('name')
        .eq('id', profile.company_id)
        .single();

      if (!company) throw new Error("Company not found");

      // Insert invitation
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

      // Send invitation email
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

      toast({
        title: "Invitation sent",
        description: "Team member has been invited successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      
      // Close the sheet
      const closeButton = document.querySelector('[data-sheet-close]') as HTMLButtonElement;
      if (closeButton) closeButton.click();

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
      <div className="space-y-1">
        <Label htmlFor="name" className="text-foreground">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          className="h-12"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-foreground">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="colleague@company.com"
          required
          className="h-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="role" className="text-foreground">Role</Label>
        <Select required value={role} onValueChange={setRole}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="message" className="text-foreground">Personal message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Write a personal message..."
          className="min-h-[120px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="space-y-2 pt-2">
        <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? "Sending invitation..." : "Send invitation"}
        </Button>
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full py-6">
            Cancel
          </Button>
        </SheetClose>
      </div>
    </form>
  );
};