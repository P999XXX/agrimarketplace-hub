import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Grid, Search, Table as TableIcon, Filter, ArrowUpDown } from "lucide-react";

interface TeamMembersFiltersProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
}

export const TeamMembersFilters = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  onExportCSV,
}: TeamMembersFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[200px] relative">
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 shadow-sm pl-10" 
        />
        <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
      </div>

      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-[180px] shadow-sm focus:ring-0 focus-visible:ring-0">
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
        <SelectTrigger className="w-[180px] shadow-sm focus:ring-0 focus-visible:ring-0">
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

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="shadow-sm focus:ring-0 focus-visible:ring-0"
        >
          {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onExportCSV} 
          className="shadow-sm focus:ring-0 focus-visible:ring-0"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};