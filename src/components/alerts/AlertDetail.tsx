
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { Alert, AlertPriorityType } from '@/pages/Alerts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Calendar, 
  Check, 
  UserRound, 
  Activity, 
  Bell 
} from 'lucide-react';

interface AlertDetailProps {
  alert: Alert;
  onClose: () => void;
  locale: 'en' | 'ar';
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onClose, locale }) => {
  // Get alert icon based on priority
  const getAlertIcon = (priority: AlertPriorityType, size = 20) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle size={size} className="text-status-error" />;
      case 'warning':
        return <AlertTriangle size={size} className="text-status-warning" />;
      case 'info':
        return <Info size={size} className="text-status-info" />;
    }
  };
  
  // Get category icon
  const getCategoryIcon = () => {
    switch (alert.category) {
      case 'patient':
        return <UserRound size={18} />;
      case 'system':
        return <Activity size={18} />;
      case 'device':
        return <Bell size={18} />;
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'ar-SA', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-500">
          {locale === 'en' ? 'Active' : 'نشط'}
        </Badge>;
      case 'acknowledged':
        return <Badge className="bg-yellow-500">
          {locale === 'en' ? 'Acknowledged' : 'تم التأكيد'}
        </Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">
          {locale === 'en' ? 'Resolved' : 'تم الحل'}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Translate category
  const translateCategory = (category: string) => {
    switch (category) {
      case 'patient':
        return locale === 'en' ? 'Patient' : 'مريض';
      case 'system':
        return locale === 'en' ? 'System' : 'نظام';
      case 'device':
        return locale === 'en' ? 'Device' : 'جهاز';
      default:
        return category;
    }
  };
  
  // Translate priority
  const translatePriority = (priority: string) => {
    switch (priority) {
      case 'critical':
        return locale === 'en' ? 'Critical' : 'حرجة';
      case 'warning':
        return locale === 'en' ? 'Warning' : 'تحذير';
      case 'info':
        return locale === 'en' ? 'Information' : 'معلومة';
      default:
        return priority;
    }
  };

  return (
    <Sheet open={!!alert} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              {getAlertIcon(alert.priority)}
              {translatePriority(alert.priority)} {locale === 'en' ? 'Alert' : 'تنبيه'}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(alert.timestamp)}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-2">
          {/* Alert Message */}
          <div>
            <h3 className="font-semibold mb-1">
              {locale === 'en' ? 'Message' : 'الرسالة'}
            </h3>
            <p className="text-base">{alert.message}</p>
          </div>
          
          {/* Alert Details */}
          {alert.details && (
            <div>
              <h3 className="font-semibold mb-1">
                {locale === 'en' ? 'Details' : 'التفاصيل'}
              </h3>
              <p className="text-sm text-muted-foreground">{alert.details}</p>
            </div>
          )}
          
          {/* Alert Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {locale === 'en' ? 'Category' : 'الفئة'}
              </h3>
              <div className="flex items-center gap-2">
                {getCategoryIcon()}
                <span>{translateCategory(alert.category)}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {locale === 'en' ? 'Status' : 'الحالة'}
              </h3>
              {getStatusBadge(alert.status)}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {locale === 'en' ? 'Affected Entity' : 'الكيان المتأثر'}
              </h3>
              <p className="font-medium">{alert.affectedEntity}</p>
            </div>
            
            {alert.assignedTo && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {locale === 'en' ? 'Assigned To' : 'معيّن إلى'}
                </h3>
                <p className="font-medium">{alert.assignedTo}</p>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {alert.status === 'active' && (
              <Button className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                {locale === 'en' ? 'Acknowledge' : 'تأكيد'}
              </Button>
            )}
            
            {alert.status !== 'resolved' && (
              <Button variant={alert.status === 'active' ? "outline" : "default"} className="flex-1">
                {locale === 'en' ? 'Resolve' : 'حل'}
              </Button>
            )}
            
            <Button variant="outline" className="flex-1" onClick={onClose}>
              {locale === 'en' ? 'Close' : 'إغلاق'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AlertDetail;
