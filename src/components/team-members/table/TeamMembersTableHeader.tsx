import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TeamMembersTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="whitespace-nowrap text-foreground">Name</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Email</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Role</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Status</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Last Login</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Invited by</TableHead>
        <TableHead className="whitespace-nowrap text-foreground">Invited</TableHead>
      </TableRow>
    </TableHeader>
  );
};