
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import RecordUpdateForm from "../forms/RecordUpdateForm";
import { Pencil } from "lucide-react";

import { databaseService, type LabResult } from "@/services/databaseService";

interface LabResultEditDialogProps {
  labResult: LabResult;
  onUpdate: () => void;
}

const LabResultEditDialog = ({ labResult, onUpdate }: LabResultEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    test_type: labResult.test_type,
    test_date: labResult.test_date,
    results: labResult.results,
    normal_range: labResult.normal_range || '',
    interpretation: labResult.interpretation || '',
    notes: labResult.notes || '',
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
      const updatedData = {
        test_type: formData.test_type,
        test_date: formData.test_date,
        results: formData.results,
        normal_range: formData.normal_range || undefined,
        interpretation: formData.interpretation || undefined,
        notes: formData.notes || undefined,
      };

      const result = await databaseService.updateLabResult(labResult.id, updatedData);
      
      if (result) {
        setOpen(false);
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating lab result:', error);
      toast.error('Failed to update lab result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form data to original values
    setFormData({
      test_type: labResult.test_type,
      test_date: labResult.test_date,
      results: labResult.results,
      normal_range: labResult.normal_range || '',
      interpretation: labResult.interpretation || '',
      notes: labResult.notes || '',
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
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="test_type">Test Type</Label>
              <Input
                id="test_type"
                name="test_type"
                value={formData.test_type}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="test_date">Test Date</Label>
              <Input
                id="test_date"
                name="test_date"
                type="date"
                value={formData.test_date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="results">Results</Label>
              <Textarea
                id="results"
                name="results"
                value={formData.results}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="normal_range">Normal Range</Label>
              <Input
                id="normal_range"
                name="normal_range"
                value={formData.normal_range}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interpretation">Interpretation</Label>
              <Input
                id="interpretation"
                name="interpretation"
                value={formData.interpretation}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
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
