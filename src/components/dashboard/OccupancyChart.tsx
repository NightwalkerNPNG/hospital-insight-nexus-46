import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from '@/hooks/useLocale';

interface Department {
  id: string;
  name: string;
  occupiedBeds: number;
  totalBeds: number;
  trend?: number;
}

interface OccupancyChartProps {
  departments: Department[];
}

const OccupancyChart = ({ departments }: OccupancyChartProps) => {
  const { locale } = useLocale();

  // Department name translations
  const getDepartmentName = (name: string): string => {
    if (locale === 'en') return name;
    
    const translations: Record<string, string> = {
      'Emergency Room': 'غرفة الطوارئ',
      'ICU': 'العناية المركزة',
      'General Ward': 'الجناح العام',
      'Pediatrics': 'طب الأطفال',
      'Maternity': 'الولادة',
      'Cardiology': 'أمراض القلب',
      'Surgery': 'الجراحة'
    };
    
    return translations[name] || name;
  };

  // Other text translations
  const bedsText = locale === 'en' ? 'beds' : 'سرير';
  const fromYesterdayText = locale === 'en' ? 'from yesterday' : 'من الأمس';
  const chartTitle = locale === 'en' ? 'Bed Occupancy by Department' : 'إشغال الأسرّة حسب القسم';

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => {
            const occupancyRate = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);
            const translatedName = getDepartmentName(dept.name);
            
            return (
              <div key={dept.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{translatedName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {dept.occupiedBeds}/{dept.totalBeds} {bedsText}
                    </span>
                    <span 
                      className="text-xs font-medium"
                      style={{ 
                        color: occupancyRate > 90 
                          ? 'var(--status-error)' 
                          : occupancyRate > 75 
                            ? 'var(--status-warning)' 
                            : 'var(--status-success)' 
                      }}
                    >
                      {occupancyRate}%
                    </span>
                  </div>
                </div>
                
                <Progress 
                  value={occupancyRate} 
                  max={100}
                  className="h-2 w-full"
                  style={{ 
                    backgroundColor: 'var(--muted)',
                    '--progress-color': occupancyRate > 90 
                      ? 'var(--destructive)' 
                      : occupancyRate > 75 
                        ? 'var(--status-warning)' 
                        : 'var(--status-success)' 
                  } as React.CSSProperties}
                />
                
                {dept.trend !== undefined && (
                  <div className={`flex items-center ${locale === 'ar' ? 'justify-end' : ''}`}>
                    <span className={`text-xs font-medium ${dept.trend > 0 ? 'text-status-error' : 'text-status-success'}`}>
                      {dept.trend > 0 ? '↑' : '↓'} {Math.abs(dept.trend)}%
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      {fromYesterdayText}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
