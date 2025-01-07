import { Card, CardContent } from "@/components/ui/card";
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

export const TeamMembersGrid = ({ searchQuery, roleFilter, sortBy }: {
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
        .maybeSingle();

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

      return (data as TeamMember[]).map(member => ({
        ...member,
        inviter: member.inviter?.[0] || null
      }));
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <Card
          key={member.id}
          className={`transition-colors ${
            Date.now() - new Date(member.created_at).getTime() < 3000
              ? 'bg-green-50'
              : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                {member.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <EmailCell email={member.email} />
                <div className="mt-2 space-y-1.5">
                  <Badge className={getRoleBadgeClass()}>{member.role}</Badge>
                  <div className="block">
                    <Badge className={getStatusBadgeClass(member.status)}>{member.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Invited by: {member.inviter?.first_name || ''} {member.inviter?.last_name || ''}</p>
                    <p>Invited: {format(new Date(member.created_at), 'MMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};