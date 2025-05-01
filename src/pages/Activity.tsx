
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowDown, 
  ArrowUp, 
  Bell, 
  Calendar, 
  FileText, 
  Filter, 
  Hospital, 
  Search, 
  User, 
  Users 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Activity data
const generateActivityData = (locale: 'en' | 'ar') => {
  const now = new Date();
  
  // Create activities with different timestamps
  const activities = [
    {
      id: 1,
      user: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
      action: locale === 'en' ? 'Logged in' : 'تسجيل الدخول',
      module: locale === 'en' ? 'System' : 'النظام',
      timestamp: new Date(now.getTime() - 5 * 60000), // 5 minutes ago
    },
    {
      id: 2,
      user: locale === 'en' ? 'Dr. James Wilson' : 'د. علي محمد',
      action: locale === 'en' ? 'Updated patient record' : 'تحديث سجل المريض',
      module: locale === 'en' ? 'Patients' : 'المرضى',
      timestamp: new Date(now.getTime() - 12 * 60000), // 12 minutes ago
    },
    {
      id: 3,
      user: locale === 'en' ? 'Nurse Rodriguez' : 'الممرضة نورا',
      action: locale === 'en' ? 'Administered medication' : 'إعطاء الدواء',
      module: locale === 'en' ? 'Patients' : 'المرضى',
      timestamp: new Date(now.getTime() - 25 * 60000), // 25 minutes ago
    },
    {
      id: 4,
      user: locale === 'en' ? 'Admin Johnson' : 'المدير خالد',
      action: locale === 'en' ? 'Generated monthly report' : 'إنشاء تقرير شهري',
      module: locale === 'en' ? 'Reports' : 'التقارير',
      timestamp: new Date(now.getTime() - 45 * 60000), // 45 minutes ago
    },
    {
      id: 5,
      user: locale === 'en' ? 'Dr. Patel' : 'د. سارة أحمد',
      action: locale === 'en' ? 'Created appointment' : 'إنشاء موعد',
      module: locale === 'en' ? 'Appointments' : 'المواعيد',
      timestamp: new Date(now.getTime() - 60 * 60000), // 1 hour ago
    },
    {
      id: 6,
      user: locale === 'en' ? 'System' : 'النظام',
      action: locale === 'en' ? 'Alert triggered: ICU at capacity' : 'تنبيه: العناية المركزة ممتلئة',
      module: locale === 'en' ? 'Alerts' : 'التنبيهات',
      timestamp: new Date(now.getTime() - 90 * 60000), // 1.5 hours ago
    },
    {
      id: 7,
      user: locale === 'en' ? 'HR Manager Lisa' : 'مدير الموارد البشرية سميرة',
      action: locale === 'en' ? 'Added new staff member' : 'إضافة موظف جديد',
      module: locale === 'en' ? 'Staff' : 'الموظفين',
      timestamp: new Date(now.getTime() - 120 * 60000), // 2 hours ago
    },
    {
      id: 8,
      user: locale === 'en' ? 'Dr. Martinez' : 'د. ياسمين',
      action: locale === 'en' ? 'Updated department schedule' : 'تحديث جدول القسم',
      module: locale === 'en' ? 'Departments' : 'الأقسام',
      timestamp: new Date(now.getTime() - 180 * 60000), // 3 hours ago
    },
    {
      id: 9,
      user: locale === 'en' ? 'IT Support' : 'الدعم الفني',
      action: locale === 'en' ? 'System maintenance completed' : 'اكتمال صيانة النظام',
      module: locale === 'en' ? 'System' : 'النظام',
      timestamp: new Date(now.getTime() - 300 * 60000), // 5 hours ago
    },
    {
      id: 10,
      user: locale === 'en' ? 'Dr. Williams' : 'د. عبدالله',
      action: locale === 'en' ? 'Viewed patient vitals' : 'عرض علامات المريض الحيوية',
      module: locale === 'en' ? 'Monitoring' : 'المراقبة',
      timestamp: new Date(now.getTime() - 480 * 60000), // 8 hours ago
    }
  ];
  
  return activities;
};

// Format timestamp based on locale
const formatTimestamp = (timestamp: Date, locale: 'en' | 'ar') => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (locale === 'en') {
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 120) return '1 hour ago';
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return timestamp.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  } else {
    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffMins < 120) return 'منذ ساعة';
    if (diffMins < 1440) return `منذ ${Math.floor(diffMins / 60)} ساعات`;
    return timestamp.toLocaleDateString('ar-SA', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
};

const Activity = () => {
  const { locale, direction } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Activity Log' : 'سجل النشاطات';
  
  // Generate activity data based on locale
  const activities = generateActivityData(locale);
  
  // Filter activities based on search and module
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesModule = 
      selectedModule === 'all' || 
      activity.module.toLowerCase() === selectedModule.toLowerCase();
    
    return matchesSearch && matchesModule;
  });
  
  // Get unique modules for filter
  const modules = ['all', ...new Set(activities.map(activity => activity.module))];

  // Get module badge color
  const getModuleBadgeColor = (module: string) => {
    // Apply color based on module name
    switch (module.toLowerCase()) {
      case 'dashboard':
      case 'system':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'patients':
      case 'المرضى':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'appointments':
      case 'المواعيد':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'staff':
      case 'الموظفين':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'monitoring':
      case 'المراقبة':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'alerts':
      case 'التنبيهات':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reports':
      case 'التقارير':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'departments':
      case 'الأقسام':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Total Activities' : 'إجمالي النشاطات'}
                    </p>
                    <p className="text-2xl font-bold">
                      {activities.length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-success/10 rounded-full p-2 mr-3">
                    <User size={20} className="text-status-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'User Activities' : 'نشاطات المستخدم'}
                    </p>
                    <p className="text-2xl font-bold">
                      {activities.filter(a => a.user !== (locale === 'en' ? 'System' : 'النظام')).length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-info/10 rounded-full p-2 mr-3">
                    <Bell size={20} className="text-status-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'System Events' : 'أحداث النظام'}
                    </p>
                    <p className="text-2xl font-bold">
                      {activities.filter(a => a.user === (locale === 'en' ? 'System' : 'النظام')).length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-warning/10 rounded-full p-2 mr-3">
                    <Calendar size={20} className="text-status-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Today\'s Events' : 'أحداث اليوم'}
                    </p>
                    <p className="text-2xl font-bold">
                      {activities.filter(a => {
                        const today = new Date();
                        return (
                          a.timestamp.getDate() === today.getDate() &&
                          a.timestamp.getMonth() === today.getMonth() &&
                          a.timestamp.getFullYear() === today.getFullYear()
                        );
                      }).length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'en' ? "Search activities..." : "البحث في النشاطات..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <select
                  className="bg-background border rounded px-2 py-1 text-sm text-foreground"
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                >
                  {modules.map(module => (
                    <option key={module} value={module.toLowerCase()}>
                      {module === 'all' 
                        ? locale === 'en' ? 'All Modules' : 'كل الوحدات'
                        : module
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Activity Table */}
            <Table>
              <TableCaption>
                {locale === 'en' 
                  ? `Showing ${filteredActivities.length} of ${activities.length} activities`
                  : `عرض ${filteredActivities.length} من ${activities.length} نشاطات`
                }
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">
                    {locale === 'en' ? 'ID' : 'المعرف'}
                  </TableHead>
                  <TableHead>
                    {locale === 'en' ? 'User' : 'المستخدم'}
                  </TableHead>
                  <TableHead>
                    {locale === 'en' ? 'Action' : 'الإجراء'}
                  </TableHead>
                  <TableHead>
                    {locale === 'en' ? 'Module' : 'الوحدة'}
                  </TableHead>
                  <TableHead className="text-right">
                    {locale === 'en' ? 'Time' : 'الوقت'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">#{activity.id}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getModuleBadgeColor(activity.module)}>
                        {activity.module}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatTimestamp(activity.timestamp, locale)}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredActivities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {locale === 'en' 
                        ? 'No activities found matching your filters'
                        : 'لم يتم العثور على نشاطات تطابق عوامل التصفية'
                      }
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Activity;
