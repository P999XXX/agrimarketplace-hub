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
    <Card className="p-3 bg-card border-border">
      <div className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search team members..."
            className="pl-10 h-10 bg-background border-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] max-md:w-10 h-10 max-md:px-0 max-md:justify-center bg-background border-input">
              <Filter className="h-5 w-5 text-foreground md:mr-2" />
              <span className="max-md:hidden">
                <SelectValue placeholder="Filter by role" />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] max-md:w-10 h-10 max-md:px-0 max-md:justify-center bg-background border-input">
              <SortAsc className="h-5 w-5 text-foreground md:mr-2" />
              <span className="max-md:hidden">
                <SelectValue placeholder="Sort by" />
              </span>
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
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
            className="w-10 h-10 flex-shrink-0 bg-background border-input"
          >
            {viewMode === 'table' ? (
              <LayoutGrid className="h-5 w-5 text-foreground" />
            ) : (
              <LayoutList className="h-5 w-5 text-foreground" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onExportCSV}
            className="w-10 h-10 flex-shrink-0 bg-background border-input"
            title="Export as CSV"
          >
            <Download className="h-5 w-5 text-foreground" />
          </Button>
        </div>
      </div>
    </Card>
  );
};