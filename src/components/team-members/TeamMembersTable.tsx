import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { format } from "date-fns";
import { useTeamMembers } from "@/hooks/useTeamMembers";

interface TeamMembersTableProps {
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const TeamMembersTable = ({ 
  searchQuery, 
  roleFilter, 
  sortBy,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: TeamMembersTableProps) => {
  const { data: allTeamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, sortBy);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const teamMembers = allTeamMembers.slice(startIndex, startIndex + itemsPerPage);

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

  if (allTeamMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No team members found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden relative">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};