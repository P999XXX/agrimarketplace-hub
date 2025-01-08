import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { MobileInviteButton } from "./MobileInviteButton";
import { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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

  return (
    <DashboardContent>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div 
          className={cn(
            "sticky top-16 flex-none space-y-4 px-4 pt-4 pb-1.8 dark:bg-black/10 bg-white/70 backdrop-blur-md z-10",
            isScrolled && "shadow-sm"
          )}
        >
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
            onExportCSV={() => {}}
          />
        </div>

        <ScrollArea 
          className="flex-1 relative md:pb-0 pb-20 overflow-hidden"
          onScroll={handleScroll}
        >
          <div className="h-full p-4">
            {view === "grid" ? (
              <TeamMembersGrid
                searchQuery={searchQuery}
                roleFilter={roleFilter}
                sortBy={sortBy}
              />
            ) : (
              <div className="min-w-[800px] h-full">
                <TeamMembersTable
                  searchQuery={searchQuery}
                  roleFilter={roleFilter}
                  sortBy={sortBy}
                />
              </div>
            )}
          </div>
        </ScrollArea>
        
        <MobileInviteButton />
      </div>
    </DashboardContent>
  );
};
