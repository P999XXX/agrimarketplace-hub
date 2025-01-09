import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, Grid, Download, Table as TableIcon } from "lucide-react";

interface MobileFilterMenuProps {
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

export const MobileFilterMenu = ({
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
}: MobileFilterMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 shadow-sm focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none"
        >
          <ListFilter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-background" sideOffset={8}>
        <DropdownMenuItem 
          onClick={() => setCategoryFilter("all")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          All Categories
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setCategoryFilter("organic")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Organic
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setCategoryFilter("quality")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Quality
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setCategoryFilter("safety")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Safety
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setStatusFilter("all")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          All Status
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setStatusFilter("valid")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Valid
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setStatusFilter("expired")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Expired
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => setSortBy("name-asc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("name-desc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("date-asc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Date (Oldest)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSortBy("date-desc")}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          Date (Newest)
        </DropdownMenuItem>

        {showViewToggle && (
          <DropdownMenuItem 
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
            className="cursor-pointer px-2 py-1.5 hover:bg-accent"
          >
            <div className="flex items-center gap-2 w-full">
              {viewMode === "grid" ? <TableIcon className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              <span>Change view</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem 
          onClick={onExportCSV}
          className="cursor-pointer px-2 py-1.5 hover:bg-accent"
        >
          <div className="flex items-center gap-2 w-full">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
