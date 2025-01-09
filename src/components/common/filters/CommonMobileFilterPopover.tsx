import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterSection } from "@/components/team-members/filters/components/FilterSection";

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
}: CommonMobileFilterPopoverProps) => {
  const categoryGroups = [
    {
      label: "Certificate Types",
      options: [
        { label: "All Categories", value: "all" },
        { label: "Organic", value: "organic" },
        { label: "Quality", value: "quality" },
        { label: "Safety", value: "safety" },
      ],
    },
  ];

  const statusGroups = [
    {
      label: "Certificate Status",
      options: [
        { label: "All Status", value: "all" },
        { label: "Valid", value: "valid" },
        { label: "Expired", value: "expired" },
      ],
    },
  ];

  const sortGroups = [
    {
      label: "Sort by Name",
      options: [
        { label: "Name (A-Z)", value: "name-asc" },
        { label: "Name (Z-A)", value: "name-desc" },
      ],
    },
    {
      label: "Sort by Date",
      options: [
        { label: "Date (Newest)", value: "date-desc" },
        { label: "Date (Oldest)", value: "date-asc" },
      ],
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-4">
          {categoryFilter !== undefined && setCategoryFilter && (
            <FilterSection
              label="Category"
              value={categoryFilter}
              groups={categoryGroups}
              onChange={setCategoryFilter}
            />
          )}

          {statusFilter !== undefined && setStatusFilter && (
            <FilterSection
              label="Status"
              value={statusFilter}
              groups={statusGroups}
              onChange={setStatusFilter}
            />
          )}

          <FilterSection
            label="Sort"
            value={sortBy}
            groups={sortGroups}
            onChange={setSortBy}
          />

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