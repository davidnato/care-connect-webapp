
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";
import UserCredentials from "@/components/auth/UserCredentials";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

const Login = () => {
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
      
      
      <Alert className="w-full max-w-md mb-4 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription>
          Connected to Supabase. You can create an account or login with the demo credentials below.
        </AlertDescription>
      </Alert>
      
      <LoginForm />
      <UserCredentials />
    </div>
  );
};

export default Login;
