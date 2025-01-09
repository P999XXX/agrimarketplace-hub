export const colorSchemes = [
  { bg: 'bg-[hsl(var(--chart-1))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-2))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-3))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-4))]', text: 'text-white' },
  { bg: 'bg-[hsl(var(--chart-5))]', text: 'text-white' },
];

export const getColorScheme = (initials: string) => {
  const sum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorSchemes[sum % colorSchemes.length];
};

export const getInitials = (name: string, email: string) => {
  if (name) {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return (name[0] + (nameParts[0][1] || '')).toUpperCase();
  }
  return email ? (email[0] + (email[1] || '')).toUpperCase() : '??';
};