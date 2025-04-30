
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, User, Calendar, Bell, Search } from "lucide-react";

const Activity = () => {
  const { locale, direction } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Activity Log' : 'سجل النشاط';
  
  // Sample activity log data
  const generateActivityLogs = () => {
    const currentDate = new Date();
    const logs = [
      {
        id: 1,
        user: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
        action: locale === 'en' ? 'Logged in' : 'تسجيل الدخول',
        module: 'system',
        timestamp: new Date(currentDate.getTime() - 5 * 60000), // 5 minutes ago
        icon: <User className="h-4 w-4" />
      },
      {
        id: 2,
        user: locale === 'en' ? 'Dr. James Wilson' : 'د. علي محمود',
        action: locale === 'en' ? 'Updated patient record' : 'تحديث سجل المريض',
        module: 'patients',
        timestamp: new Date(currentDate.getTime() - 15 * 60000), // 15 minutes ago
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 3,
        user: locale === 'en' ? 'Nurse Rodriguez' : 'ممرضة سارة',
        action: locale === 'en' ? 'Added vital signs' : 'إضافة العلامات الحيوية',
        module: 'monitoring',
        timestamp: new Date(currentDate.getTime() - 25 * 60000), // 25 minutes ago
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 4,
        user: locale === 'en' ? 'System' : 'النظام',
        action: locale === 'en' ? 'Critical alert triggered' : 'تم تشغيل تنبيه حرج',
        module: 'alerts',
        timestamp: new Date(currentDate.getTime() - 45 * 60000), // 45 minutes ago
        icon: <Bell className="h-4 w-4" />
      },
      {
        id: 5,
        user: locale === 'en' ? 'Dr. Emily Johnson' : 'د. سارة أحمد',
        action: locale === 'en' ? 'Created appointment' : 'إنشاء موعد',
        module: 'appointments',
        timestamp: new Date(currentDate.getTime() - 60 * 60000), // 1 hour ago
        icon: <Calendar className="h-4 w-4" />
      },
      {
        id: 6,
        user: locale === 'en' ? 'Admin' : 'المدير',
        action: locale === 'en' ? 'Generated monthly report' : 'إنشاء تقرير شهري',
        module: 'reports',
        timestamp: new Date(currentDate.getTime() - 90 * 60000), // 1.5 hours ago
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 7,
        user: locale === 'en' ? 'Dr. David Kim' : 'د. محمد سالم',
        action: locale === 'en' ? 'Updated staff schedule' : 'تحديث جدول الموظفين',
        module: 'staff',
        timestamp: new Date(currentDate.getTime() - 120 * 60000), // 2 hours ago
        icon: <User className="h-4 w-4" />
      },
      {
        id: 8,
        user: locale === 'en' ? 'System' : 'النظام',
        action: locale === 'en' ? 'Database backup completed' : 'اكتمل نسخ قاعدة البيانات الاحتياطي',
        module: 'system',
        timestamp: new Date(currentDate.getTime() - 180 * 60000), // 3 hours ago
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 9,
        user: locale === 'en' ? 'Dr. Maria Garcia' : 'د. نور حسين',
        action: locale === 'en' ? 'Discharged patient' : 'خروج المريض',
        module: 'patients',
        timestamp: new Date(currentDate.getTime() - 240 * 60000), // 4 hours ago
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 10,
        user: locale === 'en' ? 'Nurse Thompson' : 'ممرض أحمد',
        action: locale === 'en' ? 'Administered medication' : 'إعطاء الدواء',
        module: 'patients',
        timestamp: new Date(currentDate.getTime() - 300 * 60000), // 5 hours ago
        icon: <FileText className="h-4 w-4" />
      }
    ];
    return logs;
  };
  
  const activityLogs = generateActivityLogs();
  
  // Format timestamp based on locale
  const formatTimestamp = (timestamp) => {
    if (locale === 'en') {
      // Format in English
      const timeAgo = Math.floor((new Date() - timestamp) / 60000); // minutes ago
      if (timeAgo < 60) {
        return `${timeAgo} ${timeAgo === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        const hoursAgo = Math.floor(timeAgo / 60);
        return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
      }
    } else {
      // Format in Arabic
      const timeAgo = Math.floor((new Date() - timestamp) / 60000); // minutes ago
      if (timeAgo < 60) {
        return `منذ ${timeAgo} ${timeAgo === 1 ? 'دقيقة' : 'دقائق'}`;
      } else {
        const hoursAgo = Math.floor(timeAgo / 60);
        return `منذ ${hoursAgo} ${hoursAgo === 1 ? 'ساعة' : 'ساعات'}`;
      }
    }
  };
  
  // Filter logs based on search query
  const filteredLogs = activityLogs.filter(log => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      log.user.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.module.toLowerCase().includes(query)
    );
  });
  
  // Get module badge styling
  const getModuleBadge = (module) => {
    let variant = "outline";
    
    switch(module) {
      case 'alerts':
        return <Badge variant="destructive">{locale === 'en' ? 'Alerts' : 'التنبيهات'}</Badge>;
      case 'patients':
        return <Badge variant="secondary">{locale === 'en' ? 'Patients' : 'المرضى'}</Badge>;
      case 'appointments':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {locale === 'en' ? 'Appointments' : 'المواعيد'}
        </Badge>;
      case 'staff':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
          {locale === 'en' ? 'Staff' : 'الموظفين'}
        </Badge>;
      case 'reports':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
          {locale === 'en' ? 'Reports' : 'التقارير'}
        </Badge>;
      case 'monitoring':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          {locale === 'en' ? 'Monitoring' : 'المراقبة'}
        </Badge>;
      default:
        return <Badge variant="outline">{locale === 'en' ? 'System' : 'النظام'}</Badge>;
    }
  };

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
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>
                    {locale === 'en' ? 'System Activity Log' : 'سجل نشاط النظام'}
                  </CardTitle>
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={locale === 'en' ? 'Search logs...' : 'بحث في السجلات...'}
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: '5%' }}></TableHead>
                      <TableHead style={{ width: '20%' }}>
                        {locale === 'en' ? 'User' : 'المستخدم'}
                      </TableHead>
                      <TableHead style={{ width: '30%' }}>
                        {locale === 'en' ? 'Action' : 'الإجراء'}
                      </TableHead>
                      <TableHead style={{ width: '15%' }}>
                        {locale === 'en' ? 'Module' : 'الوحدة'}
                      </TableHead>
                      <TableHead style={{ width: '15%' }}>
                        {locale === 'en' ? 'Time' : 'الوقت'}
                      </TableHead>
                      <TableHead style={{ width: '15%' }}></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="p-4">{log.icon}</TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{getModuleBadge(log.module)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatTimestamp(log.timestamp)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            {locale === 'en' ? 'View Details' : 'عرض التفاصيل'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredLogs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground">
                      {locale === 'en' ? 'No activity logs found' : 'لم يتم العثور على سجلات نشاط'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === 'en' ? 'Activity Statistics' : 'إحصائيات النشاط'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {locale === 'en' ? 'Total Activities Today' : 'إجمالي الأنشطة اليوم'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">142</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {locale === 'en' ? 'System Alerts' : 'تنبيهات النظام'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">17</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {locale === 'en' ? 'User Actions' : 'إجراءات المستخدم'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-2xl font-bold">125</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Activity;
