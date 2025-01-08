import { Button } from "@/components/ui/button";

interface EmailCellProps {
  email: string;
}

export const EmailCell = ({ email }: EmailCellProps) => {
  const handleEmailClick = () => window.open(`mailto:${email}`);

  return (
    <span 
      className="cursor-pointer text-gray-600 hover:text-blue-600 hover:underline truncate"
      onClick={handleEmailClick}
    >
      {email}
    </span>
  );
};