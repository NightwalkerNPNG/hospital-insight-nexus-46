
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LocaleContextType {
  locale: Locale;
  direction: Direction;
  changeLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with saved preference or default to English
  const [locale, setLocale] = useState<Locale>(() => {
    return (localStorage.getItem('locale') as Locale) || 'en';
  });

  const [direction, setDirection] = useState<Direction>(() => {
    return locale === 'ar' ? 'rtl' : 'ltr';
  });

  useEffect(() => {
    // Update direction based on locale
    setDirection(locale === 'ar' ? 'rtl' : 'ltr');
    
    // Update HTML attributes
    const html = document.documentElement;
    html.setAttribute('lang', locale);
    html.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    
    // Save preference
    localStorage.setItem('locale', locale);
  }, [locale]);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
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
