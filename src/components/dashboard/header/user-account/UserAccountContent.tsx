import { format } from "date-fns";
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { useState, useEffect } from "react";

countries.registerLocale(en);

interface UserAccountContentProps {
  userProfile: any;
  currentTime: Date;
}

export const UserAccountContent = ({ userProfile, currentTime }: UserAccountContentProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // Get user's country from browser language
  const getUserCountry = () => {
    const language = navigator.language || 'en-US';
    const country = language.split('-')[1] || 'US';
    return country;
  };

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

  // Get timezone abbreviation
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userCountry = getUserCountry();

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
          <span>{getCountryName(userCountry)}</span>
          <img 
            src={getFlagUrl(userCountry)}
            width="20"
            height="15"
            alt={getCountryName(userCountry)}
            className="inline-block rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Date:</span>
        <span className="w-[120px] text-right">{format(time, 'PP')}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Time:</span>
        <div className="flex justify-end w-[200px] space-x-2">
          <span className="w-[100px] text-right">{timeZone}</span>
          <span className="w-[100px] text-right">{format(time, 'h:mm:ss a')}</span>
        </div>
      </div>
    </div>
  );
};