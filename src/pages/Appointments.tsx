
import React, { useState } from 'react';
import { format, startOfToday } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Grid, Plus } from 'lucide-react';
import MainLayout from "@/layouts/MainLayout";
import AppointmentCalendarView from '@/components/appointments/AppointmentCalendarView';
import AppointmentModal from '@/components/appointments/AppointmentModal';
import AppointmentStats from '@/components/appointments/AppointmentStats';
import { useLocale } from '@/hooks/useLocale';
import { appointmentData } from '@/data/appointmentData';
import { Button } from "@/components/ui/button";
import AddPatientButton from '@/components/patients/AddPatientButton';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type AppointmentType = 'consultation' | 'follow-up' | 'procedure' | 'emergency';

const Appointments = () => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<string>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(startOfToday());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);

  // Handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle closing the appointment modal
  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  // Format the page title based on locale
  const pageTitle = locale === 'en' ? 'Appointments' : 'المواعيد';
  const calendarTab = locale === 'en' ? 'Calendar View' : 'عرض التقويم';
  const statsTab = locale === 'en' ? 'Statistics' : 'الإحصائيات';
  const newAppointmentText = locale === 'en' ? 'New Appointment' : 'موعد جديد';
  
  return (
    <MainLayout title={pageTitle}>
      <div className="space-y-4">
        {/* Header actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setIsNewAppointmentModalOpen(true)}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              {newAppointmentText}
            </Button>
            <AddPatientButton locale={locale} />
          </div>
        </div>
      
        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar size={16} />
              {calendarTab}
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Grid size={16} />
              {statsTab}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-6">
            <AppointmentCalendarView
              appointments={appointmentData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onAppointmentClick={handleAppointmentClick}
              locale={locale}
            />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <AppointmentStats locale={locale} />
          </TabsContent>
        </Tabs>

        {/* Appointment Detail Modal */}
        <AppointmentModal
          isOpen={!!selectedAppointment}
          onClose={handleCloseModal}
          appointment={selectedAppointment}
          locale={locale}
        />

        {/* New Appointment Modal */}
        <AppointmentModal
          isOpen={isNewAppointmentModalOpen}
          onClose={() => setIsNewAppointmentModalOpen(false)}
          appointment={{
            id: '',
            patientName: '',
            patientId: '',
            doctorName: '',
            doctorId: '',
            department: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            time: '09:00',
            duration: 30,
            status: 'scheduled',
            type: 'consultation'
          }}
          locale={locale}
        />
      </div>
    </MainLayout>
  );
};

export default Appointments;
