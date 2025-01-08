import { Search, Filter, SortAsc, LayoutGrid, LayoutList, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TeamMembersFiltersProps {
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
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
  onExportCSV
}: TeamMembersFiltersProps) => {
  const toggleView = () => {
    const newView = viewMode === 'table' ? 'grid' : 'table';
    setViewMode(newView);
    localStorage.setItem('teamMembersViewMode', newView);
  };

  return (
    <Card className="p-3">
      <div className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search team members..."
            className="pl-10 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:flex md:items-center gap-2 overflow-x-auto pb-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-10 md:min-w-[140px]">
              <Filter className="h-5 w-5 mr-2 text-gray-500" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 md:min-w-[140px]">
              <SortAsc className="h-5 w-5 mr-2 text-gray-500" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">Newest first</SelectItem>
              <SelectItem value="created_at-asc">Oldest first</SelectItem>
              <SelectItem value="email-asc">Email A-Z</SelectItem>
              <SelectItem value="email-desc">Email Z-A</SelectItem>
              <SelectItem value="role-asc">Role A-Z</SelectItem>
              <SelectItem value="role-desc">Role Z-A</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleView}
            className="h-10 w-full md:w-10"
          >
            {viewMode === 'table' ? (
              <LayoutGrid className="h-5 w-5 text-gray-500" />
            ) : (
              <LayoutList className="h-5 w-5 text-gray-500" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onExportCSV}
            className="h-10 w-full md:w-10"
            title="Export as CSV"
          >
            <Download className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};