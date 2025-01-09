import { FilterGroup } from "../types/FilterTypes";

export const getRoleFilterGroups = (): FilterGroup[] => [
  {
    label: "User Roles",
    options: [
      { label: "All Roles", value: "all" },
      { label: "Admin", value: "admin" },
      { label: "Member", value: "member" },
    ],
  },
];

export const getStatusFilterGroups = (): FilterGroup[] => [
  {
    label: "User Status",
    options: [
      { label: "All Status", value: "all" },
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

export const getSortGroups = (): FilterGroup[] => [
  {
    label: "Sort by Name",
    options: [
      { label: "Name (A-Z)", value: "name-asc" },
      { label: "Name (Z-A)", value: "name-desc" },
    ],
  },
  {
    label: "Sort by Date",
    options: [
      { label: "Date (Newest)", value: "date-desc" },
      { label: "Date (Oldest)", value: "date-asc" },
    ],
  },
];