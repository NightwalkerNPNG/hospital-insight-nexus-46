
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from 'lucide-react';

interface AddPatientButtonProps {
  locale: 'en' | 'ar';
}

const AddPatientButton: React.FC<AddPatientButtonProps> = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [department, setDepartment] = useState('');
  const [age, setAge] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to add the patient
    // For now, we'll just show a success message
    
    toast({
      title: locale === 'en' ? 'Patient Added' : 'تمت إضافة المريض',
      description: locale === 'en' 
        ? `${patientName} has been successfully added to the system.` 
        : `تمت إضافة ${patientName} إلى النظام بنجاح.`,
      variant: 'default',
    });
    
    // Reset form and close dialog
    setPatientName('');
    setPatientId('');
    setDepartment('');
    setAge('');
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1"
      >
        <Plus size={16} />
        {locale === 'en' ? 'Add Patient' : 'إضافة مريض'}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{locale === 'en' ? 'Add New Patient' : 'إضافة مريض جديد'}</DialogTitle>
            <DialogDescription>
              {locale === 'en' 
                ? 'Enter the patient details below to register them in the system.' 
                : 'أدخل تفاصيل المريض أدناه لتسجيله في النظام.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {locale === 'en' ? 'Name' : 'الاسم'}
              </Label>
              <Input
                id="name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient-id" className="text-right">
                {locale === 'en' ? 'Patient ID' : 'رقم المريض'}
              </Label>
              <Input
                id="patient-id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                {locale === 'en' ? 'Age' : 'العمر'}
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                {locale === 'en' ? 'Department' : 'القسم'}
              </Label>
              <Select
                value={department}
                onValueChange={setDepartment}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={locale === 'en' ? "Select department" : "اختر القسم"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">
                    {locale === 'en' ? 'Emergency Room' : 'قسم الطوارئ'}
                  </SelectItem>
                  <SelectItem value="cardiology">
                    {locale === 'en' ? 'Cardiology' : 'أمراض القلب'}
                  </SelectItem>
                  <SelectItem value="neurology">
                    {locale === 'en' ? 'Neurology' : 'طب الأعصاب'}
                  </SelectItem>
                  <SelectItem value="orthopedics">
                    {locale === 'en' ? 'Orthopedics' : 'جراحة العظام'}
                  </SelectItem>
                  <SelectItem value="pediatrics">
                    {locale === 'en' ? 'Pediatrics' : 'طب الأطفال'}
                  </SelectItem>
                  <SelectItem value="general">
                    {locale === 'en' ? 'General Ward' : 'الجناح العام'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                {locale === 'en' ? 'Cancel' : 'إلغاء'}
              </Button>
              <Button type="submit">
                {locale === 'en' ? 'Add Patient' : 'إضافة'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPatientButton;
