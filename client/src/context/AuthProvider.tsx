import { AuthContext } from './AuthContext';
import { type AuthResponse } from '../features/auth/types/auth-repsonse.type';
import { useState, type ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(() => {
    const savedUser =
      localStorage.getItem('mmdb_user') || sessionStorage.getItem('mmdb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const isAuthenticated = !!user;

  const login = (authData: AuthResponse, rememberMe = true) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('mmdb_token', authData.accessToken);
    storage.setItem('mmdb_user', JSON.stringify(authData.user));
    setUser(authData.user);
  };

  const logout = () => {
    localStorage.removeItem('mmdb_token');
    localStorage.removeItem('mmdb_user');
    sessionStorage.removeItem('mmdb_token');
    sessionStorage.removeItem('mmdb_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
