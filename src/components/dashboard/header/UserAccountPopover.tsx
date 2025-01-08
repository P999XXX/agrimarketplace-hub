import { LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

        // Fetch IP info
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        console.log("IP Info received:", data); // Debug log
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
  
  const getCountryName = (countryCode: string) => {
    try {
      return countries.getName(countryCode, 'en') || countryCode;
    } catch {
      return countryCode;
    }
  };

  // Debug log für Flaggen-URL
  const getFlagUrl = (countryCode: string) => {
    const url = `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
    console.log("Flag URL:", url);
    return url;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="outline-none">{children}</button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10">
                <UserAvatar size="large" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold leading-none">
                  {userName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {userProfile?.email}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Content */}
        <div className="p-4 text-sm text-muted-foreground space-y-3">
          <div className="flex justify-between items-center">
            <span>Account:</span>
            <span>{userProfile?.companies?.name || 'Not assigned'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Role:</span>
            <span>{userProfile?.user_type || 'Not assigned'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Location:</span>
            <div className="flex items-center gap-2">
              {ipInfo?.country && (
                <>
                  <span>{getCountryName(ipInfo.country)}</span>
                  <img 
                    src={getFlagUrl(ipInfo.country)}
                    width="20"
                    height="15"
                    alt={getCountryName(ipInfo.country)}
                    className="inline-block rounded-full object-cover"
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Time:</span>
            <span>{format(currentTime, 'PPpp')}</span>
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-2.5">
          <Button 
            variant="ghost" 
            className="w-full justify-between text-sm font-normal hover:bg-destructive/5 hover:text-destructive"
            onClick={handleLogout}
          >
            <span>Sign out</span>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};