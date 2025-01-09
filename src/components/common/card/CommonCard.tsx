import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

interface CommonCardProps {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
  isHighlighted?: boolean;
}

export const CommonCard = ({ 
  header, 
  content, 
  footer,
  isHighlighted 
}: CommonCardProps) => {
  return (
    <Card className={`transition-all duration-500 hover:shadow-md bg-card border-border ${
      isHighlighted ? 'animate-highlight' : ''
    }`}>
      <CardHeader className="p-3 sm:p-4">
        {header}
      </CardHeader>

      <Separator className="w-full bg-border" />

      <CardContent className="p-4 sm:p-6">
        {content}
      </CardContent>

      <Separator className="w-full bg-border" />
      
      <CardFooter className="p-3 sm:p-4 min-h-[60px]">
        {footer}
      </CardFooter>
    </Card>
  );
};