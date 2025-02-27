import { useTeamMembersQuery } from "./team-members/useTeamMembersQuery";

export interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: string;
  last_login: string | null;
  invited_by: string;
  inviter: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export const useTeamMembers = (searchQuery: string, roleFilter: string, statusFilter: string, sortBy: string) => {
  return useTeamMembersQuery();
};