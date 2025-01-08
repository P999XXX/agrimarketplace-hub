import { Button } from "@/components/ui/button";
import { Grid, Download, Table as TableIcon } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { RoleFilter } from "./RoleFilter";
import { SortFilter } from "./SortFilter";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";

interface FilterButtonsProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
}

export const FilterButtons = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  searchQuery,
}: FilterButtonsProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, sortBy);
  const { exportToExcel } = useExportTeamMembers();

  return (
    <div className="flex items-center gap-2">
      <RoleFilter value={roleFilter} onChange={setRoleFilter} />
      <SortFilter value={sortBy} onChange={setSortBy} />

      <Button
        variant="outline"
        size="icon"
        onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
        className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
      >
        {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => exportToExcel(teamMembers, isLoading)}
        className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};