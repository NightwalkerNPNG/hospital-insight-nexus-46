
import React from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface AppointmentStatsProps {
  locale: 'en' | 'ar';
}

const AppointmentStats = ({ locale }: AppointmentStatsProps) => {
  // Sample weekly appointment data
  const weeklyData = [
    { name: locale === 'en' ? 'Mon' : 'الإثنين', appointments: 32 },
    { name: locale === 'en' ? 'Tue' : 'الثلاثاء', appointments: 40 },
    { name: locale === 'en' ? 'Wed' : 'الأربعاء', appointments: 28 },
    { name: locale === 'en' ? 'Thu' : 'الخميس', appointments: 45 },
    { name: locale === 'en' ? 'Fri' : 'الجمعة', appointments: 23 },
    { name: locale === 'en' ? 'Sat' : 'السبت', appointments: 15 },
    { name: locale === 'en' ? 'Sun' : 'الأحد', appointments: 18 },
  ];

  // Department distribution data
  const departmentData = [
    { name: locale === 'en' ? 'Cardiology' : 'قلب', appointments: 65 },
    { name: locale === 'en' ? 'Pediatrics' : 'أطفال', appointments: 45 },
    { name: locale === 'en' ? 'Orthopedic' : 'عظام', appointments: 35 },
    { name: locale === 'en' ? 'Neurology' : 'أعصاب', appointments: 28 },
    { name: locale === 'en' ? 'General' : 'عام', appointments: 52 },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-primary/10 rounded-full p-2 mr-3">
              <Calendar size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Today\'s Appointments' : 'المواعيد اليوم'}
              </p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-yellow-500/10 rounded-full p-2 mr-3">
              <AlertCircle size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'No-Shows' : 'المتغيبون'}
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-500/10 rounded-full p-2 mr-3">
              <Clock size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Avg. Wait Time' : 'متوسط وقت الانتظار'}
              </p>
              <p className="text-2xl font-bold">18 {locale === 'en' ? 'min' : 'دقيقة'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-500/10 rounded-full p-2 mr-3">
              <Users size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Total Patients' : 'إجمالي المرضى'}
              </p>
              <p className="text-2xl font-bold">148</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {locale === 'en' ? 'Weekly Appointment Trends' : 'اتجاهات المواعيد الأسبوعية'}
          </h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="appointments"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  name={locale === 'en' ? 'Appointments' : 'المواعيد'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {locale === 'en' ? 'Appointments by Department' : 'المواعيد حسب القسم'}
          </h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <XAxis 
                  type="number" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar
                  dataKey="appointments"
                  fill="var(--primary)"
                  radius={[0, 4, 4, 0]}
                  name={locale === 'en' ? 'Appointments' : 'المواعيد'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AppointmentStats;
