import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Grid, List } from "lucide-react";
import { ViewMode } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificatesHeaderProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
  isMobile: boolean;
  hasActiveFilters: boolean;
}

export const CertificatesHeader = ({
  view,
  onViewChange,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onExportCSV,
  isMobile,
  hasActiveFilters,
}: CertificatesHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewChange("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => onViewChange("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button className="md:hidden">
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Button>
          <Button className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="iso">ISO</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="valid">Valid</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="revoked">Revoked</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at-desc">Newest First</SelectItem>
            <SelectItem value="created_at-asc">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="expiry_date-asc">Expiry Date (Ascending)</SelectItem>
            <SelectItem value="expiry_date-desc">Expiry Date (Descending)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};