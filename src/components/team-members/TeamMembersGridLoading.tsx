import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const TeamMembersGridLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="w-full bg-border" />

          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>

          <Separator className="w-full bg-border" />
          
          <CardFooter className="p-3 sm:p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};