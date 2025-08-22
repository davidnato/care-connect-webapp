import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import RecordUpdateForm from "../forms/RecordUpdateForm";
import { Pencil } from "lucide-react";
import { MedicalRecord } from "@/services/databaseService";

interface MedicalRecordEditDialogProps {
  record: MedicalRecord;
  onUpdate: (recordId: string, updatedData: Partial<MedicalRecord>) => Promise<void>;
}

const MedicalRecordEditDialog = ({ record, onUpdate }: MedicalRecordEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: record.diagnosis,
    treatment: record.treatment,
    date: record.date,
    prescription: record.prescription || '',
    notes: record.notes || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onUpdate(record.id, {
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        date: formData.date,
        prescription: formData.prescription,
        notes: formData.notes,
      });
      
      setIsLoading(false);
      setOpen(false);
      toast.success("Medical record updated successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update medical record");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      date: record.date,
      prescription: record.prescription || '',
      notes: record.notes || '',
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
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="treatment">Treatment</Label>
              <Textarea
                id="treatment"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="min-h-[80px]"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="prescription">Prescription</Label>
              <Textarea
                id="prescription"
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                className="min-h-[60px]"
                placeholder="Medication prescriptions (optional)"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[80px]"
                placeholder="Additional notes (optional)"
              />
            </div>
          </div>
        </RecordUpdateForm>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordEditDialog;