import { TeamMembersGrid } from "../TeamMembersGrid";
import { TeamMembersTable } from "../TeamMembersTable";
import { MobileInviteButton } from "../MobileInviteButton";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFilters } from "@/hooks/useFilters";
import { CommonSearchInput } from "@/components/common/filters/CommonSearchInput";
import { CommonFilterButtons } from "@/components/common/filters/CommonFilterButtons";
import { CommonMobileFilter } from "@/components/common/filters/CommonMobileFilter";
import { CommonFilterChips } from "@/components/common/filters/CommonFilterChips";
import { Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const TeamMembersContent = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const {
    view,
    setView,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filters,
    updateFilter,
    hasActiveFilters,
  } = useFilters({
    defaultFilters: {
      role: "all",
      status: "all",
    },
  });

  const filterButtons = [
    {
      label: "Role",
      value: filters.role,
      onChange: (value: string) => updateFilter("role", value),
      icon: <Filter className="h-4 w-4" />,
      options: [
        { label: "All roles", value: "all" },
        { label: "Member", value: "member" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      label: "Status",
      value: filters.status,
      onChange: (value: string) => updateFilter("status", value),
      icon: <Filter className="h-4 w-4" />,
      options: [
        { label: "All Status", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
    {
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      icon: <Filter className="h-4 w-4" />,
      options: [
        { label: "Newest first", value: "created_at-desc" },
        { label: "Oldest first", value: "created_at-asc" },
        { label: "Name A-Z", value: "name-asc" },
        { label: "Name Z-A", value: "name-desc" },
      ],
    },
  ];

  const filterGroups = [
    {
      label: "Team Member Roles",
      options: [
        { label: "All roles", value: "all" },
        { label: "Member", value: "member" },
        { label: "Viewer", value: "viewer" },
      ],
    },
    {
      label: "Member Status",
      options: [
        { label: "All Status", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
    {
      label: "Sort by",
      options: [
        { label: "Newest first", value: "created_at-desc" },
        { label: "Oldest first", value: "created_at-asc" },
        { label: "Name A-Z", value: "name-asc" },
        { label: "Name Z-A", value: "name-desc" },
      ],
    },
  ];

  const filterChips = [
    {
      label: "Role",
      value: filters.role,
      defaultValue: "all",
      getLabel: (value: string) => {
        switch (value) {
          case "member":
            return "Member";
          case "viewer":
            return "Viewer";
          default:
            return "";
        }
      },
      onReset: (value: string) => updateFilter("role", value),
    },
    {
      label: "Status",
      value: filters.status,
      defaultValue: "all",
      getLabel: (value: string) => {
        switch (value) {
          case "pending":
            return "Pending";
          case "accepted":
            return "Accepted";
          case "declined":
            return "Declined";
          default:
            return "";
        }
      },
      onReset: (value: string) => updateFilter("status", value),
    },
    {
      label: "Sort",
      value: sortBy,
      defaultValue: "created_at-desc",
      getLabel: (value: string) => {
        switch (value) {
          case "created_at-desc":
            return "Newest first";
          case "created_at-asc":
            return "Oldest first";
          case "name-asc":
            return "Name A-Z";
          case "name-desc":
            return "Name Z-A";
          default:
            return "";
        }
      },
      onReset: setSortBy,
    },
  ];

  return (
    <DashboardContent>
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <div className="sticky top-16 flex-none space-y-4 px-4 pt-4 pb-3.6 dark:bg-black/10 bg-white/70 backdrop-blur-md md:z-[5] z-[20] transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Team Members
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <CommonSearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search team members..."
            />

            <div className="hidden md:flex items-center gap-2">
              <CommonFilterButtons
                filters={filterButtons}
                viewMode={view}
                setViewMode={setView}
                onExport={() => {}}
                showViewToggle={!isMobile}
              />
            </div>

            <div className="md:hidden">
              <CommonMobileFilter filters={filterGroups} />
            </div>
          </div>

          {hasActiveFilters() && (
            <CommonFilterChips filters={filterChips} />
          )}
        </div>

        <ScrollArea className="flex-1 relative md:pb-0 pb-20">
          <div className="p-4">
            {view === "grid" ? (
              <TeamMembersGrid
                searchQuery={searchQuery}
                roleFilter={filters.role}
                statusFilter={filters.status}
                sortBy={sortBy}
              />
            ) : (
              <TeamMembersTable
                searchQuery={searchQuery}
                roleFilter={filters.role}
                statusFilter={filters.status}
                sortBy={sortBy}
              />
            )}
          </div>
        </ScrollArea>

        <MobileInviteButton />
      </div>
    </DashboardContent>
  );
};

export default TeamMembersContent;