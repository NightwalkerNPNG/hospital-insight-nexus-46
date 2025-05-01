
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card } from "@/components/ui/card";
import { monitoringData } from '@/data/monitoringData';

interface VitalsChartProps {
  patientId: string;
  locale: 'en' | 'ar';
}

const VitalsChart: React.FC<VitalsChartProps> = ({ patientId, locale }) => {
  // Find the patient data
  const patient = monitoringData.icuPatients.find(p => p.id === patientId);
  
  if (!patient) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        {locale === 'en' ? 'Patient data not found' : 'لم يتم العثور على بيانات المريض'}
      </div>
    );
  }
  
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">
        {locale === 'en' ? `Vitals for ${patient.name}` : `العلامات الحيوية لـ ${patient.name}`}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={patient.history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              stroke="#888888" 
              fontSize={12}
              tickFormatter={(time) => time.slice(-5)} // Show only HH:MM
            />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip 
              formatter={(value, name) => {
                const translatedName = locale === 'en' ? name : 
                  name === 'heartRate' ? 'معدل ضربات القلب' : 
                  name === 'temperature' ? 'درجة الحرارة' : 'الأكسجين';
                
                const unit = name === 'heartRate' ? 'bpm' : 
                  name === 'temperature' ? '°C' : '%';
                  
                return [`${value} ${unit}`, translatedName];
              }}
            />
            <Legend 
              formatter={(value) => {
                return locale === 'en' ? 
                  value === 'heartRate' ? 'Heart Rate (bpm)' :
                  value === 'temperature' ? 'Temperature (°C)' : 
                  'SpO2 (%)' : 
                  value === 'heartRate' ? 'معدل ضربات القلب' :
                  value === 'temperature' ? 'درجة الحرارة' : 
                  'الأكسجين';
              }}
            />
            <Line 
              type="monotone" 
              dataKey="heartRate" 
              stroke="#ff0000" 
              name="heartRate" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#ff8c00" 
              name="temperature" 
            />
            <Line 
              type="monotone" 
              dataKey="spo2" 
              stroke="#0088fe" 
              name="spo2" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default VitalsChart;
