
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { alertsData } from '@/data/alertsData';

interface AlertPriorityChartProps {
  locale: 'en' | 'ar';
}

const AlertPriorityChart: React.FC<AlertPriorityChartProps> = ({ locale }) => {
  // Count alerts by priority
  const criticalCount = alertsData.filter(alert => alert.priority === 'critical').length;
  const warningCount = alertsData.filter(alert => alert.priority === 'warning').length;
  const infoCount = alertsData.filter(alert => alert.priority === 'info').length;
  
  // Chart data
  const data = [
    { 
      name: locale === 'en' ? 'Critical' : 'حرجة', 
      value: criticalCount,
      color: '#ef4444'
    },
    { 
      name: locale === 'en' ? 'Warning' : 'تحذير', 
      value: warningCount,
      color: '#f59e0b'
    },
    { 
      name: locale === 'en' ? 'Info' : 'معلومة', 
      value: infoCount,
      color: '#3b82f6'
    }
  ];
  
  return (
    <div className="h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, locale === 'en' ? 'Alerts' : 'تنبيهات']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AlertPriorityChart;
