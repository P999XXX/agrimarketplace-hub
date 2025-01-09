import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface CardFooterProps {
  status: string;
  role: string;
  getStatusBadgeClass: (status: string) => string;
  getRoleBadgeClass: () => string;
}

export const CardFooter = ({ 
  status, 
  role, 
  getStatusBadgeClass, 
  getRoleBadgeClass 
}: CardFooterProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-2">
        <Badge className={getStatusBadgeClass(status)}>
          {status}
        </Badge>
        <Badge className={getRoleBadgeClass()}>
          {role}
        </Badge>
      </div>
      <ChevronRight size={20} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
    </div>
  );
};