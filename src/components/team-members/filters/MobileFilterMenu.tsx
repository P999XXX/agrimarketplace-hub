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
import { StatusFilter } from "./StatusFilter";
import { SortFilter } from "./SortFilter";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";
import { useState } from "react";

interface MobileFilterMenuProps {
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

export const MobileFilterMenu = ({
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
}: MobileFilterMenuProps) => {
  const { data: teamMembers = [], isLoading } = useTeamMembers(searchQuery, roleFilter, statusFilter, sortBy);
  const { exportToExcel } = useExportTeamMembers();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    setIsOpen(false);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setIsOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsOpen(false);
  };

  const handleViewChange = () => {
    setViewMode(viewMode === "grid" ? "table" : "grid");
    setIsOpen(false);
  };

  const handleExport = () => {
    exportToExcel(teamMembers, isLoading);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
        >
          <ListFilter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-background" sideOffset={8}>
        <div className="px-2 py-1">
          <RoleFilter value={roleFilter} onChange={handleRoleChange} />
        </div>
        <div className="px-2 py-1">
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
        </div>
        <div className="px-2 py-1">
          <SortFilter value={sortBy} onChange={handleSortChange} />
        </div>

        {showViewToggle && (
          <DropdownMenuItem 
            onClick={handleViewChange}
            className="cursor-pointer px-2 py-1.5 hover:bg-accent"
          >
            <div className="flex items-center gap-2 w-full">
              {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              <span>Change view</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem 
          onClick={handleExport}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          <div className="flex items-center gap-2 w-full">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};