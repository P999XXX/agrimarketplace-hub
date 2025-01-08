interface TableUserAvatarProps {
  initials: string;
  colorScheme: {
    bg: string;
    text: string;
  };
  name: string;
}

export const TableUserAvatar = ({ initials, colorScheme, name }: TableUserAvatarProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full ${colorScheme.bg} flex items-center justify-center flex-shrink-0 ${colorScheme.text} text-xs font-medium`}>
        {initials}
      </div>
      <span className="font-medium">
        {name || 'Unnamed User'}
      </span>
    </div>
  );
};