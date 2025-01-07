import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmailCellProps {
  email: string;
}

export const EmailCell = ({ email }: EmailCellProps) => {
  const handleEmailClick = () => window.open(`mailto:${email}`);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 py-1.5"
            onClick={handleEmailClick}
          >
            <Mail className="h-4 w-4 text-gray-500" />
            {email}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Send email</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};