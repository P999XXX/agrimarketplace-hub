import { MobileInviteButton } from "./MobileInviteButton";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { TeamMembersProvider, useTeamMembersContext } from "./providers/TeamMembersProvider";
import { TeamMembersHeader } from "./components/layout/TeamMembersHeader";
import { TeamMembersFilterSection } from "./components/layout/TeamMembersFilterSection";
import { TeamMembersMainContent } from "./components/layout/TeamMembersMainContent";

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

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <TeamMembersHeader 
          view={view} 
          setView={setView}
        />

        <TeamMembersFilterSection
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
        />
        
        <TeamMembersMainContent
          view={view}
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          handleScroll={handleScroll}
        />
        
        <MobileInviteButton />
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