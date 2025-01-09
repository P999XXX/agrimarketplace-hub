import { format } from "date-fns";

interface UserAccountContentProps {
  userProfile: any;
  currentTime: Date;
}

export const UserAccountContent = ({ userProfile, currentTime }: UserAccountContentProps) => {
  // Get timezone abbreviation
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="text-sm text-muted-foreground space-y-3">
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
        <span>{timeZone}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Date:</span>
        <span className="w-[120px] text-right">{format(currentTime, 'PP')}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Time:</span>
        <div className="flex justify-end w-[200px] space-x-2">
          <span className="w-[100px] text-right">{timeZone}</span>
          <span className="w-[100px] text-right">{format(currentTime, 'h:mm:ss a')}</span>
        </div>
      </div>
    </div>
  );
};