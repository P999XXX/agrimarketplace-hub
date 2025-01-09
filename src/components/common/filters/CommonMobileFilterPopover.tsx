import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListFilter } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";

interface FilterGroup {
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

interface CommonMobileFilterPopoverProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categoryGroups: { label: string; options: Array<{ label: string; value: string }> }[];
  statusGroups: { label: string; options: Array<{ label: string; value: string }> }[];
  sortGroups: { label: string; options: Array<{ label: string; value: string }> }[];
}

export const CommonMobileFilterPopover = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  categoryGroups,
  statusGroups,
  sortGroups,
}: CommonMobileFilterPopoverProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 md:hidden"
        >
          <ListFilter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            groups={categoryGroups}
            onChange={setCategoryFilter}
          />
          <FilterDropdown
            label="Status"
            value={statusFilter}
            groups={statusGroups}
            onChange={setStatusFilter}
          />
          <FilterDropdown
            label="Sort"
            value={sortBy}
            groups={sortGroups}
            onChange={setSortBy}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};