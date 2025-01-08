import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TeamMembersTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="whitespace-nowrap">Name</TableHead>
        <TableHead className="whitespace-nowrap">Email</TableHead>
        <TableHead className="whitespace-nowrap">Role</TableHead>
        <TableHead className="whitespace-nowrap">Status</TableHead>
        <TableHead className="whitespace-nowrap">Invited by</TableHead>
        <TableHead className="whitespace-nowrap">Invited</TableHead>
      </TableRow>
    </TableHeader>
  );
};