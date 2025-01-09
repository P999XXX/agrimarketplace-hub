import { format } from "date-fns";

interface CardStatsProps {
  lastLogin: string | null;
  inviterName: string;
  createdAt: string;
}

export const CardStats = ({ lastLogin, inviterName, createdAt }: CardStatsProps) => {
  return (
    <div className="text-sm text-muted-foreground space-y-2">
      <div className="flex justify-between">
        <span>Last Login:</span>
        <span>{lastLogin ? format(new Date(lastLogin), 'MMM d, yyyy') : 'Never'}</span>
      </div>
      <div className="flex justify-between">
        <span>Invited by:</span>
        <span>{inviterName}</span>
      </div>
      <div className="flex justify-between">
        <span>Invited:</span>
        <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
      </div>
    </div>
  );
};