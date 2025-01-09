import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";
import { CommonMobileFilterButtons } from "@/components/common/filters/CommonMobileFilterButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Grid, Download, Table as TableIcon } from "lucide-react";

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

  const handleExport = () => {
    exportToExcel(teamMembers, isLoading);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CommonMobileFilterButtons />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[240px] bg-background border border-border shadow-md" 
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Role Filter
          </DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => setRoleFilter("all")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            All roles
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setRoleFilter("member")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Member
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setRoleFilter("viewer")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Viewer
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Status Filter
          </DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => setStatusFilter("all")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            All status
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setStatusFilter("pending")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setStatusFilter("accepted")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Accepted
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setStatusFilter("declined")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Declined
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Sort Options
          </DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => setSortBy("created_at-desc")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Newest first
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setSortBy("created_at-asc")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Oldest first
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setSortBy("name-asc")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Name A-Z
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setSortBy("name-desc")}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            Name Z-A
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
            Actions
          </DropdownMenuLabel>
          {showViewToggle && (
            <DropdownMenuItem 
              onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
              className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
            >
              <div className="flex items-center gap-2 w-full">
                {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                <span>Change view</span>
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onClick={handleExport}
            className="cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent"
          >
            <div className="flex items-center gap-2 w-full">
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};