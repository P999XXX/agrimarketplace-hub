import { useQuery } from "@tanstack/react-query";
import { TeamMember } from "../useTeamMembers";

// Mock data für Entwicklung
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'admin',
    status: 'active',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  }
];

export const useTeamMembers = (
  searchQuery: string, 
  roleFilter: string, 
  statusFilter: string, 
  sortBy: string
) => {
  return useQuery({
    queryKey: ['team-members', searchQuery, roleFilter, statusFilter, sortBy],
    queryFn: () => Promise.resolve(mockTeamMembers),
  });
};