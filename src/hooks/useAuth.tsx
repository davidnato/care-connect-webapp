
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { toast } from "sonner";

// Get environment variables 
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client if environment variables are available
let supabase: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn("Supabase environment variables are missing. Mock data will be used instead.");
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
}

type UserRole = "admin" | "doctor" | "patient";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

type AuthContextType = {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  supabase: SupabaseClient | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// These users are for demo purposes only
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "doctor@example.com",
    password: "password123",
    role: "doctor" as UserRole,
  },
  {
    id: "3",
    name: "John Patient",
    email: "patient@example.com",
    password: "password123",
    role: "patient" as UserRole,
  },
  {
    id: "4",
    name: "Dr. Michael Chen",
    email: "drchen@example.com",
    password: "password123",
    role: "doctor" as UserRole,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    password: "password123",
    role: "patient" as UserRole,
  },
  {
    id: "6",
    name: "Dr. Lisa Williams",
    email: "drwilliams@example.com",
    password: "password123",
    role: "doctor" as UserRole,
  },
  {
    id: "7",
    name: "Robert Thompson",
    email: "robert@example.com",
    password: "password123",
    role: "patient" as UserRole,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user session on load
  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      
      // Check if Supabase client is available
      if (supabase) {
        try {
          // Check Supabase session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get user profile from profiles table
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            if (profileData) {
              setUser({
                id: session.user.id,
                name: profileData.name || session.user.email?.split('@')[0] || '',
                email: session.user.email || '',
                role: profileData.role as UserRole || 'patient'
              });
            }
          } else {
            // Fallback to localStorage for demo purposes
            const storedUser = localStorage.getItem("healthUser");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }
        } catch (error) {
          console.error("Auth initialization error:", error);
          // Fallback to localStorage
          const storedUser = localStorage.getItem("healthUser");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } else {
        // If no Supabase client, use localStorage
        const storedUser = localStorage.getItem("healthUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      
      setIsLoading(false);
    }
    
    initializeAuth();
    
    // Set up auth state change listener if Supabase client exists
    let subscription: { unsubscribe: () => void } | null = null;
    
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            try {
              // Get user profile
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (profileData) {
                setUser({
                  id: session.user.id,
                  name: profileData.name || session.user.email?.split('@')[0] || '',
                  email: session.user.email || '',
                  role: profileData.role as UserRole || 'patient'
                });
              }
            } catch (error) {
              console.error("Error getting user profile:", error);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      subscription = data.subscription;
    }
    
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      // Try Supabase authentication first if available
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        
        if (error) {
          throw error;
        }
      } else {
        // Fallback to mock users if Supabase is not available
        const foundUser = MOCK_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("healthUser", JSON.stringify(userWithoutPassword));
          toast.success("Logged in with mock user (Supabase not connected)");
        } else {
          throw new Error("Invalid credentials");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Fallback to mock users if Supabase auth failed
      if (supabase) {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("healthUser", JSON.stringify(userWithoutPassword));
          toast.success("Logged in with mock user (Supabase auth failed)");
          return;
        }
      }
      
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      // Register user with Supabase if available
      if (supabase) {
        const { error: signUpError, data: authData } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        
        if (signUpError) throw signUpError;
        
        if (authData.user) {
          // Create profile entry with role and name
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                name: data.name,
                email: data.email,
                role: data.role || 'patient',
              }
            ]);
            
          if (profileError) throw profileError;
        }
      } else {
        // For demo purposes, create a mock user if Supabase is not available
        const newId = (MOCK_USERS.length + 1).toString();
        const newUser = {
          id: newId,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role || "patient" as UserRole,
        };
        
        // Check if email already exists
        const existingUser = MOCK_USERS.find(user => user.email === data.email);
        if (existingUser) {
          throw new Error("Email already in use");
        }
        
        // Add to mock users (this won't persist after refresh, just for demo)
        MOCK_USERS.push(newUser);
        
        toast.success("Registered mock user (Supabase not connected)");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    // Sign out from Supabase if available
    if (supabase) {
      await supabase.auth.signOut();
    }
    
    // Also clear local storage
    setUser(null);
    localStorage.removeItem("healthUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        supabase,
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
