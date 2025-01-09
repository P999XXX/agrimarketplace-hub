import { Button } from "@/components/ui/button";
import { LayoutGrid, Table as TableIcon, Download } from "lucide-react";
import { FilterDropdownButton } from "./FilterDropdownButton";

interface CommonFilterButtonsProps {
  filters: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{
      value: string;
      label: string;
    }>;
  }>;
  viewMode?: "grid" | "table";
  setViewMode?: (mode: "grid" | "table") => void;
  onExport?: () => void;
  showViewToggle?: boolean;
}

export const CommonFilterButtons = ({
  filters,
  viewMode,
  setViewMode,
  onExport,
  showViewToggle = true,
}: CommonFilterButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      {filters.map((filter, index) => (
        <FilterDropdownButton
          key={index}
          icon={filter.icon}
          label={filter.label}
          value={filter.value}
          onChange={filter.onChange}
          options={filter.options}
        />
      ))}

      {showViewToggle && viewMode && setViewMode && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="h-10 w-10 shadow-sm"
        >
          {viewMode === "grid" ? (
            <TableIcon className="h-4 w-4" />
          ) : (
            <LayoutGrid className="h-4 w-4" />
          )}
        </Button>
      )}

      {onExport && (
        <Button 
          variant="outline" 
          size="icon"
          onClick={onExport} 
          className="h-10 w-10 shadow-sm"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};