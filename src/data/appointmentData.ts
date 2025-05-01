
import { Appointment } from '../pages/Appointments';

export const appointmentData: Appointment[] = [
  {
    id: 'apt-001',
    patientName: 'John Smith',
    patientId: 'P-10045',
    doctorName: 'Dr. Sarah Chen',
    doctorId: 'D-5023',
    department: 'Cardiology',
    date: '2025-05-01',
    time: '09:30',
    duration: 30,
    status: 'scheduled',
    type: 'consultation',
    notes: 'First consultation for heart palpitations'
  },
  {
    id: 'apt-002',
    patientName: 'Maria Rodriguez',
    patientId: 'P-10046',
    doctorName: 'Dr. James Wilson',
    doctorId: 'D-5024',
    department: 'Neurology',
    date: '2025-05-01',
    time: '10:15',
    duration: 45,
    status: 'scheduled',
    type: 'follow-up',
    notes: 'Follow-up for migraine treatment'
  },
  {
    id: 'apt-003',
    patientName: 'Robert Johnson',
    patientId: 'P-10047',
    doctorName: 'Dr. Emily Patel',
    doctorId: 'D-5025',
    department: 'Orthopedics',
    date: '2025-05-01',
    time: '11:30',
    duration: 60,
    status: 'scheduled',
    type: 'procedure',
    notes: 'Knee injection procedure'
  },
  {
    id: 'apt-004',
    patientName: 'Susan Chen',
    patientId: 'P-10048',
    doctorName: 'Dr. Michael Brown',
    doctorId: 'D-5026',
    department: 'Psychiatry',
    date: '2025-05-02',
    time: '09:00',
    duration: 60,
    status: 'scheduled',
    type: 'consultation',
    notes: 'Initial psychiatric evaluation'
  },
  {
    id: 'apt-005',
    patientName: 'David Williams',
    patientId: 'P-10049',
    doctorName: 'Dr. Sarah Chen',
    doctorId: 'D-5023',
    department: 'Cardiology',
    date: '2025-05-02',
    time: '14:00',
    duration: 30,
    status: 'scheduled',
    type: 'follow-up'
  },
  {
    id: 'apt-006',
    patientName: 'Jennifer Lopez',
    patientId: 'P-10050',
    doctorName: 'Dr. Robert Martinez',
    doctorId: 'D-5027',
    department: 'Emergency',
    date: '2025-05-01',
    time: '16:45',
    duration: 45,
    status: 'completed',
    type: 'emergency',
    notes: 'Severe allergic reaction to medication'
  }
];
