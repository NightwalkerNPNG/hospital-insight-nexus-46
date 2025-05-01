
import React, { useState, useEffect } from 'react';
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
import { 
  Activity, 
  ThermometerSnowflake, 
  Droplets, 
  Bed, 
  Bell, 
  RefreshCcw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { monitoringData } from '@/data/monitoringData';
import VitalsChart from '@/components/monitoring/VitalsChart';
import BedOccupancyHeatmap from '@/components/monitoring/BedOccupancyHeatmap';

interface MonitoringProps {}

const Monitoring: React.FC<MonitoringProps> = () => {
  const { locale, direction } = useLocale();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [selectedPatient, setSelectedPatient] = useState<string>('PT001');
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'System Monitoring' : 'مراقبة النظام';

  // Auto refresh every 30 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);
  
  // Format the last updated time
  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString(locale === 'en' ? 'en-US' : 'ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };
  
  // Handle manual refresh
  const handleRefresh = () => {
    setLastUpdated(new Date());
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
            {/* Last updated and refresh controls */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Last updated:' : 'آخر تحديث:'} {formatLastUpdated()}
                </p>
                <Badge variant="outline" className={autoRefresh ? 'bg-green-50 border-green-200 text-green-700' : ''}>
                  {autoRefresh 
                    ? (locale === 'en' ? 'Auto-refresh ON' : 'التحديث التلقائي يعمل') 
                    : (locale === 'en' ? 'Auto-refresh OFF' : 'التحديث التلقائي متوقف')}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  {autoRefresh 
                    ? (locale === 'en' ? 'Disable Auto-refresh' : 'إيقاف التحديث التلقائي') 
                    : (locale === 'en' ? 'Enable Auto-refresh' : 'تفعيل التحديث التلقائي')}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleRefresh}
                >
                  <RefreshCcw size={16} />
                </Button>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <Bed size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Occupied Beds' : 'الأسرة المشغولة'}
                    </p>
                    <p className="text-2xl font-bold">108/150</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-yellow-500/10 rounded-full p-2 mr-3">
                    <Activity size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Critical Patients' : 'المرضى الحرجين'}
                    </p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/10 rounded-full p-2 mr-3">
                    <Bell size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Active Alerts' : 'التنبيهات النشطة'}
                    </p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-500/10 rounded-full p-2 mr-3">
                    <Droplets size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'ER Cases (Last Hour)' : 'حالات الطوارئ (آخر ساعة)'}
                    </p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Main monitoring content */}
            <div className="grid grid-cols-1 gap-6">
              {/* Patient Vitals Monitoring */}
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {locale === 'en' ? 'Patient Vitals Monitoring' : 'مراقبة العلامات الحيوية للمريض'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="icu" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="icu">
                        {locale === 'en' ? 'ICU Patients' : 'مرضى العناية المركزة'}
                      </TabsTrigger>
                      <TabsTrigger value="er">
                        {locale === 'en' ? 'ER Patients' : 'مرضى الطوارئ'}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="icu">
                      <div>
                        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                          {monitoringData.icuPatients.map((patient) => (
                            <Button 
                              key={patient.id}
                              variant={selectedPatient === patient.id ? "default" : "outline"}
                              className="justify-start"
                              onClick={() => setSelectedPatient(patient.id)}
                            >
                              <span className={`mr-2 h-2 w-2 rounded-full ${
                                patient.status === 'critical' ? 'bg-red-500' :
                                patient.status === 'serious' ? 'bg-orange-500' : 'bg-green-500'
                              }`} />
                              {patient.name}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="my-4">
                          <VitalsChart 
                            patientId={selectedPatient} 
                            locale={locale}
                          />
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>
                                {locale === 'en' ? 'Vital Sign' : 'العلامة الحيوية'}
                              </TableHead>
                              <TableHead className="text-right">
                                {locale === 'en' ? 'Current Value' : 'القيمة الحالية'}
                              </TableHead>
                              <TableHead className="text-right">
                                {locale === 'en' ? 'Normal Range' : 'المعدل الطبيعي'}
                              </TableHead>
                              <TableHead className="text-right">
                                {locale === 'en' ? 'Status' : 'الحالة'}
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {monitoringData.icuPatients
                              .find(p => p.id === selectedPatient)
                              ?.vitals.map((vital) => (
                                <TableRow key={vital.name}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center">
                                      {vital.name === 'Heart Rate' ? (
                                        <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                                      ) : vital.name === 'Temperature' ? (
                                        <ThermometerSnowflake className="mr-2 h-4 w-4 text-muted-foreground" />
                                      ) : (
                                        <Droplets className="mr-2 h-4 w-4 text-muted-foreground" />
                                      )}
                                      {locale === 'en' ? vital.name : 
                                        vital.name === 'Heart Rate' ? 'معدل ضربات القلب' : 
                                        vital.name === 'Temperature' ? 'درجة الحرارة' : 'الأكسجين'
                                      }
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {vital.value}
                                    <span className="ml-1 text-xs text-muted-foreground">{vital.unit}</span>
                                  </TableCell>
                                  <TableCell className="text-right text-muted-foreground">
                                    {vital.normalRange}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Badge className={
                                      vital.status === 'normal' ? 'bg-green-500' : 
                                      vital.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                    }>
                                      {locale === 'en' ? 
                                        vital.status.charAt(0).toUpperCase() + vital.status.slice(1) : 
                                        vital.status === 'normal' ? 'طبيعي' : 
                                        vital.status === 'warning' ? 'تحذير' : 'خطر'
                                      }
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="er">
                      <div>
                        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                          {monitoringData.erPatients.map((patient) => (
                            <Button 
                              key={patient.id}
                              variant="outline"
                              className="justify-start"
                            >
                              <span className={`mr-2 h-2 w-2 rounded-full ${
                                patient.status === 'critical' ? 'bg-red-500' :
                                patient.status === 'serious' ? 'bg-orange-500' : 'bg-green-500'
                              }`} />
                              {patient.name}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                          {locale === 'en' 
                            ? 'Select a patient to view vitals monitoring' 
                            : 'اختر مريضًا لعرض مراقبة العلامات الحيوية'}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Bed Occupancy Heatmap */}
              <Card className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {locale === 'en' ? 'Bed Occupancy Heatmap' : 'خريطة حرارية لإشغال الأسرة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BedOccupancyHeatmap locale={locale} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Monitoring;
