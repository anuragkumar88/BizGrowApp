import React, { createContext, useContext, useState } from 'react';

type AuthUser = {
  role: 'merchant' | 'customer' | null;
  name: string;
  storeName?: string;
  email?: string;
  phone?: string;
  password?: string;
};

type RegisteredUser = {
  role: 'merchant' | 'customer';
  name: string;
  storeName?: string;
  email?: string;
  phone?: string;
  password: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  register: (userData: RegisteredUser) => void;
  findUser: (identifier: string, password: string, role: 'merchant' | 'customer') => RegisteredUser | null;
  registeredUsers: RegisteredUser[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const register = (userData: RegisteredUser) => {
    setRegisteredUsers((prev) => [...prev, userData]);
  };

  const findUser = (identifier: string, password: string, role: 'merchant' | 'customer'): RegisteredUser | null => {
    return registeredUsers.find((u) => {
      if (u.role !== role) return false;
      if (u.password !== password) return false;
      if (role === 'merchant') return u.email === identifier;
      if (role === 'customer') return u.phone === identifier;
      return false;
    }) || null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register, findUser, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
