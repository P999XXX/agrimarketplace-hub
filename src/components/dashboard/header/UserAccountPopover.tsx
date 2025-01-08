import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "../UserAvatar";

// Initialize the countries library
countries.registerLocale(en);

interface UserAccountPopoverProps {
  children: React.ReactNode;
}

export const UserAccountPopover = ({ children }: UserAccountPopoverProps) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [ipInfo, setIpInfo] = useState<{ country: string } | null>(null);
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

        // Fetch IP info
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

  const currentTime = new Date();
  
  const getCountryFlag = (countryCode: string) => {
    try {
      return getUnicodeFlagIcon(countryCode) || '';
    } catch {
      return '';
    }
  };

  const getCountryName = (countryCode: string) => {
    try {
      return countries.getName(countryCode, 'en') || countryCode;
    } catch {
      return countryCode;
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
            <div className="h-10 w-10">
              <UserAvatar size="large" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">
                {userName}
              </p>
              <p className="text-sm text-muted-foreground">
                {userProfile?.email}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <div className="mb-1">Account: {userProfile?.companies?.name || 'Not assigned'}</div>
              <div className="mb-1">Role: {userProfile?.user_type || 'Not assigned'}</div>
              <div className="mb-1">Location: {ipInfo?.country ? (
                <span>
                  {getCountryFlag(ipInfo.country)} {getCountryName(ipInfo.country)}
                </span>
              ) : 'Loading...'}</div>
              <div>Time: {format(currentTime, 'PPpp')}</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm font-normal hover:bg-destructive/5 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};