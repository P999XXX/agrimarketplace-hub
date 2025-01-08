import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TeamMemberCardProps {
  member: any; // TODO: Add proper type
  getRoleBadgeClass: () => string;
  getStatusBadgeClass: (status: string) => string;
}

export const TeamMemberCard = ({ 
  member,
  getRoleBadgeClass,
  getStatusBadgeClass
}: TeamMemberCardProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getInitials = (name: string, email: string) => {
    if (name) {
      const nameParts = name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return (name[0] + (nameParts[0][1] || '')).toUpperCase();
    }
    return (email[0] + (email[1] || '')).toUpperCase();
  };

  useEffect(() => {
    const generateAvatar = async () => {
      if (!member.profile?.avatar_url && !isGenerating) {
        setIsGenerating(true);
        try {
          const { data, error } = await supabase.functions.invoke('generate-avatar', {
            body: {
              name: member.name || member.email.split('@')[0],
              role: member.role
            }
          });

          if (error) throw error;

          if (data.image) {
            // Update the profile with the new avatar URL
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ avatar_url: data.image })
              .eq('id', member.profile?.id);

            if (updateError) throw updateError;

            setAvatarUrl(data.image);
          }
        } catch (error) {
          console.error('Error generating avatar:', error);
        } finally {
          setIsGenerating(false);
        }
      } else if (member.profile?.avatar_url) {
        setAvatarUrl(member.profile.avatar_url);
      }
    };

    generateAvatar();
  }, [member, isGenerating]);

  return (
    <Card
      className={`transition-all duration-500 hover:shadow-md ${
        Date.now() - new Date(member.created_at).getTime() < 3000
          ? 'animate-[highlight_1s_ease-in-out]'
          : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={avatarUrl || ''} 
                  alt={member.name || 'Team member'} 
                />
                <AvatarFallback className="bg-brand-100 text-brand-700 text-base font-medium">
                  {getInitials(member.name || '', member.email)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {member.name || 'Unnamed User'}
                </p>
                <div className="text-sm">
                  <EmailCell email={member.email} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={getStatusBadgeClass(member.status)}>
                {member.status}
              </Badge>
              <Badge variant="secondary" className={getRoleBadgeClass()}>
                {member.role}
              </Badge>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          <div className="space-y-3">
            <div className="text-xs text-gray-500 space-y-1">
              <p className="flex justify-between">
                <span>Last Login:</span>
                <span>{member.last_login ? format(new Date(member.last_login), 'MMM d, yyyy') : 'Never'}</span>
              </p>
              <p className="flex justify-between">
                <span>Invited by:</span>
                <span>{member.inviter?.first_name || ''} {member.inviter?.last_name || ''}</span>
              </p>
              <p className="flex justify-between">
                <span>Invited:</span>
                <span>{format(new Date(member.created_at), 'MMM d, yyyy')}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};