
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RegisterForm from "@/components/auth/RegisterForm";
import UserCredentials from "@/components/auth/UserCredentials";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">MediRecord</h1>
        <p className="text-muted-foreground">Health Records Management System</p>
      </div>
      
      <Alert className="w-full max-w-md mb-4 bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertDescription>
          This app needs Supabase to store data. Please check your environment variables 
          or connect Supabase in the Lovable interface.
        </AlertDescription>
      </Alert>
      
      <RegisterForm />
      <UserCredentials />
    </div>
  );
};

export default Register;
