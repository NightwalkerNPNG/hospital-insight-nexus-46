
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AppointmentStatsProps {
  locale: 'en' | 'ar';
}

const AppointmentStats: React.FC<AppointmentStatsProps> = ({ locale }) => {
  // Sample data for appointment statistics
  const appointmentTypeData = [
    { name: locale === 'en' ? 'Consultation' : 'استشارة', value: 65 },
    { name: locale === 'en' ? 'Follow-up' : 'متابعة', value: 48 },
    { name: locale === 'en' ? 'Procedure' : 'إجراء', value: 32 },
    { name: locale === 'en' ? 'Emergency' : 'طوارئ', value: 15 },
  ];

  const appointmentStatusData = [
    { name: locale === 'en' ? 'Scheduled' : 'مجدول', value: 85 },
    { name: locale === 'en' ? 'Completed' : 'مكتمل', value: 62 },
    { name: locale === 'en' ? 'Cancelled' : 'ملغي', value: 12 },
    { name: locale === 'en' ? 'No-show' : 'لم يحضر', value: 8 },
  ];

  // Custom colors for bars
  const typeColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316'];
  const statusColors = ['#3b82f6', '#10b981', '#f43f5e', '#f59e0b'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'en' ? 'Appointments by Type' : 'المواعيد حسب النوع'}
          </CardTitle>
          <CardDescription>
            {locale === 'en' 
              ? 'Distribution of appointment types in the last 30 days' 
              : 'توزيع أنواع المواعيد في آخر 30 يوم'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name={locale === 'en' ? 'Count' : 'العدد'}
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'en' ? 'Appointments by Status' : 'المواعيد حسب الحالة'}
          </CardTitle>
          <CardDescription>
            {locale === 'en' 
              ? 'Current status of all appointments' 
              : 'الحالة الحالية لجميع المواعيد'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name={locale === 'en' ? 'Count' : 'العدد'} 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentStats;
