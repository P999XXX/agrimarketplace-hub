import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface CommonMobileFilterDropdownProps {
  groups: FilterGroup[];
  viewMode?: "grid" | "table";
  setViewMode?: (mode: "grid" | "table") => void;
  onExport?: () => void;
}

export const CommonMobileFilterDropdown = ({
  groups,
  viewMode,
  setViewMode,
  onExport,
}: CommonMobileFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="md:hidden h-10 w-10 border border-input bg-background"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] bg-background border border-border"
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
                  onClick={() => {
                    group.onChange(option.value);
                  }}
                  className={`cursor-pointer px-2 py-1.5 ${
                    group.value === option.value ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 w-full pl-2">
                    <span>{option.label}</span>
                    {group.value === option.value && (
                      <ChevronUp className="h-4 w-4 ml-auto" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}

        {(viewMode || onExport) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {viewMode && setViewMode && (
                <DropdownMenuItem
                  onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                  className="cursor-pointer px-2 py-1.5"
                >
                  <div className="flex items-center gap-2 w-full pl-2">
                    <span>Change view</span>
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </div>
                </DropdownMenuItem>
              )}
              {onExport && (
                <DropdownMenuItem
                  onClick={onExport}
                  className="cursor-pointer px-2 py-1.5"
                >
                  <div className="flex items-center gap-2 w-full pl-2">
                    <span>Export</span>
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};