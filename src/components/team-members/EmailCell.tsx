import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmailCellProps {
  email: string;
}

export const EmailCell = ({ email }: EmailCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 hover:bg-gray-100"
              onClick={() => window.open(`mailto:${email}`)}
            >
              <Mail className="h-4 w-4 text-gray-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {email}
    </div>
  );
};