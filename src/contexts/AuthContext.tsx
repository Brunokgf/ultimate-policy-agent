import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedInUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u: User) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
