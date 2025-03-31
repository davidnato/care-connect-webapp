
import React, { useState } from "react";
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

// Mock appointments data
const mockAppointments = [
  {
    id: "1",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "Main Hospital, Room 302",
    date: new Date(2023, 6, 15, 10, 30),
    status: "upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatology",
    location: "Medical Center, Suite 205",
    date: new Date(2023, 6, 22, 14, 0),
    status: "upcoming",
  },
  {
    id: "3",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Neurology",
    location: "Neurology Clinic, Floor 4",
    date: new Date(2023, 5, 30, 9, 0),
    status: "completed",
  },
  {
    id: "4",
    doctor: "Dr. James Wilson",
    specialty: "Orthopedics",
    location: "Sports Medicine Center",
    date: new Date(2023, 5, 20, 11, 30),
    status: "completed",
  },
  {
    id: "5",
    doctor: "Dr. Lisa Thompson",
    specialty: "Family Medicine",
    location: "Community Health Center",
    date: new Date(2023, 5, 10, 16, 0),
    status: "cancelled",
  },
];

const Appointments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter appointments based on search query and status
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
                    placeholder="Search by doctor, specialty, or location..."
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
                    <SelectItem value="upcoming">Upcoming</SelectItem>
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
                      <TableHead>Doctor</TableHead>
                      <TableHead className="hidden md:table-cell">Specialty</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.doctor}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {appointment.specialty}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {appointment.location}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>
                                {appointment.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </TableCell>
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
                            {appointment.status === "upcoming" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/appointments/${appointment.id}/edit`)
                                  }
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    // In a real app, this would call an API
                                    console.log("Cancel appointment:", appointment.id);
                                  }}
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
