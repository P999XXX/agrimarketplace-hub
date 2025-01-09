import { TeamMembersGrid } from "../../TeamMembersGrid";
import { TeamMembersTable } from "../../TeamMembersTable";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamMembersMainContentProps {
  view: "grid" | "table";
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
  handleScroll: () => void;
}

export const TeamMembersMainContent = ({
  view,
  searchQuery,
  roleFilter,
  statusFilter,
  sortBy,
  handleScroll,
}: TeamMembersMainContentProps) => {
  return (
    <ScrollArea 
      className="flex-1 relative md:pb-0 pb-20" 
      onScroll={handleScroll}
    >
      <div className="p-4">
        {view === "grid" ? (
          <TeamMembersGrid
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            sortBy={sortBy}
          />
        ) : (
          <TeamMembersTable
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            sortBy={sortBy}
          />
        )}
      </div>
    </ScrollArea>
  );
};