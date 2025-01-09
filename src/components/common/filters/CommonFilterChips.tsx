import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FilterChip {
  label: string;
  value: string;
  defaultValue: string;
  getLabel: (value: string) => string;
  onReset: (defaultValue: string) => void;
}

interface CommonFilterChipsProps {
  filters: FilterChip[];
}

export const CommonFilterChips = ({ filters }: CommonFilterChipsProps) => {
  const activeFilters = filters.filter(
    (filter) => filter.value !== filter.defaultValue
  );

  if (activeFilters.length === 0) return null;

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2">
        {activeFilters.map((filter) => (
          <Button
            key={filter.label}
            variant="secondary"
            size="sm"
            className="h-6 text-[11px] font-normal bg-gray-100 hover:bg-gray-200 text-gray-600"
            onClick={() => filter.onReset(filter.defaultValue)}
          >
            {filter.label}: {filter.getLabel(filter.value)}
            <X className="ml-1 h-2.5 w-2.5" />
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-0.5" />
    </ScrollArea>
  );
};