import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Grid, Download, Table as TableIcon } from "lucide-react";
import { RoleFilter } from "@/components/team-members/filters/RoleFilter";
import { StatusFilter } from "@/components/team-members/filters/StatusFilter";
import { SortFilter } from "@/components/team-members/filters/SortFilter";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CommonMobileFilterButtons } from "./CommonMobileFilterButtons";

interface CommonMobileFilterMenuProps {
  roleFilter?: string;
  setRoleFilter?: (role: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExport: () => void;
  showViewToggle?: boolean;
  showRoleFilter?: boolean;
  showStatusFilter?: boolean;
}

export const CommonMobileFilterMenu = ({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExport,
  showViewToggle = true,
  showRoleFilter = true,
  showStatusFilter = true,
}: CommonMobileFilterMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleRoleChange = (value: string) => {
    setRoleFilter?.(value);
    setIsOpen(false);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter?.(value);
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
    onExport();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <CommonMobileFilterButtons />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[240px] bg-background border border-border shadow-md" 
        sideOffset={8}
      >
        {showRoleFilter && roleFilter !== undefined && setRoleFilter && (
          <>
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
              Role Filter
            </DropdownMenuLabel>
            <DropdownMenuGroup className="px-1 py-1">
              <RoleFilter value={roleFilter} onChange={handleRoleChange} />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        
        {showStatusFilter && statusFilter !== undefined && setStatusFilter && (
          <>
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
              Status Filter
            </DropdownMenuLabel>
            <DropdownMenuGroup className="px-1 py-1">
              <StatusFilter value={statusFilter} onChange={handleStatusChange} />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        
        <>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Sort Options
          </DropdownMenuLabel>
          <DropdownMenuGroup className="px-1 py-1">
            <SortFilter value={sortBy} onChange={handleSortChange} />
          </DropdownMenuGroup>
        </>

        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          {showViewToggle && (
            <DropdownMenuItem 
              onClick={handleViewChange}
              className="cursor-pointer px-2 py-1.5 hover:bg-accent focus:bg-accent"
            >
              <div className="flex items-center gap-2 w-full pl-2">
                {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                <span>Change view</span>
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onClick={handleExport}
            className="cursor-pointer px-2 py-1.5 hover:bg-accent focus:bg-accent"
          >
            <div className="flex items-center gap-2 w-full pl-2">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};