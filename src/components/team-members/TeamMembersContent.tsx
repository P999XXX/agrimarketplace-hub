import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { MobileInviteButton } from "./MobileInviteButton";
import { ActiveFiltersChips } from "./filters/ActiveFiltersChips";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamMembersProvider } from "./providers/TeamMembersProvider";
import { useTeamMembersContext } from "./providers/TeamMembersProvider";

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
        <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md z-[85] transition-shadow duration-200">
          <TeamMembersHeader 
            view={view} 
            onViewChange={setView}
          />

          <TeamMembersFilters
            viewMode={view}
            setViewMode={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onExportCSV={() => {}}
            isMobile={isMobile}
          />
          
          {isMobile && hasActiveFilters && (
            <ActiveFiltersChips
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              sortBy={sortBy}
              setRoleFilter={setRoleFilter}
              setStatusFilter={setStatusFilter}
              setSortBy={setSortBy}
            />
          )}
        </div>

        <ScrollArea 
          className="flex-1 relative md:pb-0 pb-20 z-[82]" 
          onScroll={handleScroll}
        >
          <div className="p-4">
            {view === "grid" ? (
              <TeamMembersGrid
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            ) : (
              <TeamMembersTable
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            )}
          </div>
        </ScrollArea>
        
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