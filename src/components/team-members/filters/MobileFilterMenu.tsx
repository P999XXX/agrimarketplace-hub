import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter, ArrowUpDown, Grid, Download, Table as TableIcon } from "lucide-react";

interface MobileFilterMenuProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
}

export const MobileFilterMenu = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
}: MobileFilterMenuProps) => {
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
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <SelectValue placeholder="Filter by role" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at-desc">Newest first</SelectItem>
            <SelectItem value="created_at-asc">Oldest first</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenuItem 
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            <span>Change view</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={onExportCSV}
          className="cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};