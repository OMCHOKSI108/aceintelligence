"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id: string;
  loginId: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE" | "CANDIDATE" | "CLIENT";
  name: string;
  phone?: string;
  bio?: string;
  profilePhoto?: string;
  companyName?: string;
  workStatus?: string;
  googleChatLink?: string;
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function login(u: User) {
    setUser(u);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
