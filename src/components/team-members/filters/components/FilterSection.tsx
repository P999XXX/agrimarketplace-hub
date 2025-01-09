import { FilterGroup } from "../types/FilterTypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FilterSectionProps {
  label: string;
  value: string;
  groups: FilterGroup[];
  onChange: (value: string) => void;
}

export const FilterSection = ({ label, value, groups, onChange }: FilterSectionProps) => {
  const getCurrentLabel = () => {
    for (const group of groups) {
      const option = group.options.find(opt => opt.value === value);
      if (option) return option.label;
    }
    return `Select ${label.toLowerCase()}`;
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{label}</h4>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {getCurrentLabel()}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {groups.map((group) => (
            <div key={group.label}>
              {group.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};