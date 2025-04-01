
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/appointments/NewAppointment";
import MedicalRecords from "./pages/MedicalRecords";
import NewMedicalRecord from "./pages/records/NewMedicalRecord";
import Medications from "./pages/Medications";
import LabResults from "./pages/LabResults";
import NewLabResult from "./pages/lab-results/NewLabResult";
import Patients from "./pages/Patients";
import NewPatient from "./pages/patients/NewPatient";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/new" element={<NewAppointment />} />
            <Route path="/records" element={<MedicalRecords />} />
            <Route path="/records/new" element={<NewMedicalRecord />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/lab-results" element={<LabResults />} />
            <Route path="/lab-results/new" element={<NewLabResult />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/new" element={<NewPatient />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
