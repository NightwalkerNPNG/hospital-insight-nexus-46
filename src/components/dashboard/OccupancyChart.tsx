
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Bed Occupancy by Department</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => {
            const occupancyRate = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);
            
            return (
              <div key={dept.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {dept.occupiedBeds}/{dept.totalBeds} beds
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
                  <div className="flex items-center">
                    <span className={`text-xs font-medium ${dept.trend > 0 ? 'text-status-error' : 'text-status-success'}`}>
                      {dept.trend > 0 ? '↑' : '↓'} {Math.abs(dept.trend)}%
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">from yesterday</span>
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
