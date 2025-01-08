import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: string;
  last_login: string | null;
  invited_by: string;
  profile: Profile | null;
  inviter: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const useTeamMembers = (searchQuery: string, roleFilter: string, sortBy: string) => {
  return useQuery({
    queryKey: ['team-members', searchQuery, roleFilter, sortBy],
    queryFn: async () => {
      console.log('Fetching team members with filters:', { searchQuery, roleFilter, sortBy });

      // 1. Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        throw new Error("Authentication required");
      }
      if (!user) throw new Error("Not authenticated");

      // 2. Get user's company
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile error:', profileError);
        throw new Error("Failed to fetch user profile");
      }
      if (!profile?.company_id) {
        console.log('No company found for user');
        return [];
      }

      // 3. Get invitations with profiles
      let invitationsQuery = supabase
        .from('invitations')
        .select(`
          id, 
          email, 
          name, 
          role, 
          status, 
          created_at, 
          last_login, 
          invited_by,
          profile:profiles!invitations_invited_by_fkey (
            id,
            first_name,
            last_name,
            avatar_url
          ),
          inviter:profiles!invitations_invited_by_fkey (
            first_name,
            last_name
          )
        `)
        .eq('company_id', profile.company_id);

      if (searchQuery) {
        console.log('Applying search filter:', searchQuery);
        invitationsQuery = invitationsQuery.ilike('email', `%${searchQuery}%`);
      }

      if (roleFilter && roleFilter !== 'all') {
        console.log('Applying role filter:', roleFilter);
        invitationsQuery = invitationsQuery.eq('role', roleFilter);
      }

      if (sortBy) {
        const [field, direction] = sortBy.split('-');
        console.log('Applying sort:', { field, direction });
        invitationsQuery = invitationsQuery.order(field, { ascending: direction === 'asc' });
      } else {
        invitationsQuery = invitationsQuery.order('created_at', { ascending: false });
      }

      const { data: invitations, error: invitationsError } = await invitationsQuery;
      
      if (invitationsError) {
        console.error('Invitations error:', invitationsError);
        throw invitationsError;
      }

      if (!invitations?.length) {
        console.log('No invitations found');
        return [];
      }

      console.log(`Found ${invitations.length} team members`);
      return invitations as TeamMember[];
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    retry: 1, // Only retry once on failure
  });
};