import { Search, Filter, SortAsc, LayoutGrid, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TeamMembersFiltersProps {
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
}

export const TeamMembersFilters = ({ viewMode, setViewMode }: TeamMembersFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search team members..."
            className="pl-10 h-10 w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] h-10">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] h-10">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="role">Role</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md h-10">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('table')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};