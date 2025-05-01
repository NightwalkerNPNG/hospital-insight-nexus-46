
import React from 'react';
import { X, User, Users, Clock, Heart, ArrowRight, BarChart2, Bed, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Department } from '@/pages/Departments';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface DepartmentDetailsProps {
  department: Department;
  onClose: () => void;
  locale: 'en' | 'ar';
}

interface Staff {
  id: string;
  name: string;
  role: string;
  shift: string;
  avatar?: string;
}

interface Patient {
  id: string;
  name: string;
  condition: string;
  admissionDate: string;
  doctor: string;
}

const sampleStaff: Staff[] = [
  { id: '1', name: 'Dr. James Wilson', role: 'Cardiologist', shift: 'Morning' },
  { id: '2', name: 'Dr. Maria Rodriguez', role: 'Cardiologist', shift: 'Evening' },
  { id: '3', name: 'Nurse Sarah Thompson', role: 'Senior Nurse', shift: 'Morning' },
  { id: '4', name: 'Nurse Michael Chen', role: 'Nurse', shift: 'Night' },
  { id: '5', name: 'Dr. Emily Brown', role: 'Cardiologist', shift: 'Night' },
];

const sampleStaffAr: Staff[] = [
  { id: '1', name: 'د. عبدالله محمد', role: 'طبيب قلب', shift: 'صباحي' },
  { id: '2', name: 'د. نورة العتيبي', role: 'طبيبة قلب', shift: 'مسائي' },
  { id: '3', name: 'ممرضة سارة الزهراني', role: 'ممرضة أولى', shift: 'صباحي' },
  { id: '4', name: 'ممرض أحمد العلي', role: 'ممرض', shift: 'ليلي' },
  { id: '5', name: 'د. أمل الحربي', role: 'طبيبة قلب', shift: 'ليلي' },
];

const samplePatients: Patient[] = [
  { id: 'PT001', name: 'John Smith', condition: 'Stable', admissionDate: '2025-04-23', doctor: 'Dr. James Wilson' },
  { id: 'PT002', name: 'Emily Johnson', condition: 'Critical', admissionDate: '2025-04-28', doctor: 'Dr. Maria Rodriguez' },
  { id: 'PT003', name: 'Robert Davis', condition: 'Stable', admissionDate: '2025-04-24', doctor: 'Dr. James Wilson' },
  { id: 'PT004', name: 'Lisa Brown', condition: 'Improving', admissionDate: '2025-04-20', doctor: 'Dr. Emily Brown' },
];

const samplePatientsAr: Patient[] = [
  { id: 'PT001', name: 'محمد العبدالله', condition: 'مستقر', admissionDate: '2025-04-23', doctor: 'د. عبدالله محمد' },
  { id: 'PT002', name: 'سارة الخالد', condition: 'حرج', admissionDate: '2025-04-28', doctor: 'د. نورة العتيبي' },
  { id: 'PT003', name: 'أحمد المنصور', condition: 'مستقر', admissionDate: '2025-04-24', doctor: 'د. عبدالله محمد' },
  { id: 'PT004', name: 'نورة السعيد', condition: 'تحسن', admissionDate: '2025-04-20', doctor: 'د. أمل الحربي' },
];

export const DepartmentDetails = ({ department, onClose, locale }: DepartmentDetailsProps) => {
  const occupancyRate = Math.round((department.occupiedBeds / department.totalBeds) * 100);
  
  // Get appropriate sample data based on locale
  const staff = locale === 'en' ? sampleStaff : sampleStaffAr;
  const patients = locale === 'en' ? samplePatients : samplePatientsAr;
  
  // Get condition color
  const getConditionColor = (condition: string) => {
    if (locale === 'en') {
      switch (condition.toLowerCase()) {
        case 'critical': return 'text-red-500';
        case 'serious': return 'text-orange-500';
        case 'stable': return 'text-green-500';
        case 'improving': return 'text-blue-500';
        default: return 'text-gray-500';
      }
    } else {
      switch (condition) {
        case 'حرج': return 'text-red-500';
        case 'خطير': return 'text-orange-500';
        case 'مستقر': return 'text-green-500';
        case 'تحسن': return 'text-blue-500';
        default: return 'text-gray-500';
      }
    }
  };
  
  return (
    <Sheet open={!!department} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{department.name}</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription>
            {department.description || (locale === 'en' 
              ? 'Department overview and management.' 
              : 'نظرة عامة وإدارة القسم.')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 mt-2">
          {/* Department Head */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={28} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{department.head}</h4>
              <p className="text-sm text-muted-foreground">{department.headTitle}</p>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bed size={16} />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Bed Occupancy' : 'إشغال الأسرة'}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{occupancyRate}%</span>
                  <span className="text-xs text-muted-foreground">
                    {department.occupiedBeds}/{department.totalBeds}
                  </span>
                </div>
                <Progress value={occupancyRate} className="h-2 mt-1" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarClock size={16} />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Avg. Stay Duration' : 'متوسط مدة الإقامة'}
                </span>
              </div>
              <p className="font-medium">
                {department.id === 'icu' ? '4.2' : department.id === 'emergency' ? '1.3' : '3.5'} {locale === 'en' ? 'days' : 'أيام'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Recovery Rate' : 'معدل التعافي'}
                </span>
              </div>
              <p className="font-medium">
                {department.id === 'icu' ? '68' : department.id === 'emergency' ? '92' : '85'}%
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Response Time' : 'وقت الاستجابة'}
                </span>
              </div>
              <p className="font-medium">
                {department.id === 'icu' ? '< 1' : department.id === 'emergency' ? '< 2' : '< 5'} {locale === 'en' ? 'min' : 'دقيقة'}
              </p>
            </div>
          </div>
          
          {/* Tab Navigation for Staff and Patients */}
          <Tabs defaultValue="staff" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="staff">
                <Users size={16} className="mr-2" />
                {locale === 'en' ? 'Staff' : 'الموظفون'} ({staff.length})
              </TabsTrigger>
              <TabsTrigger value="patients">
                <User size={16} className="mr-2" />
                {locale === 'en' ? 'Patients' : 'المرضى'} ({patients.length})
              </TabsTrigger>
            </TabsList>
            
            {/* Staff Tab */}
            <TabsContent value="staff" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {staff.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-sm bg-muted/20 p-1 px-2 rounded">
                          {member.shift}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Patients Tab */}
            <TabsContent value="patients" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {patients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={18} className="text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{patient.name}</p>
                              <span className={`text-xs ${getConditionColor(patient.condition)}`}>
                                {patient.condition}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{patient.doctor}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {locale === 'en' ? 'Since:' : 'منذ:'} {patient.admissionDate.split('-').reverse().join('/')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="default" className="flex-1">
              <Edit size={16} className="mr-2" />
              {locale === 'en' ? 'Edit Department' : 'تعديل القسم'}
            </Button>
            <Button variant="outline" className="flex-1">
              <BarChart2 size={16} className="mr-2" />
              {locale === 'en' ? 'View Reports' : 'عرض التقارير'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
