import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CardStats } from "./card/CardStats";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { TeamMember } from "@/hooks/useTeamMembers";

interface TeamMemberDialogProps {
  member: TeamMember | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TeamMemberDialog = ({ member, isOpen, onOpenChange }: TeamMemberDialogProps) => {
  if (!member) return null;

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

  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-6 mb-6 space-y-4">
          <DialogTitle className="text-xl font-semibold">
            Team Member Details
          </DialogTitle>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{member.name || 'Unnamed User'}</h3>
              <div className="flex gap-2">
                <Badge className={getStatusBadgeClass(member.status)}>
                  {member.status}
                </Badge>
                <Badge className={getRoleBadgeClass()}>
                  {member.role}
                </Badge>
              </div>
            </div>
            <EmailCell email={member.email} />
          </div>
        </DialogHeader>
        <Separator />
        <ScrollArea className="flex-1 pt-6">
          <div className="space-y-6 px-2">
            <CardStats
              lastLogin={member.last_login}
              inviterName={`${member.inviter?.first_name || ''} ${member.inviter?.last_name || ''}`}
              createdAt={member.created_at}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};