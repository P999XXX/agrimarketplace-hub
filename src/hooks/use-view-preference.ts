import { useState, useEffect } from 'react';
import { useMediaQuery } from './use-media-query';

export type ViewMode = 'grid' | 'table';

export const useViewPreference = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const storageKey = 'global-view-mode';
  
  const [view, setView] = useState<ViewMode>(() => {
    if (isMobile) return "grid";
    
    const savedView = localStorage.getItem(storageKey);
    if (savedView === 'grid' || savedView === 'table') {
      return savedView;
    }
    return "table";
  });

  useEffect(() => {
    if (isMobile) {
      setView("grid");
    } else {
      const savedView = localStorage.getItem(storageKey);
      if (savedView === 'grid' || savedView === 'table') {
        setView(savedView as ViewMode);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(storageKey, view);
    }
  }, [view, isMobile]);

  return {
    view,
    setView,
    isMobile
  };
};