import { createContext, useContext, ReactNode } from 'react';
import { useViewPreference, ViewMode } from '@/hooks/use-view-preference';
import { useCertificatesState } from '../hooks/useCertificatesState';

interface CertificatesContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isScrolled: boolean;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  isMobile: boolean;
}

const CertificatesContext = createContext<CertificatesContextType | undefined>(undefined);

export const CertificatesProvider = ({ children }: { children: ReactNode }) => {
  const { view, setView, isMobile } = useViewPreference();
  const state = useCertificatesState();

  const value = {
    view,
    setView,
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
    categoryFilter: state.categoryFilter,
    setCategoryFilter: state.setCategoryFilter,
    statusFilter: state.statusFilter,
    setStatusFilter: state.setStatusFilter,
    sortBy: state.sortBy,
    setSortBy: state.setSortBy,
    isScrolled: state.isScrolled,
    handleScroll: state.handleScroll,
    isMobile
  };

  return (
    <CertificatesContext.Provider value={value}>
      {children}
    </CertificatesContext.Provider>
  );
};

export const useCertificatesContext = () => {
  const context = useContext(CertificatesContext);
  if (context === undefined) {
    throw new Error('useCertificatesContext must be used within a CertificatesProvider');
  }
  return context;
};