import { createContext, useContext, ReactNode } from 'react';
import { useViewPreference, ViewMode } from '@/hooks/use-view-preference';
import { useTeamMembersState } from '../hooks/useTeamMembersState';

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
  const { view, setView, isMobile } = useViewPreference();
  const state = useTeamMembersState();

  const value = {
    view,
    setView,
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
    roleFilter: state.roleFilter,
    setRoleFilter: state.setRoleFilter,
    statusFilter: state.statusFilter,
    setStatusFilter: state.setStatusFilter,
    sortBy: state.sortBy,
    setSortBy: state.setSortBy,
    isScrolled: state.isScrolled,
    handleScroll: state.handleScroll,
    isMobile
  };

  return (
    <TeamMembersContext.Provider value={value}>
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