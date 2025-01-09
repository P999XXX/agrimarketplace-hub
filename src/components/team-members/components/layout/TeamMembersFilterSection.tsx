import { TeamMembersFilters } from "../../TeamMembersFilters";
import { ActiveFiltersChips } from "../../filters/ActiveFiltersChips";

interface TeamMembersFilterSectionProps {
  view: "grid" | "table";
  setView: (view: "grid" | "table") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isMobile: boolean;
}

export const TeamMembersFilterSection = ({
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
  isMobile,
}: TeamMembersFilterSectionProps) => {
  const hasActiveFilters = roleFilter !== "all" || statusFilter !== "all" || sortBy !== "created_at-desc";

  return (
    <div className="space-y-4">
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
  );
};