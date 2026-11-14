'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserCheck,
  Building,
  FileText,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export default function CustomerKYCPage() {
  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider font-mono">
              Identity Verification
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Account Security &amp; Buying Limits
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Verification Level &amp; Buying Limits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Check your current identity level, yearly gold &amp; jewelry purchase limits, and vault storage access.
          </p>
        </div>

        <Link
          href="/dashboard/customer/kyc/request"
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Increase Buying Limit (Tier 3)</span>
        </Link>
      </div>

      {/* KYC Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md space-y-4 opacity-80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Tier 01</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Completed
            </span>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Basic Retail Clearance</h3>
            <p className="text-xs text-slate-500 mt-1">Verified Email &amp; Phone</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] text-xs font-mono space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Annual Limit:</span>
              <span className="font-bold text-slate-900 dark:text-white">€15,000.00</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Vault Access:</span>
              <span className="text-slate-700 dark:text-slate-300">Retail Delivery</span>
            </div>
          </div>
        </div>

        {/* Tier 2 (Current) */}
        <div className="luxury-glass p-6 rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 shadow-xl space-y-4 relative">
          <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[9px] font-black gold-gradient-bg text-slate-950 uppercase tracking-widest shadow-md">
            Active Tier
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] font-mono">
              Tier 02 · VERIFIED
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Private Client Vault</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Government Passport &amp; Proof of Residence Verified
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] text-xs font-mono space-y-1.5">
            <div className="flex justify-between text-slate-500">
              <span>Annual Trading Limit:</span>
              <span className="font-bold text-amber-700 dark:text-[#D4AF37]">€250,000.00</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Allocated Depository:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Zurich Freezone Vault</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Insurance Limit:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">€250k Lloyd&apos;s Cover</span>
            </div>
          </div>
        </div>

        {/* Tier 3 (Upgrade) */}
        <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
              Tier 03 · INSTITUTIONAL
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
              Available
            </span>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">HNW Unlimited Gold Vault</h3>
            <p className="text-xs text-slate-500 mt-1">Source of Wealth &amp; Family Office Review</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] text-xs font-mono space-y-1.5">
            <div className="flex justify-between text-slate-500">
              <span>Annual Trading Limit:</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">UNLIMITED</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Armored Courier:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Dedicated Armed Transport</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Dedicated Concierge:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">24/7 Relationship Manager</span>
            </div>
          </div>

          <Link
            href="/dashboard/customer/kyc/request"
            className="w-full py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold text-xs border border-purple-500/20 flex items-center justify-center gap-1.5 transition-all block text-center"
          >
            <span>Apply for Tier 3 Upgrade</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
