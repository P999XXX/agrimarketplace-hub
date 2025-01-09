import { SearchInput } from "./filters/SearchInput";
import { CommonFilterButtons } from "@/components/common/filters/CommonFilterButtons";
import { CommonMobileFilterPopover } from "@/components/common/filters/CommonMobileFilterPopover";
import { Filter } from "lucide-react";

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
  const filters = [
    {
      icon: <Filter className="h-4 w-4" />,
      label: "Role",
      value: roleFilter,
      onChange: setRoleFilter,
      options: [
        { value: "all", label: "All Roles" },
        { value: "member", label: "Member" },
        { value: "viewer", label: "Viewer" },
      ],
    },
    {
      icon: <Filter className="h-4 w-4" />,
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "accepted", label: "Accepted" },
        { value: "declined", label: "Declined" },
      ],
    },
    {
      icon: <Filter className="h-4 w-4" />,
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { value: "name-asc", label: "Name (A-Z)" },
        { value: "name-desc", label: "Name (Z-A)" },
        { value: "date-desc", label: "Date (Newest)" },
        { value: "date-asc", label: "Date (Oldest)" },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="hidden md:flex items-center gap-2">
        <CommonFilterButtons
          filters={filters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExport={onExportCSV}
          showViewToggle={!isMobile}
        />
      </div>

      <div className="md:hidden">
        <CommonMobileFilterPopover
          categoryFilter={roleFilter}
          setCategoryFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryGroups={[
            {
              label: "Team Member Roles",
              options: [
                { label: "All Roles", value: "all" },
                { label: "Member", value: "member" },
                { label: "Viewer", value: "viewer" },
              ],
            },
          ]}
          statusGroups={[
            {
              label: "Member Status",
              options: [
                { label: "All Status", value: "all" },
                { label: "Pending", value: "pending" },
                { label: "Accepted", value: "accepted" },
                { label: "Declined", value: "declined" },
              ],
            },
          ]}
          sortGroups={[
            {
              label: "Sort by Name",
              options: [
                { label: "Name (A-Z)", value: "name-asc" },
                { label: "Name (Z-A)", value: "name-desc" },
              ],
            },
            {
              label: "Sort by Date",
              options: [
                { label: "Date (Newest)", value: "date-desc" },
                { label: "Date (Oldest)", value: "date-asc" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};