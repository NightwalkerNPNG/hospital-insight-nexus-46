
import { Department } from '@/pages/Departments';
import { Hospital, Heart, Activity, UserPlus, Stethoscope, Brain } from 'lucide-react';

// Update the original status values to match expected types
export const departmentData: Department[] = [
  {
    id: 'emergency',
    name: 'Emergency Room',
    head: 'Dr. Michael Brown',
    headTitle: 'Emergency Medicine Specialist',
    totalBeds: 20,
    occupiedBeds: 14,
    totalStaff: 35,
    patientCount: 14,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: Activity,
    description: 'Handles emergency cases requiring immediate medical attention.'
  },
  {
    id: 'icu',
    name: 'Intensive Care Unit',
    head: 'Dr. James Wilson',
    headTitle: 'Critical Care Specialist',
    totalBeds: 15,
    occupiedBeds: 14,
    totalStaff: 45,
    patientCount: 14,
    status: 'critical',  // Changed from 'overloaded' to 'critical'
    icon: Hospital,
    description: 'Provides intensive care and monitoring for critically ill patients.'
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    head: 'Dr. Sarah Chen',
    headTitle: 'Chief Cardiologist',
    totalBeds: 30,
    occupiedBeds: 25,
    totalStaff: 35,
    patientCount: 25,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: Heart,
    description: 'Specializes in diagnosis and treatment of heart conditions.'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    head: 'Dr. Emily Johnson',
    headTitle: 'Pediatric Specialist',
    totalBeds: 25,
    occupiedBeds: 15,
    totalStaff: 30,
    patientCount: 15,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: UserPlus,
    description: 'Specializes in medical care for infants, children, and adolescents.'
  },
  {
    id: 'general',
    name: 'General Medicine',
    head: 'Dr. Robert Davis',
    headTitle: 'General Physician',
    totalBeds: 40,
    occupiedBeds: 28,
    totalStaff: 25,
    patientCount: 28,
    status: 'busy',  // Changed from 'understaffed' to 'busy'
    icon: Stethoscope,
    description: 'Provides diagnosis and non-surgical treatment of various diseases and injuries.'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    head: 'Dr. Lisa Martinez',
    headTitle: 'Chief Neurologist',
    totalBeds: 20,
    occupiedBeds: 12,
    totalStaff: 20,
    patientCount: 12,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: Brain,
    description: 'Specializes in diagnosis and treatment of disorders of the nervous system.'
  },
  // Arabic departments
  {
    id: 'emergency-ar',
    name: 'قسم الطوارئ',
    head: 'د. أحمد محمد',
    headTitle: 'أخصائي طب الطوارئ',
    totalBeds: 20,
    occupiedBeds: 14,
    totalStaff: 35,
    patientCount: 14,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: Activity,
    description: 'معالجة الحالات الطارئة التي تتطلب عناية طبية فورية.'
  },
  {
    id: 'icu-ar',
    name: 'وحدة العناية المركزة',
    head: 'د. عبدالله العمري',
    headTitle: 'أخصائي العناية المركزة',
    totalBeds: 15,
    occupiedBeds: 14,
    totalStaff: 45,
    patientCount: 14,
    status: 'critical',  // Changed from 'overloaded' to 'critical'
    icon: Hospital,
    description: 'توفير الرعاية المركزة والمراقبة للمرضى الحرجين.'
  },
  {
    id: 'cardiology-ar',
    name: 'قسم القلب',
    head: 'د. فاطمة حسن',
    headTitle: 'رئيسة قسم القلب',
    totalBeds: 30,
    occupiedBeds: 25,
    totalStaff: 35,
    patientCount: 25,
    status: 'normal',  // Changed from 'stable' to 'normal'
    icon: Heart,
    description: 'متخصص في تشخيص وعلاج أمراض القلب.'
  },
];
