import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserAccountPopoverProps {
  children: React.ReactNode;
}

export const UserAccountPopover = ({ children }: UserAccountPopoverProps) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*, companies(*)')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        setUserProfile({
          ...profile,
          email: session.user.email
        });
      } catch (error) {
        console.error("Error in getProfile:", error);
      }
    };

    getProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Could not log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="outline-none">{children}</button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" sideOffset={8}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {children}
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">
                {userProfile?.first_name} {userProfile?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {userProfile?.email}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              <div className="mb-1">Account: {userProfile?.companies?.name || 'Not assigned'}</div>
              <div>Role: {userProfile?.user_type || 'Not assigned'}</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};