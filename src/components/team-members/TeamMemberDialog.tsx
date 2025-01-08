import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TeamMember } from "@/hooks/useTeamMembers";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface TeamMemberDialogProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberDialog = ({ member, isOpen, onClose }: TeamMemberDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member.role);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (selectedRole === member.role) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('invitations')
        .update({ role: selectedRole })
        .eq('id', member.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team member role updated successfully.",
        className: "border-green-500 bg-green-50 dark:bg-green-950/50",
      });

      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      onClose();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendInvitation = async () => {
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

      const inviterName = `${profile.first_name} ${profile.last_name}`.trim();
      await supabase.functions.invoke('send-invitation-email', {
        body: {
          to: member.email,
          inviterName,
          companyName: company.name,
          role: member.role,
          message: member.message,
        },
      });

      toast({
        title: "Invitation Resent",
        description: "The invitation has been resent successfully.",
        className: "border-green-500 bg-green-50 dark:bg-green-950/50",
      });
    } catch (error) {
      console.error('Error resending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to resend invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Team Member Details</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="text-sm text-gray-700">{member.name || 'Not provided'}</div>
          </div>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="text-sm text-gray-700">{member.email}</div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="text-sm text-gray-700 capitalize">{member.status}</div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
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

          <div className="space-y-2">
            <Label>Invited By</Label>
            <div className="text-sm text-gray-700">
              {member.inviter ? `${member.inviter.first_name || ''} ${member.inviter.last_name || ''}`.trim() : 'Unknown'}
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button 
              className="w-full py-6" 
              onClick={handleSave}
              disabled={isLoading || selectedRole === member.role}
            >
              Save Changes
            </Button>
            
            {member.status === 'pending' && (
              <Button
                variant="outline"
                className="w-full py-6"
                onClick={handleResendInvitation}
                disabled={isLoading}
              >
                Resend Invitation
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              className="w-full py-6"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};