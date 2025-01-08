import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const colorSchemes = [
  { bg: 'bg-purple-600 hover:bg-purple-500', text: 'text-white' },
  { bg: 'bg-blue-600 hover:bg-blue-500', text: 'text-white' },
  { bg: 'bg-green-600 hover:bg-green-500', text: 'text-white' },
  { bg: 'bg-yellow-600 hover:bg-yellow-500', text: 'text-white' },
  { bg: 'bg-red-600 hover:bg-red-500', text: 'text-white' },
  { bg: 'bg-pink-600 hover:bg-pink-500', text: 'text-white' },
  { bg: 'bg-indigo-600 hover:bg-indigo-500', text: 'text-white' },
  { bg: 'bg-cyan-600 hover:bg-cyan-500', text: 'text-white' },
];

const getColorScheme = (initials: string) => {
  const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorSchemes[sum % colorSchemes.length];
};

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log("No active session found");
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error loading profile",
            description: "Please try refreshing the page",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          const firstInitial = profile.first_name?.[0] || '';
          const lastInitial = profile.last_name?.[0] || '';
          const userInitials = (firstInitial + lastInitial).toUpperCase();
          setInitials(userInitials);
          setColorScheme(getColorScheme(userInitials));
        } else {
          console.log("No profile found for user");
          const emailInitial = session.user.email?.[0].toUpperCase() || '?';
          setInitials(emailInitial);
          setColorScheme(getColorScheme(emailInitial));
        }
      } catch (error) {
        console.error("Error in getProfile:", error);
        toast({
          title: "Error",
          description: "Could not load user profile",
          variant: "destructive",
        });
      }
    };

    getProfile();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mr-2"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        ) : (
          <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <Avatar className={`h-8 w-8 ${colorScheme.bg} transition-colors cursor-pointer`}>
        <AvatarFallback className={`${colorScheme.text} text-sm transition-colors`}>
          {initials || '??'}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};