import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "../EmailCell";
import { format } from "date-fns";
import { TeamMember } from "@/hooks/useTeamMembers";

interface TeamMembersTableRowProps {
  member: TeamMember;
  getRoleBadgeClass: () => string;
  getStatusBadgeClass: (status: string) => string;
}

export const TeamMembersTableRow = ({ 
  member, 
  getRoleBadgeClass, 
  getStatusBadgeClass 
}: TeamMembersTableRowProps) => {
  return (
    <TableRow
      className={`transition-all duration-500 ${
        Date.now() - new Date(member.created_at).getTime() < 3000
          ? 'animate-[highlight_1s_ease-in-out]'
          : ''
      }`}
    >
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
  );
};