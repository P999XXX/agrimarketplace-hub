import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { MobileInviteButton } from "./MobileInviteButton";
import { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TeamMembersContent = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<"grid" | "table">(() => {
    const savedView = localStorage.getItem('teamMembersViewMode');
    if (savedView === 'grid' || savedView === 'table') {
      return savedView;
    }
    return isMobile ? "grid" : "table";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");

  useEffect(() => {
    if (!localStorage.getItem('teamMembersViewMode')) {
      setView(isMobile ? "grid" : "table");
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem('teamMembersViewMode', view);
  }, [view]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  const handleExportCSV = () => {
    console.log("Export to CSV");
  };

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="fixed top-16 inset-x-0 max-w-[calc(100%-16rem)] mx-auto space-y-4 p-4 dark:bg-black/20 bg-white/80 backdrop-blur-md z-10 transition-shadow duration-200 border-b border-border/50">
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
            sortBy={sortBy}
            setSortBy={setSortBy}
            onExportCSV={handleExportCSV}
          />
        </div>

        <div className="h-[7.5rem]" /> {/* Spacer für den fixed header */}

        <ScrollArea 
          className="flex-1 relative md:pb-0 pb-20" 
          onScroll={handleScroll}
        >
          <div className="p-4">
            {view === "grid" ? (
              <TeamMembersGrid
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                sortBy={sortBy}
              />
            ) : (
              <TeamMembersTable
                searchQuery={searchQuery}
                roleFilter={roleFilter}
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