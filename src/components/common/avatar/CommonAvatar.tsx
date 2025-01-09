interface CommonAvatarProps {
  initials: string;
  colorScheme: {
    bg: string;
    text: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

export const CommonAvatar = ({ 
  initials, 
  colorScheme,
  size = 'md'
}: CommonAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 sm:w-11 sm:h-11 text-sm sm:text-base',
    lg: 'w-12 h-12 text-base sm:text-lg',
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} font-medium transition-colors`}
    >
      {initials}
    </div>
  );
};