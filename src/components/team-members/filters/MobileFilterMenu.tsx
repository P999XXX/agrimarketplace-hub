import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, Grid, Download, Table as TableIcon } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { RoleFilter } from "./RoleFilter";
import { SortFilter } from "./SortFilter";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";

interface MobileFilterMenuProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const MobileFilterMenu = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  searchQuery,
  showViewToggle = true,
}: MobileFilterMenuProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, sortBy);
  const { exportToExcel } = useExportTeamMembers();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
        >
          <ListFilter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <RoleFilter value={roleFilter} onChange={setRoleFilter} />
        <SortFilter value={sortBy} onChange={setSortBy} />

        {showViewToggle && (
          <DropdownMenuItem 
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="cursor-pointer p-2"
          >
            <div className="flex items-center gap-2">
              {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              <span>Change view</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem 
          onClick={() => exportToExcel(teamMembers, isLoading)}
          className="cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};