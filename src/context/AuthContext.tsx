'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  loginWithApi,
  loginCustomer,
  loginSeller,
  loginB2B,
  loginAffiliate,
  loginAdmin,
  postApi,
  verifySessionToken,
} from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (loginIdentifier: string, password: string) => Promise<void>;
  loginAsCustomer: (loginIdentifier: string, password: string) => Promise<void>;
  loginAsSeller: (loginIdentifier: string, password: string) => Promise<void>;
  loginAsB2B: (loginIdentifier: string, password: string) => Promise<void>;
  loginAsAffiliate: (loginIdentifier: string, password: string) => Promise<void>;
  loginAsAdmin: (loginIdentifier: string, password: string) => Promise<void>;
  switchRole: (role: User['role']) => Promise<void>;
  setSession: (user: User, token: string) => void;
  logout: () => void;
  getDashboardUrl: (role?: User['role']) => string;
  getLoginUrl: (role?: User['role']) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function getDashboardUrl(role?: User['role']): string {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/dashboard/admin';
    case 'seller':
      return '/dashboard/seller';
    case 'b2b':
    case 'supplier':
    case 'b2b_customer':
      return '/dashboard/b2b';
    case 'affiliate':
      return '/dashboard/affiliate';
    case 'customer':
      return '/dashboard/customer';
    default:
      return '/login';
  }
}

export function getLoginUrl(role?: User['role']): string {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return '/login/admin';
    case 'seller':
      return '/login/seller';
    case 'b2b':
    case 'supplier':
    case 'b2b_customer':
      return '/login/b2b';
    case 'affiliate':
      return '/login/affiliate';
    case 'customer':
      return '/login/';
    default:
      return '/login/';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gold_user') || localStorage.getItem('neos7_customer_user');
        if (!saved) return null;
        const parsed = JSON.parse(saved);
        if (!parsed.role || parsed.role === '') {
          if (parsed.company_name || parsed.lei_code || parsed.refinery_location || parsed.annual_refining_capacity_kg) {
            parsed.role = 'b2b';
          } else if (parsed.referral_code || parsed.sponsor_id) {
            parsed.role = 'affiliate';
          } else if (parsed.seller_profile) {
            parsed.role = 'seller';
          } else {
            parsed.role = 'customer';
          }
          localStorage.setItem('gold_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('gold_token') ||
        localStorage.getItem('neos7_customer_token') ||
        localStorage.getItem('token') ||
        localStorage.getItem('auth_token') ||
        null
      );
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedToken =
        localStorage.getItem('gold_token') ||
        localStorage.getItem('neos7_customer_token') ||
        localStorage.getItem('token') ||
        localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('gold_user') || localStorage.getItem('neos7_customer_user');
      if (savedToken && savedUser) {
        return false;
      }
    }
    return false;
  });

  const router = useRouter();

  useEffect(() => {
    // Check saved session in localStorage
    const savedUser = localStorage.getItem('gold_user') || localStorage.getItem('neos7_customer_user');
    const savedToken =
      localStorage.getItem('gold_token') ||
      localStorage.getItem('neos7_customer_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('auth_token');

    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        if (!parsed.role || parsed.role === '') {
          if (parsed.company_name || parsed.lei_code || parsed.refinery_location || parsed.annual_refining_capacity_kg) {
            parsed.role = 'b2b';
          } else if (parsed.referral_code || parsed.sponsor_id) {
            parsed.role = 'affiliate';
          } else if (parsed.seller_profile) {
            parsed.role = 'seller';
          } else {
            parsed.role = 'customer';
          }
          localStorage.setItem('gold_user', JSON.stringify(parsed));
        }

        setUser(parsed);
        setToken(savedToken);

        // Validate active token asynchronously against backend
        verifySessionToken(savedToken).then((verification) => {
          if (!verification.success && verification.message === 'Unauthenticated or revoked session.') {
            // Only revoke if backend explicitly rejected the token as invalid
            setUser(null);
            setToken(null);
            localStorage.removeItem('gold_user');
            localStorage.removeItem('gold_token');
            localStorage.removeItem('token');
            localStorage.removeItem('auth_token');
            const targetLogin = getLoginUrl(parsed.role);
            router.replace(`${targetLogin}?session_expired=1`);
          } else if (verification.user) {
            let resolvedRole: User['role'] = (verification.user.role || parsed.role) as User['role'];
            if (!resolvedRole || resolvedRole === ('' as any)) {
              if (verification.user.company_name || parsed.company_name || (verification.user as any).lei_code) {
                resolvedRole = 'b2b';
              } else if (verification.user.referral_code || parsed.referral_code) {
                resolvedRole = 'affiliate';
              } else if (verification.user.department || parsed.department) {
                resolvedRole = 'seller';
              } else {
                resolvedRole = 'customer';
              }
            }

            const mergedUser: User = {
              ...parsed,
              ...verification.user,
              role: resolvedRole,
            };
            setUser(mergedUser);
            localStorage.setItem('gold_user', JSON.stringify(mergedUser));
          }
        }).catch(() => {
          // Keep session on temporary network blips
        });
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    setIsLoading(false);
  }, [router]);

  // Global listener for 401 unauthorized session termination events
  useEffect(() => {
    const handleUnauthorizedEvent = (e: any) => {
      // Do not trigger global logout if the event came from background/secondary polling
      const endpoint = e?.detail?.endpoint;
      if (
        endpoint &&
        (endpoint.includes('/badges') ||
          endpoint.includes('/notifications') ||
          endpoint.includes('/metals-spot') ||
          endpoint.includes('/rates'))
      ) {
        return;
      }

      const savedUserStr = localStorage.getItem('gold_user');
      let role: User['role'] | undefined = user?.role;
      if (!role && savedUserStr) {
        try {
          role = JSON.parse(savedUserStr)?.role;
        } catch (_) {}
      }

      setUser(null);
      setToken(null);
      localStorage.removeItem('gold_user');
      localStorage.removeItem('gold_token');
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');

      const targetLogin = getLoginUrl(role);
      router.replace(`${targetLogin}?session_expired=1`);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorizedEvent);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorizedEvent);
  }, [router, user]);

  const setSession = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('gold_user', JSON.stringify(userData));
    localStorage.setItem('gold_token', tokenData);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('auth_token', tokenData);
  };

  const handleAuthSuccess = (userData: User, tokenData: string, overrideRedirect?: string) => {
    setSession(userData, tokenData);
    const targetUrl = overrideRedirect || getDashboardUrl(userData.role);
    router.push(targetUrl);
  };

  const login = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginWithApi(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token);
      } else {
        throw new Error(response.message || 'Authentication failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsCustomer = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginCustomer(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token, '/dashboard/customer');
      } else {
        throw new Error(response.message || 'Customer login failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsSeller = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginSeller(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token, '/dashboard/seller');
      } else {
        throw new Error(response.message || 'Seller login failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsB2B = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginB2B(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token, '/dashboard/b2b');
      } else {
        throw new Error(response.message || 'B2B login failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAffiliate = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginAffiliate(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token, '/dashboard/affiliate');
      } else {
        throw new Error(response.message || 'Affiliate login failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAdmin = async (loginIdentifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginAdmin(loginIdentifier, password);
      if (response.success && response.user && response.token) {
        handleAuthSuccess(response.user, response.token, '/dashboard/admin');
      } else {
        throw new Error(response.message || 'Admin login failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = async (role: User['role']) => {
    switch (role) {
      case 'super_admin':
      case 'admin':
        await loginAsAdmin('admin@demo.com', 'password123');
        break;
      case 'seller':
        await loginAsSeller('seller@demo.com', 'password123');
        break;
      case 'b2b':
      case 'supplier':
      case 'b2b_customer':
        await loginAsB2B('supplier@demo.com', 'password123');
        break;
      case 'affiliate':
        await loginAsAffiliate('affiliate@demo.com', 'password123');
        break;
      case 'customer':
      default:
        await loginAsCustomer('customer@demo.com', 'password123');
        break;
    }
  };

  const logout = async () => {
    const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('gold_token') : null);
    const role = user?.role;

    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gold_user');
      localStorage.removeItem('gold_token');
      localStorage.removeItem('neos7_customer_user');
      localStorage.removeItem('neos7_customer_token');
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
    }

    if (currentToken) {
      try {
        await postApi('/auth/logout', {}, currentToken);
      } catch (_) {}
    }

    const targetLogin = getLoginUrl(role);
    router.push(targetLogin);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        loginAsCustomer,
        loginAsSeller,
        loginAsB2B,
        loginAsAffiliate,
        loginAsAdmin,
        switchRole,
        setSession,
        logout,
        getDashboardUrl,
        getLoginUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
