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

      // 3. Get invitations
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
          invited_by
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

      // 4. Get profiles for invited users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url')
        .in('id', invitations.map(inv => inv.invited_by));

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      // 5. Get inviters profiles
      const { data: inviters, error: invitersError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', invitations.map(inv => inv.invited_by));

      if (invitersError) {
        console.error('Inviters error:', invitersError);
        throw invitersError;
      }

      // 6. Create maps for both profiles and inviters
      const profilesMap = new Map(profiles?.map(profile => [profile.id, profile]) || []);
      const invitersMap = new Map(inviters?.map(inviter => [inviter.id, inviter]) || []);

      // 7. Combine all data
      const teamMembers = invitations.map(invitation => ({
        ...invitation,
        profile: profilesMap.get(invitation.invited_by) || null,
        inviter: invitersMap.get(invitation.invited_by) || null
      })) as TeamMember[];

      console.log(`Found ${teamMembers.length} team members`);
      return teamMembers;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    retry: 1, // Only retry once on failure
  });
};