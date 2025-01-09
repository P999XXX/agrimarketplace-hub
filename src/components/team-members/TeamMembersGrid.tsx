import { TeamMemberCard } from "./TeamMemberCard";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { CommonSkeletonGrid } from "@/components/common/loading/CommonSkeletonGrid";
import { CommonEmptyState } from "@/components/common/empty/CommonEmptyState";
import { Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const { data: teamMembers = [], isLoading, error } = useTeamMembers(searchQuery, roleFilter, statusFilter, sortBy);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load team members'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <CommonSkeletonGrid />;
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <CommonEmptyState
        icon={<Users className="h-8 w-8 text-muted-foreground" />}
        title="No team members found"
        description="Try adjusting your filters or search criteria"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          getRoleBadgeClass={() => "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          getStatusBadgeClass={(status) => {
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
          }}
        />
      ))}
    </div>
  );
};