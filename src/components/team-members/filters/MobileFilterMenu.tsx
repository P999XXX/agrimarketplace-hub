import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useExportTeamMembers } from "@/utils/exportTeamMembers";
import { CommonMobileFilterButtons } from "@/components/common/filters/CommonMobileFilterButtons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
        <CommonMobileFilterButtons onClick={() => {}} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-background" sideOffset={8}>
        <DropdownMenuItem 
          onClick={() => setRoleFilter("all")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          All roles
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setRoleFilter("member")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Member
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setRoleFilter("viewer")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Viewer
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setStatusFilter("all")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          All status
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setStatusFilter("pending")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setStatusFilter("accepted")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Accepted
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setStatusFilter("declined")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Declined
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setSortBy("created_at-desc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Newest first
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("created_at-asc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Oldest first
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("name-asc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Name A-Z
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("name-desc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Name Z-A
        </DropdownMenuItem>

        {showViewToggle && (
          <DropdownMenuItem 
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
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