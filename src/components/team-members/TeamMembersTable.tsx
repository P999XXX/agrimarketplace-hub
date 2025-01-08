import { Table, TableBody } from "@/components/ui/table";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TeamMembersTableHeader } from "./table/TeamMembersTableHeader";
import { TeamMembersTableRow } from "./table/TeamMembersTableRow";
import { TeamMembersTableLoading } from "./table/TeamMembersTableLoading";
import { TeamMembersTableEmpty } from "./table/TeamMembersTableEmpty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TeamMembersTableProps {
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
}

export const TeamMembersTable = ({ 
  searchQuery, 
  roleFilter, 
  sortBy,
}: TeamMembersTableProps) => {
  const { data: teamMembers = [], isLoading, error } = useTeamMembers(searchQuery, roleFilter, sortBy);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error instanceof Error ? error.message : 'Failed to load team members'}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <TeamMembersTableLoading />;
  }

  if (teamMembers.length === 0) {
    return <TeamMembersTableEmpty />;
  }

  return (
    <ScrollArea className="rounded-md border">
      <div className="relative min-w-[800px]">
        <Table>
          <TeamMembersTableHeader />
          <TableBody>
            {teamMembers.map((member) => (
              <TeamMembersTableRow
                key={member.id}
                member={member}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};