import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmailCell } from "./EmailCell";
import { UserAvatar } from "./card/UserAvatar";
import { CardStats } from "./card/CardStats";
import { CardFooter as CustomCardFooter } from "./card/CardFooter";

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

const getInitials = (name: string, email: string) => {
  if (name) {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return (name[0] + (nameParts[0][1] || '')).toUpperCase();
  }
  return email ? (email[0] + (email[1] || '')).toUpperCase() : '??';
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
  const initials = getInitials(member.name || '', member.email);
  const colorScheme = getColorScheme(initials);
  const isNew = Date.now() - new Date(member.created_at).getTime() < 3000;

  return (
    <Card
      className={`transition-all duration-500 hover:shadow-md bg-card border-border ${
        isNew ? 'animate-highlight' : ''
      }`}
    >
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <UserAvatar initials={initials} colorScheme={colorScheme} />
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold text-card-foreground truncate">
                {member.name || 'Unnamed User'}
              </p>
              <div className="text-sm">
                <EmailCell email={member.email} />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator className="w-full bg-border" />

      <CardContent className="p-4 sm:p-6">
        <CardStats
          lastLogin={member.last_login}
          inviterName={`${member.inviter?.first_name || ''} ${member.inviter?.last_name || ''}`}
          createdAt={member.created_at}
        />
      </CardContent>

      <Separator className="w-full bg-border" />
      
      <CardFooter className="p-3 sm:p-4">
        <CustomCardFooter
          status={member.status}
          role={member.role}
          getStatusBadgeClass={getStatusBadgeClass}
          getRoleBadgeClass={getRoleBadgeClass}
        />
      </CardFooter>
    </Card>
  );
};