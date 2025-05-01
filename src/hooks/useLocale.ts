
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LocaleType = 'en' | 'ar';
type DirectionType = 'ltr' | 'rtl';

interface LocaleContextType {
  locale: LocaleType;
  direction: DirectionType;
  changeLocale: (newLocale: LocaleType) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<LocaleType>('en');
  const [direction, setDirection] = useState<DirectionType>('ltr');

  const changeLocale = (newLocale: LocaleType) => {
    setLocale(newLocale);
    setDirection(newLocale === 'ar' ? 'rtl' : 'ltr');
    
    // Update HTML element direction
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  return (
    <LocaleContext.Provider value={{ locale, direction, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
