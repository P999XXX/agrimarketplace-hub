import { Button } from "@/components/ui/button";
import { RoleFilter } from "./RoleFilter";
import { StatusFilter } from "./StatusFilter";
import { SortFilter } from "./SortFilter";
import { LayoutGrid, Table, Download } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";

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
      <RoleFilter value={roleFilter} onChange={setRoleFilter} />
      <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      <SortFilter value={sortBy} onChange={setSortBy} />
      
      <div className="flex items-center gap-2">
        {showViewToggle && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="rounded-md"
          >
            {viewMode === "grid" ? (
              <Table className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => exportToExcel(teamMembers, isLoading)}
          className="rounded-md"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};