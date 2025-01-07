import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { format } from "date-fns";
import { useTeamMembers } from "@/hooks/useTeamMembers";

interface TeamMembersTableProps {
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
}

export const TeamMembersTable = ({ searchQuery, roleFilter, sortBy }: TeamMembersTableProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, sortBy);

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

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Role</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Invited by</TableHead>
            <TableHead className="whitespace-nowrap">Invited</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow
              key={member.id}
              className={`transition-colors ${
                Date.now() - new Date(member.created_at).getTime() < 3000
                  ? 'bg-green-50'
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};