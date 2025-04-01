
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
import { ClipboardList, Upload } from "lucide-react";

const NewLabResult = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Lab test requested successfully");
      navigate("/lab-results");
    }, 1000);
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
                    <Label htmlFor="test-name">Test Name</Label>
                    <Input id="test-name" placeholder="Complete Blood Count (CBC)" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="test-type">Test Type</Label>
                    <Select required>
                      <SelectTrigger id="test-type">
                        <SelectValue placeholder="Select test type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blood">Blood Test</SelectItem>
                        <SelectItem value="urine">Urine Test</SelectItem>
                        <SelectItem value="imaging">Imaging</SelectItem>
                        <SelectItem value="pathology">Pathology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lab-facility">Lab Facility</Label>
                    <Select required>
                      <SelectTrigger id="lab-facility">
                        <SelectValue placeholder="Select lab facility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main-hospital">Main Hospital Lab</SelectItem>
                        <SelectItem value="quest">Quest Diagnostics</SelectItem>
                        <SelectItem value="labcorp">LabCorp</SelectItem>
                        <SelectItem value="clinica">Clinica Laboratory</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requested-date">Requested Date</Label>
                    <Input id="requested-date" type="date" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requested-by">Requested By</Label>
                    <Select required>
                      <SelectTrigger id="requested-by">
                        <SelectValue placeholder="Select doctor" />
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
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reason">Reason for Test</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Explain why this test is being requested" 
                      className="min-h-[100px]" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Have Results Already?</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-4">
                      <div className="bg-muted rounded-full p-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Drag and drop lab results here or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports PDF, JPG, PNG (max 5MB)
                        </p>
                      </div>
                      <Input id="results-file" type="file" className="hidden" />
                      <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('results-file')?.click()}>
                        Upload Results
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any special instructions for the lab" 
                      className="min-h-[80px]"
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
