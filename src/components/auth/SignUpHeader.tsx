import { useIsMobile } from "@/hooks/use-mobile";

interface SignUpHeaderProps {
  title: string;
  subtitle: string;
}

export const SignUpHeader = ({ title, subtitle }: SignUpHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <h2 className="text-[1.6rem] md:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
      {isMobile && (
        <p className="text-white/80 text-sm mt-2">{subtitle}</p>
      )}
    </div>
  );
};