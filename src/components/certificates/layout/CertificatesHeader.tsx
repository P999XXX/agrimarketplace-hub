import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CertificatesFilters } from "../filters/CertificatesFilters";
import { Dispatch, SetStateAction } from "react";
import { ActiveFiltersChips } from "../filters/ActiveFiltersChips";
import { ViewMode } from "../types";

interface CertificatesHeaderProps {
  view: ViewMode;
  onViewChange: Dispatch<SetStateAction<ViewMode>>;
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
  hasActiveFilters
}: CertificatesHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Certificates
        </h1>
        <div className="hidden md:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-[#00875A] hover:bg-[#006644]">
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader className="text-left">
                <SheetTitle className="text-2xl">Add New Certificate</SheetTitle>
              </SheetHeader>
              {/* Certificate form will be added here */}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CertificatesFilters
        viewMode={view}
        setViewMode={onViewChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onExportCSV={onExportCSV}
        isMobile={isMobile}
      />

      {isMobile && hasActiveFilters && (
        <ActiveFiltersChips
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          setCategoryFilter={setCategoryFilter}
          setStatusFilter={setStatusFilter}
          setSortBy={setSortBy}
        />
      )}
    </div>
  );
};