import { Search, Filter, SortAsc, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TeamMembersFiltersProps {
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const TeamMembersFilters = ({ 
  viewMode, 
  setViewMode,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy
}: TeamMembersFiltersProps) => {
  const toggleView = () => {
    setViewMode(viewMode === 'table' ? 'grid' : 'table');
  };

  return (
    <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg dark:shadow-dark-100/5 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-600 h-4 w-4" />
          <Input
            placeholder="Search team members..."
            className="pl-10 h-10 w-full dark:bg-dark-200 dark:border-dark-300 dark:placeholder:text-dark-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px] h-10 dark:bg-dark-200 dark:border-dark-300">
              <Filter className="h-4 w-4 mr-2" />
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
            <SelectTrigger className="w-full sm:w-[180px] h-10 dark:bg-dark-200 dark:border-dark-300">
              <SortAsc className="h-4 w-4 mr-2" />
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
            className="min-w-[40px] min-h-[40px] w-10 h-10 dark:bg-dark-200 dark:border-dark-300 dark:hover:bg-dark-300"
          >
            {viewMode === 'table' ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <LayoutList className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
