import { TeamMembersGrid } from "../TeamMembersGrid";
import { TeamMembersTable } from "../TeamMembersTable";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamMembersViewContentProps {
  view: "grid" | "table";
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
}

export const TeamMembersViewContent = ({
  view,
  searchQuery,
  roleFilter,
  statusFilter,
  sortBy,
  onScroll
}: TeamMembersViewContentProps) => {
  return (
    <ScrollArea 
      className="flex-1 relative md:pb-0 pb-20" 
      onScroll={onScroll}
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