import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};