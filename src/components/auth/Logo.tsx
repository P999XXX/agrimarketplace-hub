import { Leaf } from "lucide-react";

export const Logo = () => {
  // Check if we're on an auth page using the current URL
  const isAuthPage = window.location.pathname.match(/^\/(signin|signup|thank-you)$/);

  return (
    <div className="flex items-center gap-1">
      <Leaf 
        className={`${isAuthPage ? 'text-white' : 'text-primary'} h-6 w-6`}
      />
      <span className="flex items-center text-[1.45rem]">
        <span className={`${isAuthPage ? 'text-white' : 'text-foreground dark:text-foreground'} font-[700] leading-[1] -mt-[4px]`}>
          cropio
        </span>
      </span>
    </div>
  );
};