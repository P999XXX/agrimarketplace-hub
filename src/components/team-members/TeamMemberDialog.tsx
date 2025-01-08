import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Mail, Save, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TeamMember } from "@/hooks/useTeamMembers";
import { supabase } from "@/integrations/supabase/client";

interface TeamMemberDialogProps {
  member: TeamMember | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeamMemberDialog = ({ member, isOpen, onOpenChange }: TeamMemberDialogProps) => {
  const { toast } = useToast();

  if (!member) return null;

  const handleResendInvitation = async () => {
    try {
      await supabase.functions.invoke('send-invitation-email', {
        body: {
          to: member.email,
          inviterName: `${member.inviter?.first_name || ''} ${member.inviter?.last_name || ''}`.trim(),
          role: member.role,
          message: member.message || '',
        },
      });

      toast({
        title: "Invitation resent",
        description: "The invitation email has been sent again.",
        className: "border-green-500 bg-green-50 dark:bg-green-950/50",
      });
    } catch (error) {
      console.error('Error resending invitation:', error);
      toast({
        title: "Error",
        description: "Failed to resend invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'declined':
      case 'inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[540px] sm:max-w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Team Member Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              {member.name?.charAt(0).toUpperCase() || member.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{member.name || 'Unnamed User'}</h3>
              <div className="flex items-center space-x-2 text-gray-500">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Role</Label>
              <Badge className={getRoleBadgeClass()}>{member.role}</Badge>
            </div>

            <div>
              <Label>Status</Label>
              <Badge className={getStatusBadgeClass(member.status)}>{member.status}</Badge>
            </div>

            <div>
              <Label>Invited By</Label>
              <p className="text-gray-700">
                {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
              </p>
            </div>

            <div>
              <Label>Invited On</Label>
              <p className="text-gray-700">
                {format(new Date(member.created_at), 'MMM d, yyyy')}
              </p>
            </div>

            {member.message && (
              <div>
                <Label>Invitation Message</Label>
                <p className="text-gray-700 whitespace-pre-wrap">{member.message}</p>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4">
            <Button 
              className="w-full py-6" 
              onClick={handleResendInvitation}
              disabled={member.status !== 'pending'}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Invitation
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full py-6"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};