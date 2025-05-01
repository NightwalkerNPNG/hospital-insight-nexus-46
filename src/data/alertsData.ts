
import { Alert } from '@/pages/Alerts';

// Create alerts with different timestamps
const now = new Date();

export const alertsData: Alert[] = [
  {
    id: "AL001",
    message: "ICU patient John Smith showing critical vital signs",
    priority: "critical",
    category: "patient",
    timestamp: new Date(now.getTime() - 5 * 60000), // 5 minutes ago
    affectedEntity: "Patient ID: PT001",
    details: "Heart rate: 138 bpm, SpO2: 87%, Temperature: 39.2°C - Immediate attention required.",
    status: "active",
    department: "ICU"
  },
  {
    id: "AL002",
    message: "Emergency ventilator in ICU Room 3 operating at low battery",
    priority: "critical",
    category: "device",
    timestamp: new Date(now.getTime() - 12 * 60000), // 12 minutes ago
    affectedEntity: "Device ID: VENT-105",
    details: "Battery at 15%, estimated 30 minutes of operation remaining. Requires immediate power connection.",
    status: "active",
    department: "ICU"
  },
  {
    id: "AL003",
    message: "System storage capacity reaching critical threshold",
    priority: "warning",
    category: "system",
    timestamp: new Date(now.getTime() - 35 * 60000), // 35 minutes ago
    affectedEntity: "Main Server",
    details: "Storage usage at 92%. Clean up old logs and temporary files to avoid system performance issues.",
    status: "acknowledged",
    assignedTo: "IT Support",
    department: "IT Department"
  },
  {
    id: "AL004",
    message: "Patient Maria Garcia medication schedule missed",
    priority: "warning",
    category: "patient",
    timestamp: new Date(now.getTime() - 90 * 60000), // 1.5 hours ago
    affectedEntity: "Patient ID: PT002",
    details: "Scheduled antibiotic dose at 14:00 was not administered. Requires nurse attention.",
    status: "active",
    department: "General Ward"
  },
  {
    id: "AL005",
    message: "Cardiology department approaching capacity limit",
    priority: "warning",
    category: "system",
    timestamp: new Date(now.getTime() - 3 * 60 * 60000), // 3 hours ago
    affectedEntity: "Cardiology Department",
    details: "Current occupancy: 85% (26/30 beds). Consider patient transfers if new admissions are expected.",
    status: "acknowledged",
    assignedTo: "Dr. Sarah Chen",
    department: "Cardiology"
  },
  {
    id: "AL006",
    message: "Lab results ready for Patient Robert Davis",
    priority: "info",
    category: "patient",
    timestamp: new Date(now.getTime() - 4.5 * 60 * 60000), // 4.5 hours ago
    affectedEntity: "Patient ID: PT003",
    details: "Blood work and urinalysis results have been uploaded to the patient's electronic medical record.",
    status: "resolved",
    department: "Laboratory"
  },
  {
    id: "AL007",
    message: "MRI equipment scheduled for maintenance tomorrow",
    priority: "info",
    category: "device",
    timestamp: new Date(now.getTime() - 6 * 60 * 60000), // 6 hours ago
    affectedEntity: "Device ID: MRI-002",
    details: "Scheduled maintenance from 09:00 to 13:00 tomorrow. Please reschedule any appointments during this time.",
    status: "acknowledged",
    assignedTo: "Radiology Department",
    department: "Radiology"
  },
  {
    id: "AL008",
    message: "ICU bed occupancy at maximum capacity",
    priority: "critical",
    category: "system",
    timestamp: new Date(now.getTime() - 8 * 60 * 60000), // 8 hours ago
    affectedEntity: "ICU Department",
    details: "All 15 ICU beds are currently occupied. Implement overflow protocols for any new critical admissions.",
    status: "resolved",
    department: "ICU"
  },
  {
    id: "AL009",
    message: "Temperature monitoring system in Pharmacy offline",
    priority: "warning",
    category: "device",
    timestamp: new Date(now.getTime() - 12 * 60 * 60000), // 12 hours ago
    affectedEntity: "Device ID: TEMP-008",
    details: "Connection lost to temperature monitoring system. Manual checks required until system is restored.",
    status: "resolved",
    department: "Pharmacy"
  },
  {
    id: "AL010",
    message: "Scheduled system backup completed successfully",
    priority: "info",
    category: "system",
    timestamp: new Date(now.getTime() - 18 * 60 * 60000), // 18 hours ago
    affectedEntity: "Backup System",
    details: "Daily automatic backup completed. All patient records and system configurations successfully backed up to secure storage.",
    status: "resolved",
    department: "IT Department"
  },
  {
    id: "AL011",
    message: "Patient Thomas Anderson showing abnormal ECG patterns",
    priority: "critical",
    category: "patient",
    timestamp: new Date(now.getTime() - 2.2 * 60000), // 2.2 minutes ago
    affectedEntity: "Patient ID: PT005",
    details: "ECG showing signs of atrial fibrillation. Cardiology consult requested.",
    status: "active",
    department: "Cardiology"
  },
  {
    id: "AL012",
    message: "Security badge access system malfunction at East Wing",
    priority: "warning",
    category: "device",
    timestamp: new Date(now.getTime() - 45 * 60000), // 45 minutes ago
    affectedEntity: "Device ID: ACC-215",
    details: "Door access system intermittently failing. Security personnel dispatched for manual verification.",
    status: "acknowledged",
    assignedTo: "Security Team",
    department: "Security"
  },
  {
    id: "AL013",
    message: "Software update available for patient monitoring system",
    priority: "info",
    category: "system",
    timestamp: new Date(now.getTime() - 5 * 60 * 60000), // 5 hours ago
    affectedEntity: "Patient Monitoring System",
    details: "Version 3.2.1 available with security patches and bug fixes. Recommended to be applied during low-activity hours.",
    status: "active",
    department: "IT Department"
  },
  {
    id: "AL014",
    message: "Blood supply for Type O- critically low",
    priority: "critical",
    category: "system",
    timestamp: new Date(now.getTime() - 7 * 60 * 60000), // 7 hours ago
    affectedEntity: "Blood Bank",
    details: "Only 2 units remaining. Contact regional blood bank for emergency supply.",
    status: "acknowledged",
    assignedTo: "Blood Bank Manager",
    department: "Blood Bank"
  },
  {
    id: "AL015",
    message: "Staff shortage in Pediatrics department for night shift",
    priority: "warning",
    category: "system",
    timestamp: new Date(now.getTime() - 9 * 60 * 60000), // 9 hours ago
    affectedEntity: "Pediatrics Department",
    details: "Only 2 nurses scheduled instead of required 4 for tonight's shift due to callouts.",
    status: "active",
    department: "Pediatrics"
  }
];
