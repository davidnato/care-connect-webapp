
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import RecordUpdateForm from "../forms/RecordUpdateForm";
import { Pencil } from "lucide-react";

interface LabResult {
  id: string;
  testName: string;
  date: Date;
  doctor: string;
  results: string;
  normalRange: string;
  status: string;
}

interface LabResultEditDialogProps {
  labResult: LabResult;
  onUpdate: (labResultId: string, updatedData: Partial<LabResult>) => void;
}

const LabResultEditDialog = ({ labResult, onUpdate }: LabResultEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    testName: labResult.testName,
    date: labResult.date.toISOString().split("T")[0],
    doctor: labResult.doctor,
    results: labResult.results,
    normalRange: labResult.normalRange,
    status: labResult.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the updated lab result data
    const [year, month, day] = formData.date.split("-").map(Number);
    const updatedDate = new Date(year, month - 1, day);

    const updatedLabResult = {
      testName: formData.testName,
      date: updatedDate,
      doctor: formData.doctor,
      results: formData.results,
      normalRange: formData.normalRange,
      status: formData.status,
    };

    // Simulate API call
    setTimeout(() => {
      onUpdate(labResult.id, updatedLabResult);
      setIsLoading(false);
      setOpen(false);
      toast.success("Lab result updated successfully");
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form data to original values
    setFormData({
      testName: labResult.testName,
      date: labResult.date.toISOString().split("T")[0],
      doctor: labResult.doctor,
      results: labResult.results,
      normalRange: labResult.normalRange,
      status: labResult.status,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <RecordUpdateForm
          title="Edit Lab Result"
          isLoading={isLoading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testName">Test Name</Label>
              <Input
                id="testName"
                name="testName"
                value={formData.testName}
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
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="results">Results</Label>
              <Input
                id="results"
                name="results"
                value={formData.results}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="normalRange">Normal Range</Label>
              <Input
                id="normalRange"
                name="normalRange"
                value={formData.normalRange}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes about the lab result"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </RecordUpdateForm>
      </DialogContent>
    </Dialog>
  );
};

export default LabResultEditDialog;
