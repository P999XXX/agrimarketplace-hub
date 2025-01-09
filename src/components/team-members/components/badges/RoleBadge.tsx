import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  return (
    <Badge className={getRoleBadgeClass()}>
      {role}
    </Badge>
  );
};