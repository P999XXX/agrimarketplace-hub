import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CertificatesFilters } from "../filters/CertificatesFilters";
import { Dispatch, SetStateAction } from "react";
import { ActiveFiltersChips } from "../filters/ActiveFiltersChips";
import { ViewMode } from "../types";
import { CommonFormSheet } from "@/components/common/sheet/CommonFormSheet";
import { CertificateForm } from "../forms/CertificateForm";

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
          <CommonFormSheet
            title="Add New Certificate"
            triggerButtonText="Add Certificate"
          >
            <CertificateForm />
          </CommonFormSheet>
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