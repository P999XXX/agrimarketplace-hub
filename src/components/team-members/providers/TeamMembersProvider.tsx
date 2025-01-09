import { createContext, useContext, ReactNode } from 'react';
import { useTeamMembersState } from '../hooks/useTeamMembersState';
import { ViewMode } from '../types';

interface TeamMembersContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isScrolled: boolean;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  isMobile: boolean;
}

const TeamMembersContext = createContext<TeamMembersContextType | undefined>(undefined);

export const TeamMembersProvider = ({ children }: { children: ReactNode }) => {
  const state = useTeamMembersState();

  return (
    <TeamMembersContext.Provider value={state}>
      {children}
    </TeamMembersContext.Provider>
  );
};

export const useTeamMembersContext = () => {
  const context = useContext(TeamMembersContext);
  if (context === undefined) {
    throw new Error('useTeamMembersContext must be used within a TeamMembersProvider');
  }
  return context;
};