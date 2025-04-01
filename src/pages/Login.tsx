
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";
import UserCredentials from "@/components/auth/UserCredentials";

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
      <LoginForm />
      <UserCredentials />
    </div>
  );
};

export default Login;
