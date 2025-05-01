
// Helper function to generate random vital history
const generateVitalHistory = () => {
  const history = [];
  const now = new Date();
  
  // Generate data for the last 24 hours (every hour)
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const timeString = time.toTimeString().slice(0, 5); // HH:MM format
    
    history.push({
      time: timeString,
      heartRate: Math.floor(Math.random() * 40) + 60, // 60-100
      temperature: (Math.random() * 2 + 36).toFixed(1), // 36-38
      spo2: Math.floor(Math.random() * 10) + 90, // 90-100
    });
  }
  
  return history;
};

export interface PatientVital {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface MonitoringPatient {
  id: string;
  name: string;
  status: 'stable' | 'serious' | 'critical';
  vitals: PatientVital[];
  history: {
    time: string;
    heartRate: number;
    temperature: number;
    spo2: number;
  }[];
}

// ICU Patients
const icuPatients: MonitoringPatient[] = [
  {
    id: 'PT001',
    name: 'John Smith',
    status: 'critical',
    vitals: [
      {
        name: 'Heart Rate',
        value: '118',
        unit: 'bpm',
        normalRange: '60-100 bpm',
        status: 'warning'
      },
      {
        name: 'Temperature',
        value: '38.9',
        unit: '°C',
        normalRange: '36.5-37.5 °C',
        status: 'warning'
      },
      {
        name: 'SpO2',
        value: '92',
        unit: '%',
        normalRange: '95-100 %',
        status: 'warning'
      }
    ],
    history: generateVitalHistory()
  },
  {
    id: 'PT002',
    name: 'Maria Garcia',
    status: 'critical',
    vitals: [
      {
        name: 'Heart Rate',
        value: '135',
        unit: 'bpm',
        normalRange: '60-100 bpm',
        status: 'critical'
      },
      {
        name: 'Temperature',
        value: '39.2',
        unit: '°C',
        normalRange: '36.5-37.5 °C',
        status: 'critical'
      },
      {
        name: 'SpO2',
        value: '89',
        unit: '%',
        normalRange: '95-100 %',
        status: 'critical'
      }
    ],
    history: generateVitalHistory()
  },
  {
    id: 'PT003',
    name: 'Robert Davis',
    status: 'serious',
    vitals: [
      {
        name: 'Heart Rate',
        value: '105',
        unit: 'bpm',
        normalRange: '60-100 bpm',
        status: 'warning'
      },
      {
        name: 'Temperature',
        value: '37.8',
        unit: '°C',
        normalRange: '36.5-37.5 °C',
        status: 'warning'
      },
      {
        name: 'SpO2',
        value: '94',
        unit: '%',
        normalRange: '95-100 %',
        status: 'warning'
      }
    ],
    history: generateVitalHistory()
  },
  {
    id: 'PT004',
    name: 'Emily Johnson',
    status: 'stable',
    vitals: [
      {
        name: 'Heart Rate',
        value: '80',
        unit: 'bpm',
        normalRange: '60-100 bpm',
        status: 'normal'
      },
      {
        name: 'Temperature',
        value: '36.8',
        unit: '°C',
        normalRange: '36.5-37.5 °C',
        status: 'normal'
      },
      {
        name: 'SpO2',
        value: '98',
        unit: '%',
        normalRange: '95-100 %',
        status: 'normal'
      }
    ],
    history: generateVitalHistory()
  }
];

// ER Patients
const erPatients: MonitoringPatient[] = [
  {
    id: 'PT005',
    name: 'Thomas Anderson',
    status: 'critical',
    vitals: [],
    history: []
  },
  {
    id: 'PT006',
    name: 'Sarah Williams',
    status: 'serious',
    vitals: [],
    history: []
  },
  {
    id: 'PT007',
    name: 'Michael Thompson',
    status: 'stable',
    vitals: [],
    history: []
  },
  {
    id: 'PT008',
    name: 'Jessica Brown',
    status: 'stable',
    vitals: [],
    history: []
  }
];

export const monitoringData = {
  icuPatients,
  erPatients
};
