"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CustomerUser = {
  id: number | string;
  name: string;
  email: string;
  username?: string | null;
  phone?: string | null;
  avatar?: string | null;
  role?: string;
  kyc_status?: "verified" | "pending" | "unverified" | "rejected";
  created_at?: string;
  vault_holdings_count?: number;
  orders_count?: number;
};

type AuthContextType = {
  user: CustomerUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (login: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    referral_code?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const CustomerAuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  refreshUser: async () => {},
});

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TOKEN_KEY = "neos7_customer_token";
const USER_KEY = "neos7_customer_user";

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token on initial client mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {}
        }
        // Verify with backend
        fetchUser(storedToken);
      } else {
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, []);

  async function fetchUser(authToken: string) {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.user) {
          const userWithRole = { ...data.user, role: data.user.role || "customer" };
          setUser(userWithRole);
          localStorage.setItem(USER_KEY, JSON.stringify(userWithRole));
          localStorage.setItem("gold_user", JSON.stringify(userWithRole));
          localStorage.setItem("gold_token", authToken);
        }
      } else if (res.status === 401) {
        // Token expired
        setToken(null);
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem("gold_token");
        localStorage.removeItem("gold_user");
      }
    } catch (err) {
      console.warn("Auth check failed:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(loginVal: string, passwordVal: string) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          login: loginVal,
          password: passwordVal,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success && data?.token) {
        const userWithRole = { ...data.user, role: data.user.role || "customer" };
        setToken(data.token);
        setUser(userWithRole);
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(userWithRole));
        localStorage.setItem("gold_token", data.token);
        localStorage.setItem("gold_user", JSON.stringify(userWithRole));
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return {
        success: false,
        message: data?.message || "Invalid credentials. Please verify your email and password.",
      };
    } catch (err: any) {
      setIsLoading(false);
      return {
        success: false,
        message: err?.message || "Network error. Please try again.",
      };
    }
  }

  async function register(payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    referral_code?: string;
  }) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.success && data?.token) {
        const userWithRole = { ...data.user, role: data.user.role || "customer" };
        setToken(data.token);
        setUser(userWithRole);
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(userWithRole));
        localStorage.setItem("gold_token", data.token);
        localStorage.setItem("gold_user", JSON.stringify(userWithRole));
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return {
        success: false,
        message: data?.message || "Registration could not be completed.",
      };
    } catch (err: any) {
      setIsLoading(false);
      return {
        success: false,
        message: err?.message || "Network error. Please try again.",
      };
    }
  }

  async function logout() {
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      } catch {}
    }

    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("gold_token");
    localStorage.removeItem("gold_user");
  }

  async function refreshUser() {
    if (token) {
      await fetchUser(token);
    }
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  return useContext(CustomerAuthContext);
}

