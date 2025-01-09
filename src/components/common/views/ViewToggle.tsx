import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode } from "@/components/certificates/types";

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  className?: string;
}

export const ViewToggle = ({ viewMode, setViewMode, className }: ViewToggleProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
      className={`h-10 w-10 shadow-sm ${className}`}
    >
      {viewMode === "grid" ? (
        <TableIcon className="h-4 w-4" />
      ) : (
        <LayoutGrid className="h-4 w-4" />
      )}
      <span className="sr-only">
        Toggle view to {viewMode === "grid" ? "table" : "grid"}
      </span>
    </Button>
  );
};