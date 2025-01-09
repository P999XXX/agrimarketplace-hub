import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FilterOption {
  value: string;
  label: string;
}

interface CommonActiveFiltersChipsProps {
  filters: {
    value: string;
    defaultValue: string;
    label: string;
    getLabel: (value: string) => string;
    onReset: (defaultValue: string) => void;
  }[];
}

export const CommonActiveFiltersChips = ({
  filters,
}: CommonActiveFiltersChipsProps) => {
  return (
    <div className="[padding-top:0px_!important] [padding-bottom:0px_!important] [margin-top:10px_!important] [margin-bottom:-12px_!important]">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-1.8 [padding-left:0px_!important] [padding-right:0px_!important]">
          {filters.map(
            (filter) =>
              filter.value !== filter.defaultValue && (
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
              )
          )}
        </div>
        <ScrollBar orientation="horizontal" className="h-0.5" />
      </ScrollArea>
    </div>
  );
};