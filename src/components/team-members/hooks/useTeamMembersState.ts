import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ViewMode } from '../types';

export const useTeamMembersState = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<ViewMode>(() => {
    if (isMobile) return "grid";
    
    const savedView = localStorage.getItem('teamMembersViewMode');
    if (savedView === 'grid' || savedView === 'table') {
      return savedView;
    }
    return "table";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at-desc");

  useEffect(() => {
    if (isMobile) {
      setView("grid");
    } else {
      const savedView = localStorage.getItem('teamMembersViewMode');
      if (savedView === 'grid' || savedView === 'table') {
        setView(savedView as ViewMode);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('teamMembersViewMode', view);
    }
  }, [view, isMobile]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  return {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    isScrolled,
    handleScroll,
    isMobile
  };
};