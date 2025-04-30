
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';

const Monitoring = () => {
  const { locale, direction } = useLocale();
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'System Monitoring' : 'مراقبة النظام';

  return (
    <div className="flex h-screen overflow-hidden" dir={direction}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={pageTitle}
          user={user}
          unreadNotifications={3}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">
                {locale === 'en' ? 'System Monitoring' : 'مراقبة النظام'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'en' 
                  ? 'This section is under development. System monitoring features will be available in the next release.' 
                  : 'هذا القسم قيد التطوير. ستتوفر ميزات مراقبة النظام في الإصدار التالي.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Monitoring;
