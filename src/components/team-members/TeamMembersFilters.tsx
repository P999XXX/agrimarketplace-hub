import { SearchInput } from "./filters/SearchInput";
import { FilterButtons } from "./filters/FilterButtons";
import { CommonMobileFilterPopover } from "@/components/common/filters/CommonMobileFilterPopover";

interface TeamMembersFiltersProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
  isMobile: boolean;
}

export const TeamMembersFilters = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onExportCSV,
  isMobile,
}: TeamMembersFiltersProps) => {
  const roleGroups = [
    {
      label: "Team Member Roles",
      options: [
        { label: "All roles", value: "all" },
        { label: "Member", value: "member" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  ];

  const statusGroups = [
    {
      label: "Member Status",
      options: [
        { label: "All Status", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
  ];

  const sortGroups = [
    {
      label: "Sort by Date",
      options: [
        { label: "Newest first", value: "created_at-desc" },
        { label: "Oldest first", value: "created_at-asc" },
      ],
    },
    {
      label: "Sort by Name",
      options: [
        { label: "Name A-Z", value: "name-asc" },
        { label: "Name Z-A", value: "name-desc" },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-2">
        <FilterButtons
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCSV={onExportCSV}
          searchQuery={searchQuery}
          showViewToggle={!isMobile}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <CommonMobileFilterPopover
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          roleGroups={roleGroups}
          statusGroups={statusGroups}
          sortGroups={sortGroups}
        />
      </div>
    </div>
  );
};