
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('typecab_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
    setIsLoading(false);
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('typecab_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('typecab_user');
    }
  }, [user]);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try user@example.com / password123",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already in use. Try another email or login.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email
    };
    
    // In a real app, MOCK_USERS.push() would be a database operation
    
    setUser(newUser);
    toast({
      title: "Registration successful",
      description: `Welcome to typecabNutrition, ${name}!`,
    });
    
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        login, 
        register, 
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
