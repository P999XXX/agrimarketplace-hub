import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  // Berechne einen konsistenten Index basierend auf den Initialen
  const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorSchemes[sum % colorSchemes.length];
};

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
  const { toast } = useToast();

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
          // Fallback zu Email-Initialen wenn kein Profil gefunden wurde
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
    <Avatar className={`h-8 w-8 ${colorScheme.bg} transition-colors cursor-pointer`}>
      <AvatarFallback className={`${colorScheme.text} text-sm transition-colors`}>
        {initials || '??'}
      </AvatarFallback>
    </Avatar>
  );
};