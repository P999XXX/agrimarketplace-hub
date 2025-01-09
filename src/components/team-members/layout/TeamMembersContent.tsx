import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TeamMembersProvider, useTeamMembersContext } from "../providers/TeamMembersProvider";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersViewContent } from "./TeamMembersViewContent";
import { CommonMobileActionButton } from "@/components/common/mobile/CommonMobileActionButton";
import { InviteMemberForm } from "../InviteMemberForm";

const TeamMembersContentView = () => {
  const {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    handleScroll,
    isMobile
  } = useTeamMembersContext();

  const hasActiveFilters = roleFilter !== "all" || statusFilter !== "all" || sortBy !== "created_at-desc";

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md md:z-[5] z-[20] transition-shadow duration-200">
          <TeamMembersHeader 
            view={view}
            setView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobile={isMobile}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <TeamMembersViewContent 
          view={view}
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onScroll={handleScroll}
        />
        
        <CommonMobileActionButton
          title="Invite Team Member"
          buttonText="Invite Member"
        >
          <InviteMemberForm />
        </CommonMobileActionButton>
      </div>
    </DashboardContent>
  );
};

export const TeamMembersContent = () => {
  return (
    <TeamMembersProvider>
      <TeamMembersContentView />
    </TeamMembersProvider>
  );
};