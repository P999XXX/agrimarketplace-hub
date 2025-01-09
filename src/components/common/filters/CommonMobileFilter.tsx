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

interface FilterOption {
  label: string;
  value: string;
  groups: FilterGroup[];
  onChange: (value: string) => void;
}

interface CommonMobileFilterProps {
  filters: FilterOption[];
  title?: string;
}

export const CommonMobileFilter = ({
  filters,
  title = "Filters",
}: CommonMobileFilterProps) => {
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
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {filters.map((filter, index) => (
            <FilterDropdown
              key={index}
              label={filter.label}
              value={filter.value}
              groups={filter.groups}
              onChange={filter.onChange}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};