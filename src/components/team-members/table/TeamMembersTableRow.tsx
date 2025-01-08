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
  const colorSchemes = [
    { bg: 'bg-purple-600 hover:bg-purple-500', text: 'text-white' },
    { bg: 'bg-blue-600 hover:bg-blue-500', text: 'text-white' },
    { bg: 'bg-green-600 hover:bg-green-500', text: 'text-white' },
    { bg: 'bg-yellow-600 hover:bg-yellow-500', text: 'text-white' },
    { bg: 'bg-red-600 hover:bg-red-500', text: 'text-white' },
    { bg: 'bg-pink-600 hover:bg-pink-500', text: 'text-white' },
    { bg: 'bg-indigo-600 hover:bg-indigo-500', text: 'text-white' },
    { bg: 'bg-cyan-600 hover:bg-cyan-500', text: 'text-white' },
  ];

  const getColorScheme = (initials: string) => {
    const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorSchemes[sum % colorSchemes.length];
  };

  const colorScheme = getColorScheme(initials);

  return (
    <TableRow
      className={`transition-all duration-500 ${
        Date.now() - new Date(member.created_at).getTime() < 3000
          ? 'animate-[highlight_1s_ease-in-out]'
          : ''
      }`}
    >
      <TableCell className="whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-xs font-medium transition-colors`}>
            {initials}
          </div>
          <span className="font-semibold">
            {member.name || 'Unnamed User'}
          </span>
        </div>
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
        {member.last_login ? format(new Date(member.last_login), 'MMM d, yyyy HH:mm') : 'Never'}
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