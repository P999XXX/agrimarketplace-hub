import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ViewMode } from '../types';

export const useCertificatesState = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<ViewMode>(() => {
    if (isMobile) return "grid";
    
    const savedView = localStorage.getItem('viewMode');
    if (savedView === 'grid' || savedView === 'table') {
      return savedView;
    }
    return "table";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");

  // Wenn sich die View ändert, speichern wir sie im localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('viewMode', view);
    }
  }, [view, isMobile]);

  // Wenn sich Mobile/Desktop ändert, passen wir die View an
  useEffect(() => {
    if (isMobile) {
      setView("grid");
    } else {
      const savedView = localStorage.getItem('viewMode');
      if (savedView === 'grid' || savedView === 'table') {
        setView(savedView as ViewMode);
      }
    }
  }, [isMobile]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  return {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    isScrolled,
    handleScroll,
    isMobile
  };
};