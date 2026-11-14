'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Package,
  Heart,
  RotateCcw,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  Truck,
  ExternalLink,
  Scale,
  Coins,
  QrCode,
  Flame,
  FileText,
  Gem,
  Download,
  Eye,
  RefreshCw,
  Landmark,
  Share2,
  Copy,
  Check,
  Users,
  Gift,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerDashboardOverview() {
  const { user } = useAuth();

  // Spot calculation states
  const [calcGrams, setCalcGrams] = useState<number>(50);
  const [calcMetal, setCalcMetal] = useState<'gold' | 'silver' | 'platinum'>('gold');

  const spotRates = {
    gold: 88.36, // €/g
    silver: 1.04, // €/g
    platinum: 31.67, // €/g
  };

  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = 'VONBERN77';
  const referralLink = `https://neos7gold.ch/invite/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const calculatedValue = (calcGrams * spotRates[calcMetal]).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Private Client Vault
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Tier 2 Verified · Zurich Depository
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.name || 'Private Client'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Your allocated physical precious metals holdings, active atelier jewelry orders, and insured vault certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer/vault"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>View My Stored Gold &amp; Bars</span>
          </Link>
        </div>
      </div>

      {/* 2. Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Vault Valuation */}
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Value of Stored Gold</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              €78,450.00
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% YoY spot appreciation</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Insurance:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">Lloyd’s 100% Insured</span>
          </div>
        </div>

        {/* KPI 2: Allocated Fine Gold */}
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Allocated Fine Gold</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              250.000 g
            </span>
            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1 font-mono">
              999.9 Fine Au (~€22,090.00)
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Physical Bars:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">3 Serialized Bars</span>
          </div>
        </div>

        {/* KPI 3: Silver & Platinum Pool */}
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Silver &amp; Platinum Pool</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              1,500.00 g
            </span>
            <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-1 font-mono">
              999 Silver · 50g 999.5 Platinum
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Depository:</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">Zurich Duty-Free Vault</span>
          </div>
        </div>

        {/* KPI 4: Active Orders & Deliveries */}
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Orders &amp; Dispatches</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              2 Active
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-600 dark:text-purple-400 font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>1 In Transit (Brink&apos;s)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Next Arrival:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Today by 14:30</span>
          </div>
        </div>
      </div>

      {/* 2.5. Referral Link & Partner Earnings Showcase Box */}

      {/*
      <div className="luxury-glass p-6 sm:p-7 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-purple-500/[0.04] shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 shrink-0 shadow-md">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-[#D4AF37]">
                  Partner &amp; Referral Hub
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Lifetime 5% Commission
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                Your Personal Referral Link &amp; Network Earnings
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/customer/referrals/invite"
              className="px-3.5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Invite Friends</span>
            </Link>
            <Link
              href="/dashboard/customer/withdraw/cash"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Withdraw Cash</span>
            </Link>
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         
          <div className="lg:col-span-2 p-4 rounded-2xl bg-white/80 dark:bg-[#090D15]/80 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Share this VIP Link with Friends:
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Give €50 off on first bullion purchase + earn 5% lifetime commission
              </span>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full bg-transparent px-2.5 text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37] focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1 transition-all cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/customer/referrals/users"
              className="p-4 rounded-2xl bg-white/80 dark:bg-[#090D15]/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block group-hover:text-amber-500 transition-colors">
                  Total Referrals
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
                  18 Clients
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                View Users List &rarr;
              </span>
            </Link>

            <Link
              href="/dashboard/customer/earnings/referrals"
              className="p-4 rounded-2xl bg-white/80 dark:bg-[#090D15]/80 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block group-hover:text-[#D4AF37] transition-colors">
                  Total Earnings
                </span>
                <span className="text-xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
                  €14,820.50
                </span>
              </div>
              <span className="text-[10px] text-amber-700 dark:text-[#D4AF37] font-bold font-mono">
                €3,450 Available &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
*/}

      {/* Copyable Link & Stat Boxes */}

      {/* 3. Main Grid: Active Armored Delivery + Live Valuation Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Dispatch Tracker Card (Left 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 uppercase">
                    Armored Dispatch #ORD-98301
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Out for Delivery
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  100g Valcambi Gold Bar (999.9 Fine Investment Cast)
                </h3>
              </div>

              <Link
                href="/dashboard/customer/orders/ORD-98301"
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 self-start"
              >
                <span>Live GPS Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  STEP 1 · DONE
                </span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                  Vault Vault Release
                </span>
                <span className="text-[10px] text-slate-500">Zurich Freezone</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  STEP 2 · DONE
                </span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                  Tamper Seal #77921
                </span>
                <span className="text-[10px] text-slate-500">Dual Verified</span>
              </div>

              <div className="p-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md">
                <span className="text-[10px] font-mono text-slate-900 block">
                  STEP 3 · IN TRANSIT
                </span>
                <span className="font-extrabold block mt-0.5">Brink&apos;s Armored</span>
                <span className="text-[10px] text-slate-900/80">ETA: 14:30 Today</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs opacity-60">
                <span className="text-[10px] font-mono text-slate-400 block">
                  STEP 4 · PENDING
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                  ID &amp; PIN Handover
                </span>
                <span className="text-[10px] text-slate-500">Dual Signature</span>
              </div>
            </div>

            {/* Courier Info Bar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  BGS
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Brink&apos;s Global Secure Dispatch (Vehicle #BR-892)
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    Armed Escort · Tamper Sensor Active · Lloyd&apos;s Policy #LL-99201
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold self-start sm:self-auto">
                WAYBILL: CH-BRINKS-998201
              </span>
            </div>
          </div>

          {/* Allocated Vault Bars List */}
          <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>My Stored Gold &amp; Silver Bars</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Serialized bars safely stored under your name in the high-security Swiss Vault.
                </p>
              </div>
              <Link
                href="/dashboard/customer/vault"
                className="text-xs font-bold text-amber-700 dark:text-[#D4AF37] hover:underline"
              >
                View All Stored Bars &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {/* Bar 1 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-xs">
                    100g
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Valcambi 100g Fine Gold Cast Bar
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Serial: <strong className="text-amber-700 dark:text-[#D4AF37]">CH-VAL-889012</strong> · Assay 999.9 Au
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block">
                      €8,836.00
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      Allocated In-Vault
                    </span>
                  </div>
                  <Link
                    href="/dashboard/customer/vault"
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all"
                    title="Download Vault Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bar 2 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-xs">
                    100g
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      PAMP Suisse 100g Lady Fortuna Minted Ingot
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Serial: <strong className="text-amber-700 dark:text-[#D4AF37]">CH-PAMP-992144</strong> · Assay 999.9 Au
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block">
                      €8,836.00
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      Allocated In-Vault
                    </span>
                  </div>
                  <Link
                    href="/dashboard/customer/vault"
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all"
                    title="Download Vault Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bar 3 */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black text-slate-700 dark:text-slate-300 text-xs font-mono">
                    1kg
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Argor-Heraeus 1,000g Fine Silver Cast Ingot
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Serial: <strong className="text-slate-700 dark:text-slate-300">CH-ARG-771920</strong> · Assay 999.0 Ag
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono block">
                      €1,040.00
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      Allocated In-Vault
                    </span>
                  </div>
                  <Link
                    href="/dashboard/customer/vault"
                    className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all"
                    title="Download Vault Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Instant Spot Calculator & Buy-Back Card */}
        <div className="space-y-6">
          {/* Live LBMA Metal Calculator */}
          <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Live Spot Fix Calculator
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                LIVE LBMA
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">Select Metal</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcMetal('gold')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${calcMetal === 'gold'
                        ? 'gold-gradient-bg text-slate-950 shadow-sm'
                        : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    Gold (Au)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMetal('silver')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${calcMetal === 'silver'
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    Silver (Ag)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMetal('platinum')}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${calcMetal === 'platinum'
                        ? 'bg-purple-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400'
                      }`}
                  >
                    Platinum
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Weight (Grams)</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">{calcGrams} g</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">
                  Spot Valuation Estimate
                </span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono block">
                  {calculatedValue}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Rate: €{spotRates[calcMetal].toFixed(2)}/g · 0% VAT (Au)
                </span>
              </div>

              <Link
                href="/dashboard/customer/buyback/new"
                className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 transition-all block text-center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Lock Valuation &amp; Sell-Back</span>
              </Link>
            </div>
          </div>

          {/* Digital Product Passports (DPP) Spotlight */}
          <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-cyan-400" />
                Digital Product Passports
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                2 MINTED
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  24K Royal Pavé Solitaire
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  GIA Certified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Token ID: #DPP-88901 · Polygon L2
              </p>
              <Link
                href="/dashboard/customer/passports"
                className="text-[11px] font-bold text-[#D4AF37] hover:underline block pt-1"
              >
                View 3D Hologram Certificate &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
