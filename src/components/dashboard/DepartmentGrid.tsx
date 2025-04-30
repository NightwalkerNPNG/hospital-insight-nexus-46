
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Department {
  id: string;
  name: string;
  status: 'normal' | 'busy' | 'critical';
  waitTime: number;
  activeStaff: number;
  totalPatients: number;
}

interface DepartmentGridProps {
  departments: Department[];
}

const DepartmentGrid = ({ departments }: DepartmentGridProps) => {
  const getStatusColor = (status: Department['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-status-success text-white';
      case 'busy':
        return 'bg-status-warning text-white';
      case 'critical':
        return 'bg-status-error text-white';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {departments.map((dept) => (
        <Card key={dept.id} className="dashboard-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md font-medium">{dept.name}</CardTitle>
              <Badge className={getStatusColor(dept.status)}>
                {dept.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Wait Time</p>
                <p className="font-medium">{dept.waitTime} min</p>
              </div>
              <div>
                <p className="text-muted-foreground">Staff On Duty</p>
                <p className="font-medium">{dept.activeStaff}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Patients</p>
                <p className="font-medium">{dept.totalPatients}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <div className="flex items-center">
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${
                      dept.status === 'normal'
                        ? 'bg-status-success'
                        : dept.status === 'busy'
                        ? 'bg-status-warning'
                        : 'bg-status-error'
                    }`}
                  />
                  <span className="capitalize">{dept.status}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentGrid;
