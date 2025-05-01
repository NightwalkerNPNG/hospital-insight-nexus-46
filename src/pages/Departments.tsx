
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Users, 
  Bed, 
  Building,
  User
} from 'lucide-react';
import DepartmentGrid from '@/components/dashboard/DepartmentGrid';
import { DepartmentDetails } from '@/components/departments/DepartmentDetails';
import { departmentData } from '@/data/departmentData';
import DepartmentChart from '@/components/departments/DepartmentChart';

export interface Department {
  id: string;
  name: string;
  head: string;
  headTitle: string;
  totalBeds: number;
  occupiedBeds: number;
  totalStaff: number;
  patientCount: number;
  status: 'stable' | 'overloaded' | 'understaffed';
  icon?: React.ReactNode;
  description?: string;
}

const Departments = () => {
  const { locale, direction } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Departments' : 'الأقسام';

  // Filter departments based on search and status
  const filteredDepartments = departmentData.filter(dept => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dept.head.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dept.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate hospital-wide stats
  const totalBeds = departmentData.reduce((acc, dept) => acc + dept.totalBeds, 0);
  const occupiedBeds = departmentData.reduce((acc, dept) => acc + dept.occupiedBeds, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);
  const totalStaff = departmentData.reduce((acc, dept) => acc + dept.totalStaff, 0);
  const totalPatients = departmentData.reduce((acc, dept) => acc + dept.patientCount, 0);

  // Handle department click
  const handleDepartmentClick = (dept: Department) => {
    setSelectedDepartment(dept);
  };

  return (
    <div className="flex h-screen overflow-hidden" dir={direction}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          title={pageTitle}
          user={user}
          unreadNotifications={3}
        />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <Building size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Total Departments' : 'إجمالي الأقسام'}
                    </p>
                    <p className="text-2xl font-bold">{departmentData.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-500/10 rounded-full p-2 mr-3">
                    <Bed size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Bed Occupancy' : 'إشغال الأسرة'}
                    </p>
                    <p className="text-2xl font-bold">
                      {occupiedBeds}/{totalBeds} ({occupancyRate}%)
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/10 rounded-full p-2 mr-3">
                    <Users size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Total Staff' : 'إجمالي الموظفين'}
                    </p>
                    <p className="text-2xl font-bold">{totalStaff}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-orange-500/10 rounded-full p-2 mr-3">
                    <User size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Current Patients' : 'المرضى الحاليون'}
                    </p>
                    <p className="text-2xl font-bold">{totalPatients}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts and visualization */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DepartmentChart locale={locale} />
            </div>
            
            {/* Search and filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'en' ? "Search departments..." : "البحث في الأقسام..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-1" />
                  {locale === 'en' ? 'Add Department' : 'إضافة قسم'}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <select
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">{locale === 'en' ? 'All Status' : 'كل الحالات'}</option>
                    <option value="stable">{locale === 'en' ? 'Stable' : 'مستقر'}</option>
                    <option value="overloaded">{locale === 'en' ? 'Overloaded' : 'زائد الحمولة'}</option>
                    <option value="understaffed">{locale === 'en' ? 'Understaffed' : 'نقص الموظفين'}</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Department Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDepartments.map((dept) => (
                <Card 
                  key={dept.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDepartmentClick(dept)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-md font-medium">{dept.name}</CardTitle>
                      <Badge 
                        className={
                          dept.status === 'stable' ? 'bg-green-500' :
                          dept.status === 'overloaded' ? 'bg-red-500' : 'bg-yellow-500'
                        }
                      >
                        {locale === 'en' 
                          ? dept.status.charAt(0).toUpperCase() + dept.status.slice(1)
                          : dept.status === 'stable' ? 'مستقر' 
                            : dept.status === 'overloaded' ? 'زائد الحمولة' 
                            : 'نقص الموظفين'
                        }
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">{locale === 'en' ? 'Head' : 'الرئيس'}</p>
                        <p className="font-medium">{dept.head}</p>
                        <p className="text-xs text-muted-foreground">{dept.headTitle}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{locale === 'en' ? 'Beds' : 'الأسرة'}</p>
                        <p className="font-medium">
                          {dept.occupiedBeds}/{dept.totalBeds} ({Math.round((dept.occupiedBeds/dept.totalBeds)*100)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{locale === 'en' ? 'Staff' : 'الموظفون'}</p>
                        <p className="font-medium">{dept.totalStaff}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{locale === 'en' ? 'Patients' : 'المرضى'}</p>
                        <p className="font-medium">{dept.patientCount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {/* Department Details Panel */}
      {selectedDepartment && (
        <DepartmentDetails 
          department={selectedDepartment} 
          onClose={() => setSelectedDepartment(null)}
          locale={locale}
        />
      )}
    </div>
  );
};

export default Departments;
