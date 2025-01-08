import { Leaf } from "lucide-react";

export const Logo = () => {
  // Check if we're on an auth page using the current URL
  const isAuthPage = window.location.pathname.match(/^\/(signin|signup|thank-you)$/);

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="leaf-gradient" gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="rgb(0, 179, 134)" />
              <stop offset="50%" stopColor="rgb(0, 128, 96)" />
              <stop offset="100%" stopColor="rgb(0, 153, 115)" />
            </linearGradient>
          </defs>
        </svg>
        <Leaf 
          className={`${isAuthPage ? 'text-white' : ''} h-7 w-7 -translate-y-0.5 -rotate-12`}
          style={isAuthPage ? {} : { stroke: "url(#leaf-gradient)" }}
        />
      </div>
      <span className="flex items-center text-[1.45rem]">
        <span className={`${isAuthPage ? 'text-white' : 'text-foreground dark:text-foreground'} font-[700] leading-[1] -mt-[4px]`}>
          cropio
        </span>
      </span>
    </div>
  );
};