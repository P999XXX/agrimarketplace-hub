import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersGrid } from "./TeamMembersGrid";
import { TeamMembersTable } from "./TeamMembersTable";
import { useState } from "react";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export const TeamMembersContent = () => {
  const [view, setView] = useState<"grid" | "table">("grid");
  const { data: members, isLoading, error } = useTeamMembers();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <TeamMembersHeader view={view} onViewChange={setView} />
      </div>

      <div className="space-y-6">
        {view === "grid" ? (
          <TeamMembersGrid members={members} isLoading={isLoading} error={error} />
        ) : (
          <TeamMembersTable members={members} isLoading={isLoading} error={error} />
        )}
      </div>
    </div>
  );
};