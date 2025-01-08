import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
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

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <TeamMembersHeader view={view} onViewChange={setView} />
      </div>

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