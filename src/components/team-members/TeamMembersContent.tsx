import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { useState } from "react";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export const TeamMembersContent = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");
  const itemsPerPage = 9;

  const { data: members, isLoading, error } = useTeamMembers(searchQuery, roleFilter, sortBy);

  const handleExportCSV = () => {
    console.log("Export to CSV");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
      <div className="space-y-6">
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

        {view === "grid" ? (
          <TeamMembersGrid
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <TeamMembersTable
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};