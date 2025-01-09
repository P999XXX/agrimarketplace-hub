import { Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ViewToggle } from "@/components/common/views/ViewToggle";
import { ExportButton } from "@/components/common/actions/ExportButton";

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
  const getCategoryLabel = () => {
    switch (categoryFilter) {
      case "organic":
        return "Organic";
      case "quality":
        return "Quality";
      case "safety":
        return "Safety";
      default:
        return "All Categories";
    }
  };

  const getStatusLabel = () => {
    switch (statusFilter) {
      case "valid":
        return "Valid";
      case "expired":
        return "Expired";
      default:
        return "All Status";
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "name-asc":
        return "Name (A-Z)";
      case "name-desc":
        return "Name (Z-A)";
      case "date-asc":
        return "Date (Oldest)";
      case "date-desc":
        return "Date (Newest)";
      default:
        return "Sort by";
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Category Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-10 gap-2">
            <Filter className="h-4 w-4" />
            {getCategoryLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-popover border border-border shadow-md">
          <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
            All Categories
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCategoryFilter("organic")}>
            Organic
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCategoryFilter("quality")}>
            Quality
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCategoryFilter("safety")}>
            Safety
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-10 gap-2">
            <Filter className="h-4 w-4" />
            {getStatusLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-popover border border-border shadow-md">
          <DropdownMenuItem onClick={() => setStatusFilter("all")}>
            All Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("valid")}>
            Valid
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
            Expired
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-10 gap-2">
            <Filter className="h-4 w-4" />
            {getSortLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] bg-popover border border-border shadow-md">
          <DropdownMenuItem onClick={() => setSortBy("name-asc")}>
            Name (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("name-desc")}>
            Name (Z-A)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("date-asc")}>
            Date (Oldest)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("date-desc")}>
            Date (Newest)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showViewToggle && (
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      )}

      <ExportButton onClick={onExportCSV} />
    </div>
  );
};