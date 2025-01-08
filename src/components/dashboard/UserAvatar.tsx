import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const UserAvatar = () => {
  const [initials, setInitials] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          const firstInitial = profile.first_name?.[0] || '';
          const lastInitial = profile.last_name?.[0] || '';
          setInitials((firstInitial + lastInitial).toUpperCase());
          
          if (profile.avatar_url) {
            setAvatarUrl(profile.avatar_url);
          } else if (!isGenerating) {
            setIsGenerating(true);
            try {
              const { data: userData } = await supabase
                .from('profiles')
                .select('user_type')
                .eq('id', session.user.id)
                .single();

              const { data, error } = await supabase.functions.invoke('generate-avatar', {
                body: {
                  name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || session.user.email?.split('@')[0],
                  role: userData?.user_type || 'user'
                }
              });

              if (error) throw error;
              
              if (data.image) {
                const { error: updateError } = await supabase
                  .from('profiles')
                  .update({ avatar_url: data.image })
                  .eq('id', session.user.id);
                
                if (updateError) throw updateError;
                setAvatarUrl(data.image);
                
                toast({
                  title: "Avatar Generated",
                  description: "Your new professional avatar has been created.",
                });
              }
            } catch (error) {
              console.error('Error generating avatar:', error);
              toast({
                title: "Avatar Generation Failed",
                description: "Using initials as fallback",
                variant: "destructive",
              });
            } finally {
              setIsGenerating(false);
            }
          }
        }
      }
    };

    getProfile();
  }, [toast, isGenerating]);

  return (
    <Avatar className="h-8 w-8 bg-brand-600 hover:bg-brand-500 transition-colors cursor-pointer">
      <AvatarImage src={avatarUrl || ''} alt="Profile" />
      <AvatarFallback className="bg-[rgb(0,128,96,0.9)] text-white text-sm hover:bg-[rgb(0,128,96,0.8)] transition-colors">
        {initials || '??'}
      </AvatarFallback>
    </Avatar>
  );
};