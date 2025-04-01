
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import RegisterForm from "@/components/auth/RegisterForm";
import UserCredentials from "@/components/auth/UserCredentials";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

const Register = () => {
  const { isAuthenticated, supabase } = useAuth();
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
      
      {!supabase ? (
        <Alert className="w-full max-w-md mb-4 bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            Supabase connection is missing. Please connect Supabase in the Lovable interface or add 
            the required environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).
            For now, you can use the demo accounts below.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="w-full max-w-md mb-4 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            Connected to Supabase. You can create a new account or use the demo credentials below.
          </AlertDescription>
        </Alert>
      )}
      
      <RegisterForm />
      <UserCredentials />
    </div>
  );
};

export default Register;
