import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, Table as TableIcon, Download } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";
import { FilterDropdownButton } from "@/components/common/filters/FilterDropdownButton";

interface FilterButtonsProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const FilterButtons = ({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  searchQuery,
  showViewToggle = true,
}: FilterButtonsProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, statusFilter, sortBy);
  const { exportToExcel } = useExportTeamMembers();

  return (
    <div className="flex items-center gap-2">
      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Role"
        value={roleFilter}
        onChange={setRoleFilter}
        options={[
          { value: "all", label: "All roles" },
          { value: "member", label: "Member" },
          { value: "viewer", label: "Viewer" },
        ]}
      />

      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { value: "all", label: "All status" },
          { value: "pending", label: "Pending" },
          { value: "accepted", label: "Accepted" },
          { value: "declined", label: "Declined" },
        ]}
      />

      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Sort"
        value={sortBy}
        onChange={setSortBy}
        options={[
          { value: "created_at-desc", label: "Newest first" },
          { value: "created_at-asc", label: "Oldest first" },
          { value: "name-asc", label: "Name A-Z" },
          { value: "name-desc", label: "Name Z-A" },
        ]}
      />

      {showViewToggle && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="rounded-md shadow-sm"
        >
          {viewMode === "grid" ? (
            <TableIcon className="h-4 w-4" />
          ) : (
            <LayoutGrid className="h-4 w-4" />
          )}
        </Button>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => exportToExcel(teamMembers, isLoading)}
        className="rounded-md shadow-sm"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};