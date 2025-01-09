export type ViewMode = "grid" | "table";

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

export interface TeamMemberFilters {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  sortBy: string;
}

export interface InviteMemberForm {
  name: string;
  email: string;
  role: string;
  message: string;
}