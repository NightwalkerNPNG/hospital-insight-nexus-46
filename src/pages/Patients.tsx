
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
  FileText,
  Calendar,
  Activity,
  PieChart,
  BarChart3,
  Heart
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

// Generate patient data
const generatePatientData = (locale: 'en' | 'ar') => {
  // English patient data
  const englishPatients = [
    {
      id: "PT001",
      name: "John Smith",
      age: 56,
      gender: "Male",
      department: "Cardiology",
      condition: "Stable",
      assignedDoctor: "Dr. Sarah Chen",
      admissionDate: "2025-04-25",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 78,
        temperature: 98.6,
        spO2: 96,
        bloodPressure: "120/80"
      },
      treatments: [
        "Daily ECG monitoring",
        "Beta blockers - Metoprolol 50mg twice daily",
        "Low sodium diet"
      ],
      medications: [
        {name: "Metoprolol", dosage: "50mg", frequency: "Twice daily"},
        {name: "Aspirin", dosage: "81mg", frequency: "Once daily"},
        {name: "Atorvastatin", dosage: "20mg", frequency: "Before bed"}
      ],
      allergies: ["Penicillin", "Shellfish"],
      labResults: [
        {test: "Cholesterol Panel", result: "LDL: 130mg/dL, HDL: 45mg/dL", date: "2025-04-26"},
        {test: "CBC", result: "WBC: 7.5, RBC: 5.2, Hgb: 14.2", date: "2025-04-26"},
        {test: "Troponin", result: "0.01ng/mL", date: "2025-04-25"}
      ],
      progressNotes: [
        {date: "2025-04-25", note: "Patient admitted with chest pain. ECG showed minor ST elevation."},
        {date: "2025-04-26", note: "Pain has subsided. Continuing with medication regimen."},
        {date: "2025-04-27", note: "Patient responding well to treatment. Walking around unit."}
      ]
    },
    {
      id: "PT002",
      name: "Mary Johnson",
      age: 34,
      gender: "Female",
      department: "Obstetrics",
      condition: "Good",
      assignedDoctor: "Dr. Robert Martinez",
      admissionDate: "2025-04-27",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 82,
        temperature: 99.1,
        spO2: 98,
        bloodPressure: "110/70"
      },
      treatments: [
        "Prenatal vitamins",
        "Regular fetal monitoring",
        "Nutrition consultation"
      ],
      medications: [
        {name: "Prenatal Vitamin", dosage: "1 tablet", frequency: "Daily"},
        {name: "Iron Supplement", dosage: "65mg", frequency: "Daily"}
      ],
      allergies: ["Latex"],
      labResults: [
        {test: "Complete Blood Count", result: "Within normal limits", date: "2025-04-27"},
        {test: "Glucose Screening", result: "95mg/dL", date: "2025-04-27"}
      ],
      progressNotes: [
        {date: "2025-04-27", note: "Admitted for observation due to mild preeclampsia symptoms."},
        {date: "2025-04-28", note: "Blood pressure stabilized. Fetal heart rate normal at 140bpm."}
      ]
    },
    {
      id: "PT003",
      name: "Robert Garcia",
      age: 45,
      gender: "Male",
      department: "Neurology",
      condition: "Critical",
      assignedDoctor: "Dr. James Wilson",
      admissionDate: "2025-04-23",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 92,
        temperature: 100.2,
        spO2: 94,
        bloodPressure: "145/95"
      },
      treatments: [
        "IV Mannitol for intracranial pressure",
        "Hourly neurological checks",
        "MRI scheduled for tomorrow"
      ],
      medications: [
        {name: "Mannitol", dosage: "20%", frequency: "Q6h as needed"},
        {name: "Dexamethasone", dosage: "4mg", frequency: "Q6h"},
        {name: "Phenytoin", dosage: "100mg", frequency: "TID"}
      ],
      allergies: ["Sulfa drugs"],
      labResults: [
        {test: "CT Scan", result: "Small subdural hematoma", date: "2025-04-23"},
        {test: "Complete Blood Count", result: "Elevated WBC: 12,000", date: "2025-04-24"}
      ],
      progressNotes: [
        {date: "2025-04-23", note: "Admitted after head injury from motorcycle accident. GCS 14."},
        {date: "2025-04-24", note: "Patient experiencing increased headache. Mannitol started."},
        {date: "2025-04-25", note: "Stable but remains critical. Neurosurgery consultation requested."}
      ]
    },
    {
      id: "PT004",
      name: "Emily Chen",
      age: 8,
      gender: "Female",
      department: "Pediatrics",
      condition: "Stable",
      assignedDoctor: "Dr. Lisa Rodriguez",
      admissionDate: "2025-04-26",
      dischargeDate: "2025-04-29",
      status: "Discharged",
      vitals: {
        heartRate: 88,
        temperature: 98.8,
        spO2: 99,
        bloodPressure: "100/60"
      },
      treatments: [
        "Nebulizer treatments q4h",
        "IV fluids at maintenance rate",
        "Oxygen therapy as needed"
      ],
      medications: [
        {name: "Albuterol", dosage: "2.5mg", frequency: "Q4h via nebulizer"},
        {name: "Prednisolone", dosage: "15mg", frequency: "Daily"},
        {name: "Azithromycin", dosage: "150mg", frequency: "Daily"}
      ],
      allergies: ["No known allergies"],
      labResults: [
        {test: "Chest X-ray", result: "Mild infiltrates in right lower lobe", date: "2025-04-26"},
        {test: "Respiratory Panel", result: "Positive for RSV", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-26", note: "Admitted with respiratory distress, wheezing, and fever."},
        {date: "2025-04-27", note: "Improved after starting nebulizer treatments. Oxygen sats stable."},
        {date: "2025-04-28", note: "Continued improvement. Plan for discharge tomorrow."},
        {date: "2025-04-29", note: "Discharged home with follow-up in 1 week."}
      ],
      dischargeSummary: "Discharged in stable condition. Diagnosis: Acute bronchiolitis due to RSV. Continue albuterol inhaler as needed and complete course of antibiotics."
    },
    {
      id: "PT005",
      name: "David Williams",
      age: 62,
      gender: "Male",
      department: "Orthopedics",
      condition: "Recovering",
      assignedDoctor: "Dr. Emily Patel",
      admissionDate: "2025-04-20",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 75,
        temperature: 98.2,
        spO2: 97,
        bloodPressure: "130/85"
      },
      treatments: [
        "Post-op hip replacement protocol",
        "Physical therapy BID",
        "Wound care daily"
      ],
      medications: [
        {name: "Oxycodone", dosage: "5mg", frequency: "Q4h as needed for pain"},
        {name: "Enoxaparin", dosage: "40mg", frequency: "Daily"},
        {name: "Cefazolin", dosage: "1g", frequency: "Q8h"}
      ],
      allergies: ["Codeine"],
      labResults: [
        {test: "Hemoglobin", result: "10.5 g/dL", date: "2025-04-21"},
        {test: "X-ray Hip", result: "Prosthesis in good position", date: "2025-04-21"}
      ],
      progressNotes: [
        {date: "2025-04-20", note: "Post-op day 0, total hip arthroplasty. Stable in recovery."},
        {date: "2025-04-21", note: "Post-op day 1. Pain controlled. PT started with standing transfer."},
        {date: "2025-04-22", note: "Post-op day 2. Walking with walker for 20 feet. Wound clean."},
        {date: "2025-04-25", note: "Post-op day 5. Good progress with PT. Planning for discharge soon."}
      ]
    },
    {
      id: "PT006",
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      department: "Emergency",
      condition: "Stable",
      assignedDoctor: "Dr. Robert Martinez",
      admissionDate: "2025-04-29",
      dischargeDate: "2025-04-29",
      status: "Outpatient",
      vitals: {
        heartRate: 76,
        temperature: 98.4,
        spO2: 99,
        bloodPressure: "118/75"
      },
      treatments: [
        "Laceration repair with sutures",
        "Tetanus booster",
        "Wound care instructions"
      ],
      medications: [
        {name: "Cephalexin", dosage: "500mg", frequency: "QID for 7 days"},
        {name: "Acetaminophen", dosage: "650mg", frequency: "Q6h as needed for pain"}
      ],
      allergies: ["No known allergies"],
      labResults: [],
      progressNotes: [
        {date: "2025-04-29", note: "Presented to ER with 5 cm laceration on left forearm after kitchen accident. Wound cleaned and closed with 7 sutures. Tetanus updated."}
      ],
      dischargeSummary: "Discharged same day. Return in 7-10 days for suture removal. Seek immediate care if signs of infection develop."
    },
    {
      id: "PT007",
      name: "Michael Brown",
      age: 51,
      gender: "Male",
      department: "Pulmonology",
      condition: "Critical",
      assignedDoctor: "Dr. Lisa Johnson",
      admissionDate: "2025-04-25",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 105,
        temperature: 101.3,
        spO2: 89,
        bloodPressure: "135/90"
      },
      treatments: [
        "Oxygen therapy via high-flow nasal cannula",
        "Chest physiotherapy BID",
        "Incentive spirometry q2h while awake"
      ],
      medications: [
        {name: "Piperacillin-Tazobactam", dosage: "4.5g", frequency: "Q6h"},
        {name: "Methylprednisolone", dosage: "60mg", frequency: "Q12h"},
        {name: "Albuterol-Ipratropium", dosage: "2.5-0.5mg", frequency: "Q4h via nebulizer"}
      ],
      allergies: ["Aspirin"],
      labResults: [
        {test: "Chest X-ray", result: "Bilateral infiltrates, right > left", date: "2025-04-25"},
        {test: "Arterial Blood Gas", result: "pH 7.32, PaO2 58, PaCO2 46", date: "2025-04-26"},
        {test: "Sputum Culture", result: "Pending", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-25", note: "Admitted with severe COPD exacerbation. Hypoxemic on room air."},
        {date: "2025-04-26", note: "Minimal improvement on oxygen therapy. Consider BiPAP."},
        {date: "2025-04-27", note: "Slightly improved, but remains in respiratory distress."}
      ]
    },
    {
      id: "PT008",
      name: "Jennifer Lee",
      age: 42,
      gender: "Female",
      department: "Gastroenterology",
      condition: "Stable",
      assignedDoctor: "Dr. Michael Brown",
      admissionDate: "2025-04-26",
      dischargeDate: "",
      status: "Inpatient",
      vitals: {
        heartRate: 84,
        temperature: 99.0,
        spO2: 97,
        bloodPressure: "122/78"
      },
      treatments: [
        "NPO status",
        "IV fluids at 125mL/hr",
        "Colonoscopy scheduled for tomorrow"
      ],
      medications: [
        {name: "Pantoprazole", dosage: "40mg", frequency: "Daily"},
        {name: "Ondansetron", dosage: "4mg", frequency: "Q6h as needed for nausea"},
        {name: "Bowel prep solution", dosage: "4 liters", frequency: "Evening before procedure"}
      ],
      allergies: ["Contrast dye"],
      labResults: [
        {test: "Complete Blood Count", result: "WBC 12,500, Hgb 13.2", date: "2025-04-26"},
        {test: "Liver Function Tests", result: "Elevated ALT/AST", date: "2025-04-26"},
        {test: "Abdominal CT", result: "Thickening of sigmoid colon wall", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-26", note: "Admitted with lower abdominal pain, diarrhea, and low-grade fever. Suspected diverticulitis vs IBD flare."},
        {date: "2025-04-27", note: "Pain improving with IV antibiotics. Prepping for colonoscopy."}
      ]
    }
  ];

  // Arabic patient data (translations of English patients)
  const arabicPatients = [
    {
      id: "PT001",
      name: "أحمد محمد",
      age: 56,
      gender: "ذكر",
      department: "قسم القلب",
      condition: "مستقر",
      assignedDoctor: "د. فاطمة حسن",
      admissionDate: "2025-04-25",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 78,
        temperature: 37.0,
        spO2: 96,
        bloodPressure: "120/80"
      },
      treatments: [
        "مراقبة يومية للقلب",
        "حاصرات بيتا - ميتوبرولول 50 مجم مرتين يومياً",
        "نظام غذائي قليل الصوديوم"
      ],
      medications: [
        {name: "ميتوبرولول", dosage: "50 مجم", frequency: "مرتين يومياً"},
        {name: "أسبرين", dosage: "81 مجم", frequency: "مرة يومياً"},
        {name: "أتورفاستاتين", dosage: "20 مجم", frequency: "قبل النوم"}
      ],
      allergies: ["البنسلين", "المأكولات البحرية"],
      labResults: [
        {test: "فحص الكوليسترول", result: "LDL: 130مجم/دل, HDL: 45مجم/دل", date: "2025-04-26"},
        {test: "تعداد الدم الكامل", result: "WBC: 7.5, RBC: 5.2, Hgb: 14.2", date: "2025-04-26"},
        {test: "تروبونين", result: "0.01نانوغرام/مل", date: "2025-04-25"}
      ],
      progressNotes: [
        {date: "2025-04-25", note: "تم قبول المريض مع ألم في الصدر. أظهر تخطيط القلب ارتفاعاً طفيفاً في مقطع ST."},
        {date: "2025-04-26", note: "خف الألم. الاستمرار في نظام الدواء."},
        {date: "2025-04-27", note: "المريض يستجيب جيداً للعلاج. يتجول في الوحدة."}
      ]
    },
    {
      id: "PT002",
      name: "مريم عبدالله",
      age: 34,
      gender: "أنثى",
      department: "قسم التوليد",
      condition: "جيدة",
      assignedDoctor: "د. عبدالله المالكي",
      admissionDate: "2025-04-27",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 82,
        temperature: 37.3,
        spO2: 98,
        bloodPressure: "110/70"
      },
      treatments: [
        "فيتامينات ما قبل الولادة",
        "مراقبة منتظمة للجنين",
        "استشارة تغذية"
      ],
      medications: [
        {name: "فيتامين ما قبل الولادة", dosage: "قرص واحد", frequency: "يومياً"},
        {name: "مكمل الحديد", dosage: "65 مجم", frequency: "يومياً"}
      ],
      allergies: ["لاتكس"],
      labResults: [
        {test: "تعداد الدم الكامل", result: "ضمن الحدود الطبيعية", date: "2025-04-27"},
        {test: "فحص الجلوكوز", result: "95 مجم/دل", date: "2025-04-27"}
      ],
      progressNotes: [
        {date: "2025-04-27", note: "تم القبول للمراقبة بسبب أعراض تسمم الحمل الخفيفة."},
        {date: "2025-04-28", note: "استقر ضغط الدم. معدل ضربات قلب الجنين طبيعي عند 140 نبضة في الدقيقة."}
      ]
    },
    {
      id: "PT003",
      name: "خالد العمري",
      age: 45,
      gender: "ذكر",
      department: "قسم الأعصاب",
      condition: "حرجة",
      assignedDoctor: "د. محمد العلي",
      admissionDate: "2025-04-23",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 92,
        temperature: 37.9,
        spO2: 94,
        bloodPressure: "145/95"
      },
      treatments: [
        "مانيتول وريدي لضغط الدماغ",
        "فحوصات عصبية كل ساعة",
        "تصوير بالرنين المغناطيسي مقرر غداً"
      ],
      medications: [
        {name: "مانيتول", dosage: "20%", frequency: "كل 6 ساعات حسب الحاجة"},
        {name: "ديكساميثازون", dosage: "4 مجم", frequency: "كل 6 ساعات"},
        {name: "فينيتوين", dosage: "100 مجم", frequency: "ثلاث مرات يومياً"}
      ],
      allergies: ["أدوية السلفا"],
      labResults: [
        {test: "التصوير المقطعي", result: "نزيف تحت الجافية صغير", date: "2025-04-23"},
        {test: "تعداد الدم الكامل", result: "ارتفاع كريات الدم البيضاء: 12,000", date: "2025-04-24"}
      ],
      progressNotes: [
        {date: "2025-04-23", note: "تم القبول بعد إصابة في الرأس من حادث دراجة نارية. مقياس غلاسكو 14."},
        {date: "2025-04-24", note: "المريض يعاني من صداع متزايد. بدأ المانيتول."},
        {date: "2025-04-25", note: "مستقر لكن لا يزال في حالة حرجة. طلب استشارة جراحة الأعصاب."}
      ]
    },
    {
      id: "PT004",
      name: "سارة العتيبي",
      age: 8,
      gender: "أنثى",
      department: "قسم الأطفال",
      condition: "مستقرة",
      assignedDoctor: "د. نورة القحطاني",
      admissionDate: "2025-04-26",
      dischargeDate: "2025-04-29",
      status: "خرجت",
      vitals: {
        heartRate: 88,
        temperature: 37.1,
        spO2: 99,
        bloodPressure: "100/60"
      },
      treatments: [
        "علاجات بالبخاخ كل 4 ساعات",
        "سوائل وريدية بمعدل صيانة",
        "علاج بالأكسجين حسب الحاجة"
      ],
      medications: [
        {name: "ألبيوتيرول", dosage: "2.5 مجم", frequency: "كل 4 ساعات عبر البخاخ"},
        {name: "بريدنيزولون", dosage: "15 مجم", frequency: "يومياً"},
        {name: "أزيثروميسين", dosage: "150 مجم", frequency: "يومياً"}
      ],
      allergies: ["لا توجد حساسية معروفة"],
      labResults: [
        {test: "أشعة الصدر", result: "ترسبات خفيفة في الفص السفلي الأيمن", date: "2025-04-26"},
        {test: "لوحة الجهاز التنفسي", result: "إيجابي لفيروس RSV", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-26", note: "تم القبول مع ضيق التنفس والصفير والحمى."},
        {date: "2025-04-27", note: "تحسن بعد بدء علاجات البخاخ. مستويات الأكسجين مستقرة."},
        {date: "2025-04-28", note: "استمر التحسن. خطة للخروج غداً."},
        {date: "2025-04-29", note: "تم إخراجها مع متابعة خلال أسبوع."}
      ],
      dischargeSummary: "خرجت في حالة مستقرة. التشخيص: التهاب القصيبات الحاد بسبب فيروس RSV. استمر في استخدام بخاخ ألبيوتيرول حسب الحاجة وإكمال مسار المضادات الحيوية."
    },
    {
      id: "PT005",
      name: "فهد الدوسري",
      age: 62,
      gender: "ذكر",
      department: "قسم العظام",
      condition: "يتعافى",
      assignedDoctor: "د. سارة أحمد",
      admissionDate: "2025-04-20",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 75,
        temperature: 36.8,
        spO2: 97,
        bloodPressure: "130/85"
      },
      treatments: [
        "بروتوكول ما بعد جراحة استبدال الورك",
        "علاج طبيعي مرتين يومياً",
        "رعاية الجرح يومياً"
      ],
      medications: [
        {name: "أوكسيكودون", dosage: "5 مجم", frequency: "كل 4 ساعات حسب الحاجة للألم"},
        {name: "إينوكسابارين", dosage: "40 مجم", frequency: "يومياً"},
        {name: "سيفازولين", dosage: "1 جم", frequency: "كل 8 ساعات"}
      ],
      allergies: ["كوديين"],
      labResults: [
        {test: "هيموغلوبين", result: "10.5 جم/دل", date: "2025-04-21"},
        {test: "أشعة الورك", result: "البدلة في وضع جيد", date: "2025-04-21"}
      ],
      progressNotes: [
        {date: "2025-04-20", note: "يوم 0 بعد العملية، استبدال كامل للورك. مستقر في التعافي."},
        {date: "2025-04-21", note: "يوم 1 بعد العملية. الألم تحت السيطرة. بدأ العلاج الطبيعي مع نقل الوقوف."},
        {date: "2025-04-22", note: "يوم 2 بعد العملية. المشي مع مشاية لمسافة 20 قدماً. الجرح نظيف."},
        {date: "2025-04-25", note: "يوم 5 بعد العملية. تقدم جيد مع العلاج الطبيعي. التخطيط للخروج قريباً."}
      ]
    },
    {
      id: "PT006",
      name: "نورة المطيري",
      age: 28,
      gender: "أنثى",
      department: "قسم الطوارئ",
      condition: "مستقرة",
      assignedDoctor: "د. عبدالله المالكي",
      admissionDate: "2025-04-29",
      dischargeDate: "2025-04-29",
      status: "مريض خارجي",
      vitals: {
        heartRate: 76,
        temperature: 36.9,
        spO2: 99,
        bloodPressure: "118/75"
      },
      treatments: [
        "إصلاح الجرح بالغرز",
        "تعزيز التيتانوس",
        "تعليمات رعاية الجرح"
      ],
      medications: [
        {name: "سيفاليكسين", dosage: "500 مجم", frequency: "أربع مرات يومياً لمدة 7 أيام"},
        {name: "أسيتامينوفين", dosage: "650 مجم", frequency: "كل 6 ساعات حسب الحاجة للألم"}
      ],
      allergies: ["لا توجد حساسية معروفة"],
      labResults: [],
      progressNotes: [
        {date: "2025-04-29", note: "حضرت إلى الطوارئ مع جرح 5 سم على الساعد الأيسر بعد حادث في المطبخ. تم تنظيف الجرح وإغلاقه بـ 7 غرز. تم تحديث التيتانوس."}
      ],
      dischargeSummary: "تم الخروج في نفس اليوم. العودة خلال 7-10 أيام لإزالة الغرز. اطلب الرعاية الفورية إذا ظهرت علامات العدوى."
    },
    {
      id: "PT007",
      name: "ناصر العنزي",
      age: 51,
      gender: "ذكر",
      department: "قسم الرئة",
      condition: "حرجة",
      assignedDoctor: "د. مريم الخالد",
      admissionDate: "2025-04-25",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 105,
        temperature: 38.5,
        spO2: 89,
        bloodPressure: "135/90"
      },
      treatments: [
        "علاج بالأكسجين عبر قنية أنفية عالية التدفق",
        "علاج طبيعي للصدر مرتين يومياً",
        "مقياس الحث كل ساعتين أثناء اليقظة"
      ],
      medications: [
        {name: "بيبيراسيلين-تازوباكتام", dosage: "4.5 جم", frequency: "كل 6 ساعات"},
        {name: "ميثيل بريدنيزولون", dosage: "60 مجم", frequency: "كل 12 ساعة"},
        {name: "ألبيوتيرول-إيبراتروبيوم", dosage: "2.5-0.5 مجم", frequency: "كل 4 ساعات عبر البخاخ"}
      ],
      allergies: ["أسبرين"],
      labResults: [
        {test: "أشعة الصدر", result: "ترسبات ثنائية، اليمين > اليسار", date: "2025-04-25"},
        {test: "غازات الدم الشرياني", result: "pH 7.32, PaO2 58, PaCO2 46", date: "2025-04-26"},
        {test: "زراعة البلغم", result: "قيد الانتظار", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-25", note: "تم القبول مع تفاقم حاد في مرض الانسداد الرئوي المزمن. نقص الأكسجة في هواء الغرفة."},
        {date: "2025-04-26", note: "تحسن طفيف مع علاج الأكسجين. النظر في BiPAP."},
        {date: "2025-04-27", note: "تحسن قليلاً، لكن لا يزال في ضائقة تنفسية."}
      ]
    },
    {
      id: "PT008",
      name: "لمياء السعيد",
      age: 42,
      gender: "أنثى",
      department: "قسم الجهاز الهضمي",
      condition: "مستقرة",
      assignedDoctor: "د. أحمد الزهراني",
      admissionDate: "2025-04-26",
      dischargeDate: "",
      status: "مريض داخلي",
      vitals: {
        heartRate: 84,
        temperature: 37.2,
        spO2: 97,
        bloodPressure: "122/78"
      },
      treatments: [
        "حالة NPO",
        "سوائل وريدية بمعدل 125 مل/ساعة",
        "تنظير القولون مقرر غداً"
      ],
      medications: [
        {name: "بانتوبرازول", dosage: "40 مجم", frequency: "يومياً"},
        {name: "أوندانسيترون", dosage: "4 مجم", frequency: "كل 6 ساعات حسب الحاجة للغثيان"},
        {name: "محلول تحضير الأمعاء", dosage: "4 لتر", frequency: "مساء قبل الإجراء"}
      ],
      allergies: ["صبغة التباين"],
      labResults: [
        {test: "تعداد الدم الكامل", result: "WBC 12,500, Hgb 13.2", date: "2025-04-26"},
        {test: "اختبارات وظائف الكبد", result: "ارتفاع ALT/AST", date: "2025-04-26"},
        {test: "التصوير المقطعي للبطن", result: "سماكة في جدار القولون السيني", date: "2025-04-26"}
      ],
      progressNotes: [
        {date: "2025-04-26", note: "تم القبول مع ألم في أسفل البطن وإسهال وحمى خفيفة. يشتبه في التهاب الرتوج أو تفاقم مرض التهاب الأمعاء."},
        {date: "2025-04-27", note: "يتحسن الألم مع المضادات الحيوية الوريدية. التحضير لتنظير القولون."}
      ]
    }
  ];

  return locale === 'en' ? englishPatients : arabicPatients;
};

// Get admission trend data for the last 14 days
const getAdmissionTrend = (patientData: any[], locale: 'en' | 'ar') => {
  const today = new Date();
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 13); // 14 days including today

  const result = [];
  const currentDate = new Date(twoWeeksAgo);

  while (currentDate <= today) {
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Count admissions on this date
    const admissionsCount = patientData.filter(
      patient => patient.admissionDate === dateString
    ).length;

    // Format date for display
    const displayDate = locale === 'en' 
      ? new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : new Date(dateString).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
    
    result.push({
      date: displayDate,
      admissions: admissionsCount
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
};

// Get patient distribution by department
const getPatientDistribution = (patientData: any[]) => {
  const departments: {[key: string]: number} = {};
  
  patientData.forEach(patient => {
    if (departments[patient.department]) {
      departments[patient.department]++;
    } else {
      departments[patient.department] = 1;
    }
  });
  
  return Object.entries(departments).map(([department, count]) => ({
    department,
    count,
    // Generate a random color for pie chart
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
  }));
};

const Patients = () => {
  const { locale, direction } = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  
  // User data
  const user = {
    name: locale === 'en' ? 'Dr. Sarah Chen' : 'د. فاطمة حسن',
    role: locale === 'en' ? 'Hospital Administrator' : 'مدير المستشفى',
    avatar: '',
  };

  const pageTitle = locale === 'en' ? 'Patients Management' : 'إدارة المرضى';
  
  // Generate patient data based on locale
  const patientsData = generatePatientData(locale);
  
  // Get patient distribution by department
  const departmentDistribution = getPatientDistribution(patientsData);
  
  // Get admissions trend data
  const admissionsData = getAdmissionTrend(patientsData, locale);
  
  // Get unique departments for filter
  const departments = ['all', ...new Set(patientsData.map(patient => patient.department))];
  
  // Get unique statuses for filter
  const statuses = ['all', ...new Set(patientsData.map(patient => patient.status))];
  
  // Filter patients based on search term and filters
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.assignedDoctor && patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = 
      selectedDepartment === 'all' || 
      patient.department === selectedDepartment;
    
    const matchesStatus = 
      selectedStatus === 'all' || 
      patient.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Stats for the summary cards
  const todayDateString = new Date().toISOString().split('T')[0];
  const stats = {
    totalAdmittedToday: patientsData.filter(patient => patient.admissionDate === todayDateString).length,
    dischargedToday: patientsData.filter(patient => patient.dischargeDate === todayDateString).length,
    inpatients: patientsData.filter(patient => patient.status === (locale === 'en' ? 'Inpatient' : 'مريض داخلي')).length,
  };
  
  // Calculate average stay duration for discharged patients
  const calculateAvgStay = () => {
    const dischargedPatients = patientsData.filter(patient => patient.dischargeDate);
    if (dischargedPatients.length === 0) return 0;
    
    const totalDays = dischargedPatients.reduce((sum, patient) => {
      const admissionDate = new Date(patient.admissionDate);
      const dischargeDate = new Date(patient.dischargeDate);
      const days = (dischargeDate.getTime() - admissionDate.getTime()) / (1000 * 3600 * 24);
      return sum + days;
    }, 0);
    
    return Math.round(totalDays / dischargedPatients.length * 10) / 10; // Round to 1 decimal place
  };
  
  const avgStayDuration = calculateAvgStay();
  
  // Handle view patient profile
  const handleViewProfile = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientProfile(true);
  };

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

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
                      {locale === 'en' ? 'Total Patients' : 'إجمالي المرضى'}
                    </p>
                    <p className="text-2xl font-bold">
                      {patientsData.length}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-500/10 rounded-full p-2 mr-3">
                    <Calendar size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Admitted Today' : 'القبول اليوم'}
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.totalAdmittedToday}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-500/10 rounded-full p-2 mr-3">
                    <Activity size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Avg. Stay (Days)' : 'متوسط الإقامة (أيام)'}
                    </p>
                    <p className="text-2xl font-bold">
                      {avgStayDuration}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <div className="bg-orange-500/10 rounded-full p-2 mr-3">
                    <FileText size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'Discharged Today' : 'الخروج اليوم'}
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.dischargedToday}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {locale === 'en' ? 'Admissions Trend (Last 14 Days)' : 'اتجاه القبول (آخر 14 يوماً)'}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={admissionsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        textAnchor={direction === 'rtl' ? 'end' : 'start'}
                      />
                      <YAxis 
                        textAnchor={direction === 'rtl' ? 'start' : 'end'}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="admissions" 
                        name={locale === 'en' ? 'New Admissions' : 'حالات القبول الجديدة'} 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {locale === 'en' ? 'Patient Distribution by Department' : 'توزيع المرضى حسب القسم'}
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={departmentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="department"
                        label={({ department, count }) => `${department}: ${count}`}
                      >
                        {departmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout={direction === 'rtl' ? 'vertical' : 'horizontal'} />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'en' ? "Search patients..." : "البحث عن مرضى..."}
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
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' 
                        ? locale === 'en' ? 'All Statuses' : 'كل الحالات'
                        : status
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Patient Table */}
            <Card className="overflow-hidden">
              <Tabs defaultValue="all">
                <div className="border-b px-6 py-3">
                  <TabsList className="bg-muted/30">
                    <TabsTrigger value="all">
                      {locale === 'en' ? 'All Patients' : 'كل المرضى'}
                    </TabsTrigger>
                    <TabsTrigger value="inpatient">
                      {locale === 'en' ? 'Inpatient' : 'مريض داخلي'}
                    </TabsTrigger>
                    <TabsTrigger value="outpatient">
                      {locale === 'en' ? 'Outpatient' : 'مريض خارجي'}
                    </TabsTrigger>
                    <TabsTrigger value="discharged">
                      {locale === 'en' ? 'Discharged' : 'خرج'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-3 text-right">
                    <Button variant="outline" size="sm" className="mr-2">
                      <FileText size={16} className="mr-1" />
                      {locale === 'en' ? 'Export' : 'تصدير'}
                    </Button>
                    <Button size="sm">
                      {locale === 'en' ? '+ New Patient' : '+ مريض جديد'}
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="all" className="m-0">
                  <Table>
                    <TableCaption>
                      {locale === 'en' 
                        ? `Showing ${filteredPatients.length} of ${patientsData.length} patients`
                        : `عرض ${filteredPatients.length} من ${patientsData.length} مريض`
                      }
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">
                          {locale === 'en' ? 'ID' : 'المعرف'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Patient Name' : 'اسم المريض'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Age' : 'العمر'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Department' : 'القسم'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Condition' : 'الحالة'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Doctor' : 'الطبيب'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Status' : 'الوضع'}
                        </TableHead>
                        <TableHead>
                          {locale === 'en' ? 'Admission Date' : 'تاريخ القبول'}
                        </TableHead>
                        <TableHead className="text-right">
                          {locale === 'en' ? 'Actions' : 'الإجراءات'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow 
                          key={patient.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewProfile(patient)}
                        >
                          <TableCell className="font-medium">{patient.id}</TableCell>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                              {patient.department}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              patient.condition === (locale === 'en' ? 'Stable' : 'مستقر') || 
                              patient.condition === (locale === 'en' ? 'Good' : 'جيدة')
                                ? 'bg-green-500/20 text-green-600 border-green-500/30'
                                : patient.condition === (locale === 'en' ? 'Recovering' : 'يتعافى')
                                ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                                : 'bg-red-500/20 text-red-600 border-red-500/30'
                            }`}>
                              {patient.condition}
                            </Badge>
                          </TableCell>
                          <TableCell>{patient.assignedDoctor}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              patient.status === (locale === 'en' ? 'Inpatient' : 'مريض داخلي')
                                ? 'bg-blue-500/20 text-blue-600 border-blue-500/30'
                                : patient.status === (locale === 'en' ? 'Outpatient' : 'مريض خارجي')
                                ? 'bg-purple-500/20 text-purple-600 border-purple-500/30'
                                : 'bg-gray-500/20 text-gray-600 border-gray-500/30'
                            }`}>
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{patient.admissionDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              handleViewProfile(patient);
                            }}>
                              {locale === 'en' ? 'View' : 'عرض'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredPatients.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            {locale === 'en' 
                              ? 'No patients found matching your filters'
                              : 'لم يتم العثور على مرضى يطابقون عوامل التصفية'
                            }
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="inpatient" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">{locale === 'en' ? 'ID' : 'المعرف'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Patient Name' : 'اسم المريض'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Age' : 'العمر'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Condition' : 'الحالة'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Doctor' : 'الطبيب'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Admission Date' : 'تاريخ القبول'}</TableHead>
                        <TableHead className="text-right">{locale === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients
                        .filter(patient => patient.status === (locale === 'en' ? 'Inpatient' : 'مريض داخلي'))
                        .map((patient) => (
                          <TableRow 
                            key={patient.id} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewProfile(patient)}
                          >
                            <TableCell className="font-medium">{patient.id}</TableCell>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {patient.department}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${
                                patient.condition === (locale === 'en' ? 'Stable' : 'مستقر') || 
                                patient.condition === (locale === 'en' ? 'Good' : 'جيدة')
                                  ? 'bg-green-500/20 text-green-600 border-green-500/30'
                                  : patient.condition === (locale === 'en' ? 'Recovering' : 'يتعافى')
                                  ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                                  : 'bg-red-500/20 text-red-600 border-red-500/30'
                              }`}>
                                {patient.condition}
                              </Badge>
                            </TableCell>
                            <TableCell>{patient.assignedDoctor}</TableCell>
                            <TableCell>{patient.admissionDate}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(patient);
                              }}>
                                {locale === 'en' ? 'View' : 'عرض'}
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="outpatient" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">{locale === 'en' ? 'ID' : 'المعرف'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Patient Name' : 'اسم المريض'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Age' : 'العمر'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Condition' : 'الحالة'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Doctor' : 'الطبيب'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Admission Date' : 'تاريخ القبول'}</TableHead>
                        <TableHead className="text-right">{locale === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients
                        .filter(patient => patient.status === (locale === 'en' ? 'Outpatient' : 'مريض خارجي'))
                        .map((patient) => (
                          <TableRow 
                            key={patient.id} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewProfile(patient)}
                          >
                            <TableCell className="font-medium">{patient.id}</TableCell>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {patient.department}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${
                                patient.condition === (locale === 'en' ? 'Stable' : 'مستقر') || 
                                patient.condition === (locale === 'en' ? 'Good' : 'جيدة')
                                  ? 'bg-green-500/20 text-green-600 border-green-500/30'
                                  : patient.condition === (locale === 'en' ? 'Recovering' : 'يتعافى')
                                  ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                                  : 'bg-red-500/20 text-red-600 border-red-500/30'
                              }`}>
                                {patient.condition}
                              </Badge>
                            </TableCell>
                            <TableCell>{patient.assignedDoctor}</TableCell>
                            <TableCell>{patient.admissionDate}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(patient);
                              }}>
                                {locale === 'en' ? 'View' : 'عرض'}
                              </Button>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="discharged" className="m-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">{locale === 'en' ? 'ID' : 'المعرف'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Patient Name' : 'اسم المريض'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Age' : 'العمر'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Department' : 'القسم'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Admission Date' : 'تاريخ القبول'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Discharge Date' : 'تاريخ الخروج'}</TableHead>
                        <TableHead>{locale === 'en' ? 'Doctor' : 'الطبيب'}</TableHead>
                        <TableHead className="text-right">{locale === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients
                        .filter(patient => patient.status === (locale === 'en' ? 'Discharged' : 'خرجت') || patient.status === (locale === 'en' ? 'Discharged' : 'خرج'))
                        .map((patient) => (
                          <TableRow 
                            key={patient.id} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleViewProfile(patient)}
                          >
                            <TableCell className="font-medium">{patient.id}</TableCell>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {patient.department}
                              </Badge>
                            </TableCell>
                            <TableCell>{patient.admissionDate}</TableCell>
                            <TableCell>{patient.dischargeDate}</TableCell>
                            <TableCell>{patient.assignedDoctor}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(patient);
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
      
      {/* Patient Profile Dialog */}
      {selectedPatient && (
        <Dialog open={showPatientProfile} onOpenChange={setShowPatientProfile}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center">
                <UserRound className="mr-2 h-6 w-6" />
                {selectedPatient.name}
              </DialogTitle>
              <DialogDescription>
                {locale === 'en' ? 'Patient ID: ' : 'رقم المريض: '}{selectedPatient.id} | {locale === 'en' ? 'Department: ' : 'القسم: '}{selectedPatient.department}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              {/* Left Column - Basic Info & Vitals */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Basic Information' : 'معلومات أساسية'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">{locale === 'en' ? 'Gender' : 'الجنس'}:</div>
                    <div>{selectedPatient.gender}</div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Age' : 'العمر'}:</div>
                    <div>{selectedPatient.age} {locale === 'en' ? 'years' : 'سنة'}</div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Status' : 'الحالة'}:</div>
                    <div>
                      <Badge className={`${
                        selectedPatient.status === (locale === 'en' ? 'Inpatient' : 'مريض داخلي')
                          ? 'bg-blue-500/20 text-blue-600'
                          : selectedPatient.status === (locale === 'en' ? 'Outpatient' : 'مريض خارجي')
                          ? 'bg-purple-500/20 text-purple-600'
                          : 'bg-gray-500/20 text-gray-600'
                      }`}>
                        {selectedPatient.status}
                      </Badge>
                    </div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Admitted' : 'تاريخ القبول'}:</div>
                    <div>{selectedPatient.admissionDate}</div>
                    
                    {selectedPatient.dischargeDate && (
                      <>
                        <div className="text-muted-foreground">{locale === 'en' ? 'Discharged' : 'تاريخ الخروج'}:</div>
                        <div>{selectedPatient.dischargeDate}</div>
                      </>
                    )}
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Doctor' : 'الطبيب'}:</div>
                    <div>{selectedPatient.assignedDoctor}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    {locale === 'en' ? 'Current Vitals' : 'العلامات الحيوية الحالية'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">{locale === 'en' ? 'Heart Rate' : 'معدل ضربات القلب'}:</div>
                    <div>
                      {selectedPatient.vitals?.heartRate} {locale === 'en' ? 'bpm' : 'نبضة/دقيقة'}
                    </div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Temperature' : 'درجة الحرارة'}:</div>
                    <div>
                      {selectedPatient.vitals?.temperature}{locale === 'en' ? '°F' : '°C'}
                    </div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'SpO2' : 'تشبع الأكسجين'}:</div>
                    <div>
                      {selectedPatient.vitals?.spO2}%
                    </div>
                    
                    <div className="text-muted-foreground">{locale === 'en' ? 'Blood Pressure' : 'ضغط الدم'}:</div>
                    <div>
                      {selectedPatient.vitals?.bloodPressure} {locale === 'en' ? 'mmHg' : 'مم زئبق'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Allergies' : 'الحساسية'}
                  </h4>
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selectedPatient.allergies.map((allergy: string, index: number) => (
                        <li key={index} className="text-sm">
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'No known allergies' : 'لا توجد حساسية معروفة'}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Middle Column - Treatment & Medications */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Current Treatment Plan' : 'خطة العلاج الحالية'}
                  </h4>
                  {selectedPatient.treatments && selectedPatient.treatments.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {selectedPatient.treatments.map((treatment: string, index: number) => (
                        <li key={index} className="text-sm">
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'No active treatments' : 'لا توجد علاجات نشطة'}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Medication Schedule' : 'جدول الأدوية'}
                  </h4>
                  {selectedPatient.medications && selectedPatient.medications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.medications.map((medication: any, index: number) => (
                        <div key={index} className="border rounded-md p-2">
                          <div className="font-medium text-sm">{medication.name}</div>
                          <div className="text-xs text-muted-foreground flex justify-between">
                            <span>{medication.dosage}</span>
                            <span>{medication.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'No medications prescribed' : 'لم يتم وصف أدوية'}
                    </p>
                  )}
                </div>
                
                {/* Discharge Summary - If Discharged */}
                {selectedPatient.dischargeSummary && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {locale === 'en' ? 'Discharge Summary' : 'ملخص الخروج'}
                    </h4>
                    <div className="border-l-4 border-gray-300 pl-3 py-1">
                      <p className="text-sm">{selectedPatient.dischargeSummary}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column - Lab Results & Progress Notes */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Lab Test Results' : 'نتائج التحاليل المخبرية'}
                  </h4>
                  {selectedPatient.labResults && selectedPatient.labResults.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPatient.labResults.map((labResult: any, index: number) => (
                        <div key={index} className="border rounded-md p-2">
                          <div className="flex justify-between">
                            <div className="font-medium text-sm">{labResult.test}</div>
                            <div className="text-xs text-muted-foreground">{labResult.date}</div>
                          </div>
                          <div className="text-xs mt-1">{labResult.result}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'No lab results available' : 'لا توجد نتائج مخبرية متاحة'}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">
                    {locale === 'en' ? 'Progress Notes' : 'ملاحظات التقدم'}
                  </h4>
                  {selectedPatient.progressNotes && selectedPatient.progressNotes.length > 0 ? (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {selectedPatient.progressNotes.map((note: any, index: number) => (
                        <div key={index} className="border rounded-md p-2">
                          <div className="text-xs text-muted-foreground">{note.date}</div>
                          <div className="text-sm mt-1">{note.note}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {locale === 'en' ? 'No progress notes available' : 'لا توجد ملاحظات تقدم متاحة'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              {selectedPatient.status === (locale === 'en' ? 'Inpatient' : 'مريض داخلي') && (
                <>
                  <Button variant="outline" size="sm">
                    {locale === 'en' ? 'Transfer' : 'نقل'}
                  </Button>
                  <Button variant="outline" size="sm">
                    {locale === 'en' ? 'Discharge' : 'خروج'}
                  </Button>
                </>
              )}
              <Button size="sm">
                {locale === 'en' ? 'Print Record' : 'طباعة السجل'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Patients;
