import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
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
  );
};