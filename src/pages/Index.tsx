
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import OccupancyChart from '@/components/dashboard/OccupancyChart';
import PatientFlowChart from '@/components/dashboard/PatientFlowChart';
import AlertFeed from '@/components/dashboard/AlertFeed';
import DepartmentGrid from '@/components/dashboard/DepartmentGrid';
import { Users, Calendar, Hospital, MonitorCheck } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { AlertPriority } from '@/components/dashboard/AlertFeed';

const Index = () => {
  const { locale, direction } = useLocale();
  
  // Mock data for our dashboard components
  const mockStats = {
    totalPatients: 1248,
    totalAppointments: 389,
    availableBeds: 63,
    occupancyRate: 78,
  };
  
  const mockDepartments = [
    { 
      id: '1', 
      name: 'Emergency Room', 
      occupiedBeds: 18, 
      totalBeds: 20, 
      trend: 5 
    },
    { 
      id: '2', 
      name: 'ICU', 
      occupiedBeds: 12, 
      totalBeds: 15, 
      trend: -2 
    },
    { 
      id: '3', 
      name: 'General Ward', 
      occupiedBeds: 45, 
      totalBeds: 60, 
      trend: 1 
    },
    { 
      id: '4', 
      name: 'Pediatrics', 
      occupiedBeds: 22, 
      totalBeds: 30, 
      trend: -3 
    },
    { 
      id: '5', 
      name: 'Maternity', 
      occupiedBeds: 14, 
      totalBeds: 20, 
      trend: 0 
    },
  ];
  
  const mockPatientFlow = [
    { date: 'Mon', admissions: 42, discharges: 38, transfers: 12 },
    { date: 'Tue', admissions: 38, discharges: 42, transfers: 10 },
    { date: 'Wed', admissions: 45, discharges: 40, transfers: 14 },
    { date: 'Thu', admissions: 50, discharges: 44, transfers: 16 },
    { date: 'Fri', admissions: 55, discharges: 48, transfers: 15 },
    { date: 'Sat', admissions: 35, discharges: 40, transfers: 8 },
    { date: 'Sun', admissions: 30, discharges: 35, transfers: 7 },
  ];
  
  const mockAlerts = [
    {
      id: '1',
      message: 'ER at maximum capacity. Diverting incoming patients.',
      priority: 'critical' as AlertPriority,
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      department: 'Emergency Room'
    },
    {
      id: '2',
      message: 'Two ventilators need maintenance in ICU.',
      priority: 'warning' as AlertPriority,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      department: 'ICU'
    },
    {
      id: '3',
      message: 'Dr. Johnson has called in sick. Shift needs coverage.',
      priority: 'warning' as AlertPriority,
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      department: 'Pediatrics'
    },
    {
      id: '4',
      message: 'Monthly hygiene inspection completed successfully.',
      priority: 'info' as AlertPriority,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      department: 'Administration'
    },
    {
      id: '5',
      message: 'Patient #1452 in critical condition, needs specialist attention.',
      priority: 'critical' as AlertPriority,
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago 
      department: 'ICU'
    }
  ];

  const mockDepartmentStatus = [
    {
      id: '1',
      name: 'Emergency Room',
      status: 'critical' as const,
      waitTime: 45,
      activeStaff: 12,
      totalPatients: 35
    },
    {
      id: '2',
      name: 'ICU',
      status: 'busy' as const,
      waitTime: 0,
      activeStaff: 8,
      totalPatients: 12
    },
    {
      id: '3',
      name: 'Cardiology',
      status: 'normal' as const,
      waitTime: 10,
      activeStaff: 5,
      totalPatients: 18
    },
    {
      id: '4',
      name: 'Pediatrics',
      status: 'normal' as const,
      waitTime: 15,
      activeStaff: 7,
      totalPatients: 22
    },
    {
      id: '5',
      name: 'Surgery',
      status: 'busy' as const,
      waitTime: 30,
      activeStaff: 10,
      totalPatients: 8
    },
    {
      id: '6',
      name: 'Maternity',
      status: 'normal' as const,
      waitTime: 5,
      activeStaff: 6,
      totalPatients: 14
    }
  ];

  // User data
  const user = {
    name: 'Dr. Sarah Chen',
    role: 'Hospital Administrator',
    avatar: '',
  };

  // Dashboard title based on language
  const dashboardTitle = locale === 'en' ? 'Hospital Dashboard' : 'لوحة معلومات المستشفى';

  return (
    <div className="flex h-screen overflow-hidden" dir={direction}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={dashboardTitle}
          user={user}
          unreadNotifications={3}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title={locale === 'en' ? "Total Patients" : "إجمالي المرضى"}
                value={mockStats.totalPatients}
                icon={<Users size={20} />}
                trend={{ value: 3.2, isPositive: true }}
              />
              <StatCard 
                title={locale === 'en' ? "Today's Appointments" : "مواعيد اليوم"} 
                value={mockStats.totalAppointments}
                icon={<Calendar size={20} />}
                trend={{ value: 1.8, isPositive: true }}
              />
              <StatCard 
                title={locale === 'en' ? "Available Beds" : "الأسرّة المتاحة"}
                value={mockStats.availableBeds}
                icon={<Hospital size={20} />}
                trend={{ value: 2.5, isPositive: false }}
              />
              <StatCard 
                title={locale === 'en' ? "Occupancy Rate" : "معدل الإشغال"}
                value={mockStats.occupancyRate}
                valueSuffix="%"
                icon={<MonitorCheck size={20} />}
                trend={{ value: 4.1, isPositive: true }}
              />
            </div>
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <OccupancyChart departments={mockDepartments} />
              <PatientFlowChart data={mockPatientFlow} />
            </div>
            
            {/* Departments Status */}
            <h2 className="mb-4 mt-6 text-xl font-semibold">
              {locale === 'en' ? 'Department Status' : 'حالة الأقسام'}
            </h2>
            <DepartmentGrid departments={mockDepartmentStatus} />
            
            {/* Alerts */}
            <h2 className="mb-4 mt-6 text-xl font-semibold">
              {locale === 'en' ? 'Alerts & Notifications' : 'التنبيهات والإشعارات'}
            </h2>
            <AlertFeed alerts={mockAlerts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
