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

  // Fügen Sie einige Test-Elemente für den Hintergrund hinzu
  const backgroundElements = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="fixed w-24 h-24 rounded-full opacity-5"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        transform: 'translate(-50%, -50%)',
        background: `hsl(${Math.random() * 360}, 70%, 50%)`,
        zIndex: -1,
      }}
    />
  ));

  return (
    <DashboardContent className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-transparent relative">
      {backgroundElements}
      
      <div className={`flex-none space-y-4 p-4 sticky top-0 bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/20 z-10 transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
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

      <ScrollArea 
        className="flex-1 relative md:pb-0 pb-20 bg-transparent" 
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
    </DashboardContent>
  );
};