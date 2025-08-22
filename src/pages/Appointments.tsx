import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import AppointmentEditDialog from "@/components/appointments/AppointmentEditDialog";
import { databaseService, Appointment } from "@/services/databaseService";
import { toast } from "sonner";

const Appointments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    const appointmentsData = await databaseService.getAppointments();
    setAppointments(appointmentsData);
    setLoading(false);
  };

  // Handle updating an appointment
  const handleUpdateAppointment = async (appointmentId: string, updatedData: Partial<Appointment>) => {
    const updatedAppointment = await databaseService.updateAppointment(appointmentId, updatedData);
    if (updatedAppointment) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, ...updatedAppointment }
            : appointment
        )
      );
    }
  };

  // Handle canceling an appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    const updatedAppointment = await databaseService.updateAppointment(appointmentId, { status: 'cancelled' });
    if (updatedAppointment) {
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: 'cancelled' }
            : appointment
        )
      );
      toast.success("Appointment cancelled successfully");
    }
  };

  // Filter appointments based on search query and status
  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = appointment.doctors ? `${appointment.doctors.first_name} ${appointment.doctors.last_name}` : '';
    const patientName = appointment.patients ? `${appointment.patients.first_name} ${appointment.patients.last_name}` : '';
    
    const matchesSearch =
      doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading appointments...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your healthcare appointments
            </p>
          </div>
          <Button onClick={() => navigate("/appointments/new")}>
            Schedule New Appointment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>View and manage all your appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by doctor, patient, or reason..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[200px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Appointments</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.patients ? 
                            `${appointment.patients.first_name} ${appointment.patients.last_name}` :
                            'Unknown Patient'
                          }
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {appointment.doctors ? 
                            `Dr. ${appointment.doctors.first_name} ${appointment.doctors.last_name}` :
                            'Unknown Doctor'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/appointments/${appointment.id}`)
                              }
                            >
                              View
                            </Button>
                            {appointment.status === "scheduled" && (
                              <>
                                <AppointmentEditDialog
                                  appointment={appointment}
                                  onUpdate={handleUpdateAppointment}
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No appointments found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You don't have any appointments yet"}
                </p>
                <Button onClick={() => navigate("/appointments/new")}>
                  Schedule an Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Appointments;