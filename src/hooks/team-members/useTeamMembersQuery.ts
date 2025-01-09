import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@/components/team-members/types";

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'admin',
    status: 'active',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    invited_by: 'admin-user',
    inviter: {
      first_name: 'Admin',
      last_name: 'User'
    }
  }
];

export const useTeamMembersQuery = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: () => Promise.resolve(mockTeamMembers),
  });
};