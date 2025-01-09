import { Table, TableBody } from "@/components/ui/table";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TeamMembersTableHeader } from "./table/TeamMembersTableHeader";
import { TeamMembersTableRow } from "./table/TeamMembersTableRow";
import { TeamMembersTableLoading } from "./table/TeamMembersTableLoading";
import { TeamMembersTableEmpty } from "./table/TeamMembersTableEmpty";

interface TeamMembersTableProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
}

export const TeamMembersTable = ({ 
  searchQuery, 
  roleFilter,
  statusFilter, 
  sortBy,
}: TeamMembersTableProps) => {
  const { data: teamMembers = [], isLoading, error } = useTeamMembers(searchQuery, roleFilter, statusFilter, sortBy);

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

  if (!teamMembers || teamMembers.length === 0) {
    return <TeamMembersTableEmpty />;
  }

  return (
    <div className="rounded-md border">
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
  );
};