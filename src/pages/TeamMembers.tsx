import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamMembersContent } from "@/components/team-members/TeamMembersContent";

const TeamMembers = () => {
  return (
    <DashboardLayout>
      {({ onSheetOpenChange }) => (
        <TeamMembersContent onSheetOpenChange={onSheetOpenChange} />
      )}
    </DashboardLayout>
  );
};

export default TeamMembers;