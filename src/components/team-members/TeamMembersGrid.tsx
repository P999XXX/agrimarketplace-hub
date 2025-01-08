import { TeamMemberCard } from "./TeamMemberCard";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { TeamMembersGridLoading } from "./TeamMembersGridLoading";

interface TeamMembersGridProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
}

export const TeamMembersGrid = ({ 
  searchQuery, 
  roleFilter,
  statusFilter, 
  sortBy,
}: TeamMembersGridProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, statusFilter, sortBy);

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
    return <TeamMembersGridLoading />;
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No team members found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          getRoleBadgeClass={getRoleBadgeClass}
          getStatusBadgeClass={getStatusBadgeClass}
        />
      ))}
    </div>
  );
};