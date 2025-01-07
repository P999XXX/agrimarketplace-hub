import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";

export const TeamMembersTable = () => {
  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invited by</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">John Doe</TableCell>
            <TableCell>
              <EmailCell email="john@example.com" />
            </TableCell>
            <TableCell>
              <Badge className={getRoleBadgeClass()}>Admin</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusBadgeClass('active')}>Active</Badge>
            </TableCell>
            <TableCell>Sarah Smith</TableCell>
            <TableCell>Jan 15, 2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};