import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { MobileInviteButton } from "./MobileInviteButton";
import { ActiveFiltersChips } from "./filters/ActiveFiltersChips";
import { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TeamMembersContent = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<"grid" | "table">(() => {
    if (isMobile) return "grid";
    
    const savedView = localStorage.getItem('teamMembersViewMode');
    if (savedView === 'grid' || savedView === 'table') {
      return savedView;
    }
    return "table";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");

  useEffect(() => {
    if (isMobile) {
      setView("grid");
    } else {
      const savedView = localStorage.getItem('teamMembersViewMode');
      if (savedView === 'grid' || savedView === 'table') {
        setView(savedView as "grid" | "table");
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('teamMembersViewMode', view);
    }
  }, [view, isMobile]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  const hasActiveFilters = roleFilter !== "all" || statusFilter !== "all" || sortBy !== "created_at-desc";

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md z-10 transition-shadow duration-200">
          <TeamMembersHeader 
            view={view} 
            onViewChange={setView}
          />

          <TeamMembersFilters
            viewMode={view}
            setViewMode={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onExportCSV={() => {}}
            isMobile={isMobile}
          />
          
          {isMobile && hasActiveFilters && (
            <ActiveFiltersChips
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              sortBy={sortBy}
              setRoleFilter={setRoleFilter}
              setStatusFilter={setStatusFilter}
              setSortBy={setSortBy}
            />
          )}
        </div>

        <ScrollArea 
          className="flex-1 relative md:pb-0 pb-20" 
          onScroll={handleScroll}
        >
          <div className="p-4">
            {view === "grid" ? (
              <TeamMembersGrid
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            ) : (
              <TeamMembersTable
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                statusFilter={statusFilter}
                sortBy={sortBy}
              />
            )}
          </div>
        </ScrollArea>
        
        <MobileInviteButton />
      </div>
    </DashboardContent>
  );
};