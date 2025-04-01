
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import RecordUpdateForm from "../forms/RecordUpdateForm";
import { Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MedicalRecord {
  id: string;
  type: string;
  doctor: string;
  specialty: string;
  date: Date;
  description: string;
  category: string;
}

interface MedicalRecordEditDialogProps {
  record: MedicalRecord;
  onUpdate: (recordId: string, updatedData: Partial<MedicalRecord>) => void;
}

const MedicalRecordEditDialog = ({ record, onUpdate }: MedicalRecordEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: record.type,
    doctor: record.doctor,
    specialty: record.specialty,
    date: record.date.toISOString().split("T")[0],
    description: record.description,
    category: record.category,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the updated record data
    const [year, month, day] = formData.date.split("-").map(Number);
    const updatedDate = new Date(year, month - 1, day);

    const updatedRecord = {
      type: formData.type,
      doctor: formData.doctor,
      specialty: formData.specialty,
      date: updatedDate,
      description: formData.description,
      category: formData.category,
    };

    try {
      // Try to update in Supabase if we have authentication
      const { data: session } = await supabase.auth.getSession();
      
      if (session?.session) {
        // In a real app, we would update the actual medical record in Supabase
        // For now we'll just simulate success
        console.log("Would update medical record in Supabase:", record.id, updatedRecord);
        
        // Call the onUpdate callback to update local state
        onUpdate(record.id, updatedRecord);
        toast.success("Medical record updated successfully");
      } else {
        // Fallback for when not authenticated
        onUpdate(record.id, updatedRecord);
        toast.success("Medical record updated successfully (local only)");
      }
    } catch (error) {
      console.error("Error updating medical record:", error);
      toast.error("Failed to update medical record");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form data to original values
    setFormData({
      type: record.type,
      doctor: record.doctor,
      specialty: record.specialty,
      date: record.date.toISOString().split("T")[0],
      description: record.description,
      category: record.category,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1 items-center">
          <Pencil className="h-4 w-4" />
          Edit Record
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <RecordUpdateForm
          title="Edit Medical Record"
          isLoading={isLoading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Record Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Input
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="immunization">Immunization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </RecordUpdateForm>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordEditDialog;
