'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Package,
  KeyRound,
  Download,
  Filter,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface WithdrawalRecord {
  id: string;
  orderNumber: string;
  itemDescription: string;
  metal: 'Gold' | 'Silver' | 'Platinum';
  weight: string;
  serialNumber: string;
  courier: string;
  waybill: string;
  destination: string;
  status: 'DELIVERY_REQUESTED' | 'VAULT_PACKED' | 'IN_TRANSIT' | 'DELIVERED';
  dateRequested: string;
  estimatedArrival: string;
  currentStep: number;
  tamperSeal: string;
  pinRequired: boolean;
}

export default function CustomerVaultDeliveriesPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_TRANSIT' | 'DELIVERED'>('ALL');

  const deliveries: WithdrawalRecord[] = [
    {
      id: 'WITHDRAW-2026-091',
      orderNumber: 'ORD-98301',
      itemDescription: 'Valcambi 100g Fine Gold Cast Bar',
      metal: 'Gold',
      weight: '100.00g (999.9 Au)',
      serialNumber: 'CH-VAL-889012',
      courier: "Brink's Global Secure (Armored Vehicle #BR-892)",
      waybill: 'CH-BRINKS-998201',
      destination: 'Bahnhofstrasse 45, 8001 Zurich, Switzerland',
      status: 'IN_TRANSIT',
      dateRequested: '22 Aug 2026',
      estimatedArrival: 'Today by 14:30',
      currentStep: 3,
      tamperSeal: 'SEAL-#77921',
      pinRequired: true,
    },
    {
      id: 'WITHDRAW-2026-044',
      orderNumber: 'ORD-94102',
      itemDescription: 'Argor-Heraeus 500g Fine Silver Ingot',
      metal: 'Silver',
      weight: '500.00g (999.0 Ag)',
      serialNumber: 'CH-ARG-441092',
      courier: 'Loomis International Armored Courier',
      waybill: 'CH-LOOMIS-552199',
      destination: 'Bahnhofstrasse 45, 8001 Zurich, Switzerland',
      status: 'DELIVERED',
      dateRequested: '10 Jul 2026',
      estimatedArrival: '12 Jul 2026 (Delivered & Signed)',
      currentStep: 4,
      tamperSeal: 'SEAL-#55104',
      pinRequired: true,
    },
  ];

  const filteredDeliveries = deliveries.filter((item) => {
    if (statusFilter === 'IN_TRANSIT') return item.status === 'IN_TRANSIT' || item.status === 'VAULT_PACKED';
    if (statusFilter === 'DELIVERED') return item.status === 'DELIVERED';
    return true;
  });

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/vault"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stored Metals</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Armored Transit Tracking
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Lloyd&apos;s Full Transit Cargo Cover
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-amber-500" />
            <span>Home Delivery &amp; Withdrawal Status</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Track real-time status updates, tamper seal verification, and armored transport handovers for your physical metals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/deliveries/request"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>New Delivery Request</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Active Armored Deliveries</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {deliveries.filter((d) => d.status === 'IN_TRANSIT').length} In Transit
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            Brink&apos;s Armed Escort Vehicle #BR-892
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Completed Deliveries</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {deliveries.filter((d) => d.status === 'DELIVERED').length} Handed Over
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Dual Signature Verified &amp; Archived
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Courier Security Protocol</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            4-Digit Vault PIN Handover
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            Tamper Sensors + GPS Active
          </span>
        </div>
      </div>

      {/* 3. Status Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter Deliveries:
        </span>
        <button
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'ALL'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Requests ({deliveries.length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('IN_TRANSIT')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'IN_TRANSIT'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          In Transit ({deliveries.filter((d) => d.status === 'IN_TRANSIT').length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('DELIVERED')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'DELIVERED'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Delivered ({deliveries.filter((d) => d.status === 'DELIVERED').length})
        </button>
      </div>

      {/* 4. Deliveries Cards & Real-Time Steppers */}
      <div className="space-y-6">
        {filteredDeliveries.map((item) => (
          <div
            key={item.id}
            className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono uppercase">
                    {item.id} · {item.orderNumber}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'IN_TRANSIT'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 animate-pulse'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {item.status === 'IN_TRANSIT' ? '🚚 Out for Armored Delivery' : '✓ Successfully Delivered'}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  {item.itemDescription} ({item.weight})
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Serial: <strong className="text-amber-700 dark:text-[#D4AF37]">{item.serialNumber}</strong> · Tamper Seal: <strong>{item.tamperSeal}</strong>
                </span>
              </div>

              {item.status === 'IN_TRANSIT' && (
                <Link
                  href={`/dashboard/customer/orders/${item.orderNumber}`}
                  className="px-3.5 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 self-start transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Live GPS Map Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* 4-Step Status Progress Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div
                className={`p-3 rounded-xl border text-xs ${
                  item.currentStep >= 1
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  STEP 1 · {item.currentStep >= 1 ? 'DONE' : 'PENDING'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                  Vault Depository Release
                </span>
                <span className="text-[10px] text-slate-500">Zurich Freezone</span>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  item.currentStep >= 2
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  STEP 2 · {item.currentStep >= 2 ? 'DONE' : 'PENDING'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                  Tamper Seal Verified
                </span>
                <span className="text-[10px] text-slate-500">{item.tamperSeal}</span>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  item.currentStep === 3
                    ? 'gold-gradient-bg text-slate-950 font-bold shadow-md'
                    : item.currentStep > 3
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <span className={`text-[10px] font-mono block ${item.currentStep === 3 ? 'text-slate-900 font-black' : 'text-emerald-600 font-bold'}`}>
                  STEP 3 · {item.currentStep === 3 ? 'IN TRANSIT' : item.currentStep > 3 ? 'DONE' : 'PENDING'}
                </span>
                <span className="font-extrabold block mt-0.5">
                  Armored Escort
                </span>
                <span className={`text-[10px] ${item.currentStep === 3 ? 'text-slate-900/90' : 'text-slate-500'}`}>
                  {item.estimatedArrival}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  item.currentStep >= 4
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-500 font-bold block">
                  STEP 4 · {item.currentStep >= 4 ? 'COMPLETED' : 'PENDING'}
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                  PIN &amp; ID Handover
                </span>
                <span className="text-[10px] text-slate-500">Dual Signature Sign-off</span>
              </div>
            </div>

            {/* Courier Info Bar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {item.courier}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Destination: {item.destination} · Waybill: <strong className="text-slate-700 dark:text-slate-300">{item.waybill}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Downloading signed Lloyd's insured delivery bill for ${item.id}...`)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-all font-mono font-bold self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Waybill Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
