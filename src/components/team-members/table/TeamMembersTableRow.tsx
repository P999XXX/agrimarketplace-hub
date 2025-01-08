import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "../EmailCell";
import { format } from "date-fns";
import { TeamMember } from "@/hooks/useTeamMembers";

interface TeamMembersTableRowProps {
  member: TeamMember;
}

export const TeamMembersTableRow = ({ member }: TeamMembersTableRowProps) => {
  const getInitials = (name: string, email: string) => {
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return (name[0] + (nameParts[0][1] || '')).toUpperCase();
    }
    return (email[0] + (email[1] || '')).toUpperCase();
  };

  const initials = getInitials(member.name || '', member.email);

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
        return 'success';
      case 'pending':
        return 'warning';
      case 'declined':
      case 'inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getRoleBadgeVariant = () => {
    return 'secondary';
  };

  const colorSchemes = [
    { bg: 'bg-[hsl(var(--chart-1))]', text: 'text-white' },
    { bg: 'bg-[hsl(var(--chart-2))]', text: 'text-white' },
    { bg: 'bg-[hsl(var(--chart-3))]', text: 'text-white' },
    { bg: 'bg-[hsl(var(--chart-4))]', text: 'text-white' },
    { bg: 'bg-[hsl(var(--chart-5))]', text: 'text-white' },
  ];

  const getColorScheme = (initials: string) => {
    const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorSchemes[sum % colorSchemes.length];
  };

  const colorScheme = getColorScheme(initials);

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-sm font-medium`}>
            {initials}
          </div>
          <span className="font-medium">
            {member.name || 'Unnamed User'}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <EmailCell email={member.email} />
      </TableCell>
      <TableCell>
        <Badge variant={getRoleBadgeVariant()}>{member.role}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(member.status)}>{member.status}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {member.last_login ? format(new Date(member.last_login), 'MMM d, yyyy') : 'Never'}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(new Date(member.created_at), 'MMM d, yyyy')}
      </TableCell>
    </TableRow>
  );
};