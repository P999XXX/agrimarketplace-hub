import { SearchInput } from "./filters/SearchInput";
import { FilterButtons } from "./filters/FilterButtons";
import { CommonMobileFilterDropdown } from "@/components/common/filters/CommonMobileFilterDropdown";

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
  const filterGroups = [
    {
      label: "Role",
      value: roleFilter,
      onChange: setRoleFilter,
      options: [
        { label: "All Roles", value: "all" },
        { label: "Member", value: "member" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "All Status", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
    {
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { label: "Newest First", value: "created_at-desc" },
        { label: "Oldest First", value: "created_at-asc" },
        { label: "Name A-Z", value: "name-asc" },
        { label: "Name Z-A", value: "name-desc" },
      ],
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
      <div className="md:hidden">
        <CommonMobileFilterDropdown
          groups={filterGroups}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExport={onExportCSV}
        />
      </div>
    </div>
  );
};