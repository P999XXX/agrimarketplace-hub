import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterSection } from "@/components/team-members/filters/components/FilterSection";
import { getRoleFilterGroups, getStatusFilterGroups, getSortGroups } from "@/components/team-members/filters/components/FilterGroups";

interface FilterGroup {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface CommonMobileFilterPopoverProps {
  categoryFilter?: string;
  setCategoryFilter?: (category: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  roleFilter?: string;
  setRoleFilter?: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV?: () => void;
  categoryGroups?: FilterGroup[];
  statusGroups?: FilterGroup[];
  sortGroups?: FilterGroup[];
}

export const CommonMobileFilterPopover = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  onExportCSV,
  categoryGroups,
  statusGroups,
  sortGroups,
}: CommonMobileFilterPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          {categoryFilter !== undefined && setCategoryFilter && categoryGroups && (
            <FilterSection
              label="Category"
              value={categoryFilter}
              groups={categoryGroups}
              onChange={setCategoryFilter}
            />
          )}

          {statusFilter !== undefined && setStatusFilter && statusGroups && (
            <FilterSection
              label="Status"
              value={statusFilter}
              groups={statusGroups}
              onChange={setStatusFilter}
            />
          )}

          {roleFilter !== undefined && setRoleFilter && (
            <FilterSection
              label="Role"
              value={roleFilter}
              groups={getRoleFilterGroups()}
              onChange={setRoleFilter}
            />
          )}

          {sortGroups && (
            <FilterSection
              label="Sort"
              value={sortBy}
              groups={sortGroups}
              onChange={setSortBy}
            />
          )}

          {onExportCSV && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full justify-between"
                onClick={onExportCSV}
              >
                Export as CSV
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};