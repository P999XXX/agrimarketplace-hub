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
    // TODO: Implement CSV export functionality
    console.log("Export to CSV");
  };

  return (
    <div className="container py-8 space-y-6">
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
  );
};