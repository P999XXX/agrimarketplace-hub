import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface TeamMember {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  invited_by: string;
  inviter: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const TeamMembersTable = ({ searchQuery, roleFilter, sortBy }: { 
  searchQuery: string;
  roleFilter: string;
  sortBy: string;
}) => {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members', searchQuery, roleFilter, sortBy],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) return [];

      let query = supabase
        .from('invitations')
        .select(`
          id,
          email,
          role,
          status,
          created_at,
          invited_by,
          inviter:profiles(first_name, last_name)
        `)
        .eq('company_id', profile.company_id);

      if (searchQuery) {
        query = query.ilike('email', `%${searchQuery}%`);
      }

      if (roleFilter && roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }

      if (sortBy) {
        const [field, direction] = sortBy.split('-');
        query = query.order(field, { ascending: direction === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'declined':
      case 'inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Role</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Invited by</TableHead>
            <TableHead className="whitespace-nowrap">Invited</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow
              key={member.id}
              className={`transition-colors ${
                Date.now() - new Date(member.created_at).getTime() < 3000
                  ? 'bg-green-50'
                  : ''
              }`}
            >
              <TableCell className="whitespace-nowrap">
                <EmailCell email={member.email} />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge className={getRoleBadgeClass()}>{member.role}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge className={getStatusBadgeClass(member.status)}>{member.status}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {format(new Date(member.created_at), 'MMM d, yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
