
import { useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, FileText, Calendar, Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PatientEditDialog from "@/components/patients/PatientEditDialog";
import { toast } from "sonner";

// Mock patients data
const mockPatients = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    lastVisit: new Date(2023, 5, 28),
    conditions: ["Hypertension", "Type 2 Diabetes"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "(555) 987-6543",
    email: "sarah.johnson@example.com",
    lastVisit: new Date(2023, 5, 15),
    conditions: ["Asthma", "Anxiety"],
  },
  {
    id: "3",
    name: "Robert Williams",
    age: 58,
    gender: "Male",
    phone: "(555) 456-7890",
    email: "robert.williams@example.com",
    lastVisit: new Date(2023, 4, 30),
    conditions: ["Coronary Artery Disease", "Arthritis"],
  },
  {
    id: "4",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    phone: "(555) 789-0123",
    email: "emily.davis@example.com",
    lastVisit: new Date(2023, 4, 10),
    conditions: ["Migraine", "Depression"],
  },
  {
    id: "5",
    name: "Michael Brown",
    age: 65,
    gender: "Male",
    phone: "(555) 234-5678",
    email: "michael.brown@example.com",
    lastVisit: new Date(2023, 3, 22),
    conditions: ["COPD", "Hypertension", "Hyperlipidemia"],
  },
  {
    id: "6",
    name: "Jennifer Wilson",
    age: 41,
    gender: "Female",
    phone: "(555) 345-6789",
    email: "jennifer.wilson@example.com",
    lastVisit: new Date(2023, 3, 5),
    conditions: ["Hypothyroidism", "Fibromyalgia"],
  },
  {
    id: "7",
    name: "David Martinez",
    age: 52,
    gender: "Male",
    phone: "(555) 567-8901",
    email: "david.martinez@example.com",
    lastVisit: new Date(2023, 2, 18),
    conditions: ["Type 2 Diabetes", "Obesity"],
  },
];

const Patients = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState(mockPatients);

  // Handle updating a patient
  const handleUpdatePatient = (patientId: string, updatedData: Partial<typeof patients[0]>) => {
    setPatients(
      patients.map((patient) =>
        patient.id === patientId
          ? { ...patient, ...updatedData }
          : patient
      )
    );
  };

  // Check if user has access (admin or doctor)
  if (user?.role !== "admin" && user?.role !== "doctor") {
    navigate("/dashboard");
    return null;
  }

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchLower))
    );
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">
              Manage your patients and their medical records
            </p>
          </div>
          <Button onClick={() => navigate("/patients/new")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
            <CardDescription>
              View and manage your patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or condition..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredPatients.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                      <TableHead>Conditions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {patient.age} yrs, {patient.gender}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-sm">{patient.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-sm">{patient.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{patient.lastVisit.toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {patient.conditions.map((condition, index) => (
                              <span
                                key={index}
                                className="bg-muted text-xs px-2 py-1 rounded-full"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/patients/${patient.id}`)}
                            >
                              View
                            </Button>
                            <PatientEditDialog
                              patient={patient}
                              onUpdate={handleUpdatePatient}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/patients/${patient.id}/records`)}
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Records</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/appointments/new?patient=${patient.id}`)}
                            >
                              <Calendar className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">Schedule</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No patients found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Add your first patient to get started"}
                </p>
                <Button onClick={() => navigate("/patients/new")}>
                  Add New Patient
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Patients;
