
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { databaseService, type LabResult } from "@/services/databaseService";
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

const LabResults = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabResults = async () => {
      setLoading(true);
      const results = await databaseService.getLabResults();
      setLabResults(results);
      setLoading(false);
    };

    fetchLabResults();
  }, []);

  // Filter lab results based on search query, category, and status
  const filteredResults = labResults.filter((result) => {
    const doctorName = result.doctors ? `${result.doctors.first_name} ${result.doctors.last_name}` : '';
    const matchesSearch =
      result.test_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (result.notes && result.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || result.test_type.toLowerCase().includes(categoryFilter);
    const matchesStatus = statusFilter === "all" || (result.interpretation && result.interpretation.toLowerCase() === statusFilter);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (interpretation?: string) => {
    if (!interpretation) return <Badge variant="outline">Pending</Badge>;
    
    const status = interpretation.toLowerCase();
    if (status.includes('normal')) {
      return <Badge className="bg-green-500">Normal</Badge>;
    } else if (status.includes('abnormal') || status.includes('high') || status.includes('low')) {
      return <Badge variant="destructive">Abnormal</Badge>;
    } else {
      return <Badge variant="outline">{interpretation}</Badge>;
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

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="text-muted-foreground">Loading lab results...</div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="rounded-md border">
                <Accordion type="single" collapsible className="w-full">
                  {filteredResults.map((result) => (
                    <AccordionItem key={result.id} value={result.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                        <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-2 mb-2 md:mb-0">
                            <ClipboardList className="h-4 w-4 text-primary" />
                            <span className="font-medium">{result.test_type}</span>
                            {getStatusBadge(result.interpretation)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {new Date(result.test_date).toLocaleDateString()}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                              <p>{result.doctors ? `${result.doctors.first_name} ${result.doctors.last_name}` : 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Patient</p>
                              <p>{result.patients ? `${result.patients.first_name} ${result.patients.last_name}` : 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Date</p>
                              <p>{new Date(result.test_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Test Type</p>
                              <p>{result.test_type}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Results</h4>
                            <div className="rounded-md border p-4">
                              <p className="whitespace-pre-wrap">{result.results}</p>
                              {result.normal_range && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-muted-foreground">Normal Range:</p>
                                  <p className="text-sm">{result.normal_range}</p>
                                </div>
                              )}
                              {result.interpretation && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-muted-foreground">Interpretation:</p>
                                  <p className="text-sm">{result.interpretation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {result.notes && (
                            <div>
                              <h4 className="font-medium mb-2">Notes</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.notes}</p>
                            </div>
                          )}
                          
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
