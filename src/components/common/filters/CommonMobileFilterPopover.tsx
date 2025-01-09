import { Button } from "@/components/ui/button";
import { Filter, ChevronRight, Download } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
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
  categoryGroups?: FilterGroup[];
  statusGroups?: FilterGroup[];
  roleGroups?: FilterGroup[];
  sortGroups: FilterGroup[];
  onExportCSV?: () => void;
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
  categoryGroups,
  statusGroups,
  roleGroups,
  sortGroups,
  onExportCSV,
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
          {categoryGroups && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Category</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {categoryGroups[0].options.find(opt => opt.value === categoryFilter)?.label || 'Select category'}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {categoryGroups.map((group) => (
                    <div key={group.label}>
                      {group.options.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setCategoryFilter?.(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {statusGroups && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Status</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {statusGroups[0].options.find(opt => opt.value === statusFilter)?.label || 'Select status'}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {statusGroups.map((group) => (
                    <div key={group.label}>
                      {group.options.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setStatusFilter?.(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {roleGroups && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Role</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {roleGroups[0].options.find(opt => opt.value === roleFilter)?.label || 'Select role'}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {roleGroups.map((group) => (
                    <div key={group.label}>
                      {group.options.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setRoleFilter?.(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sort</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {sortGroups[0].options.find(opt => opt.value === sortBy)?.label || 'Select sorting'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {sortGroups.map((group, index) => (
                  <div key={group.label}>
                    {index > 0 && <DropdownMenuSeparator />}
                    {group.options.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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