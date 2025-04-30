
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import { useLocale } from '@/hooks/useLocale';

interface PatientFlowData {
  date: string;
  admissions: number;
  discharges: number;
  transfers: number;
}

interface PatientFlowChartProps {
  data: PatientFlowData[];
}

const PatientFlowChart = ({ data }: PatientFlowChartProps) => {
  const { theme } = useTheme();
  const { locale, direction } = useLocale();
  const isDark = theme === 'dark';
  
  const axisTextColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  // Translating data labels
  const translatedData = data.map(item => ({
    ...item,
    date: locale === 'ar' ? translateDay(item.date) : item.date,
  }));

  // Translate day names to Arabic
  function translateDay(day: string): string {
    const translations: Record<string, string> = {
      'Mon': 'الإثنين',
      'Tue': 'الثلاثاء',
      'Wed': 'الأربعاء',
      'Thu': 'الخميس',
      'Fri': 'الجمعة',
      'Sat': 'السبت',
      'Sun': 'الأحد',
    };
    return translations[day] || day;
  }

  // Get translated labels
  const admissionsLabel = locale === 'en' ? 'Admissions' : 'حالات الدخول';
  const dischargesLabel = locale === 'en' ? 'Discharges' : 'حالات الخروج';
  const transfersLabel = locale === 'en' ? 'Transfers' : 'التحويلات';
  const chartTitle = locale === 'en' ? 'Patient Flow Metrics' : 'مقاييس تدفق المرضى';

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={translatedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: axisTextColor }}
                axisLine={{ stroke: gridColor }}
                reversed={locale === 'ar'}
              />
              <YAxis 
                tick={{ fill: axisTextColor }}
                axisLine={{ stroke: gridColor }}
                orientation={locale === 'ar' ? 'right' : 'left'}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  borderColor: gridColor,
                  borderRadius: '8px',
                  color: isDark ? '#fff' : '#000',
                  textAlign: locale === 'ar' ? 'right' : 'left'
                }}
                formatter={(value, name) => {
                  const translatedName = 
                    name === 'admissions' ? admissionsLabel :
                    name === 'discharges' ? dischargesLabel :
                    name === 'transfers' ? transfersLabel : name;
                  return [value, translatedName];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="admissions" 
                stackId="1" 
                stroke="#0284c7" 
                fill="#0284c7" 
                fillOpacity={0.6}
                name="admissions"
              />
              <Area 
                type="monotone" 
                dataKey="discharges" 
                stackId="1" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="discharges"
              />
              <Area 
                type="monotone" 
                dataKey="transfers" 
                stackId="1" 
                stroke="#7dd3fc" 
                fill="#7dd3fc"
                fillOpacity={0.6} 
                name="transfers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientFlowChart;
