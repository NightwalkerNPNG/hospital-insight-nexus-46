
// Data for ICU patients with vital signs
export const monitoringData = {
  icuPatients: [
    {
      id: "PT001",
      name: "John Smith",
      age: 68,
      admissionDate: "2025-04-27",
      diagnosis: "Acute Myocardial Infarction",
      doctor: "Dr. Sarah Chen",
      status: "critical", // Added status property
      history: [
        { time: "2025-04-30 06:00", heartRate: 88, temperature: 37.1, spo2: 94 },
        { time: "2025-04-30 08:00", heartRate: 92, temperature: 37.3, spo2: 93 },
        { time: "2025-04-30 10:00", heartRate: 90, temperature: 37.5, spo2: 95 },
        { time: "2025-04-30 12:00", heartRate: 94, temperature: 37.8, spo2: 92 },
        { time: "2025-04-30 14:00", heartRate: 98, temperature: 38.1, spo2: 91 },
        { time: "2025-04-30 16:00", heartRate: 102, temperature: 38.4, spo2: 90 },
        { time: "2025-04-30 18:00", heartRate: 105, temperature: 38.5, spo2: 89 },
        { time: "2025-04-30 20:00", heartRate: 101, temperature: 38.2, spo2: 91 },
        { time: "2025-04-30 22:00", heartRate: 96, temperature: 37.9, spo2: 92 },
        { time: "2025-05-01 00:00", heartRate: 94, temperature: 37.7, spo2: 93 },
        { time: "2025-05-01 02:00", heartRate: 92, temperature: 37.5, spo2: 94 },
        { time: "2025-05-01 04:00", heartRate: 90, temperature: 37.3, spo2: 95 },
      ],
      // Add vital signs data
      vitals: [
        { name: 'Heart Rate', value: '90', unit: 'bpm', normalRange: '60-100', status: 'normal' },
        { name: 'Temperature', value: '37.3', unit: '°C', normalRange: '36.5-37.5', status: 'normal' },
        { name: 'SpO2', value: '95', unit: '%', normalRange: '95-100', status: 'normal' }
      ]
    },
    {
      id: "PT002",
      name: "Maria Garcia",
      age: 72,
      admissionDate: "2025-04-28",
      diagnosis: "Respiratory Failure",
      doctor: "Dr. Michael Brown",
      status: "serious", // Added status property
      history: [
        { time: "2025-04-30 06:00", heartRate: 96, temperature: 36.8, spo2: 88 },
        { time: "2025-04-30 08:00", heartRate: 94, temperature: 36.9, spo2: 89 },
        { time: "2025-04-30 10:00", heartRate: 95, temperature: 37.0, spo2: 87 },
        { time: "2025-04-30 12:00", heartRate: 98, temperature: 37.1, spo2: 86 },
        { time: "2025-04-30 14:00", heartRate: 100, temperature: 37.2, spo2: 85 },
        { time: "2025-04-30 16:00", heartRate: 103, temperature: 37.4, spo2: 84 },
        { time: "2025-04-30 18:00", heartRate: 105, temperature: 37.6, spo2: 83 },
        { time: "2025-04-30 20:00", heartRate: 102, temperature: 37.5, spo2: 85 },
        { time: "2025-04-30 22:00", heartRate: 99, temperature: 37.3, spo2: 86 },
        { time: "2025-05-01 00:00", heartRate: 97, temperature: 37.1, spo2: 87 },
        { time: "2025-05-01 02:00", heartRate: 96, temperature: 37.0, spo2: 88 },
        { time: "2025-05-01 04:00", heartRate: 94, temperature: 36.9, spo2: 89 },
      ],
      // Add vital signs data
      vitals: [
        { name: 'Heart Rate', value: '94', unit: 'bpm', normalRange: '60-100', status: 'normal' },
        { name: 'Temperature', value: '36.9', unit: '°C', normalRange: '36.5-37.5', status: 'normal' },
        { name: 'SpO2', value: '89', unit: '%', normalRange: '95-100', status: 'warning' }
      ]
    },
    {
      id: "PT003",
      name: "Robert Davis",
      age: 54,
      admissionDate: "2025-04-29",
      diagnosis: "Septic Shock",
      doctor: "Dr. Lisa Martinez",
      status: "critical", // Added status property
      history: [
        { time: "2025-04-30 06:00", heartRate: 110, temperature: 38.5, spo2: 92 },
        { time: "2025-04-30 08:00", heartRate: 115, temperature: 38.8, spo2: 91 },
        { time: "2025-04-30 10:00", heartRate: 120, temperature: 39.0, spo2: 90 },
        { time: "2025-04-30 12:00", heartRate: 125, temperature: 39.2, spo2: 89 },
        { time: "2025-04-30 14:00", heartRate: 123, temperature: 39.0, spo2: 88 },
        { time: "2025-04-30 16:00", heartRate: 118, temperature: 38.7, spo2: 89 },
        { time: "2025-04-30 18:00", heartRate: 114, temperature: 38.5, spo2: 90 },
        { time: "2025-04-30 20:00", heartRate: 110, temperature: 38.2, spo2: 91 },
        { time: "2025-04-30 22:00", heartRate: 105, temperature: 37.9, spo2: 92 },
        { time: "2025-05-01 00:00", heartRate: 102, temperature: 37.7, spo2: 93 },
        { time: "2025-05-01 02:00", heartRate: 98, temperature: 37.5, spo2: 94 },
        { time: "2025-05-01 04:00", heartRate: 95, temperature: 37.3, spo2: 95 },
      ],
      // Add vital signs data
      vitals: [
        { name: 'Heart Rate', value: '95', unit: 'bpm', normalRange: '60-100', status: 'normal' },
        { name: 'Temperature', value: '37.3', unit: '°C', normalRange: '36.5-37.5', status: 'normal' },
        { name: 'SpO2', value: '95', unit: '%', normalRange: '95-100', status: 'normal' }
      ]
    },
  ],
  // Add ER patients data
  erPatients: [
    {
      id: "PT101",
      name: "James Johnson",
      age: 45,
      admissionDate: "2025-05-01",
      diagnosis: "Chest Pain",
      doctor: "Dr. Robert Martinez",
      status: "stable"
    },
    {
      id: "PT102",
      name: "Sarah Williams",
      age: 32,
      admissionDate: "2025-05-01",
      diagnosis: "Allergic Reaction",
      doctor: "Dr. Emily Johnson",
      status: "stable"
    },
    {
      id: "PT103",
      name: "Michael Brown",
      age: 67,
      admissionDate: "2025-05-01",
      diagnosis: "Stroke",
      doctor: "Dr. Lisa Martinez",
      status: "critical"
    },
    {
      id: "PT104",
      name: "Jessica Davis",
      age: 28,
      admissionDate: "2025-05-01",
      diagnosis: "Broken Arm",
      doctor: "Dr. James Wilson",
      status: "stable"
    }
  ]
};
