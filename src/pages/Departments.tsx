
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Users, HospitalIcon, BarChart2 } from 'lucide-react';
import { DepartmentDetails } from '@/components/departments/DepartmentDetails';
import DepartmentChart from '@/components/departments/DepartmentChart';
import { useLocale } from '@/hooks/useLocale';

export interface Department {
  id: string;
  name: string;
  head: string;
  headTitle: string;
  status: 'normal' | 'busy' | 'critical';
  totalBeds: number;
  occupiedBeds: number;
  activeStaff: number;
  description?: string;
}

const Departments = () => {
  const { locale } = useLocale();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  // Sample departments data
  const departments: Department[] = [
    {
      id: 'cardiology',
      name: locale === 'en' ? 'Cardiology' : 'قسم القلب',
      head: locale === 'en' ? 'Dr. Sarah Chen' : 'د. سارة تشن',
      headTitle: locale === 'en' ? 'Head of Cardiology' : 'رئيس قسم القلب',
      status: 'busy',
      totalBeds: 30,
      occupiedBeds: 25,
      activeStaff: 12,
      description: locale === 'en' ? 'Specializes in diagnosing and treating heart diseases and conditions.' : 'متخصص في تشخيص وعلاج أمراض وحالات القلب.'
    },
    {
      id: 'icu',
      name: locale === 'en' ? 'Intensive Care Unit' : 'وحدة العناية المركزة',
      head: locale === 'en' ? 'Dr. Michael Brown' : 'د. مايكل براون',
      headTitle: locale === 'en' ? 'ICU Director' : 'مدير العناية المركزة',
      status: 'critical',
      totalBeds: 15,
      occupiedBeds: 14,
      activeStaff: 20,
      description: locale === 'en' ? 'Provides intensive care medicine for critically ill patients.' : 'يقدم طب العناية المركزة للمرضى في حالة حرجة.'
    },
    {
      id: 'emergency',
      name: locale === 'en' ? 'Emergency Department' : 'قسم الطوارئ',
      head: locale === 'en' ? 'Dr. James Wilson' : 'د. جيمس ويلسون',
      headTitle: locale === 'en' ? 'ER Chief' : 'رئيس الطوارئ',
      status: 'busy',
      totalBeds: 20,
      occupiedBeds: 15,
      activeStaff: 18,
      description: locale === 'en' ? 'Provides acute care for patients requiring immediate attention.' : 'يقدم الرعاية الحادة للمرضى الذين يتطلبون اهتمامًا فوريًا.'
    },
    {
      id: 'pediatrics',
      name: locale === 'en' ? 'Pediatrics' : 'طب الأطفال',
      head: locale === 'en' ? 'Dr. Lisa Martinez' : 'د. ليسا مارتينيز',
      headTitle: locale === 'en' ? 'Pediatrics Lead' : 'رئيس طب الأطفال',
      status: 'normal',
      totalBeds: 25,
      occupiedBeds: 18,
      activeStaff: 15,
      description: locale === 'en' ? 'Specializes in medical care for infants, children, and adolescents.' : 'متخصص في الرعاية الطبية للرضع والأطفال والمراهقين.'
    },
    {
      id: 'neurology',
      name: locale === 'en' ? 'Neurology' : 'طب الأعصاب',
      head: locale === 'en' ? 'Dr. Robert Davis' : 'د. روبرت ديفيس',
      headTitle: locale === 'en' ? 'Neurology Head' : 'رئيس طب الأعصاب',
      status: 'normal',
      totalBeds: 20,
      occupiedBeds: 12,
      activeStaff: 10,
      description: locale === 'en' ? 'Diagnosis and treatment of disorders of the nervous system.' : 'تشخيص وعلاج اضطرابات الجهاز العصبي.'
    },
    {
      id: 'orthopedics',
      name: locale === 'en' ? 'Orthopedics' : 'جراحة العظام',
      head: locale === 'en' ? 'Dr. Emily Johnson' : 'د. إيميلي جونسون',
      headTitle: locale === 'en' ? 'Orthopedics Lead' : 'رئيس جراحة العظام',
      status: 'busy',
      totalBeds: 25,
      occupiedBeds: 20,
      activeStaff: 14,
      description: locale === 'en' ? 'Concerned with the correction of deformities of bones and muscles.' : 'يهتم بتصحيح تشوهات العظام والعضلات.'
    },
  ];

  const handleDepartmentClick = (department: Department) => {
    setSelectedDepartment(department);
  };

  const pageTitle = locale === 'en' ? 'Departments' : 'الأقسام';
  const overviewTitle = locale === 'en' ? 'Departments Overview' : 'نظرة عامة على الأقسام';
  
  // Status badge color mapping
  const getStatusColor = (status: Department['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-500 text-white';
      case 'busy': return 'bg-yellow-500 text-white';
      case 'critical': return 'bg-red-500 text-white';
    }
  };

  return (
    <MainLayout title={pageTitle}>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{overviewTitle}</h2>
        
        {/* Department Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Card 
              key={dept.id} 
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleDepartmentClick(dept)}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{dept.name}</h3>
                    <Badge className={getStatusColor(dept.status)}>
                      {locale === 'en' 
                        ? dept.status.charAt(0).toUpperCase() + dept.status.slice(1)
                        : dept.status === 'normal' ? 'عادي' 
                          : dept.status === 'busy' ? 'مزدحم' 
                          : 'حرج'
                      }
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <HospitalIcon size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {dept.occupiedBeds}/{dept.totalBeds} {locale === 'en' ? 'beds' : 'سرير'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {dept.activeStaff} {locale === 'en' ? 'staff' : 'موظف'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{dept.head}</p>
                      <p className="text-xs text-muted-foreground">{dept.headTitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/20 px-6 py-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <BarChart2 size={14} className="mr-1" />
                    {locale === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Department Charts */}
        <DepartmentChart locale={locale} />
        
        {/* Department Details Sheet */}
        {selectedDepartment && (
          <DepartmentDetails 
            department={selectedDepartment}
            onClose={() => setSelectedDepartment(null)}
            locale={locale}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Departments;
