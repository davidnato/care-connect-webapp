
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "patient";
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock users with more individual accounts
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor" as const,
  },
  {
    id: "3",
    name: "John Patient",
    email: "patient@example.com",
    password: "password123",
    role: "patient" as const,
  },
  {
    id: "4",
    name: "Dr. Michael Chen",
    email: "drchen@example.com",
    password: "password123",
    role: "doctor" as const,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    password: "password123",
    role: "patient" as const,
  },
  {
    id: "6",
    name: "Dr. Lisa Williams",
    email: "drwilliams@example.com",
    password: "password123",
    role: "doctor" as const,
  },
  {
    id: "7",
    name: "Robert Thompson",
    email: "robert@example.com",
    password: "password123",
    role: "patient" as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("healthUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("healthUser", JSON.stringify(userWithoutPassword));
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (data: RegisterData): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === data.email);
        if (existingUser) {
          reject(new Error("User already exists"));
        } else {
          // In a real app, this would create a new user in the database
          // For demo purposes, we'll just simulate success
          resolve();
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("healthUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
