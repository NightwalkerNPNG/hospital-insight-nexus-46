import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface DepartmentChartProps {
  locale: 'en' | 'ar';
}

const DepartmentChart = ({ locale }: DepartmentChartProps) => {
  const bedOccupancyData = [
    {
      name: locale === 'en' ? 'Mon' : 'الإثنين',
      ICU: 90,
      Cardiology: 85,
      Emergency: 70,
      Pediatrics: 60,
      Orthopedics: 75,
      Neurology: 65
    },
    {
      name: locale === 'en' ? 'Tue' : 'الثلاثاء',
      ICU: 95,
      Cardiology: 80,
      Emergency: 75,
      Pediatrics: 65,
      Orthopedics: 70,
      Neurology: 60
    },
    {
      name: locale === 'en' ? 'Wed' : 'الأربعاء',
      ICU: 100,
      Cardiology: 85,
      Emergency: 80,
      Pediatrics: 70,
      Orthopedics: 75,
      Neurology: 70
    },
    {
      name: locale === 'en' ? 'Thu' : 'الخميس',
      ICU: 95,
      Cardiology: 90,
      Emergency: 85,
      Pediatrics: 75,
      Orthopedics: 80,
      Neurology: 75
    },
    {
      name: locale === 'en' ? 'Fri' : 'الجمعة',
      ICU: 90,
      Cardiology: 85,
      Emergency: 75,
      Pediatrics: 65,
      Orthopedics: 70,
      Neurology: 65
    },
    {
      name: locale === 'en' ? 'Sat' : 'السبت',
      ICU: 85,
      Cardiology: 75,
      Emergency: 65,
      Pediatrics: 60,
      Orthopedics: 65,
      Neurology: 60
    },
    {
      name: locale === 'en' ? 'Sun' : 'الأحد',
      ICU: 80,
      Cardiology: 70,
      Emergency: 80,
      Pediatrics: 60,
      Orthopedics: 65,
      Neurology: 60
    },
  ];

  const staffDistributionData = [
    { name: locale === 'en' ? 'ICU' : 'العناية المركزة', value: 45 },
    { name: locale === 'en' ? 'Cardiology' : 'القلب', value: 35 },
    { name: locale === 'en' ? 'Emergency' : 'الطوارئ', value: 40 },
    { name: locale === 'en' ? 'Pediatrics' : 'الأطفال', value: 30 },
    { name: locale === 'en' ? 'Orthopedics' : 'العظام', value: 25 },
    { name: locale === 'en' ? 'Neurology' : 'الأعصاب', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow border text-sm text-black">
          <p className="font-semibold text-gray-900 mb-1">
            {`${locale === 'en' ? 'Day' : 'اليوم'}: ${label}`}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === 'en' ? 'Bed Occupancy Trend (Last 7 Days)' : 'اتجاه إشغال الأسرة (آخر 7 أيام)'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bedOccupancyData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis
                  stroke="#888888" 
                  label={{ 
                    value: locale === 'en' ? 'Occupancy %' : '% الإشغال', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="ICU" fill="#0088FE" name={locale === 'en' ? 'ICU' : 'العناية المركزة'} />
                <Bar dataKey="Cardiology" fill="#00C49F" name={locale === 'en' ? 'Cardiology' : 'القلب'} />
                <Bar dataKey="Emergency" fill="#FFBB28" name={locale === 'en' ? 'Emergency' : 'الطوارئ'} />
                <Bar dataKey="Pediatrics" fill="#FF8042" name={locale === 'en' ? 'Pediatrics' : 'الأطفال'} />
                <Bar dataKey="Orthopedics" fill="#8884D8" name={locale === 'en' ? 'Orthopedics' : 'العظام'} />
                <Bar dataKey="Neurology" fill="#82ca9d" name={locale === 'en' ? 'Neurology' : 'الأعصاب'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {locale === 'en' ? 'Staff Distribution by Department' : 'توزيع الموظفين حسب القسم'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={staffDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {staffDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, locale === 'en' ? 'Staff Count' : 'عدد الموظفين']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DepartmentChart;
