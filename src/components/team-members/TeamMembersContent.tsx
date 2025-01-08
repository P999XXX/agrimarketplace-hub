import { Card, CardContent } from "@/components/ui/card";
import { TeamMembersHeader } from "./TeamMembersHeader";
import { TeamMembersTable } from "./TeamMembersTable";
import { TeamMembersFilters } from "./TeamMembersFilters";

export const TeamMembersContent = () => {
  return (
    <Card className="border-0 shadow-none">
      <TeamMembersHeader />
      <CardContent className="p-0">
        <div className="px-6">
          <TeamMembersFilters />
          <TeamMembersTable />
        </div>
      </CardContent>
    </Card>
  );
};