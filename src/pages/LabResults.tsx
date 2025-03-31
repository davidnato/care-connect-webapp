
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
import { ClipboardList, Download, Search, FileText } from "lucide-react";
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

// Mock lab results data
const mockLabResults = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    date: new Date(2023, 5, 15),
    doctor: "Dr. Michael Chen",
    facility: "Main Hospital Lab",
    status: "normal",
    category: "blood",
    results: [
      { name: "White Blood Cell Count", value: "7.5", unit: "K/uL", range: "4.5-11.0" },
      { name: "Red Blood Cell Count", value: "5.2", unit: "M/uL", range: "4.5-5.9" },
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5" },
      { name: "Hematocrit", value: "42", unit: "%", range: "41-50" },
      { name: "Platelet Count", value: "250", unit: "K/uL", range: "150-450" },
    ],
  },
  {
    id: "2",
    name: "Lipid Panel",
    date: new Date(2023, 5, 15),
    doctor: "Dr. Sarah Johnson",
    facility: "Cardiology Clinic",
    status: "abnormal",
    category: "blood",
    results: [
      { name: "Total Cholesterol", value: "210", unit: "mg/dL", range: "<200", flagged: true },
      { name: "HDL Cholesterol", value: "45", unit: "mg/dL", range: ">40" },
      { name: "LDL Cholesterol", value: "130", unit: "mg/dL", range: "<100", flagged: true },
      { name: "Triglycerides", value: "180", unit: "mg/dL", range: "<150", flagged: true },
    ],
  },
  {
    id: "3",
    name: "Comprehensive Metabolic Panel",
    date: new Date(2023, 4, 1),
    doctor: "Dr. Michael Chen",
    facility: "Main Hospital Lab",
    status: "normal",
    category: "blood",
    results: [
      { name: "Glucose", value: "95", unit: "mg/dL", range: "70-99" },
      { name: "Sodium", value: "140", unit: "mmol/L", range: "136-145" },
      { name: "Potassium", value: "4.0", unit: "mmol/L", range: "3.5-5.0" },
      { name: "Calcium", value: "9.5", unit: "mg/dL", range: "8.5-10.2" },
      { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.6-1.2" },
      { name: "BUN", value: "15", unit: "mg/dL", range: "7-20" },
    ],
  },
  {
    id: "4",
    name: "Urinalysis",
    date: new Date(2023, 3, 18),
    doctor: "Dr. Lisa Thompson",
    facility: "Family Medicine Clinic",
    status: "normal",
    category: "urine",
    results: [
      { name: "Color", value: "Yellow", unit: "", range: "Yellow" },
      { name: "Clarity", value: "Clear", unit: "", range: "Clear" },
      { name: "pH", value: "5.5", unit: "", range: "5.0-8.0" },
      { name: "Protein", value: "Negative", unit: "", range: "Negative" },
      { name: "Glucose", value: "Negative", unit: "", range: "Negative" },
      { name: "Ketones", value: "Negative", unit: "", range: "Negative" },
    ],
  },
  {
    id: "5",
    name: "Thyroid Function Tests",
    date: new Date(2023, 2, 10),
    doctor: "Dr. Lisa Thompson",
    facility: "Main Hospital Lab",
    status: "normal",
    category: "blood",
    results: [
      { name: "TSH", value: "2.5", unit: "mIU/L", range: "0.4-4.0" },
      { name: "Free T4", value: "1.2", unit: "ng/dL", range: "0.8-1.8" },
      { name: "Free T3", value: "3.1", unit: "pg/mL", range: "2.3-4.2" },
    ],
  },
];

const LabResults = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter lab results based on search query, category, and status
  const filteredResults = mockLabResults.filter((result) => {
    const matchesSearch =
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.facility.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || result.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-500">Normal</Badge>;
      case "abnormal":
        return <Badge variant="destructive">Abnormal</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lab Results</h1>
            <p className="text-muted-foreground">
              View and analyze your laboratory test results
            </p>
          </div>
          <Button onClick={() => navigate("/lab-results/request")}>
            Request New Test
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Lab Results</CardTitle>
            <CardDescription>View details of all your laboratory tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by test name, doctor, or facility..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Test category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="blood">Blood Tests</SelectItem>
                    <SelectItem value="urine">Urine Tests</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="pathology">Pathology</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Result status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="abnormal">Abnormal</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredResults.length > 0 ? (
              <div className="rounded-md border">
                <Accordion type="single" collapsible className="w-full">
                  {filteredResults.map((result) => (
                    <AccordionItem key={result.id} value={result.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <ClipboardList className="h-4 w-4 text-primary" />
                            <span className="font-medium">{result.name}</span>
                            {getStatusBadge(result.status)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {result.date.toLocaleDateString()}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                              <p>{result.doctor}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Facility</p>
                              <p>{result.facility}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Date</p>
                              <p>{result.date.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Category</p>
                              <p>{result.category.charAt(0).toUpperCase() + result.category.slice(1)}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Test Results</h4>
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Test</TableHead>
                                    <TableHead>Result</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Reference Range</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {result.results.map((item, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell className={item.flagged ? "text-red-500 font-medium" : ""}>
                                        {item.value}
                                      </TableCell>
                                      <TableCell>{item.unit}</TableCell>
                                      <TableCell>{item.range}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex gap-1 items-center"
                              onClick={() => navigate(`/lab-results/${result.id}`)}
                            >
                              <FileText className="h-4 w-4" />
                              View Full Report
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex gap-1 items-center"
                            >
                              <Download className="h-4 w-4" />
                              Download PDF
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
                <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No lab results found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "You don't have any lab results yet"}
                </p>
                <Button onClick={() => navigate("/lab-results/request")}>
                  Request New Test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LabResults;
