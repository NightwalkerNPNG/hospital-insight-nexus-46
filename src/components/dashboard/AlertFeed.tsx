
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertCircle, AlertTriangle } from 'lucide-react';

export type AlertPriority = 'critical' | 'warning' | 'info';

interface Alert {
  id: string;
  message: string;
  priority: AlertPriority;
  timestamp: Date;
  department: string; // This is required as it's used in the component
}

interface AlertFeedProps {
  alerts: Alert[];
}

const AlertFeed = ({ alerts }: AlertFeedProps) => {
  const getAlertIcon = (priority: AlertPriority) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-status-error" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-status-warning" />;
      case 'info':
        return <Bell className="h-5 w-5 text-status-info" />;
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAlertClass = (priority: AlertPriority) => {
    switch (priority) {
      case 'critical':
        return 'alert-critical';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Critical Alerts</CardTitle>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-status-error text-xs font-medium text-white">
            {alerts.filter(a => a.priority === 'critical').length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`alert-item ${getAlertClass(alert.priority)}`}
              >
                <div className="mt-0.5">{getAlertIcon(alert.priority)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{alert.department}</h5>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/60" />
              <p className="mt-2 text-sm text-muted-foreground">No alerts at the moment</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertFeed;
