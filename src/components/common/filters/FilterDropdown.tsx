import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
}

interface FilterDropdownProps {
  label: string;
  icon?: ReactNode;
  value: string;
  groups: FilterGroup[];
  onChange: (value: string) => void;
}

export const FilterDropdown = ({
  label,
  icon,
  value,
  groups,
  onChange,
}: FilterDropdownProps) => {
  const getCurrentLabel = () => {
    for (const group of groups) {
      const option = group.options.find(opt => opt.value === value);
      if (option) return option.label;
    }
    return label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-2">
          {icon}
          <span className="hidden md:inline">{getCurrentLabel()}</span>
          <span className="md:hidden">{label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] bg-popover border border-border shadow-md"
      >
        {groups.map((group, index) => (
          <div key={group.label}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
              {group.label}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {group.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  className="cursor-pointer px-2 py-1.5 hover:bg-accent focus:bg-accent"
                >
                  <div className="flex items-center gap-2 w-full">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};