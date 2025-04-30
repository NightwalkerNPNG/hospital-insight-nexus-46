
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

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
  const isDark = theme === 'dark';
  
  const axisTextColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Patient Flow Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: axisTextColor }}
                axisLine={{ stroke: gridColor }} 
              />
              <YAxis 
                tick={{ fill: axisTextColor }}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  borderColor: gridColor,
                  borderRadius: '8px',
                  color: isDark ? '#fff' : '#000'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="admissions" 
                stackId="1" 
                stroke="#0284c7" 
                fill="#0284c7" 
                fillOpacity={0.6}
                name="Admissions"
              />
              <Area 
                type="monotone" 
                dataKey="discharges" 
                stackId="1" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="Discharges"
              />
              <Area 
                type="monotone" 
                dataKey="transfers" 
                stackId="1" 
                stroke="#7dd3fc" 
                fill="#7dd3fc"
                fillOpacity={0.6} 
                name="Transfers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientFlowChart;
