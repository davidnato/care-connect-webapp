
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  User, 
  FileText, 
  Heart, 
  Activity, 
  Pill, 
  BadgeAlert, 
  CalendarClock 
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  // Mock medical data
  const allergies = ["Penicillin", "Peanuts", "Latex"];
  const conditions = ["Hypertension", "Type 2 Diabetes"];
  const bloodType = "O+";
  const emergencyContact = {
    name: "John Smith",
    relationship: "Spouse",
    phone: "(555) 123-4567"
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              View and manage your personal information
            </p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">
                  {user?.name.split(" ").map(name => name[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              <p className="text-sm text-muted-foreground mt-1">Patient ID: P-12345</p>
              <div className="mt-6 w-full">
                <Button variant="outline" className="w-full" onClick={() => navigate("/settings")}>
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="information">Personal Information</TabsTrigger>
                <TabsTrigger value="medical">Medical Information</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
              </TabsList>

              <TabsContent value="information" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullname">Full Name</Label>
                          <Input id="fullname" defaultValue={user?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user?.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="(555) 987-6543" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" defaultValue="1985-06-15" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Input id="gender" defaultValue="Male" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 Main St, Anytown, CA 12345" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                          <p>{user?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{user?.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                          <p>(555) 987-6543</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                          <p>June 15, 1985</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Gender</p>
                          <p>Male</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Address</p>
                          <p>123 Main St, Anytown, CA 12345</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BadgeAlert className="mr-2 h-5 w-5" />
                      Emergency Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergency-name">Name</Label>
                          <Input id="emergency-name" defaultValue={emergencyContact.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-relationship">Relationship</Label>
                          <Input id="emergency-relationship" defaultValue={emergencyContact.relationship} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-phone">Phone Number</Label>
                          <Input id="emergency-phone" defaultValue={emergencyContact.phone} />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Name</p>
                          <p>{emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Relationship</p>
                          <p>{emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                          <p>{emergencyContact.phone}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 h-5 w-5" />
                      Medical Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="blood-type">Blood Type</Label>
                          <Input id="blood-type" defaultValue={bloodType} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height</Label>
                          <Input id="height" defaultValue="5'10&quot; (178 cm)" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight</Label>
                          <Input id="weight" defaultValue="165 lbs (75 kg)" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="allergies">Allergies</Label>
                          <Textarea 
                            id="allergies" 
                            defaultValue={allergies.join("\n")} 
                            placeholder="Enter allergies, one per line"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="conditions">Medical Conditions</Label>
                          <Textarea 
                            id="conditions" 
                            defaultValue={conditions.join("\n")} 
                            placeholder="Enter conditions, one per line"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                            <p>{bloodType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Height</p>
                            <p>5&apos;10&quot; (178 cm)</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Weight</p>
                            <p>165 lbs (75 kg)</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {allergies.map((allergy, index) => (
                              <div key={index} className="bg-muted px-3 py-1 rounded-md text-sm">
                                {allergy}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Medical Conditions</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {conditions.map((condition, index) => (
                              <div key={index} className="bg-muted px-3 py-1 rounded-md text-sm">
                                {condition}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Pill className="mr-2 h-5 w-5" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="medications">Medications</Label>
                          <Textarea 
                            id="medications" 
                            defaultValue="Lisinopril 10mg - Once daily\nMetformin 500mg - Twice daily" 
                            placeholder="Enter medications and dosage"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Lisinopril 10mg</p>
                              <p className="text-sm text-muted-foreground">For blood pressure</p>
                            </div>
                            <p className="text-sm">Once daily</p>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <div>
                              <p className="font-medium">Metformin 500mg</p>
                              <p className="text-sm text-muted-foreground">For blood sugar</p>
                            </div>
                            <p className="text-sm">Twice daily</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => navigate("/medications")}
                        >
                          View All Medications
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarClock className="mr-2 h-5 w-5" />
                      Recent Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Dr. Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">Cardiology Checkup</p>
                          </div>
                          <p className="text-sm">June 28, 2023</p>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Dr. Michael Chen</p>
                            <p className="text-sm text-muted-foreground">Lab Work</p>
                          </div>
                          <p className="text-sm">June 15, 2023</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/appointments")}
                      >
                        View All Appointments
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="mr-2 h-5 w-5" />
                      Vitals History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium text-muted-foreground">Blood Pressure</p>
                          <p className="text-lg font-medium">120/80</p>
                          <p className="text-xs text-muted-foreground">Last checked: June 28, 2023</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                          <p className="text-lg font-medium">72 bpm</p>
                          <p className="text-xs text-muted-foreground">Last checked: June 28, 2023</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                          <p className="text-lg font-medium">98.6 °F</p>
                          <p className="text-xs text-muted-foreground">Last checked: June 28, 2023</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium text-muted-foreground">Blood Glucose</p>
                          <p className="text-lg font-medium">110 mg/dL</p>
                          <p className="text-xs text-muted-foreground">Last checked: June 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Recent Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Visit Summary</p>
                            <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - Cardiology</p>
                          </div>
                          <p className="text-sm">June 28, 2023</p>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">Lab Results</p>
                            <p className="text-sm text-muted-foreground">Blood Work</p>
                          </div>
                          <p className="text-sm">June 15, 2023</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/records")}
                      >
                        View All Records
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
