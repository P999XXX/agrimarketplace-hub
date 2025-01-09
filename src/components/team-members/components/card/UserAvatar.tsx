interface UserAvatarProps {
  initials: string;
  colorScheme: {
    bg: string;
    text: string;
  };
}

export const UserAvatar = ({ initials, colorScheme }: UserAvatarProps) => {
  return (
    <div 
      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-sm sm:text-base font-medium transition-colors`}
    >
      {initials}
    </div>
  );
};