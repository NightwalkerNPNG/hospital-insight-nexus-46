
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment, AppointmentStatus } from '@/pages/Appointments';
import { format, parseISO } from 'date-fns';
import { AlertCircle, Calendar, Clock, FileText, User } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  locale: 'en' | 'ar';
}

const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  locale 
}: AppointmentModalProps) => {
  const [status, setStatus] = useState<AppointmentStatus | ''>('');

  // Reset status when modal opens with new appointment
  React.useEffect(() => {
    if (appointment) {
      setStatus(appointment.status);
    } else {
      setStatus('');
    }
  }, [appointment]);

  if (!appointment) {
    return null;
  }

  const isNewAppointment = !appointment.id;
  const title = isNewAppointment
    ? locale === 'en' ? 'New Appointment' : 'موعد جديد'
    : locale === 'en' ? 'Appointment Details' : 'تفاصيل الموعد';

  const getStatusClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500 hover:bg-blue-600';
      case 'completed': return 'bg-green-500 hover:bg-green-600';
      case 'cancelled': return 'bg-red-500 hover:bg-red-600';
      case 'no-show': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {locale === 'en' 
              ? 'View and manage appointment details.' 
              : 'عرض وإدارة تفاصيل الموعد.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Patient and Doctor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center">
                <User size={16} className="mr-2" />
                {locale === 'en' ? 'Patient' : 'المريض'}
              </h4>
              <p className="text-lg font-medium">{appointment.patientName}</p>
              <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center">
                <User size={16} className="mr-2" />
                {locale === 'en' ? 'Doctor' : 'الطبيب'}
              </h4>
              <p className="text-lg font-medium">{appointment.doctorName}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.department}
              </p>
            </div>
          </div>

          {/* Date, Time and Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center">
                <Calendar size={16} className="mr-2" />
                {locale === 'en' ? 'Date' : 'التاريخ'}
              </h4>
              <p>{format(parseISO(appointment.date), locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd')}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center">
                <Clock size={16} className="mr-2" />
                {locale === 'en' ? 'Time' : 'الوقت'}
              </h4>
              <p>{appointment.time} ({appointment.duration} {locale === 'en' ? 'min' : 'دقيقة'})</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">
                {locale === 'en' ? 'Type' : 'النوع'}
              </h4>
              <Badge variant="outline" className="capitalize">
                {locale === 'en' ? appointment.type : 
                  appointment.type === 'consultation' ? 'استشارة' :
                  appointment.type === 'follow-up' ? 'متابعة' :
                  appointment.type === 'emergency' ? 'طوارئ' : 'إجراء'
                }
              </Badge>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center">
                <FileText size={16} className="mr-2" />
                {locale === 'en' ? 'Notes' : 'ملاحظات'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {appointment.notes}
              </p>
            </div>
          )}

          {/* Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center">
              <AlertCircle size={16} className="mr-2" />
              {locale === 'en' ? 'Status' : 'الحالة'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(['scheduled', 'completed', 'cancelled', 'no-show'] as AppointmentStatus[]).map((s) => (
                <Badge 
                  key={s}
                  className={`cursor-pointer ${status === s ? getStatusClass(s) : 'bg-muted'}`} 
                  onClick={() => setStatus(s)}
                >
                  {locale === 'en'
                    ? s.charAt(0).toUpperCase() + s.slice(1)
                    : s === 'scheduled' ? 'مجدول' :
                      s === 'completed' ? 'مكتمل' :
                      s === 'cancelled' ? 'ملغي' : 'لم يحضر'
                  }
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="destructive">
            {locale === 'en' ? 'Cancel Appointment' : 'إلغاء الموعد'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            {locale === 'en' ? 'Close' : 'إغلاق'}
          </Button>
          <Button>
            {locale === 'en' ? 'Update' : 'تحديث'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
