
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BedOccupancyHeatmapProps {
  locale: 'en' | 'ar';
}

interface Department {
  id: string;
  name: string;
  beds: {
    id: string;
    occupied: boolean;
    critical: boolean;
    patientName?: string;
    admissionTime?: string;
  }[];
}

const BedOccupancyHeatmap: React.FC<BedOccupancyHeatmapProps> = ({ locale }) => {
  // Department data with bed information
  const departments: Department[] = [
    {
      id: 'icu',
      name: locale === 'en' ? 'ICU' : 'العناية المركزة',
      beds: [
        { id: 'ICU-01', occupied: true, critical: true, patientName: 'John Smith', admissionTime: '08:30' },
        { id: 'ICU-02', occupied: true, critical: true, patientName: 'Maria Garcia', admissionTime: '09:45' },
        { id: 'ICU-03', occupied: true, critical: false, patientName: 'Robert Davis', admissionTime: '12:15' },
        { id: 'ICU-04', occupied: true, critical: true, patientName: 'Emily Johnson', admissionTime: '14:20' },
        { id: 'ICU-05', occupied: true, critical: false, patientName: 'Thomas Anderson', admissionTime: '16:05' },
        { id: 'ICU-06', occupied: false, critical: false },
        { id: 'ICU-07', occupied: true, critical: false, patientName: 'Sarah Williams', admissionTime: '20:30' },
        { id: 'ICU-08', occupied: true, critical: true, patientName: 'Michael Johnson', admissionTime: '22:10' },
      ]
    },
    {
      id: 'emergency',
      name: locale === 'en' ? 'Emergency Room' : 'غرفة الطوارئ',
      beds: [
        { id: 'ER-01', occupied: true, critical: true, patientName: 'Jessica Brown', admissionTime: '10:15' },
        { id: 'ER-02', occupied: true, critical: false, patientName: 'David Wilson', admissionTime: '11:30' },
        { id: 'ER-03', occupied: false, critical: false },
        { id: 'ER-04', occupied: true, critical: false, patientName: 'Jennifer Lopez', admissionTime: '13:45' },
        { id: 'ER-05', occupied: true, critical: true, patientName: 'Christopher Lee', admissionTime: '15:20' },
        { id: 'ER-06', occupied: false, critical: false },
        { id: 'ER-07', occupied: false, critical: false },
        { id: 'ER-08', occupied: true, critical: false, patientName: 'Amanda Clark', admissionTime: '18:05' },
        { id: 'ER-09', occupied: true, critical: false, patientName: 'Daniel Martin', admissionTime: '19:40' },
        { id: 'ER-10', occupied: true, critical: true, patientName: 'Linda Walker', admissionTime: '21:15' },
      ]
    },
    {
      id: 'cardiology',
      name: locale === 'en' ? 'Cardiology' : 'أمراض القلب',
      beds: [
        { id: 'CARD-01', occupied: true, critical: false, patientName: 'Elizabeth Taylor', admissionTime: '07:30' },
        { id: 'CARD-02', occupied: true, critical: false, patientName: 'Richard Harris', admissionTime: '09:15' },
        { id: 'CARD-03', occupied: true, critical: false, patientName: 'Patricia White', admissionTime: '11:45' },
        { id: 'CARD-04', occupied: false, critical: false },
        { id: 'CARD-05', occupied: true, critical: true, patientName: 'Charles Adams', admissionTime: '14:30' },
        { id: 'CARD-06', occupied: true, critical: false, patientName: 'Barbara Young', admissionTime: '16:10' },
      ]
    },
    {
      id: 'general',
      name: locale === 'en' ? 'General Ward' : 'الجناح العام',
      beds: [
        { id: 'GEN-01', occupied: true, critical: false, patientName: 'Susan Martinez', admissionTime: '08:45' },
        { id: 'GEN-02', occupied: false, critical: false },
        { id: 'GEN-03', occupied: true, critical: false, patientName: 'Joseph Allen', admissionTime: '10:20' },
        { id: 'GEN-04', occupied: true, critical: false, patientName: 'Dorothy Scott', admissionTime: '12:35' },
        { id: 'GEN-05', occupied: true, critical: false, patientName: 'Paul Turner', admissionTime: '15:50' },
        { id: 'GEN-06', occupied: false, critical: false },
        { id: 'GEN-07', occupied: true, critical: false, patientName: 'Carol Baker', admissionTime: '17:15' },
        { id: 'GEN-08', occupied: true, critical: false, patientName: 'Kevin Phillips', admissionTime: '18:30' },
        { id: 'GEN-09', occupied: true, critical: false, patientName: 'Sharon Hill', admissionTime: '19:25' },
        { id: 'GEN-10', occupied: false, critical: false },
        { id: 'GEN-11', occupied: true, critical: false, patientName: 'Edward Wright', admissionTime: '21:40' },
        { id: 'GEN-12', occupied: true, critical: false, patientName: 'Betty King', admissionTime: '22:55' },
      ]
    }
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 bg-green-500/20 border border-green-500"></span>
          <span className="text-sm text-muted-foreground">
            {locale === 'en' ? 'Available' : 'متاح'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 bg-blue-500/20 border border-blue-500"></span>
          <span className="text-sm text-muted-foreground">
            {locale === 'en' ? 'Occupied' : 'مشغول'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 bg-red-500/20 border border-red-500"></span>
          <span className="text-sm text-muted-foreground">
            {locale === 'en' ? 'Critical' : 'حرج'}
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {departments.map((dept) => (
          <div key={dept.id} className="space-y-2">
            <h3 className="font-medium">
              {dept.name} 
              <span className="ml-2 text-sm text-muted-foreground">
                ({dept.beds.filter(bed => bed.occupied).length}/{dept.beds.length} {locale === 'en' ? 'beds' : 'سرير'})
              </span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {dept.beds.map((bed) => (
                <Card 
                  key={bed.id} 
                  className={`p-3 h-24 cursor-pointer transition-shadow hover:shadow-md ${
                    !bed.occupied ? 'bg-green-100 text-green-950 border-green-300' : 
                    bed.critical ? 'bg-red-100 text-red-950 border-red-300' : 'bg-blue-100 text-blue-950 border-blue-300'
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{bed.id}</span>
                      {bed.occupied && (
                        <Badge className={bed.critical ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}>
                          {bed.critical 
                            ? (locale === 'en' ? 'Critical' : 'حرج')
                            : (locale === 'en' ? 'Occupied' : 'مشغول')
                          }
                        </Badge>
                      )}
                    </div>
                    {bed.occupied && (
                      <div className="mt-auto">
                        <p className="text-sm font-medium truncate">{bed.patientName}</p>
                        <p className="text-xs">
                          {locale === 'en' ? 'Since:' : 'منذ:'} {bed.admissionTime}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedOccupancyHeatmap;
