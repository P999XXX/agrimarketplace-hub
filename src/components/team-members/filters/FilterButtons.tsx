import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown, Grid, Download, Table as TableIcon } from "lucide-react";

interface FilterButtonsProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
}

export const FilterButtons = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
}: FilterButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-[180px] shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
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
        <SelectTrigger className="w-[180px] shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none">
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
        onClick={onExportCSV}
        className="shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};