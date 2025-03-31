
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, FileText, Pill, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const mockAppointments = [
  {
    id: "1",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: new Date(2023, 6, 15, 10, 30),
    status: "upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatology",
    date: new Date(2023, 6, 22, 14, 0),
    status: "upcoming",
  },
];

const mockMedications = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 8, 1),
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: new Date(2023, 4, 15),
    endDate: new Date(2023, 10, 15),
  },
];

const mockRecentRecords = [
  {
    id: "1",
    type: "Visit Summary",
    doctor: "Dr. Sarah Johnson",
    date: new Date(2023, 5, 28),
    description: "Annual physical examination",
  },
  {
    id: "2",
    type: "Lab Results",
    doctor: "Dr. Michael Chen",
    date: new Date(2023, 5, 15),
    description: "Blood work results",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    document.title = "Dashboard | MediRecord";
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
            <p className="text-muted-foreground">
              Here's an overview of your health information
            </p>
          </div>
          <Button onClick={() => navigate("/appointments/new")}>
            Schedule Appointment
          </Button>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {mockAppointments.length > 0 ? (
                    <div>
                      <p className="text-xl font-bold">{mockAppointments[0].doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(mockAppointments[0].date)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">{mockMedications.length}</p>
                  <p className="text-sm text-muted-foreground">Current prescriptions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">{mockRecentRecords.length}</p>
                  <p className="text-sm text-muted-foreground">In the last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Primary Doctor</CardTitle>
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">Dr. Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Cardiology</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {mockAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{appointment.doctor}</p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.specialty}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {formatDate(appointment.date)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {appointment.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate("/appointments")}
                      >
                        View All Appointments
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="text-muted-foreground">No upcoming appointments</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate("/appointments/new")}
                      >
                        Schedule an Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Medical Records</CardTitle>
                  <CardDescription>Your latest health records</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockRecentRecords.length > 0 ? (
                    <div className="space-y-4">
                      {mockRecentRecords.map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{record.type}</p>
                              <p className="text-sm text-muted-foreground">
                                {record.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {record.date.toLocaleDateString()}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                              onClick={() => navigate(`/records/${record.id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate("/records")}
                      >
                        View All Records
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                      <p className="text-muted-foreground">No recent records</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate("/records")}
                      >
                        View All Records
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {mockAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{appointment.doctor}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.specialty}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatDate(appointment.date)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="destructive">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <p className="text-muted-foreground">No upcoming appointments</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate("/appointments/new")}
                    >
                      Schedule an Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your active prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {mockMedications.length > 0 ? (
                  <div className="space-y-4">
                    {mockMedications.map((medication) => (
                      <div
                        key={medication.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Pill className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{medication.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {medication.dosage}, {medication.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Started: {medication.startDate.toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Until: {medication.endDate.toLocaleDateString()}
                          </p>
                          <Button size="sm" variant="ghost" className="mt-1">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <p className="text-muted-foreground">No active medications</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate("/medications")}
                    >
                      View Medication History
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>Your health history records</CardDescription>
              </CardHeader>
              <CardContent>
                {mockRecentRecords.length > 0 ? (
                  <div className="space-y-4">
                    {mockRecentRecords.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{record.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {record.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {record.date.toLocaleDateString()}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-1"
                            onClick={() => navigate(`/records/${record.id}`)}
                          >
                            View Record
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <p className="text-muted-foreground">No medical records found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
