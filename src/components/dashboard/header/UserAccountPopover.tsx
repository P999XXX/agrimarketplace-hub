import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserAccountHeader } from "./user-account/UserAccountHeader";
import { UserAccountContent } from "./user-account/UserAccountContent";
import { UserAccountFooter } from "./user-account/UserAccountFooter";

interface UserAccountPopoverProps {
  children: React.ReactNode;
}

export const UserAccountPopover = ({ children }: UserAccountPopoverProps) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [ipInfo, setIpInfo] = useState<{ country: string } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIpInfo(data);
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

  const userName = userProfile?.first_name || userProfile?.last_name 
    ? `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim()
    : 'No Name';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="outline-none">{children}</button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-background border border-border shadow-lg rounded-lg" 
        align="end" 
        sideOffset={8}
      >
        <div className="p-4">
          <UserAccountHeader 
            userName={userName}
            email={userProfile?.email}
          />
        </div>

        <Separator className="bg-border/50" />

        <div className="p-4">
          <UserAccountContent 
            userProfile={userProfile}
            ipInfo={ipInfo}
            currentTime={currentTime}
          />
        </div>

        <Separator className="bg-border/50" />

        <div className="p-2.5">
          <UserAccountFooter onLogout={handleLogout} />
        </div>
      </PopoverContent>
    </Popover>
  );
};