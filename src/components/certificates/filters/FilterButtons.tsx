import { Button } from "@/components/ui/button";
import { Filter, LayoutGrid, Table as TableIcon, Download } from "lucide-react";
import { FilterDropdownButton } from "@/components/common/filters/FilterDropdownButton";

interface FilterButtonsProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const FilterButtons = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  showViewToggle = true,
}: FilterButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Category"
        value={categoryFilter}
        onChange={setCategoryFilter}
        options={[
          { value: "all", label: "All Categories" },
          { value: "organic", label: "Organic" },
          { value: "quality", label: "Quality" },
          { value: "safety", label: "Safety" },
        ]}
      />

      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          { value: "all", label: "All Status" },
          { value: "valid", label: "Valid" },
          { value: "expired", label: "Expired" },
        ]}
      />

      <FilterDropdownButton
        icon={<Filter className="h-4 w-4 mr-2" />}
        label="Sort"
        value={sortBy}
        onChange={setSortBy}
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },
          { value: "date-asc", label: "Date (Oldest)" },
          { value: "date-desc", label: "Date (Newest)" },
        ]}
      />

      {showViewToggle && (
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

      <Button 
        variant="outline" 
        size="icon"
        onClick={onExportCSV} 
        className="h-10 w-10 shadow-sm"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};