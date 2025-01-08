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

  // Hintergrund-Elemente für den Scroll-Effekt
  const backgroundElements = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute w-24 h-24 rounded-full opacity-5"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 200}%`,
        transform: 'translate(-50%, -50%)',
        background: `hsl(${Math.random() * 360}, 70%, 50%)`,
        zIndex: -1,
      }}
    />
  ));

  return (
    <DashboardContent className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden relative">
      {/* Container für Hintergrund-Elemente */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {backgroundElements}
        </div>
      </div>
      
      {/* Header-Bereich */}
      <div 
        className={`
          relative
          flex-none 
          space-y-4 
          p-4 
          sticky 
          top-0 
          backdrop-blur-sm 
          z-20
          transition-shadow 
          duration-200 
          ${isScrolled ? 'shadow-sm' : ''}
        `}
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
          onExportCSV={handleExportCSV}
        />
      </div>

      {/* Scroll-Bereich für den Hauptinhalt */}
      <ScrollArea 
        className="flex-1 relative md:pb-0 pb-20 z-10" 
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