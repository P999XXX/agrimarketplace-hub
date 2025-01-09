import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TeamMember } from "../useTeamMembers";

export const fetchTeamMembers = async (
  searchQuery: string, 
  roleFilter: string, 
  statusFilter: string, 
  sortBy: string,
  companyId?: string
): Promise<TeamMember[]> => {
  if (!companyId) {
    console.log('No company ID provided, skipping fetch');
    return [];
  }

  console.log('Fetching team members with filters:', { searchQuery, roleFilter, statusFilter, sortBy });

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
      inviter:profiles!invitations_invited_by_fkey (
        first_name,
        last_name
      )
    `)
    .eq('company_id', companyId);

  if (searchQuery) {
    invitationsQuery = invitationsQuery.ilike('email', `%${searchQuery}%`);
  }

  if (roleFilter && roleFilter !== 'all') {
    invitationsQuery = invitationsQuery.eq('role', roleFilter);
  }

  if (statusFilter && statusFilter !== 'all') {
    invitationsQuery = invitationsQuery.eq('status', statusFilter);
  }

  if (sortBy) {
    const [field, direction] = sortBy.split('-');
    invitationsQuery = invitationsQuery.order(field, { ascending: direction === 'asc' });
  } else {
    invitationsQuery = invitationsQuery.order('created_at', { ascending: false });
  }

  const { data: invitations, error: invitationsError } = await invitationsQuery;
  
  if (invitationsError) {
    console.error('Invitations error:', invitationsError);
    throw invitationsError;
  }

  return invitations as TeamMember[];
};

export const useTeamMembers = (
  searchQuery: string, 
  roleFilter: string, 
  statusFilter: string, 
  sortBy: string
) => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return useQuery({
    queryKey: ['team-members', searchQuery, roleFilter, statusFilter, sortBy, profile?.company_id],
    queryFn: () => fetchTeamMembers(searchQuery, roleFilter, statusFilter, sortBy, profile?.company_id),
    enabled: !!profile?.company_id && !isAuthLoading,
  });
};