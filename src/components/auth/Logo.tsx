import { Leaf } from "lucide-react";

export const Logo = () => {
  // Check if we're on an auth page using the current URL
  const isAuthPage = window.location.pathname.match(/^\/(signin|signup|thank-you)$/);

  return (
    <div className="flex items-center gap-1">
      <Leaf 
        className={`${isAuthPage ? 'text-white' : 'text-primary/40'} h-7 w-7 -translate-y-0.5 -rotate-12 hover:text-primary transition-colors`}
      />
      <span className="flex items-center text-[1.45rem]">
        <span className={`${isAuthPage ? 'text-white' : 'text-foreground dark:text-foreground'} font-[700] leading-[1] -mt-[4px]`}>
          crop<span className="text-primary/40 hover:text-primary transition-colors">i</span>o
        </span>
      </span>
    </div>
  );
};