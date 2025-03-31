
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
import { toast } from "sonner";

// Mock medications data
const mockMedications = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 8, 1),
    prescribedBy: "Dr. Sarah Johnson",
    status: "active",
    instructions: "Take in the morning with food",
    purpose: "Blood pressure control",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: new Date(2023, 4, 15),
    endDate: new Date(2023, 10, 15),
    prescribedBy: "Dr. Michael Chen",
    status: "active",
    instructions: "Take with meals",
    purpose: "Blood sugar control",
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    startDate: new Date(2023, 3, 10),
    endDate: new Date(2023, 9, 10),
    prescribedBy: "Dr. Sarah Johnson",
    status: "active",
    instructions: "Take at night",
    purpose: "Cholesterol control",
  },
  {
    id: "4",
    name: "Sertraline",
    dosage: "50mg",
    frequency: "Once daily",
    startDate: new Date(2023, 2, 1),
    endDate: new Date(2023, 5, 1),
    prescribedBy: "Dr. Lisa Thompson",
    status: "completed",
    instructions: "Take in the morning",
    purpose: "Anxiety management",
  },
  {
    id: "5",
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    startDate: new Date(2023, 1, 15),
    endDate: new Date(2023, 1, 25),
    prescribedBy: "Dr. James Wilson",
    status: "completed",
    instructions: "Take with or without food",
    purpose: "Infection treatment",
  },
];

const Medications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter medications based on search query and status
  const filteredMedications = mockMedications.filter((medication) => {
    const matchesSearch =
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medication.prescribedBy.toLowerCase().includes(searchQuery.toLowerCase());

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

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsAddDialogOpen(false);
      toast.success("Medication added successfully");
    }, 1000);
  };

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
                      <Input id="name" placeholder="e.g., Lisinopril" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" placeholder="e.g., 10mg" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" placeholder="e.g., Once daily" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prescribedBy">Prescribed By</Label>
                      <Input id="prescribedBy" placeholder="e.g., Dr. Smith" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input id="purpose" placeholder="What is this medication for?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Input id="instructions" placeholder="Special instructions" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Medication"}
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
                    placeholder="Search by name, dosage, or doctor..."
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
                      <TableHead className="hidden md:table-cell">Dosage & Frequency</TableHead>
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
                            <span className="text-xs text-muted-foreground md:hidden">
                              {medication.dosage}, {medication.frequency}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <span>{medication.dosage}</span>
                            <span className="text-xs text-muted-foreground">{medication.frequency}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {medication.prescribedBy}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span className="text-xs">Start: {formatDate(medication.startDate)}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span className="text-xs">End: {formatDate(medication.endDate)}</span>
                            </div>
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
                                onClick={() => {
                                  toast.success(`${medication.name} marked as discontinued`);
                                }}
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
