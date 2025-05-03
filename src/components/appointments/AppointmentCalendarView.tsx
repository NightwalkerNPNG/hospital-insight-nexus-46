
import React from 'react';
import { format, parseISO, isToday, isSameDay } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Appointment } from "@/pages/Appointments";

interface AppointmentCalendarViewProps {
  appointments: Appointment[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  locale: 'en' | 'ar';
}

const AppointmentCalendarView = ({
  appointments,
  selectedDate,
  setSelectedDate,
  onAppointmentClick,
  locale
}: AppointmentCalendarViewProps) => {
  // Get days with appointments for highlighting on the calendar
  const appointmentDates = React.useMemo(() => {
    const dates: Date[] = [];
    appointments.forEach(appointment => {
      dates.push(parseISO(appointment.date));
    });
    return dates;
  }, [appointments]);

  // Filter appointments for selected date
  const selectedDateAppointments = React.useMemo(() => {
    if (!selectedDate) return [];
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.date), selectedDate)
    ).sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
  }, [appointments, selectedDate]);

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'border-blue-500 bg-blue-50';
      case 'completed': return 'border-green-500 bg-green-50';
      case 'cancelled': return 'border-red-500 bg-red-50';
      case 'no-show': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-300';
    }
  };

  // Get day class for the calendar
  const getDayClass = (date: Date) => {
    const isAppointmentDate = appointmentDates.some(d => isSameDay(d, date));
    if (isAppointmentDate && isToday(date)) {
      return 'bg-blue-100 text-blue-900 font-bold';
    } else if (isAppointmentDate) {
      return 'bg-blue-50 font-medium';
    } else if (isToday(date)) {
      return 'bg-orange-50 text-orange-900 font-medium';
    }
    return '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiersClassNames={{
            today: "bg-orange-100 text-orange-900 font-bold",
          }}
          modifiers={{
            appointment: appointmentDates
          }}
          modifiersStyles={{
            appointment: { fontWeight: "bold" }
          }}
        />
      </div>
      
      <div className="min-h-[300px] max-h-[400px] overflow-y-auto">
        <h3 className="font-medium mb-3">
          {selectedDate ? (
            format(selectedDate, locale === 'en' ? 'MMMM d, yyyy' : 'yyyy/MM/dd')
          ) : (
            locale === 'en' ? 'Select a date' : 'اختر تاريخًا'
          )}
        </h3>
        
        {selectedDateAppointments.length > 0 ? (
          <div className="space-y-3">
            {selectedDateAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-3 border-l-4 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(appointment.status)}`}
                onClick={() => onAppointmentClick(appointment)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-pink-500">{appointment.time}</span>
                  <span className="text-xs capitalize px-2 py-1 rounded-full ${getStatusColor(appointment.type)}">
                    {appointment.type}
                  </span>
                </div>
                <div className="mt-1 text-pink-500">{appointment.patientName}</div>
                <div className="text-sm text-muted-foreground">
                  {appointment.doctorName} • {appointment.department}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground text-center">
            <p>
              {locale === 'en' 
                ? 'No appointments for this day' 
                : 'لا توجد مواعيد لهذا اليوم'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendarView;
