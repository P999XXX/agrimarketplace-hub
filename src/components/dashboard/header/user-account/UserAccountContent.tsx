import { format } from "date-fns";
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(en);

interface UserAccountContentProps {
  userProfile: any;
  ipInfo: { country: string } | null;
  currentTime: Date;
}

export const UserAccountContent = ({ userProfile, ipInfo, currentTime }: UserAccountContentProps) => {
  const getCountryName = (countryCode: string) => {
    try {
      return countries.getName(countryCode, 'en') || countryCode;
    } catch {
      return countryCode;
    }
  };

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
  };

  return (
    <div className="text-sm text-muted-foreground space-y-3">
      <div className="flex justify-between items-center">
        <span>Account:</span>
        <span>{userProfile?.companies?.name || 'Not assigned'}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Role:</span>
        <span>{userProfile?.user_type || 'Not assigned'}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Location:</span>
        <div className="flex items-center gap-2">
          {ipInfo?.country && (
            <>
              <span>{getCountryName(ipInfo.country)}</span>
              <img 
                src={getFlagUrl(ipInfo.country)}
                width="20"
                height="15"
                alt={getCountryName(ipInfo.country)}
                className="inline-block rounded-full object-cover"
              />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Time:</span>
        <span>{format(currentTime, 'PPpp')}</span>
      </div>
    </div>
  );
};