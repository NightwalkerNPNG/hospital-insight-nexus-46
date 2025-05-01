
import { Appointment } from '@/pages/Appointments';
import { addDays, startOfDay, format } from 'date-fns';

const today = startOfDay(new Date());

// Generate appointments for sample data
export const appointmentData: Appointment[] = [
  // Today's appointments
  {
    id: "AP001",
    patientName: "John Smith",
    patientId: "PT12345",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DR789",
    department: "Cardiology",
    date: format(today, 'yyyy-MM-dd'),
    time: "09:00 AM",
    duration: 30,
    status: "scheduled",
    type: "consultation",
    notes: "Follow-up on recent ECG results."
  },
  {
    id: "AP002",
    patientName: "Emily Johnson",
    patientId: "PT23456",
    doctorName: "Dr. James Wilson",
    doctorId: "DR456",
    department: "Pediatrics",
    date: format(today, 'yyyy-MM-dd'),
    time: "10:00 AM",
    duration: 45,
    status: "completed",
    type: "follow-up",
    notes: "Vaccination and growth check."
  },
  {
    id: "AP003",
    patientName: "Robert Davis",
    patientId: "PT34567",
    doctorName: "Dr. Michael Brown",
    doctorId: "DR123",
    department: "Orthopedic",
    date: format(today, 'yyyy-MM-dd'),
    time: "11:15 AM",
    duration: 60,
    status: "scheduled",
    type: "procedure",
    notes: "Discuss knee surgery options."
  },
  {
    id: "AP004",
    patientName: "Maria Garcia",
    patientId: "PT45678",
    doctorName: "Dr. Lisa Martinez",
    doctorId: "DR234",
    department: "Neurology",
    date: format(today, 'yyyy-MM-dd'),
    time: "2:30 PM",
    duration: 45,
    status: "no-show",
    type: "follow-up"
  },

  // Tomorrow's appointments
  {
    id: "AP005",
    patientName: "David Wilson",
    patientId: "PT56789",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DR789",
    department: "Cardiology",
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: "8:45 AM",
    duration: 30,
    status: "scheduled",
    type: "consultation",
    notes: "Heart palpitations evaluation."
  },
  {
    id: "AP006",
    patientName: "Jennifer Lopez",
    patientId: "PT67890",
    doctorName: "Dr. Michael Brown",
    doctorId: "DR123",
    department: "Orthopedic",
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: "10:30 AM",
    duration: 30,
    status: "scheduled",
    type: "follow-up",
    notes: "Cast removal and evaluation."
  },

  // Day after tomorrow
  {
    id: "AP007",
    patientName: "Thomas Anderson",
    patientId: "PT78901",
    doctorName: "Dr. James Wilson",
    doctorId: "DR456",
    department: "Pediatrics",
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    time: "9:15 AM",
    duration: 30,
    status: "scheduled",
    type: "consultation",
    notes: "New patient evaluation."
  },

  // Yesterday's appointments
  {
    id: "AP008",
    patientName: "Sarah Williams",
    patientId: "PT89012",
    doctorName: "Dr. Lisa Martinez",
    doctorId: "DR234",
    department: "Neurology",
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: "11:00 AM",
    duration: 45,
    status: "completed",
    type: "follow-up",
    notes: "Migraine management review."
  },
  {
    id: "AP009",
    patientName: "Michael Thompson",
    patientId: "PT90123",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DR789",
    department: "Cardiology",
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: "2:00 PM",
    duration: 30,
    status: "completed",
    type: "consultation",
    notes: "Chest pain evaluation."
  },
  {
    id: "AP010",
    patientName: "Jessica Brown",
    patientId: "PT01234",
    doctorName: "Dr. James Wilson",
    doctorId: "DR456",
    department: "Pediatrics",
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: "3:30 PM",
    duration: 30,
    status: "cancelled",
    type: "follow-up"
  },

  // Two days ago
  {
    id: "AP011",
    patientName: "Christopher Lee",
    patientId: "PT98765",
    doctorName: "Dr. Lisa Martinez",
    doctorId: "DR234",
    department: "Neurology",
    date: format(addDays(today, -2), 'yyyy-MM-dd'),
    time: "9:30 AM",
    duration: 60,
    status: "completed",
    type: "procedure",
    notes: "Spinal tap procedure."
  },

  // In two days
  {
    id: "AP012",
    patientName: "Amanda Clark",
    patientId: "PT87654",
    doctorName: "Dr. Michael Brown",
    doctorId: "DR123",
    department: "Orthopedic",
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    time: "1:15 PM",
    duration: 45,
    status: "scheduled",
    type: "consultation",
    notes: "Back pain evaluation."
  },

  // Next week
  {
    id: "AP013",
    patientName: "Daniel Martin",
    patientId: "PT76543",
    doctorName: "Dr. Sarah Chen",
    doctorId: "DR789",
    department: "Cardiology",
    date: format(addDays(today, 7), 'yyyy-MM-dd'),
    time: "10:45 AM",
    duration: 30,
    status: "scheduled",
    type: "follow-up",
    notes: "Medication effectiveness follow-up."
  },

  // Emergency appointments
  {
    id: "AP014",
    patientName: "Linda Walker",
    patientId: "PT65432",
    doctorName: "Dr. Michael Brown",
    doctorId: "DR123",
    department: "Orthopedic",
    date: format(today, 'yyyy-MM-dd'),
    time: "4:00 PM",
    duration: 45,
    status: "scheduled",
    type: "emergency",
    notes: "Acute fracture evaluation."
  },
  {
    id: "AP015",
    patientName: "Elizabeth Taylor",
    patientId: "PT54321",
    doctorName: "Dr. Lisa Martinez",
    doctorId: "DR234",
    department: "Neurology",
    date: format(addDays(today, -1), 'yyyy-MM-dd'),
    time: "5:30 PM",
    duration: 60,
    status: "completed",
    type: "emergency",
    notes: "Severe headache and visual disturbances."
  },

  // Arabic patients
  {
    id: "AP016",
    patientName: "محمد الأحمد",
    patientId: "PT34521",
    doctorName: "د. فاطمة حسن",
    doctorId: "DR432",
    department: "أمراض القلب",
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: "09:30 AM",
    duration: 45,
    status: "scheduled",
    type: "consultation",
    notes: "فحص القلب الدوري."
  },
  {
    id: "AP017",
    patientName: "نورة العلي",
    patientId: "PT45671",
    doctorName: "د. عبدالرحمن خالد",
    doctorId: "DR567",
    department: "طب الأطفال",
    date: format(today, 'yyyy-MM-dd'),
    time: "03:15 PM",
    duration: 30,
    status: "scheduled",
    type: "follow-up",
    notes: "متابعة التطعيم والنمو."
  }
];
