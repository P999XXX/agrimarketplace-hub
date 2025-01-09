import { createContext, useContext, ReactNode } from 'react';
import { useCertificatesState } from '../hooks/useCertificatesState';
import { ViewMode } from '../types';

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
  const state = useCertificatesState();

  return (
    <CertificatesContext.Provider value={state}>
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