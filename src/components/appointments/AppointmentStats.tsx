
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

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

  // Monthly appointment trend data
  const monthlyTrendData = [
    { name: locale === 'en' ? 'Jan' : 'يناير', count: 45 },
    { name: locale === 'en' ? 'Feb' : 'فبراير', count: 52 },
    { name: locale === 'en' ? 'Mar' : 'مارس', count: 49 },
    { name: locale === 'en' ? 'Apr' : 'أبريل', count: 63 },
    { name: locale === 'en' ? 'May' : 'مايو', count: 58 }
  ];

  // Custom colors for charts
  const typeColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316'];
  const statusColors = ['#3b82f6', '#10b981', '#f43f5e', '#f59e0b'];
  const RADIAN = Math.PI / 180;

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <PieChart>
                <Pie
                  data={appointmentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={typeColors[index % typeColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [
                    `${value} ${locale === 'en' ? 'appointments' : 'مواعيد'}`, 
                    locale === 'en' ? 'Count' : 'العدد'
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    padding: '8px'
                  }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
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
              <BarChart data={appointmentStatusData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#6b7280' }} width={80} />
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
                  radius={[0, 4, 4, 0]}
                >
                  {appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {locale === 'en' ? 'Monthly Appointment Trend' : 'اتجاه المواعيد الشهرية'}
          </CardTitle>
          <CardDescription>
            {locale === 'en' 
              ? 'Number of appointments over the past months' 
              : 'عدد المواعيد على مدار الأشهر الماضية'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#1a57d1' }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name={locale === 'en' ? 'Appointments' : 'المواعيد'}
                  fill="#9b87f5" 
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
