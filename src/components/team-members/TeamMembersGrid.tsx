import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { format } from "date-fns";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { TeamMembersPagination } from "./TeamMembersPagination";

interface TeamMembersGridProps {
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const TeamMembersGrid = ({ 
  searchQuery, 
  roleFilter, 
  sortBy,
  currentPage,
  setCurrentPage,
  itemsPerPage
}: TeamMembersGridProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <Card
          key={member.id}
          className={`transition-all duration-500 ${
            Date.now() - new Date(member.created_at).getTime() < 3000
              ? 'animate-[highlight_1s_ease-in-out]'
              : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                {member.name?.charAt(0).toUpperCase() || member.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="font-medium">{member.name || 'Unnamed User'}</div>
                <EmailCell email={member.email} />
                <div className="mt-2 space-y-1.5">
                  <Badge className={getRoleBadgeClass()}>{member.role}</Badge>
                  <div className="block">
                    <Badge className={getStatusBadgeClass(member.status)}>{member.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Invited by: {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}</p>
                    <p>Invited: {format(new Date(member.created_at), 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};