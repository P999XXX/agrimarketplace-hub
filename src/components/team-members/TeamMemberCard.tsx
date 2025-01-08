import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { MessageCircle, Mail, ChevronRight } from "lucide-react";

const colorSchemes = [
  { bg: 'bg-[hsl(var(--chart-1))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-2))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-3))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-4))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-5))]', text: 'text-white' },
];

const getColorScheme = (initials: string) => {
  const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorSchemes[sum % colorSchemes.length];
};

interface TeamMemberCardProps {
  member: any;
  getRoleBadgeClass: () => string;
  getStatusBadgeClass: (status: string) => string;
}

export const TeamMemberCard = ({ 
  member,
  getRoleBadgeClass,
  getStatusBadgeClass
}: TeamMemberCardProps) => {
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

  const initials = getInitials(member.name || '', member.email);
  const colorScheme = getColorScheme(initials);

  return (
    <Card
      className={`transition-all duration-500 hover:shadow-md bg-card border-border ${
        Date.now() - new Date(member.created_at).getTime() < 3000
          ? 'animate-[highlight_1s_ease-in-out]'
          : ''
      }`}
    >
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-sm font-medium transition-colors`}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold text-card-foreground truncate">
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
      </CardHeader>

      <Separator className="w-full bg-border" />

      <CardContent className="p-4 sm:p-6">
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex justify-between">
            <span>Last Login:</span>
            <span>{member.last_login ? format(new Date(member.last_login), 'MMM d, yyyy') : 'Never'}</span>
          </div>
          <div className="flex justify-between">
            <span>Invited by:</span>
            <span>{member.inviter?.first_name || ''} {member.inviter?.last_name || ''}</span>
          </div>
          <div className="flex justify-between">
            <span>Invited:</span>
            <span>{format(new Date(member.created_at), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>

      <Separator className="w-full bg-border" />
      
      <CardFooter className="p-3 sm:p-4 flex justify-end space-x-4">
        <MessageCircle size={20} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        <Mail size={20} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        <ChevronRight size={20} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
      </CardFooter>
    </Card>
  );
};