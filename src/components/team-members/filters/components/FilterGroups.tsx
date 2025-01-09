import { FilterGroup } from "../types/FilterTypes";

export const getRoleFilterGroups = (): FilterGroup[] => [
  {
    label: "Team Member Roles",
    options: [
      { label: "All roles", value: "all" },
      { label: "Member", value: "member" },
      { label: "Viewer", value: "viewer" },
    ],
  },
];

export const getStatusFilterGroups = (): FilterGroup[] => [
  {
    label: "Member Status",
    options: [
      { label: "All Status", value: "all" },
      { label: "Pending", value: "pending" },
      { label: "Accepted", value: "accepted" },
      { label: "Declined", value: "declined" },
    ],
  },
];

export const getSortGroups = (): FilterGroup[] => [
  {
    label: "Sort by Date",
    options: [
      { label: "Newest first", value: "created_at-desc" },
      { label: "Oldest first", value: "created_at-asc" },
    ],
  },
  {
    label: "Sort by Name",
    options: [
      { label: "Name A-Z", value: "name-asc" },
      { label: "Name Z-A", value: "name-desc" },
    ],
  },
];