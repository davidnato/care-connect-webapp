
import { useState, useEffect } from "react";
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
import { databaseService, Patient } from "@/services/databaseService";

const Patients = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    const patientsData = await databaseService.getPatients();
    setPatients(patientsData);
    setLoading(false);
  };

  const handleUpdatePatient = async (patientId: string, updatedData: Partial<Patient>) => {
    const updatedPatient = await databaseService.updatePatient(patientId, updatedData);
    if (updatedPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === patientId
            ? { ...patient, ...updatedPatient }
            : patient
        )
      );
    }
  };

  // Check if user has access (admin or doctor)
  if (user?.role !== "admin" && user?.role !== "doctor") {
    navigate("/dashboard");
    return null;
  }

  // Filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      patient.contact_number.toLowerCase().includes(searchLower)
    );
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading patients...</p>
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
                  placeholder="Search by name or phone..."
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
                      <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(patient.first_name, patient.last_name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{patient.first_name} {patient.last_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {calculateAge(patient.date_of_birth)} yrs, {patient.gender}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-sm">{patient.contact_number}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{new Date(patient.date_of_birth).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{patient.address}</span>
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
