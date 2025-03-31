
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  location: string;
  date: Date;
  status: string;
}

interface AppointmentEditDialogProps {
  appointment: Appointment;
  onUpdate: (appointmentId: string, updatedData: Partial<Appointment>) => void;
}

const AppointmentEditDialog = ({ appointment, onUpdate }: AppointmentEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: appointment.doctor,
    specialty: appointment.specialty,
    location: appointment.location,
    date: appointment.date.toISOString().split("T")[0],
    time: appointment.date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    status: appointment.status,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a new date object from the date and time inputs
    const [year, month, day] = formData.date.split("-").map(Number);
    const [hours, minutes] = formData.time.split(":").map(Number);
    const updatedDate = new Date(year, month - 1, day, hours, minutes);

    // Prepare the updated appointment data
    const updatedAppointment = {
      doctor: formData.doctor,
      specialty: formData.specialty,
      location: formData.location,
      date: updatedDate,
      status: formData.status,
    };

    // Simulate API call
    setTimeout(() => {
      onUpdate(appointment.id, updatedAppointment);
      setIsLoading(false);
      setOpen(false);
      toast.success("Appointment updated successfully");
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
    // Reset form data to original values
    setFormData({
      doctor: appointment.doctor,
      specialty: appointment.specialty,
      location: appointment.location,
      date: appointment.date.toISOString().split("T")[0],
      time: appointment.date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      status: appointment.status,
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
          title="Edit Appointment"
          isLoading={isLoading}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>
        </RecordUpdateForm>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentEditDialog;
