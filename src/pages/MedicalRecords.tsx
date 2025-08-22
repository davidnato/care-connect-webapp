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
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Download } from "lucide-react";
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
import MedicalRecordEditDialog from "@/components/records/MedicalRecordEditDialog";
import { databaseService, MedicalRecord } from "@/services/databaseService";

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedicalRecords();
  }, []);

  const loadMedicalRecords = async () => {
    setLoading(true);
    const recordsData = await databaseService.getMedicalRecords();
    setRecords(recordsData);
    setLoading(false);
  };

  // Handle updating a medical record
  const handleUpdateRecord = async (recordId: string, updatedData: Partial<MedicalRecord>) => {
    // For now, just update the local state (placeholder for real implementation)
    setRecords(
      records.map((record) =>
        record.id === recordId
          ? { ...record, ...updatedData }
          : record
      )
    );
  };

  // Filter records based on search query and category
  const filteredRecords = records.filter((record) => {
    const doctorName = record.doctors ? `${record.doctors.first_name} ${record.doctors.last_name}` : '';
    const patientName = record.patients ? `${record.patients.first_name} ${record.patients.last_name}` : '';
    
    const matchesSearch =
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patientName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading medical records...</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">
              Access and manage your healthcare records
            </p>
          </div>
          <Button onClick={() => navigate("/records/new")}>
            Create New Record
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Health Records</CardTitle>
            <CardDescription>
              View your complete health history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by diagnosis, treatment, or doctor..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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
                            <span className="font-medium">{record.diagnosis}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="flex flex-col space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
                              <p>
                                {record.doctors ? 
                                  `Dr. ${record.doctors.first_name} ${record.doctors.last_name}` :
                                  'Unknown Doctor'
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Patient</p>
                              <p>
                                {record.patients ? 
                                  `${record.patients.first_name} ${record.patients.last_name}` :
                                  'Unknown Patient'
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Date</p>
                              <p>{new Date(record.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Treatment</p>
                              <p>{record.treatment}</p>
                            </div>
                          </div>
                          {record.prescription && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Prescription</p>
                              <p>{record.prescription}</p>
                            </div>
                          )}
                          {record.notes && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Notes</p>
                              <p>{record.notes}</p>
                            </div>
                          )}
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
                            <MedicalRecordEditDialog
                              record={record}
                              onUpdate={handleUpdateRecord}
                            />
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
                  {searchQuery
                    ? "Try adjusting your search"
                    : "You don't have any medical records yet"}
                </p>
                <Button onClick={() => navigate("/records/new")}>
                  Create Medical Record
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