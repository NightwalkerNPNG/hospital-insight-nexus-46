import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Check, 
  ChevronDown, 
  Filter, 
  Search, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Activity, 
  Clock, 
  UserRound 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { alertsData } from '@/data/alertsData';
import AlertPriorityChart from '@/components/alerts/AlertPriorityChart';
import AlertFeed from '@/components/dashboard/AlertFeed';
import AlertDetail from '@/components/alerts/AlertDetail';

// Define Alert interface
export type AlertPriorityType = 'critical' | 'warning' | 'info';
export type AlertCategoryType = 'patient' | 'system' | 'device';
export type AlertStatusType = 'active' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  message: string;
  priority: AlertPriorityType;
  category: AlertCategoryType;
  timestamp: Date;
  affectedEntity: string;
  details?: string;
  status: AlertStatusType;
  assignedTo?: string;
  department?: string; // Changed to optional with the ? mark
}

const Alerts = () => {
  const { locale, direction } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<AlertPriorityType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<AlertCategoryType | 'all'>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'System Alerts' : 'تنبيهات النظام';
  
  // Filter alerts based on search, tab, priority and category
  const filterAlerts = (alerts: Alert[]) => {
    return alerts.filter(alert => {
      const matchesSearch = 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
        alert.affectedEntity.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'active' && alert.status === 'active') ||
        (activeTab === 'acknowledged' && alert.status === 'acknowledged') ||
        (activeTab === 'resolved' && alert.status === 'resolved');
      
      const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
      
      const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
      
      return matchesSearch && matchesTab && matchesPriority && matchesCategory;
    });
  };
  
  const filteredAlerts = filterAlerts(alertsData);
  
  // Get alert icon based on priority
  const getAlertIcon = (priority: AlertPriorityType) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-status-info" />;
    }
  };
  
  // Get alert icon based on category
  const getCategoryIcon = (category: AlertCategoryType) => {
    switch (category) {
      case 'patient':
        return <UserRound size={16} />;
      case 'system':
        return <Activity size={16} />;
      case 'device':
        return <Bell size={16} />;
    }
  };
  
  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale === 'en' ? 'en-US' : 'ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Count alert statistics
  const criticalCount = alertsData.filter(alert => alert.priority === 'critical').length;
  const warningCount = alertsData.filter(alert => alert.priority === 'warning').length;
  const infoCount = alertsData.filter(alert => alert.priority === 'info').length;
  const activeCount = alertsData.filter(alert => alert.status === 'active').length;
  
  // Handle open alert detail
  const openAlertDetail = (alert: Alert) => {
    setSelectedAlert(alert);
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
                    <Bell size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Total Alerts' : 'إجمالي التنبيهات'}
                    </p>
                    <p className="text-2xl font-bold">{alertsData.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-error/10 rounded-full p-2 mr-3">
                    <AlertCircle size={20} className="text-status-error" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Critical' : 'حرجة'}
                    </p>
                    <p className="text-2xl font-bold">{criticalCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-warning/10 rounded-full p-2 mr-3">
                    <AlertTriangle size={20} className="text-status-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Warnings' : 'تحذيرات'}
                    </p>
                    <p className="text-2xl font-bold">{warningCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-info/10 rounded-full p-2 mr-3">
                    <Info size={20} className="text-status-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Information' : 'معلومات'}
                    </p>
                    <p className="text-2xl font-bold">{infoCount}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {locale === 'en' ? 'Alert Management' : 'إدارة التنبيهات'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex flex-wrap justify-between gap-4 mb-4">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={locale === 'en' ? "Search alerts..." : "البحث عن التنبيهات..."}
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Filter size={16} className="text-muted-foreground" />
                          <select
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value as AlertPriorityType | 'all')}
                          >
                            <option value="all">{locale === 'en' ? 'All Priorities' : 'كل الأولويات'}</option>
                            <option value="critical">{locale === 'en' ? 'Critical' : 'حرجة'}</option>
                            <option value="warning">{locale === 'en' ? 'Warning' : 'تحذير'}</option>
                            <option value="info">{locale === 'en' ? 'Info' : 'معلومة'}</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Filter size={16} className="text-muted-foreground" />
                          <select
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value as AlertCategoryType | 'all')}
                          >
                            <option value="all">{locale === 'en' ? 'All Categories' : 'كل الفئات'}</option>
                            <option value="patient">{locale === 'en' ? 'Patient' : 'مريض'}</option>
                            <option value="system">{locale === 'en' ? 'System' : 'نظام'}</option>
                            <option value="device">{locale === 'en' ? 'Device' : 'جهاز'}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <Tabs defaultValue="all" onValueChange={setActiveTab}>
                      <TabsList className="mb-4 grid grid-cols-4">
                        <TabsTrigger value="all">
                          {locale === 'en' ? 'All' : 'الكل'} ({alertsData.length})
                        </TabsTrigger>
                        <TabsTrigger value="active">
                          {locale === 'en' ? 'Active' : 'نشط'} ({activeCount})
                        </TabsTrigger>
                        <TabsTrigger value="acknowledged">
                          {locale === 'en' ? 'Acknowledged' : 'تم التأكيد'} ({alertsData.filter(a => a.status === 'acknowledged').length})
                        </TabsTrigger>
                        <TabsTrigger value="resolved">
                          {locale === 'en' ? 'Resolved' : 'تم الحل'} ({alertsData.filter(a => a.status === 'resolved').length})
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all">
                        <AlertTable 
                          alerts={filteredAlerts}
                          locale={locale}
                          getAlertIcon={getAlertIcon}
                          getCategoryIcon={getCategoryIcon}
                          formatTime={formatTime}
                          onAlertClick={openAlertDetail}
                        />
                      </TabsContent>
                      
                      <TabsContent value="active">
                        <AlertTable 
                          alerts={filteredAlerts.filter(a => a.status === 'active')}
                          locale={locale}
                          getAlertIcon={getAlertIcon}
                          getCategoryIcon={getCategoryIcon}
                          formatTime={formatTime}
                          onAlertClick={openAlertDetail}
                        />
                      </TabsContent>
                      
                      <TabsContent value="acknowledged">
                        <AlertTable 
                          alerts={filteredAlerts.filter(a => a.status === 'acknowledged')}
                          locale={locale}
                          getAlertIcon={getAlertIcon}
                          getCategoryIcon={getCategoryIcon}
                          formatTime={formatTime}
                          onAlertClick={openAlertDetail}
                        />
                      </TabsContent>
                      
                      <TabsContent value="resolved">
                        <AlertTable 
                          alerts={filteredAlerts.filter(a => a.status === 'resolved')}
                          locale={locale}
                          getAlertIcon={getAlertIcon}
                          getCategoryIcon={getCategoryIcon}
                          formatTime={formatTime}
                          onAlertClick={openAlertDetail}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {locale === 'en' ? 'Alerts by Priority' : 'التنبيهات حسب الأولوية'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertPriorityChart locale={locale} />
                  </CardContent>
                </Card>
                
                <Card className="mt-6 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {locale === 'en' ? 'Critical Alerts' : 'التنبيهات الحرجة'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AlertFeed alerts={alertsData.filter(alert => alert.priority === 'critical')} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Alert Detail Panel */}
      {selectedAlert && (
        <AlertDetail
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          locale={locale}
        />
      )}
    </div>
  );
};

interface AlertTableProps {
  alerts: Alert[];
  locale: 'en' | 'ar';
  getAlertIcon: (priority: AlertPriorityType) => React.ReactNode;
  getCategoryIcon: (category: AlertCategoryType) => React.ReactNode;
  formatTime: (date: Date) => string;
  onAlertClick: (alert: Alert) => void;
}

const AlertTable = ({ 
  alerts, 
  locale, 
  getAlertIcon, 
  getCategoryIcon,
  formatTime,
  onAlertClick
}: AlertTableProps) => {
  // Get status badge
  const getStatusBadge = (status: AlertStatusType) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-500">
          {locale === 'en' ? 'Active' : 'نشط'}
        </Badge>;
      case 'acknowledged':
        return <Badge className="bg-yellow-500">
          {locale === 'en' ? 'Acknowledged' : 'تم التأكيد'}
        </Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">
          {locale === 'en' ? 'Resolved' : 'تم الحل'}
        </Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: '50px' }}></TableHead>
          <TableHead>
            {locale === 'en' ? 'Message' : 'الرسالة'}
          </TableHead>
          <TableHead>
            {locale === 'en' ? 'Category' : 'الفئة'}
          </TableHead>
          <TableHead>
            {locale === 'en' ? 'Entity' : 'الكيان'}
          </TableHead>
          <TableHead>
            {locale === 'en' ? 'Time' : 'الوقت'}
          </TableHead>
          <TableHead>
            {locale === 'en' ? 'Status' : 'الحالة'}
          </TableHead>
          <TableHead style={{ width: '120px' }}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <TableRow 
              key={alert.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onAlertClick(alert)}
            >
              <TableCell>{getAlertIcon(alert.priority)}</TableCell>
              <TableCell className="font-medium">{alert.message}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {getCategoryIcon(alert.category)}
                  <span>
                    {alert.category === 'patient' 
                      ? (locale === 'en' ? 'Patient' : 'مريض') 
                      : alert.category === 'system' 
                      ? (locale === 'en' ? 'System' : 'نظام')
                      : (locale === 'en' ? 'Device' : 'جهاز')}
                  </span>
                </div>
              </TableCell>
              <TableCell>{alert.affectedEntity}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-muted-foreground" />
                  {formatTime(alert.timestamp)}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(alert.status)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0" 
                    title={locale === 'en' ? 'Acknowledge' : 'تأكيد'}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle acknowledge action
                    }}
                  >
                    <Check size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0" 
                    title={locale === 'en' ? 'Details' : 'التفاصيل'}
                  >
                    <ChevronDown size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              {locale === 'en' 
                ? 'No alerts found' 
                : 'لم يتم العثور على تنبيهات'
              }
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Alerts;
