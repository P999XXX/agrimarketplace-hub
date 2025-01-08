import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { MessageCircle, Mail, ArrowRight } from "lucide-react";

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
              <div className={`w-10 h-10 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-sm font-medium transition-colors`}>
                {initials}
              </div>
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
            <div className="text-sm text-gray-500 space-y-1">
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
      <Separator className="w-full" />
      <CardFooter className="p-3 flex justify-end space-x-4">
        <MessageCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
        <Mail className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
        <ArrowRight className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
      </CardFooter>
    </Card>
  );
};