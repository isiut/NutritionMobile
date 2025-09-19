import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService, { User, LoginRequest, RegisterRequest } from '../services/apiService';
import config from '../config/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem(config.AUTH_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(config.USER_DATA_KEY);
      
      if (token && userData) {
        apiService.setAuthToken(token);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const result = await apiService.login(credentials);
      
      await AsyncStorage.setItem(config.AUTH_TOKEN_KEY, result.token);
      await AsyncStorage.setItem(config.USER_DATA_KEY, JSON.stringify(result.user));
      
      setUser(result.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      const result = await apiService.register(userData);
      
      // After registration, you might want to automatically log in
      // or require the user to log in manually
      console.log('Registration successful:', result.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiService.logout();
      
      await AsyncStorage.removeItem(config.AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(config.USER_DATA_KEY);
      
      apiService.clearAuth();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state
      await AsyncStorage.removeItem(config.AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(config.USER_DATA_KEY);
      apiService.clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};