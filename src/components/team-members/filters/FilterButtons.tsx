import { Button } from "@/components/ui/button";
import { RoleFilter } from "./RoleFilter";
import { SortFilter } from "./SortFilter";
import { LayoutGrid, Table } from "lucide-react";

interface FilterButtonsProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const FilterButtons = ({
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  searchQuery,
  showViewToggle = true,
}: FilterButtonsProps) => {
  return (
    <>
      <RoleFilter value={roleFilter} onChange={setRoleFilter} />
      <SortFilter value={sortBy} onChange={setSortBy} />
      
      {showViewToggle && (
        <div className="flex items-center gap-2 border rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="rounded-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("table")}
            className="rounded-none"
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};