import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserAccountFooterProps {
  onLogout: () => void;
}

export const UserAccountFooter = ({ onLogout }: UserAccountFooterProps) => {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-between text-sm font-normal hover:bg-destructive/5 hover:text-destructive"
      onClick={onLogout}
    >
      <span>Sign out</span>
      <LogOut className="h-4 w-4" />
    </Button>
  );
};