import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EmailCell } from "../EmailCell";
import { UserAvatar } from "./UserAvatar";
import { CardStats } from "./CardStats";
import { CardFooter as CustomCardFooter } from "./CardFooter";
import { useState, useEffect } from "react";
import { getColorScheme, getInitials } from "../../utils/colorSchemes";
import { TeamMember } from "../../types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const initials = getInitials(member.name || '', member.email);
  const colorScheme = getColorScheme(initials);
  const isNew = Date.now() - new Date(member.created_at).getTime() < 3000;
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowHighlight(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <Card
      className={`transition-all duration-500 hover:shadow-md bg-card border-border ${
        showHighlight ? 'animate-highlight' : ''
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
        />
      </CardFooter>
    </Card>
  );
};