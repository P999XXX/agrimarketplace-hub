import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
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
          <DropdownMenuSub key={group.label}>
            <DropdownMenuSubTrigger className="px-2 py-1.5">
              <div className="flex items-center justify-between w-full pl-2">
                <span>{group.label}</span>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[200px] bg-background border border-border">
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
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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