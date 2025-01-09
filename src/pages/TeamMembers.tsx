import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamMembersContent } from "@/components/team-members/layout/TeamMembersContent";

const TeamMembers = () => {
  return (
    <DashboardLayout>
      <TeamMembersContent />
    </DashboardLayout>
  );
};

export default TeamMembers;