import { createContext, useContext, ReactNode } from 'react';
import { FilterContextType } from './types/FilterTypes';

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  value: FilterContextType;
}

export const FilterProvider = ({ children, value }: FilterProviderProps) => {
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};