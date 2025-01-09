import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, LayoutGrid, LayoutList } from "lucide-react";

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
  showViewToggle: boolean;
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
  showViewToggle,
}: FilterButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="shadow-sm">
            Category
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="shadow-sm">
            Status
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="shadow-sm">
            Sort
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
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
        <div className="flex items-center gap-0.5">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="shadow-sm"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("table")}
            className="shadow-sm"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Button variant="outline" size="sm" onClick={onExportCSV} className="shadow-sm">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );
};