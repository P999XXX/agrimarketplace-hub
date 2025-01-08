import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";
import { useState } from "react";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export const TeamMembersContent = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: members, isLoading, error } = useTeamMembers(searchQuery, roleFilter, sortBy);

  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log("Export to CSV");
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-8">
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

      <div className="space-y-6">
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