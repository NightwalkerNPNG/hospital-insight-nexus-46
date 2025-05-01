import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLocale } from '@/hooks/useLocale';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  UserRound, 
  Clock,
  Phone,
  Mail,
  FileText,
  Calendar,
  Medal,
  BarChart3
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Generate staff data
const generateStaffData = (locale: 'en' | 'ar') => {
  // English staff data
  const englishStaff = [
    {
      id: "ST001",
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      department: "Cardiology",
      status: "On Duty",
      lastShift: "Today, 8:00 AM - 4:00 PM",
      contact: "+1 (555) 123-4567",
      email: "sarah.chen@hospital.com",
      image: "",
      performance: 92,
      employmentDate: "2019-05-12",
      bio: "Dr. Sarah Chen is a board-certified cardiologist with over 10 years of experience. She specializes in interventional cardiology and has performed over 500 cardiac procedures.",
      qualifications: ["MD, Stanford University", "Residency at Mayo Clinic", "Board Certified in Interventional Cardiology"],
      shifts: [
        { date: "2025-04-29", time: "8:00 AM - 4:00 PM", department: "Cardiology" },
        { date: "2025-04-30", time: "8:00 AM - 4:00 PM", department: "Cardiology" },
        { date: "2025-05-02", time: "12:00 PM - 8:00 PM", department: "ER" }
      ]
    },
    {
      id: "ST002",
      name: "Dr. James Wilson",
      role: "Neurologist",
      department: "Neurology",
      status: "Off Duty",
      lastShift: "Yesterday, 7:00 PM - 3:00 AM",
      contact: "+1 (555) 234-5678",
      email: "james.wilson@hospital.com",
      image: "",
      performance: 88,
      employmentDate: "2020-02-18",
      bio: "Dr. Wilson is a neurologist specializing in movement disorders and neurodegenerative diseases. He has participated in multiple clinical trials for Parkinson's disease treatments.",
      qualifications: ["MD, Johns Hopkins", "Fellowship in Movement Disorders", "PhD in Neuroscience"],
      shifts: [
        { date: "2025-04-28", time: "7:00 PM - 3:00 AM", department: "Neurology" },
        { date: "2025-05-01", time: "7:00 PM - 3:00 AM", department: "Neurology" },
        { date: "2025-05-03", time: "7:00 PM - 3:00 AM", department: "Neurology" }
      ]
    },
    {
      id: "ST003",
      name: "Nurse Rodriguez",
      role: "Head Nurse",
      department: "Pediatrics",
      status: "On Duty",
      lastShift: "Today, 7:00 AM - 7:00 PM",
      contact: "+1 (555) 345-6789",
      email: "rodriguez@hospital.com",
      image: "",
      performance: 95,
      employmentDate: "2018-11-05",
      bio: "Nurse Rodriguez has 15 years of pediatric nursing experience. She is certified in pediatric advanced life support and neonatal resuscitation.",
      qualifications: ["BSN, University of California", "MSN, UCLA", "Pediatric Nursing Certification"],
      shifts: [
        { date: "2025-04-29", time: "7:00 AM - 7:00 PM", department: "Pediatrics" },
        { date: "2025-04-30", time: "7:00 AM - 7:00 PM", department: "Pediatrics" },
        { date: "2025-05-03", time: "7:00 AM - 7:00 PM", department: "Pediatrics" }
      ]
    },
    {
      id: "ST004",
      name: "Dr. Emily Patel",
      role: "Surgeon",
      department: "Surgery",
      status: "In Surgery",
      lastShift: "Today, 6:00 AM - 6:00 PM",
      contact: "+1 (555) 456-7890",
      email: "emily.patel@hospital.com",
      image: "",
      performance: 97,
      employmentDate: "2017-07-22",
      bio: "Dr. Patel is a general surgeon with a focus on minimally invasive techniques. She has pioneered several laparoscopic procedures at our hospital.",
      qualifications: ["MD, Harvard Medical School", "Surgical Residency at Massachusetts General", "Fellowship in Minimally Invasive Surgery"],
      shifts: [
        { date: "2025-04-29", time: "6:00 AM - 6:00 PM", department: "Surgery" },
        { date: "2025-04-30", time: "6:00 AM - 6:00 PM", department: "Surgery" },
        { date: "2025-05-01", time: "6:00 AM - 6:00 PM", department: "Surgery" }
      ]
    },
    {
      id: "ST005",
      name: "Dr. Michael Brown",
      role: "Psychiatrist",
      department: "Psychiatry",
      status: "On Duty",
      lastShift: "Today, 9:00 AM - 5:00 PM",
      contact: "+1 (555) 567-8901",
      email: "michael.brown@hospital.com",
      image: "",
      performance: 90,
      employmentDate: "2021-01-15",
      bio: "Dr. Brown specializes in adult psychiatry with a focus on mood disorders and PTSD. He implements evidence-based approaches and cognitive behavioral therapy.",
      qualifications: ["MD, Yale University", "Psychiatry Residency at Columbia", "Certificate in Cognitive Behavioral Therapy"],
      shifts: [
        { date: "2025-04-29", time: "9:00 AM - 5:00 PM", department: "Psychiatry" },
        { date: "2025-05-01", time: "9:00 AM - 5:00 PM", department: "Psychiatry" },
        { date: "2025-05-02", time: "9:00 AM - 5:00 PM", department: "Psychiatry" }
      ]
    },
    {
      id: "ST006",
      name: "Lisa Johnson",
      role: "Administrative Director",
      department: "Administration",
      status: "On Duty",
      lastShift: "Today, 8:00 AM - 4:00 PM",
      contact: "+1 (555) 678-9012",
      email: "lisa.johnson@hospital.com",
      image: "",
      performance: 94,
      employmentDate: "2016-09-30",
      bio: "Lisa oversees daily administrative operations and has implemented several efficiency improvements that reduced paperwork by 30%.",
      qualifications: ["MBA in Healthcare Administration", "BS in Business Management", "Healthcare Administration Certification"],
      shifts: [
        { date: "2025-04-29", time: "8:00 AM - 4:00 PM", department: "Administration" },
        { date: "2025-04-30", time: "8:00 AM - 4:00 PM", department: "Administration" },
        { date: "2025-05-01", time: "8:00 AM - 4:00 PM", department: "Administration" }
      ]
    },
    {
      id: "ST007",
      name: "Dr. Robert Martinez",
      role: "Emergency Physician",
      department: "Emergency",
      status: "On Duty",
      lastShift: "Today, 12:00 PM - 12:00 AM",
      contact: "+1 (555) 789-0123",
      email: "robert.martinez@hospital.com",
      image: "",
      performance: 91,
      employmentDate: "2019-11-12",
      bio: "Dr. Martinez is an emergency medicine specialist with expertise in trauma care. He previously served as a military physician in combat zones.",
      qualifications: ["MD, University of Pennsylvania", "Emergency Medicine Residency", "Trauma Care Certification"],
      shifts: [
        { date: "2025-04-29", time: "12:00 PM - 12:00 AM", department: "Emergency" },
        { date: "2025-04-30", time: "12:00 PM - 12:00 AM", department: "Emergency" },
        { date: "2025-05-02", time: "12:00 PM - 12:00 AM", department: "Emergency" }
      ]
    },
    {
      id: "ST008",
      name: "Karen Williams",
      role: "Laboratory Technician",
      department: "Laboratory",
      status: "On Duty",
      lastShift: "Today, 7:00 AM - 3:00 PM",
      contact: "+1 (555) 890-1234",
      email: "karen.williams@hospital.com",
      image: "",
      performance: 89,
      employmentDate: "2020-06-15",
      bio: "Karen specializes in hematology and clinical chemistry. She has developed new protocols that increased laboratory efficiency by 25%.",
      qualifications: ["BS in Medical Laboratory Science", "Clinical Laboratory Technologist License", "Specialist in Hematology Certification"],
      shifts: [
        { date: "2025-04-29", time: "7:00 AM - 3:00 PM", department: "Laboratory" },
        { date: "2025-04-30", time: "7:00 AM - 3:00 PM", department: "Laboratory" },
        { date: "2025-05-01", time: "7:00 AM - 3:00 PM", department: "Laboratory" }
      ]
    },
  ];

  // Arabic staff data (translations of English staff)
  const arabicStaff = [
    {
      id: "ST001",
      name: "د. فاطمة حسن",
      role: "طبيبة قلب",
      department: "قسم القلب",
      status: "في الخدمة",
      lastShift: "اليوم، 8:00 ص - 4:00 م",
      contact: "+1 (555) 123-4567",
      email: "fatima.hassan@hospital.com",
      image: "",
      performance: 92,
      employmentDate: "2019-05-12",
      bio: "د. فاطمة حسن هي طبيبة قلب معتمدة مع أكثر من 10 سنوات من الخبرة. تخصصت في قسطرة القلب وقد أجرت أكثر من 500 عملية قلبية.",
      qualifications: ["دكتوراه في الطب، جامعة الملك سعود", "الإقامة في مستشفى التخصصي", "شهادة في أمراض القلب التدخلية"],
      shifts: [
        { date: "2025-04-29", time: "8:00 ص - 4:00 م", department: "قسم القلب" },
        { date: "2025-04-30", time: "8:00 ص - 4:00 م", department: "قسم القلب" },
        { date: "2025-05-02", time: "12:00 م - 8:00 م", department: "الطوارئ" }
      ]
    },
    {
      id: "ST002",
      name: "د. محمد العلي",
      role: "طبيب أعصاب",
      department: "قسم الأعصاب",
      status: "خارج الخدمة",
      lastShift: "أمس، 7:00 م - 3:00 ص",
      contact: "+1 (555) 234-5678",
      email: "mohammed.ali@hospital.com",
      image: "",
      performance: 88,
      employmentDate: "2020-02-18",
      bio: "د. محمد متخصص في اضطرابات الحركة والأمراض العصبية التنكسية. شارك في العديد من التجارب السريرية لعلاجات مرض باركنسون.",
      qualifications: ["دكتوراه في الطب، جامعة القاهرة", "زمالة في اضطرابات الحركة", "دكتوراه في علم الأعصاب"],
      shifts: [
        { date: "2025-04-28", time: "7:00 م - 3:00 ص", department: "قسم الأعصاب" },
        { date: "2025-05-01", time: "7:00 م - 3:00 ص", department: "قسم الأعصاب" },
        { date: "2025-05-03", time: "7:00 م - 3:00 ص", department: "قسم الأعصاب" }
      ]
    },
    {
      id: "ST003",
      name: "الممرضة نورا",
      role: "رئيسة الممرضات",
      department: "قسم الأطفال",
      status: "في الخدمة",
      lastShift: "اليوم، 7:00 ص - 7:00 م",
      contact: "+1 (555) 345-6789",
      email: "noura@hospital.com",
      image: "",
      performance: 95,
      employmentDate: "2018-11-05",
      bio: "الممرضة نورا لديها 15 عاماً من الخبرة في تمريض الأطفال. حاصلة على شهادة في دعم الحياة المتقدم للأطفال وإنعاش حديثي الولادة.",
      qualifications: ["بكالوريوس في التمريض، جامعة الملك سعود", "ماجستير ف�� التمريض، جامعة القاهرة", "شهادة في تمريض الأطفال"],
      shifts: [
        { date: "2025-04-29", time: "7:00 ص - 7:00 م", department: "قسم الأطفال" },
        { date: "2025-04-30", time: "7:00 ص - 7:00 م", department: "قسم الأطفال" },
        { date: "2025-05-03", time: "7:00 ص - 7:00 م", department: "قسم الأطفال" }
      ]
    },
    {
      id: "ST004",
      name: "د. سارة أحمد",
      role: "جراحة",
      department: "قسم الجراحة",
      status: "في العمليات",
      lastShift: "اليوم، 6:00 ص - 6:00 م",
      contact: "+1 (555) 456-7890",
      email: "sara.ahmed@hospital.com",
      image: "",
      performance: 97,
      employmentDate: "2017-07-22",
      bio: "د. سارة هي جراحة عامة مع تركيز على تقنيات الجراحة بالمنظار. قامت بريادة عدة إجراءات للمنظار في مستشفانا.",
      qualifications: ["دكتوراه في الطب، جامعة القاهرة", "إقامة الجراحة في المستشفى العسكري", "زمالة في الجراحة بالمنظار"],
      shifts: [
        { date: "2025-04-29", time: "6:00 ص - 6:00 م", department: "قسم الجراحة" },
        { date: "2025-04-30", time: "6:00 ص - 6:00 م", department: "قسم الجراحة" },
        { date: "2025-05-01", time: "6:00 ص - 6:00 م", department: "قسم الجراحة" }
      ]
    },
    {
      id: "ST005",
      name: "د. أحمد الزهراني",
      role: "طبيب نفسي",
      department: "قسم الطب النفسي",
      status: "في الخدمة",
      lastShift: "اليوم، 9:00 ص - 5:00 م",
      contact: "+1 (555) 567-8901",
      email: "ahmed.zahrani@hospital.com",
      image: "",
      performance: 90,
      employmentDate: "2021-01-15",
      bio: "د. أحمد متخصص في الطب النفسي للبالغين مع التركيز على اضطرابات المزاج واضطراب ما بعد الصدمة. يطبق أساليب قائمة على الأدلة والعلاج السلوكي المعرفي.",
      qualifications: ["دكتوراه في الطب، جامعة الملك سعود", "إقامة الطب النفسي في مستشفى الأمل", "شهادة في العلاج السلوكي المعرفي"],
      shifts: [
        { date: "2025-04-29", time: "9:00 ص - 5:00 م", department: "قسم الطب النفسي" },
        { date: "2025-05-01", time: "9:00 ص - 5:00 م", department: "قسم الطب النفسي" },
        { date: "2025-05-02", time: "9:00 ص - 5:00 م", department: "قسم الطب النفسي" }
      ]
    },
    {
      id: "ST006",
      name: "مريم الخالد",
      role: "مديرة إدارية",
      department: "قسم الإدارة",
      status: "في الخدمة",
      lastShift: "اليوم، 8:00 ص - 4:00 م",
      contact: "+1 (555) 678-9012",
      email: "mariam.khaled@hospital.com",
      image: "",
      performance: 94,
      employmentDate: "2016-09-30",
      bio: "تشرف مريم على العمليات الإدارية اليومية وقد نفذت العديد من تحسينات الكفاءة التي قللت من الأعمال الورقية بنسبة 30٪.",
      qualifications: ["ماجستير في إدارة الرعاية الصحية", "بكالوريوس في إدارة الأعمال", "شهادة في إدارة الرعاية الصحية"],
      shifts: [
        { date: "2025-04-29", time: "8:00 ص - 4:00 م", department: "قسم الإدارة" },
        { date: "2025-04-30", time: "8:00 ص - 4:00 م", department: "قسم الإدارة" },
        { date: "2025-05-01", time: "8:00 ص - 4:00 م", department: "قسم الإدارة" }
      ]
    },
    {
      id: "ST007",
      name: "د. عبدالله المالكي",
      role: "طبيب طوارئ",
      department: "قسم الطوارئ",
      status: "في الخدمة",
      lastShift: "اليوم، 12:00 م - 12:00 ص",
      contact: "+1 (555) 789-0123",
      email: "abdullah.maliki@hospital.com",
      image: "",
      performance: 91,
      employmentDate: "2019-11-12",
      bio: "د. عبدالله متخصص في طب الطوارئ مع خبرة في رعاية الصدمات. عمل سابقاً كطبيب عسكري في مناطق القتال.",
      qualifications: ["دكتوراه في الطب، جامعة الملك سعود", "إقامة في طب الطوارئ", "شهادة في رعاية الصدمات"],
      shifts: [
        { date: "2025-04-29", time: "12:00 م - 12:00 ص", department: "قسم الطوارئ" },
        { date: "2025-04-30", time: "12:00 م - 12:00 ص", department: "قسم الطوارئ" },
        { date: "2025-05-02", time: "12:00 م - 12:00 ص", department: "قسم الطوارئ" }
      ]
    },
    {
      id: "ST008",
      name: "هدى العتيبي",
      role: "فنية مختبر",
      department: "قسم المختبر",
      status: "في الخدمة",
      lastShift: "اليوم، 7:00 ص - 3:00 م",
      contact: "+1 (555) 890-1234",
      email: "huda.otaibi@hospital.com",
      image: "",
      performance: 89,
      employmentDate: "2020-06-15",
      bio: "هدى متخصصة في أمراض الدم والكيمياء السريرية. طورت بروتوكولات جديدة زادت من كفاءة المختبر بنسبة 25٪.",
      qualifications: ["بكالوريوس في علوم المختبرات الطبية", "رخصة تقني مختبرات سريرية", "تخصص في شهادة أمراض الدم"],
      shifts: [
        { date: "2025-04-29", time: "7:00 ص - 3:00 م", department: "قسم المختبر" },
        { date: "2025-04-30", time: "7:00 ص - 3:00 م", department: "قسم المختبر" },
        { date: "2025-05-01", time: "7:00 ص - 3:00 م", department: "قسم المختبر" }
      ]
    },
  ];

  return locale === 'en' ? englishStaff : arabicStaff;
};

// Department distribution for charts
const getDepartmentDistribution = (staff: any[], locale: 'en' | 'ar') => {
  const departments: {[key: string]: number} = {};
  
  staff.forEach(member => {
    if (departments[member.department]) {
      departments[member.department]++;
    } else {
      departments[member.department] = 1;
    }
  });
  
  return Object.entries(departments).map(([department, count]) => ({
    department,
    count
  }));
};

// Role distribution for charts
const getRoleDistribution = (staff: any[], locale: 'en' | 'ar') => {
  const roles: {[key: string]: number} = {};
  
  staff.forEach(member => {
    if (roles[member.role]) {
      roles[member.role]++;
    } else {
      roles[member.role] = 1;
    }
  });
  
  return Object.entries(roles).map(([role, count]) => ({
    role,
    count
  }));
};

// Format date based on locale
const formatDate = (dateString: string, locale: 'en' | 'ar') => {
  const date = new Date(dateString);
  if (locale === 'en') {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else {
    return date.toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
};

const Staff = () => {
  const { locale, direction } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [showStaffProfile, setShowStaffProfile] = useState<boolean>(false);
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Staff Management' : 'إدارة الموظفين';
  
  // Generate staff data based on locale
  const staffData = generateStaffData(locale);
  
  // Filter staff based on search and filters
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'all' || 
      staff.department === selectedDepartment;
    
    const matchesRole = 
      selectedRole === 'all' || 
      staff.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });
  
  // Get unique departments for filter
  const departments = ['all', ...new Set(staffData.map(staff => staff.department))];
  
  // Get unique roles for filter
  const roles = ['all', ...new Set(staffData.map(staff => staff.role))];
  
  // Get department distribution for chart
  const departmentData = getDepartmentDistribution(staffData, locale);
  
  // Get role distribution for chart
  const roleData = getRoleDistribution(staffData, locale);
  
  // Handle view staff profile
  const handleViewProfile = (staff: any) => {
    setSelectedStaff(staff);
    setShowStaffProfile(true);
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
                    <UserRound size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Total Staff' : 'إجمالي الموظفين'}
                    </p>
                    <p className="text-2xl font-bold">
                      {staffData.length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-success/10 rounded-full p-2 mr-3">
                    <Clock size={20} className="text-status-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'On Duty' : 'في الخدمة'}
                    </p>
                    <p className="text-2xl font-bold">
                      {staffData.filter(s => s.status === (locale === 'en' ? 'On Duty' : 'في الخدمة')).length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-warning/10 rounded-full p-2 mr-3">
                    <FileText size={20} className="text-status-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Departments' : 'الأقسام'}
                    </p>
                    <p className="text-2xl font-bold">
                      {departments.length - 1} {/* Subtract 1 for the 'all' option */}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-status-error/10 rounded-full p-2 mr-3">
                    <UserRound size={20} className="text-status-error" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Off Duty' : 'خارج الخدمة'}
                    </p>
                    <p className="text-2xl font-bold">
                      {staffData.filter(s => s.status === (locale === 'en' ? 'Off Duty' : 'خارج الخدمة')).length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'en' ? "Search staff..." : "البحث عن موظف..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <select
                  className="bg-background border rounded px-2 py-1 text-sm text-foreground"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map(department => (
                    <option key={department} value={department}>
                      {department === 'all' 
                        ? locale === 'en' ? 'All Departments' : 'كل الأقسام'
                        : department
                      }
                    </option>
                  ))}
                </select>
                
                <select
                  className="bg-background border rounded px-2 py-1 text-sm text-foreground"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {role === 'all' 
                        ? locale === 'en' ? 'All Roles' : 'كل الأدوار'
                        : role
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Staff Distribution Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {locale === 'en' ? 'Staff by Department' : 'الموظفون حسب القسم'}
                </h3>
                <div className="h-64">
                  <div className="h-full">
                    {departmentData.map((item, index) => (
                      <div key={item.department} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{item.department}</span>
                          <span className="text-sm font-medium">{item.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full"
                            style={{ 
                              width: `${(item.count / staffData.length) * 100}%`,
                              backgroundColor: `hsl(${index * 40}, 70%, 60%)` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {locale === 'en' ? 'Staff by Role' : 'الموظفون حسب الدور'}
                </h3>
                <div className="h-64">
                  <div className="h-full">
                    {roleData.map((item, index) => (
                      <div key={item.role} className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{item.role}</span>
                          <span className="text-sm font-medium">{item.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-hospital-primary h-2.5 rounded-full"
                            style={{ 
                              width: `${(item.count / staffData.length) * 100}%`,
                              backgroundColor: `hsl(${210 + index * 30}, 70%, 50%)` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Staff Table */}
            <Card className="overflow-hidden">
              <Tabs defaultValue="all">
                <div className="border-b px-6 py-3">
                  <TabsList className="bg-muted/30">
                    <TabsTrigger value="all">
                      {locale === 'en' ? 'All Staff' : 'كل الموظفين'}
                    </TabsTrigger>
                    <TabsTrigger value="active">
                      {locale === 'en' ? 'Active' : 'نشط'}
                    </TabsTrigger>
                    <TabsTrigger value="off">
                      {locale === 'en' ? 'Off Duty' : 'خارج الخدمة'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-3 text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      <FileText size={16} className="mr-1" />
                      {locale === 'en' ? 'Export' : 'تصدير'}
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableCaption>
                      {locale === 'en' 
                        ? `Showing ${filteredStaff.length} of ${staffData.length} staff members`
                        : `عرض ${filteredStaff.length} من ${staffData.length} موظفين`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">
                          {locale === 'en' ? 'ID' : 'المعرف'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Name' : 'الاسم'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Role' : 'الدور'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Department' : 'القسم'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Status' : 'الحالة'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Last Shift' : 'آخر مناوبة'}
                        </TableHead>
                        <TableHead className="text-right">
                          {locale === 'en' ? 'Actions' : 'الإجراءات'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((staff) => (
                        <TableRow key={staff.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewProfile(staff)}>
                          <TableCell className="font-medium">{staff.id}</TableCell>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                              {staff.department}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              staff.status === (locale === 'en' ? 'On Duty' : 'في الخدمة')
                                ? 'bg-status-success/20 text-status-success border-status-success/30'
                                : staff.status === (locale === 'en' ? 'In Surgery' : 'في العمليات')
                                ? 'bg-status-warning/20 text-status-warning border-status-warning/30'
                                : 'bg-status-error/20 text-status-error border-status-error/30'
                            }`}>
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{staff.lastShift}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              handleViewProfile(staff);
                            }}>
                              {locale === 'en' ? 'View' : 'عرض'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredStaff.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            {locale === 'en' 
                              ? 'No staff members found matching your filters'
                              : 'لم يتم العثور على موظفين يطابقون عوامل التصفية'
                            }
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="active" className="m-0">
                  <Table>
                    <TableCaption>
                      {locale === 'en' 
                        ? `Showing active staff members`
                        : `عرض الموظفين النشطين`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">{locale === 'en' ? 'ID' : 'المعرف'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Name' : 'الاسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Role' : 'الدور'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Status' : 'الحالة'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Last Shift' : 'آخر مناوبة'}</TableHead>
                        <TableHead className="text-right">{locale === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff
                        .filter(staff => staff.status === (locale === 'en' ? 'On Duty' : 'في الخدمة') || 
                                       staff.status === (locale === 'en' ? 'In Surgery' : 'في العمليات'))
                        .map((staff) => (
                          <TableRow key={staff.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewProfile(staff)}>
                            <TableCell className="font-medium">{staff.id}</TableCell>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {staff.department}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${
                                staff.status === (locale === 'en' ? 'On Duty' : 'في الخدمة')
                                  ? 'bg-status-success/20 text-status-success border-status-success/30'
                                  : 'bg-status-warning/20 text-status-warning border-status-warning/30'
                              }`}>
                                {staff.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{staff.lastShift}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(staff);
                              }}>
                                {locale === 'en' ? 'View' : 'عرض'}
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="off" className="m-0">
                  <Table>
                    <TableCaption>
                      {locale === 'en' 
                        ? `Showing off-duty staff members`
                        : `عرض الموظفين خارج الخدمة`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">{locale === 'en' ? 'ID' : 'المعرف'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Name' : 'الاسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Role' : 'الدور'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Status' : 'الحالة'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Last Shift' : 'آخر مناوبة'}</TableHead>
                        <TableHead className="text-right">{locale === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff
                        .filter(staff => staff.status === (locale === 'en' ? 'Off Duty' : 'خارج الخدمة'))
                        .map((staff) => (
                          <TableRow key={staff.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewProfile(staff)}>
                            <TableCell className="font-medium">{staff.id}</TableCell>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {staff.department}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-status-error/20 text-status-error border-status-error/30">
                                {staff.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{staff.lastShift}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(staff);
                              }}>
                                {locale === 'en' ? 'View' : 'عرض'}
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Staff Profile Dialog */}
      {selectedStaff && (
        <Dialog open={showStaffProfile} onOpenChange={setShowStaffProfile}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center">
                <UserRound className="mr-2 h-6 w-6" />
                {selectedStaff.name}
              </DialogTitle>
              <DialogDescription>
                {selectedStaff.role} - {selectedStaff.department}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-32 w-32 rounded-full bg-muted/50 flex items-center justify-center text-4xl font-bold text-muted-foreground">
                    {selectedStaff.name.charAt(0)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {locale === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                  </h4>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-muted-foreground" />
                    <span>{selectedStaff.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-muted-foreground" />
                    <span>{selectedStaff.email}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {locale === 'en' ? 'Employment Info' : 'معلومات التوظيف'}
                  </h4>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    <span>
                      {locale === 'en' ? 'Joined: ' : 'تاريخ التعيين: '}
                      {formatDate(selectedStaff.employmentDate, locale)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Medal size={16} className="mr-2 text-muted-foreground" />
                    <span>
                      {locale === 'en' ? 'Performance: ' : 'الأداء: '}
                      <Badge className="bg-status-success/20 text-status-success">
                        {selectedStaff.performance}%
                      </Badge>
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {locale === 'en' ? 'Status' : 'الحالة'}
                  </h4>
                  <Badge className={`${
                    selectedStaff.status === (locale === 'en' ? 'On Duty' : 'في الخدمة')
                      ? 'bg-status-success/20 text-status-success'
                      : selectedStaff.status === (locale === 'en' ? 'In Surgery' : 'في العمليات')
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-status-error/20 text-status-error'
                  }`}>
                    {selectedStaff.status}
                  </Badge>
                  <div>
                    <span className="text-sm">
                      {locale === 'en' ? 'Last Shift: ' : 'آخر مناوبة: '}
                      {selectedStaff.lastShift}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Middle Column - Bio & Qualifications */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Bio' : 'السيرة الذاتية'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedStaff.bio}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Qualifications' : 'المؤهلات'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedStaff.qualifications.map((qualification: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {qualification}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Right Column - Shifts */}
              <div>
                <h4 className="font-medium mb-4">
                  {locale === 'en' ? 'Upcoming Shifts' : 'المناوبات القادمة'}
                </h4>
                <div className="space-y-3">
                  {selectedStaff.shifts.map((shift: any, index: number) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{shift.date}</div>
                        <Badge variant="outline" className="bg-primary/5">
                          {shift.department}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2">
                        <Clock size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{shift.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Staff;
