import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Invitation {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: string;
  invited_by: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: string;
  invited_by: string;
  inviter: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const useTeamMembers = (searchQuery: string, roleFilter: string, sortBy: string) => {
  return useQuery({
    queryKey: ['team-members', searchQuery, roleFilter, sortBy],
    queryFn: async () => {
      // 1. Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 2. Get user's company
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile?.company_id) return [];

      // 3. Get invitations
      let invitationsQuery = supabase
        .from('invitations')
        .select('id, email, name, role, status, created_at, invited_by')  // name hinzugefügt
        .eq('company_id', profile.company_id);

      if (searchQuery) {
        invitationsQuery = invitationsQuery.ilike('email', `%${searchQuery}%`);
      }

      if (roleFilter && roleFilter !== 'all') {
        invitationsQuery = invitationsQuery.eq('role', roleFilter);
      }

      if (sortBy) {
        const [field, direction] = sortBy.split('-');
        invitationsQuery = invitationsQuery.order(field, { ascending: direction === 'asc' });
      } else {
        invitationsQuery = invitationsQuery.order('created_at', { ascending: false });
      }

      const { data: invitations, error: invitationsError } = await invitationsQuery;
      
      if (invitationsError) {
        console.error('Error fetching invitations:', invitationsError);
        throw invitationsError;
      }

      if (!invitations?.length) return [];

      // 4. Get unique inviter IDs
      const inviterIds = [...new Set(invitations.map(inv => inv.invited_by))];

      // 5. Get profiles for inviters
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', inviterIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // 6. Create a map of profiles for easy lookup
      const profilesMap = new Map(
        profiles?.map(profile => [profile.id, profile]) || []
      );

      // 7. Combine the data
      return invitations.map(invitation => ({
        ...invitation,
        inviter: profilesMap.get(invitation.invited_by) || null
      })) as TeamMember[];
    }
  });
};