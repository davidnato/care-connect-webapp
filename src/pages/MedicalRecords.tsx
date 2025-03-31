
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
import { FileText, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock medical records data
const mockMedicalRecords = [
  {
    id: "1",
    type: "Visit Summary",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: new Date(2023, 5, 28),
    description: "Annual physical examination",
    category: "exam",
  },
  {
    id: "2",
    type: "Lab Results",
    doctor: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    date: new Date(2023, 5, 15),
    description: "Blood work panel including CBC, lipid profile",
    category: "lab",
  },
  {
    id: "3",
    type: "Imaging Report",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Radiology",
    date: new Date(2023, 4, 30),
    description: "Chest X-ray results",
    category: "imaging",
  },
  {
    id: "4",
    type: "Surgery Report",
    doctor: "Dr. James Wilson",
    specialty: "Orthopedics",
    date: new Date(2023, 3, 20),
    description: "Arthroscopic surgery on right knee",
    category: "procedure",
  },
  {
    id: "5",
    type: "Visit Summary",
    doctor: "Dr. Lisa Thompson",
    specialty: "Family Medicine",
    date: new Date(2023, 2, 10),
    description: "Follow-up for hypertension management",
    category: "exam",
  },
  {
    id: "6",
    type: "Prescription",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: new Date(2023, 1, 5),
    description: "Lisinopril 10mg for blood pressure control",
    category: "medication",
  },
  {
    id: "7",
    type: "Vaccination Record",
    doctor: "Dr. Lisa Thompson",
    specialty: "Family Medicine",
    date: new Date(2023, 0, 15),
    description: "Annual flu vaccination",
    category: "immunization",
  },
];

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter records based on search query and category
  const filteredRecords = mockMedicalRecords.filter((record) => {
    const matchesSearch =
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || record.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "exam":
        return <Badge className="bg-blue-500">Exam</Badge>;
      case "lab":
        return <Badge className="bg-purple-500">Lab</Badge>;
      case "imaging":
        return <Badge className="bg-orange-500">Imaging</Badge>;
      case "procedure":
        return <Badge className="bg-red-500">Procedure</Badge>;
      case "medication":
        return <Badge className="bg-green-500">Medication</Badge>;
      case "immunization":
        return <Badge className="bg-teal-500">Immunization</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              Access and manage your healthcare records
            </p>
          </div>
          <Button onClick={() => navigate("/records/request")}>
            Request New Records
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Health Records</CardTitle>
            <CardDescription>
              View and download your complete health history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by type, doctor, or description..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-[200px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Records</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="lab">Lab Results</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="procedure">Procedures</SelectItem>
                    <SelectItem value="medication">Medications</SelectItem>
                    <SelectItem value="immunization">Immunizations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredRecords.length > 0 ? (
              <div className="rounded-md border">
                <Accordion type="single" collapsible className="w-full">
                  {filteredRecords.map((record) => (
                    <AccordionItem key={record.id} value={record.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{record.type}</span>
                            {getCategoryBadge(record.category)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {record.date.toLocaleDateString()}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                              <p>{record.doctor}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Specialty</p>
                              <p>{record.specialty}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Date</p>
                              <p>{record.date.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Category</p>
                              <p>{record.category.charAt(0).toUpperCase() + record.category.slice(1)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Description</p>
                            <p>{record.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex gap-1 items-center"
                              onClick={() => navigate(`/records/${record.id}`)}
                            >
                              <FileText className="h-4 w-4" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex gap-1 items-center"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No records found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || categoryFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You don't have any medical records yet"}
                </p>
                <Button onClick={() => navigate("/records/request")}>
                  Request Medical Records
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MedicalRecords;
