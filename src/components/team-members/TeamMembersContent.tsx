import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { useState, useEffect } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TeamMembersContent = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
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

  const handleExportCSV = () => {
    console.log("Export to CSV");
  };

  return (
    <DashboardContent>
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex-none space-y-4">
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

        <ScrollArea className="flex-1 mt-4">
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
        </ScrollArea>
      </div>
    </DashboardContent>
  );
};