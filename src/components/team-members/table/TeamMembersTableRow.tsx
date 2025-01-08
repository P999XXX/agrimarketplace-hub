import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "../EmailCell";
import { format } from "date-fns";
import { TeamMember } from "@/hooks/useTeamMembers";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { TeamMemberDialog } from "../TeamMemberDialog";

interface TeamMembersTableRowProps {
  member: TeamMember;
  getRoleBadgeClass: () => string;
  getStatusBadgeClass: (status: string) => string;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
}

export const TeamMembersTableRow = ({ 
  member, 
  getRoleBadgeClass, 
  getStatusBadgeClass,
  isSelected,
  onSelect
}: TeamMembersTableRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-gray-50"
        onClick={(e) => {
          // Prevent dialog from opening when clicking checkbox
          if ((e.target as HTMLElement).closest('.checkbox-cell')) return;
          setIsDialogOpen(true);
        }}
      >
        <TableCell className="checkbox-cell w-[40px]">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="border-gray-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          />
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {member.name || 'Unnamed User'}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <EmailCell email={member.email} />
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <Badge className={getRoleBadgeClass()}>{member.role}</Badge>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <Badge className={getStatusBadgeClass(member.status)}>{member.status}</Badge>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {format(new Date(member.created_at), 'MMM d, yyyy')}
        </TableCell>
      </TableRow>

      <TeamMemberDialog 
        member={member}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};