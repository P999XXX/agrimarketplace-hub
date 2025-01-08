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
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {/* Filter Button/Select */}
          <div className="md:w-[180px] w-10">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full h-10 md:px-3 px-0 justify-center">
                <Filter className="h-5 w-5 text-gray-500 md:mr-2" />
                <SelectValue placeholder="Filter by role" className="hidden md:block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Button/Select */}
          <div className="md:w-[180px] w-10">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full h-10 md:px-3 px-0 justify-center">
                <SortAsc className="h-5 w-5 text-gray-500 md:mr-2" />
                <SelectValue placeholder="Sort by" className="hidden md:block" />
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
          </div>

          {/* View Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleView}
            className="w-10 h-10 flex-shrink-0"
          >
            {viewMode === 'table' ? (
              <LayoutGrid className="h-5 w-5 text-gray-500" />
            ) : (
              <LayoutList className="h-5 w-5 text-gray-500" />
            )}
          </Button>

          {/* Export Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onExportCSV}
            className="w-10 h-10 flex-shrink-0"
            title="Export as CSV"
          >
            <Download className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};