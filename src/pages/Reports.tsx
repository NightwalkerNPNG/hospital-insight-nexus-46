
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download, ChartBar, ChartLine } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  const { locale, direction } = useLocale();
  const [reportType, setReportType] = useState("daily");
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Reports & Analytics' : 'التقارير والتحليلات';
  
  // Sample report data
  const admissionData = [
    { name: locale === 'en' ? 'Mon' : 'الإثنين', value: 65 },
    { name: locale === 'en' ? 'Tue' : 'الثلاثاء', value: 59 },
    { name: locale === 'en' ? 'Wed' : 'الأربعاء', value: 80 },
    { name: locale === 'en' ? 'Thu' : 'الخميس', value: 81 },
    { name: locale === 'en' ? 'Fri' : 'الجمعة', value: 56 },
    { name: locale === 'en' ? 'Sat' : 'السبت', value: 55 },
    { name: locale === 'en' ? 'Sun' : 'الأحد', value: 72 },
  ];

  const departmentData = [
    { 
      name: locale === 'en' ? 'ER' : 'الطوارئ', 
      capacity: 85, 
      staff: 22, 
      patients: 68 
    },
    { 
      name: locale === 'en' ? 'ICU' : 'العناية المركزة', 
      capacity: 50, 
      staff: 35, 
      patients: 42 
    },
    { 
      name: locale === 'en' ? 'Cardiology' : 'أمراض القلب', 
      capacity: 70, 
      staff: 18, 
      patients: 56 
    },
    { 
      name: locale === 'en' ? 'Neurology' : 'طب الأعصاب', 
      capacity: 60, 
      staff: 15, 
      patients: 38 
    },
    { 
      name: locale === 'en' ? 'Pediatrics' : 'طب الأطفال', 
      capacity: 75, 
      staff: 25, 
      patients: 52 
    },
  ];
  
  const doctorConsultationData = [
    { 
      name: locale === 'en' ? 'Dr. James Wilson' : 'د. علي محمود', 
      consultations: 28 
    },
    { 
      name: locale === 'en' ? 'Dr. Maria Garcia' : 'د. نور حسين', 
      consultations: 23 
    },
    { 
      name: locale === 'en' ? 'Dr. Robert Chen' : 'د. خالد عبدالله', 
      consultations: 31 
    },
    { 
      name: locale === 'en' ? 'Dr. Emily Johnson' : 'د. سارة أحمد', 
      consultations: 19 
    },
    { 
      name: locale === 'en' ? 'Dr. David Kim' : 'د. محمد سالم', 
      consultations: 26 
    },
  ];
  
  const staffShiftData = [
    { 
      day: locale === 'en' ? 'Monday' : 'الإثنين',
      morning: 45,
      afternoon: 38,
      night: 25
    },
    { 
      day: locale === 'en' ? 'Tuesday' : 'الثلاثاء',
      morning: 42,
      afternoon: 36,
      night: 28
    },
    { 
      day: locale === 'en' ? 'Wednesday' : 'الأربعاء',
      morning: 48,
      afternoon: 40,
      night: 27
    },
    { 
      day: locale === 'en' ? 'Thursday' : 'الخميس',
      morning: 44,
      afternoon: 39,
      night: 26
    },
    { 
      day: locale === 'en' ? 'Friday' : 'الجمعة',
      morning: 35,
      afternoon: 32,
      night: 30
    },
    { 
      day: locale === 'en' ? 'Saturday' : 'السبت',
      morning: 28,
      afternoon: 29,
      night: 24
    },
    { 
      day: locale === 'en' ? 'Sunday' : 'الأحد',
      morning: 30,
      afternoon: 28,
      night: 22
    },
  ];
  
  // Handle report export
  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // In a real application, this would generate and download the report
    alert(locale === 'en' 
      ? `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report exported as ${format}` 
      : `تم تصدير تقرير ${reportType === 'daily' ? 'يومي' : reportType === 'weekly' ? 'أسبوعي' : 'شهري'} بتنسيق ${format}`
    );
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
            {/* Report Type Selector */}
            <Tabs defaultValue="daily" value={reportType} onValueChange={setReportType}>
              <TabsList className="mb-4 grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="daily">
                  {locale === 'en' ? 'Daily Report' : 'تقرير يومي'}
                </TabsTrigger>
                <TabsTrigger value="weekly">
                  {locale === 'en' ? 'Weekly Report' : 'تقرير أسبوعي'}
                </TabsTrigger>
                <TabsTrigger value="monthly">
                  {locale === 'en' ? 'Monthly Report' : 'تقرير شهري'}
                </TabsTrigger>
              </TabsList>
              
              {/* Report Content */}
              <TabsContent value="daily" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {locale === 'en' ? 'Daily Hospital Report' : 'التقرير اليومي للمستشفى'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('PDF')}>
                      <FileText className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export PDF' : 'تصدير PDF'}
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('Excel')}>
                      <Download className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export Excel' : 'تصدير Excel'}
                    </Button>
                  </div>
                </div>
                
               {/* Patient Admissions Chart */}
<Card>
  <CardHeader>
    <CardTitle>
      {locale === 'en' ? 'Patient Admissions (Last 7 Days)' : 'دخول المرضى (آخر 7 أيام)'}
    </CardTitle>
    <CardDescription>
      {locale === 'en' 
        ? 'Daily patient admission count across all departments' 
        : 'عدد دخول المرضى اليومي عبر جميع الأقسام'}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={admissionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937',  // Tailwind gray-800
              color: '#f9fafb',            // Tailwind gray-100
              border: '1px solid #4b5563', // Tailwind gray-600
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
            labelStyle={{ 
              color: '#d1d5db'             // Tailwind gray-300
            }}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="var(--primary)" 
            name={locale === 'en' ? 'Admissions' : 'حالات الدخول'} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>

{/* Department Capacities */}
<Card>
  <CardHeader>
    <CardTitle>
      {locale === 'en' ? 'Department Capacity Usage' : 'استخدام سعة الأقسام'}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
            labelStyle={{ 
              color: '#d1d5db'
            }}
          />
          <Legend />
          <Bar 
            dataKey="patients" 
            fill="var(--primary)" 
            name={locale === 'en' ? 'Current Patients' : 'المرضى الحاليين'} 
          />
          <Bar 
            dataKey="capacity" 
            fill="#8884d8" 
            name={locale === 'en' ? 'Total Capacity' : 'السعة الإجمالية'} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>

                
                {/* Doctor Consultations */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'en' ? 'Top Doctor Consultations' : 'أعلى استشارات الأطباء'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            {locale === 'en' ? 'Doctor Name' : 'اسم الطبيب'}
                          </TableHead>
                          <TableHead className="text-right">
                            {locale === 'en' ? 'Consultations' : 'استشارات'}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {doctorConsultationData.map((doctor, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{doctor.name}</TableCell>
                            <TableCell className="text-right">{doctor.consultations}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {locale === 'en' ? 'Weekly Hospital Report' : 'التقرير الأسبوعي للمستشفى'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('PDF')}>
                      <FileText className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export PDF' : 'تصدير PDF'}
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('Excel')}>
                      <Download className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export Excel' : 'تصدير Excel'}
                    </Button>
                  </div>
                </div>
                
                {/* Staff Shifts */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'en' ? 'Staff Shifts (Weekly)' : 'مناوبات الموظفين (أسبوعية)'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={staffShiftData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="morning" 
                            stroke="#8884d8" 
                            name={locale === 'en' ? 'Morning Shift' : 'المناوبة الصباحية'} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="afternoon" 
                            stroke="#82ca9d" 
                            name={locale === 'en' ? 'Afternoon Shift' : 'المناوبة المسائية'} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="night" 
                            stroke="#ffc658" 
                            name={locale === 'en' ? 'Night Shift' : 'المناوبة الليلية'} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Department capacities table for weekly */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'en' ? 'Department Overview' : 'نظرة عامة على الأقسام'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                          <TableHead className="text-right">{locale === 'en' ? 'Capacity' : 'السعة'}</TableHead>
                          <TableHead className="text-right">{locale === 'en' ? 'Staff' : 'الموظفين'}</TableHead>
                          <TableHead className="text-right">{locale === 'en' ? 'Patients' : 'المرضى'}</TableHead>
                          <TableHead className="text-right">{locale === 'en' ? 'Utilization' : 'الاستخدام'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {departmentData.map((dept, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{dept.name}</TableCell>
                            <TableCell className="text-right">{dept.capacity}</TableCell>
                            <TableCell className="text-right">{dept.staff}</TableCell>
                            <TableCell className="text-right">{dept.patients}</TableCell>
                            <TableCell className="text-right">
                              {Math.round((dept.patients / dept.capacity) * 100)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {locale === 'en' ? 'Monthly Hospital Report' : 'التقرير الشهري للمستشفى'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport('PDF')}>
                      <FileText className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export PDF' : 'تصدير PDF'}
                    </Button>
                    <Button variant="outline" onClick={() => handleExport('Excel')}>
                      <Download className="mr-2 h-4 w-4" />
                      {locale === 'en' ? 'Export Excel' : 'تصدير Excel'}
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'en' ? 'Monthly Summary' : 'الملخص الشهري'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'en' 
                        ? 'Key performance indicators for the current month' 
                        : 'مؤشرات الأداء الرئيسية للشهر الحالي'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">
                            {locale === 'en' ? 'Total Admissions' : 'إجمالي حالات الدخول'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 p-4">
                          <p className="text-3xl font-bold">1,284</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === 'en' ? '+12% from last month' : '+12% عن الشهر الماضي'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">
                            {locale === 'en' ? 'Average Stay' : 'متوسط الإقامة'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 p-4">
                          <p className="text-3xl font-bold">4.2 {locale === 'en' ? 'days' : 'أيام'}</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === 'en' ? '-0.5 days from last month' : '-0.5 يوم عن الشهر الماضي'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">
                            {locale === 'en' ? 'Bed Occupancy' : 'إشغال الأسرة'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 p-4">
                          <p className="text-3xl font-bold">78%</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === 'en' ? '+5% from last month' : '+5% عن الشهر الماضي'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">
                            {locale === 'en' ? 'Patient Satisfaction' : 'رضا المرضى'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 p-4">
                          <p className="text-3xl font-bold">92%</p>
                          <p className="text-sm text-muted-foreground">
                            {locale === 'en' ? '+2% from last month' : '+2% عن الشهر الماضي'}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Yearly comparison chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {locale === 'en' ? 'Year-over-Year Comparison' : 'مقارنة سنوية'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: locale === 'en' ? 'Jan' : 'ينا', current: 65, previous: 41 },
                            { month: locale === 'en' ? 'Feb' : 'فبر', current: 59, previous: 45 },
                            { month: locale === 'en' ? 'Mar' : 'مار', current: 80, previous: 68 },
                            { month: locale === 'en' ? 'Apr' : 'أبر', current: 81, previous: 64 },
                            { month: locale === 'en' ? 'May' : 'ماي', current: 56, previous: 48 },
                            { month: locale === 'en' ? 'Jun' : 'يون', current: 55, previous: 52 },
                            { month: locale === 'en' ? 'Jul' : 'يول', current: 72, previous: 53 },
                            { month: locale === 'en' ? 'Aug' : 'أغس', current: 62, previous: 58 },
                            { month: locale === 'en' ? 'Sep' : 'سبت', current: 74, previous: 62 },
                            { month: locale === 'en' ? 'Oct' : 'أكت', current: 85, previous: 68 },
                            { month: locale === 'en' ? 'Nov' : 'نوف', current: 78, previous: 72 },
                            { month: locale === 'en' ? 'Dec' : 'ديس', current: 92, previous: 76 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            stroke="#8884d8" 
                            name={locale === 'en' ? 'Current Year' : 'العام الحالي'} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="previous" 
                            stroke="#82ca9d" 
                            name={locale === 'en' ? 'Previous Year' : 'العام السابق'} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
