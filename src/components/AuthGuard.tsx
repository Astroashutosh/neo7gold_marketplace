'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, getDashboardUrl } from '@/context/AuthContext';
import { getStoredAuthToken } from '@/lib/api';
import { ShieldAlert, Lock } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  loginUrl: string;
  portalName: string;
}

export default function AuthGuard({
  children,
  allowedRoles,
  loginUrl,
  portalName,
}: AuthGuardProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const rolesKey = allowedRoles.join(',');

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading) {
      const activeToken =
        token ||
        getStoredAuthToken() ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('neos7_customer_token') || localStorage.getItem('gold_token')
          : null);

      // 1. Not logged in at all -> Redirect to login page
      if (!activeToken) {
        router.replace(loginUrl || '/login/');
        return;
      }

      // 2. Resolve or heal user role (defaulting to customer in marketplace)
      const effectiveRole = user?.role || (() => {
        try {
          const raw = localStorage.getItem('gold_user') || localStorage.getItem('neos7_customer_user');
          if (raw) {
            const parsed = JSON.parse(raw);
            return parsed?.role || 'customer';
          }
        } catch (_) {}
        return 'customer';
      })();

      // 3. Logged in, but unauthorized role -> Redirect to own dashboard
      if (effectiveRole && !allowedRoles.includes(effectiveRole)) {
        const authorizedUrl = getDashboardUrl(effectiveRole);
        if (authorizedUrl && typeof window !== 'undefined' && !window.location.pathname.endsWith(authorizedUrl)) {
          router.replace(authorizedUrl);
        }
      }
    }
  }, [isMounted, isLoading, user, token, rolesKey, loginUrl, router]);

  // Loading / Hydrating State
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#D4AF37] animate-pulse" />
          </div>
        </div>
        <h2 className="text-lg font-bold text-white tracking-wide">
          Verifying Vault Security Clearance...
        </h2>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          Authenticating cryptographic session keys with the Zurich Depository.
        </p>
      </div>
    );
  }

  // Not Authenticated
  const hasActiveToken =
    token ||
    getStoredAuthToken() ||
    (typeof window !== 'undefined'
      ? localStorage.getItem('neos7_customer_token') || localStorage.getItem('gold_token')
      : null);

  if (!hasActiveToken) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Authentication Required</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          Direct access to the {portalName} requires verified credentials.
        </p>
        <button
          onClick={() => router.replace(loginUrl || '/login/')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg transition-all cursor-pointer"
        >
          Sign In to Customer Vault
        </button>
      </div>
    );
  }

  // Role Unauthorized
  if (user && !allowedRoles.includes(user.role)) {
    const roleDisplay = user.role || 'Unspecified';
    const targetDashboard = getDashboardUrl(user.role);
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Clearance Tier Incompatible</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          Your current account role ({roleDisplay}) does not have clearance for the {portalName}.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => router.replace(targetDashboard)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Go to Your Dashboard
          </button>
          <button
            onClick={() => router.replace(loginUrl)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer border border-white/10"
          >
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  return <div className="w-full h-full">{children}</div>;
}
