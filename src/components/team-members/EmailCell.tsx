import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmailCellProps {
  email: string;
}

export const EmailCell = ({ email }: EmailCellProps) => {
  const handleEmailClick = () => window.open(`mailto:${email}`);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 hover:bg-gray-100"
              onClick={handleEmailClick}
            >
              <Mail className="h-4 w-4 text-gray-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span 
        className="cursor-pointer hover:text-blue-600 hover:underline"
        onClick={handleEmailClick}
      >
        {email}
      </span>
    </div>
  );
};