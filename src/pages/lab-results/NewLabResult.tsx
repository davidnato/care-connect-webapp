
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { databaseService, type Patient, type Doctor } from "@/services/databaseService";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ClipboardList, Upload } from "lucide-react";

const NewLabResult = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    test_type: '',
    patient_id: '',
    doctor_id: '',
    test_date: '',
    results: '',
    normal_range: '',
    interpretation: '',
    notes: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const [patientsData, doctorsData] = await Promise.all([
        databaseService.getPatients(),
        databaseService.getDoctors()
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
    };
    fetchData();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const labResultData = {
        test_type: formData.test_type,
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        test_date: formData.test_date,
        results: formData.results,
        normal_range: formData.normal_range || undefined,
        interpretation: formData.interpretation || undefined,
        notes: formData.notes || undefined,
      };

      const result = await databaseService.createLabResult(labResultData);
      
      if (result) {
        navigate("/lab-results");
      }
    } catch (error) {
      console.error('Error creating lab result:', error);
      toast.error('Failed to create lab result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Request New Lab Test</h1>
            <p className="text-muted-foreground">
              Request a new laboratory test or upload results
            </p>
          </div>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Lab Test Details</CardTitle>
            <CardDescription>Enter information for the new lab test</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="test-type">Test Type</Label>
                    <Input 
                      id="test-type" 
                      placeholder="Complete Blood Count (CBC)" 
                      value={formData.test_type}
                      onChange={(e) => handleChange('test_type', e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select 
                      value={formData.patient_id} 
                      onValueChange={(value) => handleChange('patient_id', value)}
                      required
                    >
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.first_name} {patient.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select 
                      value={formData.doctor_id} 
                      onValueChange={(value) => handleChange('doctor_id', value)}
                      required
                    >
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            Dr. {doctor.first_name} {doctor.last_name} ({doctor.specialty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="test-date">Test Date</Label>
                    <Input 
                      id="test-date" 
                      type="date" 
                      value={formData.test_date}
                      onChange={(e) => handleChange('test_date', e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="results">Test Results</Label>
                    <Textarea 
                      id="results" 
                      placeholder="Enter the test results..." 
                      className="min-h-[100px]"
                      value={formData.results}
                      onChange={(e) => handleChange('results', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="normal-range">Normal Range (Optional)</Label>
                    <Input 
                      id="normal-range" 
                      placeholder="e.g., 4.5-11.0 K/uL"
                      value={formData.normal_range}
                      onChange={(e) => handleChange('normal_range', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interpretation">Interpretation (Optional)</Label>
                    <Input 
                      id="interpretation" 
                      placeholder="e.g., Normal, Abnormal, High, Low"
                      value={formData.interpretation}
                      onChange={(e) => handleChange('interpretation', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any additional notes about the test results..."
                      className="min-h-[80px]"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/lab-results")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Requesting..." : "Request Test"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewLabResult;
