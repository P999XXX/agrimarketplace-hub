import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, User } from "lucide-react";

interface UserAccountPopoverProps {
  children: React.ReactNode;
}

export const UserAccountPopover = ({ children }: UserAccountPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2 px-2 py-1.5 text-sm"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2 px-2 py-1.5 text-sm"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-2 py-1.5 text-sm text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};