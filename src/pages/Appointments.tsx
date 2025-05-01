
import React, { useState } from 'react';
import { format, startOfWeek, addDays, parseISO, isToday, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  Clock,
  Download,
  Filter,
  Plus,
  Search 
} from 'lucide-react';
import AppointmentModal from '@/components/appointments/AppointmentModal';
import { appointmentData } from '@/data/appointmentData';
import AppointmentCalendarView from '@/components/appointments/AppointmentCalendarView';
import AppointmentStats from '@/components/appointments/AppointmentStats';

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';
export type AppointmentType = 'consultation' | 'follow-up' | 'emergency' | 'procedure';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  department: string;
  date: string; // ISO date string
  time: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
}

const Appointments = () => {
  const { locale, direction } = useLocale();
  const [view, setView] = useState<'table' | 'calendar'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Appointments' : 'المواعيد';

  // Filter appointments
  const filteredAppointments = appointmentData.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || appointment.department === departmentFilter;
    
    // If selectedDate is set, only show appointments on that day
    const matchesDate = selectedDate 
      ? isSameDay(parseISO(appointment.date), selectedDate)
      : true;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  // Get unique departments for filter
  const departments = ['all', ...new Set(appointmentData.map(appt => appt.department))];

  // Open appointment detail modal
  const openAppointmentDetail = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Function to get status badge color
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500">
          {locale === 'en' ? 'Scheduled' : 'مجدول'}
        </Badge>;
      case 'completed':
        return <Badge className="bg-green-500">
          {locale === 'en' ? 'Completed' : 'مكتمل'}
        </Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">
          {locale === 'en' ? 'Cancelled' : 'ملغي'}
        </Badge>;
      case 'no-show':
        return <Badge className="bg-yellow-500">
          {locale === 'en' ? 'No Show' : 'لم يحضر'}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Count appointments for today
  const todayAppointments = appointmentData.filter(
    appt => isToday(parseISO(appt.date))
  );

  // Count no-shows
  const noShows = appointmentData.filter(
    appt => appt.status === 'no-show'
  ).length;

  // Function to get appointment type badge
  const getTypeBadge = (type: AppointmentType) => {
    switch (type) {
      case 'consultation':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">
          {locale === 'en' ? 'Consultation' : 'استشارة'}
        </Badge>;
      case 'follow-up':
        return <Badge variant="outline" className="border-green-500 text-green-700">
          {locale === 'en' ? 'Follow-up' : 'متابعة'}
        </Badge>;
      case 'emergency':
        return <Badge variant="outline" className="border-red-500 text-red-700">
          {locale === 'en' ? 'Emergency' : 'طوارئ'}
        </Badge>;
      case 'procedure':
        return <Badge variant="outline" className="border-purple-500 text-purple-700">
          {locale === 'en' ? 'Procedure' : 'إجراء'}
        </Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" dir={direction}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={pageTitle}
          user={user}
          unreadNotifications={3}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats Cards */}
            <AppointmentStats locale={locale} />
            
            {/* Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'en' ? "Search appointments..." : "البحث عن المواعيد..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={16} className="mr-1" />
                  {locale === 'en' ? 'New Appointment' : 'موعد جديد'}
                </Button>
                
                <TabsList>
                  <TabsTrigger 
                    value="calendar" 
                    onClick={() => setView('calendar')}
                    className={view === 'calendar' ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <CalendarIcon size={16} className="mr-1" />
                    {locale === 'en' ? 'Calendar' : 'التقويم'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="table" 
                    onClick={() => setView('table')}
                    className={view === 'table' ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Clock size={16} className="mr-1" />
                    {locale === 'en' ? 'List' : 'القائمة'}
                  </TabsTrigger>
                </TabsList>
                
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
                >
                  <option value="all">{locale === 'en' ? 'All Status' : 'كل الحالات'}</option>
                  <option value="scheduled">{locale === 'en' ? 'Scheduled' : 'مجدول'}</option>
                  <option value="completed">{locale === 'en' ? 'Completed' : 'مكتمل'}</option>
                  <option value="cancelled">{locale === 'en' ? 'Cancelled' : 'ملغي'}</option>
                  <option value="no-show">{locale === 'en' ? 'No Show' : 'لم يحضر'}</option>
                </select>
                
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept === 'all' 
                        ? (locale === 'en' ? 'All Departments' : 'كل الأقسام')
                        : dept
                      }
                    </option>
                  ))}
                </select>
                
                <Button variant="outline" size="icon" title={locale === 'en' ? 'Export' : 'تصدير'}>
                  <Download size={16} />
                </Button>
              </div>
            </div>
            
            {view === 'calendar' ? (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>
                    {locale === 'en' ? 'Appointment Calendar' : 'تقويم المواعيد'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AppointmentCalendarView 
                    appointments={filteredAppointments} 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate}
                    onAppointmentClick={openAppointmentDetail}
                    locale={locale}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>
                    {locale === 'en' ? 'Appointment List' : 'قائمة المواعيد'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          {locale === 'en' ? 'ID' : 'المعرف'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Patient' : 'المريض'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Doctor' : 'الطبيب'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Department' : 'القسم'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Date & Time' : 'التاريخ والوقت'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Type' : 'النوع'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Status' : 'الحالة'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <TableRow 
                            key={appointment.id} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => openAppointmentDetail(appointment)}
                          >
                            <TableCell className="font-medium">#{appointment.id}</TableCell>
                            <TableCell>{appointment.patientName}</TableCell>
                            <TableCell>{appointment.doctorName}</TableCell>
                            <TableCell>{appointment.department}</TableCell>
                            <TableCell>
                              <div>
                                {format(parseISO(appointment.date), locale === 'en' ? 'MMM d, yyyy' : 'yyyy/MM/dd')}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.time}
                              </div>
                            </TableCell>
                            <TableCell>
                              {getTypeBadge(appointment.type)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(appointment.status)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            {locale === 'en' 
                              ? 'No appointments found' 
                              : 'لم يتم العثور على مواعيد'
                            }
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
      
      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        appointment={selectedAppointment}
        locale={locale}
      />
    </div>
  );
};

export default Appointments;
