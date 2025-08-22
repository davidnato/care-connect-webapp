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
import { Badge } from "@/components/ui/badge";
import { Pill, Search, Calendar, Clock, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import { databaseService, Medication } from "@/services/databaseService";
import { toast } from "sonner";

const Medications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    setLoading(true);
    const medicationsData = await databaseService.getMedications();
    setMedications(medicationsData);
    setLoading(false);
  };

  // Filter medications based on search query and status
  const filteredMedications = medications.filter((medication) => {
    const doctorName = medication.doctors ? `${medication.doctors.first_name} ${medication.doctors.last_name}` : '';
    const patientName = medication.patients ? `${medication.patients.first_name} ${medication.patients.last_name}` : '';
    
    const matchesSearch =
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || medication.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "discontinued":
        return <Badge variant="destructive">Discontinued</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAddMedication = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    // For now, we'll show a message that the functionality needs patient/doctor selection
    toast.info("Medication management requires patient and doctor assignment. This feature will be enhanced.");
    
    setFormLoading(false);
    setIsAddDialogOpen(false);
  };

  const handleDiscontinueMedication = async (medicationId: string, medicationName: string) => {
    const updatedMedication = await databaseService.updateMedication(medicationId, { status: 'discontinued' });
    if (updatedMedication) {
      setMedications(
        medications.map((medication) =>
          medication.id === medicationId
            ? { ...medication, status: 'discontinued' }
            : medication
        )
      );
      toast.success(`${medicationName} marked as discontinued`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading medications...</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Medications</h1>
            <p className="text-muted-foreground">
              Manage your medications and prescriptions
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddMedication}>
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
                  <DialogDescription>
                    Enter the details of your new medication
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Medication Name</Label>
                      <Input id="name" name="name" placeholder="e.g., Lisinopril" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" name="dosage" placeholder="e.g., 10mg" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" name="frequency" placeholder="e.g., Once daily" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="discontinued">Discontinued</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" name="notes" placeholder="Special instructions or notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? "Adding..." : "Add Medication"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Medications</CardTitle>
            <CardDescription>View and manage all your medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, dosage, doctor, or patient..."
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
                    <SelectItem value="all">All Medications</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredMedications.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead className="hidden md:table-cell">Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Prescribed By</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedications.map((medication) => (
                      <TableRow key={medication.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{medication.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {medication.dosage}, {medication.frequency}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {medication.patients ? 
                            `${medication.patients.first_name} ${medication.patients.last_name}` :
                            'Unknown Patient'
                          }
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {medication.doctors ? 
                            `Dr. ${medication.doctors.first_name} ${medication.doctors.last_name}` :
                            'Unknown Doctor'
                          }
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span className="text-xs">Start: {new Date(medication.start_date).toLocaleDateString()}</span>
                            </div>
                            {medication.end_date && (
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span className="text-xs">End: {new Date(medication.end_date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(medication.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/medications/${medication.id}`)}
                            >
                              View
                            </Button>
                            {medication.status === "active" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDiscontinueMedication(medication.id, medication.name)}
                              >
                                Discontinue
                              </Button>
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
                <Pill className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No medications found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You don't have any medications yet"}
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  Add Medication
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Medications;