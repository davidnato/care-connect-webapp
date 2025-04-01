
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { CalendarClock, FileText, ClipboardList, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to MediRecord</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive healthcare records management system
          </p>
          
          {!isAuthenticated && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarClock className="mr-2 h-5 w-5 text-primary" />
                  Appointments
                </CardTitle>
                <CardDescription>
                  Manage your healthcare appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Schedule, view, and manage all your upcoming doctor appointments in one place.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/appointments")}>
                  View Appointments
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Medical Records
                </CardTitle>
                <CardDescription>
                  Access your health records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Securely store and access your medical history, diagnoses, and treatment plans.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/records")}>
                  View Records
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                  Lab Results
                </CardTitle>
                <CardDescription>
                  View your test results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Quickly access and review all your laboratory test results and diagnostics.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/lab-results")}>
                  View Lab Results
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Patients
                </CardTitle>
                <CardDescription>
                  Manage patient information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  View and manage patient details, medical history, and treatment information.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => navigate("/patients")}>
                  View Patients
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>For Patients</CardTitle>
                <CardDescription>
                  Take control of your healthcare journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CalendarClock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Appointment Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule, view, and manage your appointments online
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Medical Records Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Securely access your complete medical history
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Lab Results</h3>
                    <p className="text-sm text-muted-foreground">
                      View your test results as soon as they're available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>For Healthcare Providers</CardTitle>
                <CardDescription>
                  Streamline your practice management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Patient Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Efficiently manage patient information and history
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CalendarClock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimize your calendar and reduce no-shows
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and access detailed patient records
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            MediRecord - Secure, efficient healthcare records management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
