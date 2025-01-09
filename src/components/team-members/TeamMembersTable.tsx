import { TableBody } from "@/components/ui/table";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { CommonTable } from "@/components/common/table/CommonTable";
import { CommonTableEmpty } from "@/components/common/table/CommonTableEmpty";
import { CommonTableLoading } from "@/components/common/table/CommonTableLoading";
import { CommonTableHeader } from "@/components/common/table/CommonTableHeader";
import { TeamMembersTableRow } from "./table/TeamMembersTableRow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const columns = [
  { label: "Name" },
  { label: "Email" },
  { label: "Role" },
  { label: "Status" },
  { label: "Last Login" },
  { label: "Invited By" },
  { label: "Joined" },
  { label: "" }
];

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
    return <CommonTableLoading columns={columns} />;
  }

  if (!teamMembers || teamMembers.length === 0) {
    return <CommonTableEmpty columns={columns} message="No team members found" />;
  }

  return (
    <CommonTable>
      <CommonTableHeader columns={columns} />
      <TableBody>
        {teamMembers.map((member) => (
          <TeamMembersTableRow
            key={member.id}
            member={member}
          />
        ))}
      </TableBody>
    </CommonTable>
  );
};