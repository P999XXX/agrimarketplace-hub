import { CertificatesGrid } from "../CertificatesGrid";
import { CertificatesTable } from "../CertificatesTable";
import { MobileAddButton } from "../MobileAddButton";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CertificatesProvider, useCertificatesContext } from "../providers/CertificatesProvider";
import { CertificatesHeader } from "./CertificatesHeader";

const CertificatesContentView = () => {
  const {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    handleScroll,
    isMobile
  } = useCertificatesContext();

  const hasActiveFilters = categoryFilter !== "all" || statusFilter !== "all" || sortBy !== "created_at-desc";

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md md:z-[5] z-[20] transition-shadow duration-200">
          <CertificatesHeader 
            view={view} 
            onViewChange={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onExportCSV={() => {}}
            isMobile={isMobile}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <ScrollArea 
          className="flex-1 relative md:pb-0 pb-20" 
          onScroll={handleScroll}
        >
          <div className="p-4">
            {view === "grid" ? (
              <CertificatesGrid
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            ) : (
              <CertificatesTable
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            )}
          </div>
        </ScrollArea>
        
        <MobileAddButton />
      </div>
    </DashboardContent>
  );
};

export const CertificatesContent = () => {
  return (
    <CertificatesProvider>
      <CertificatesContentView />
    </CertificatesProvider>
  );
};