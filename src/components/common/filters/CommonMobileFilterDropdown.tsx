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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, ChevronRight } from "lucide-react";
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
  const [activeGroup, setActiveGroup] = useState<FilterGroup | null>(null);

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
        {groups.map((group) => (
          <div key={group.label}>
            <Popover>
              <PopoverTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer px-2 py-1.5"
                  onSelect={(e) => {
                    e.preventDefault();
                    setActiveGroup(group);
                  }}
                >
                  <div className="flex items-center justify-between w-full pl-2">
                    <span>{group.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </DropdownMenuItem>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="start"
                className="w-[200px] p-0 bg-background border border-border"
              >
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground px-2 py-1.5">
                  {group.label} Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {group.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className="cursor-pointer px-2 py-1.5"
                    onSelect={() => {
                      group.onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2 w-full pl-2">
                      <span>{option.label}</span>
                      {group.value === option.value && (
                        <span className="ml-auto">✓</span>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </PopoverContent>
            </Popover>
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