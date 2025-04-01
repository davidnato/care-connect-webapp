
import React, { useState } from "react";
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
import { FileText, Upload } from "lucide-react";

const NewMedicalRecord = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Medical record created successfully");
      navigate("/records");
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Medical Record</h1>
            <p className="text-muted-foreground">
              Create a new medical record or upload documentation
            </p>
          </div>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Medical Record Details</CardTitle>
            <CardDescription>Enter information for the new medical record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Record Title</Label>
                    <Input id="title" placeholder="Visit Summary" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Record Type</Label>
                    <Select required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visit-summary">Visit Summary</SelectItem>
                        <SelectItem value="lab-results">Lab Results</SelectItem>
                        <SelectItem value="prescription">Prescription</SelectItem>
                        <SelectItem value="imaging">Imaging Report</SelectItem>
                        <SelectItem value="surgical">Surgical Report</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor/Provider</Label>
                    <Select required>
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez</SelectItem>
                        <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                        <SelectItem value="dr-thompson">Dr. Lisa Thompson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Record Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Detailed description of the medical record" 
                      className="min-h-[100px]" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload Document</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-4">
                      <div className="bg-muted rounded-full p-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports PDF, JPG, PNG (max 5MB)
                        </p>
                      </div>
                      <Input id="file" type="file" className="hidden" />
                      <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file')?.click()}>
                        Choose File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any additional notes or information" 
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/records")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Record"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewMedicalRecord;
