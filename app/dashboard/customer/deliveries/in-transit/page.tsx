'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ArrowLeft,
  Clock,
  ArrowRight,
  ShieldCheck,
  Package,
  KeyRound,
  Download,
  MapPin,
  AlertCircle
} from 'lucide-react';

export default function CustomerInTransitDeliveriesPage() {
  const inTransitItem = {
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
    estimatedArrival: 'Today by 14:30 (In approx 1 hr 45 min)',
    currentStep: 3,
    tamperSeal: 'SEAL-#77921',
    pinRequired: true,
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/deliveries"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Deliveries</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider animate-pulse">
              Live Armored Transit
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Vehicle #BR-892 · Armed Escort
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-amber-500" />
            <span>In Transit Deliveries (Armored Escort)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Precious metals currently out for delivery under armed guard and live satellite GPS surveillance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/dashboard/customer/orders/${inTransitItem.orderNumber}`}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Live GPS Dossier</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Estimated Handover Time</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1 block">
            14:30 Today
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            On Schedule · Vehicle 8.4 km away
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Security Handover Protocol</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            4-Digit PIN Required
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Your Secret Vault PIN: ****
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Tamper Verification</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            {inTransitItem.tamperSeal}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            RFID Sensor Active &amp; Intact
          </span>
        </div>
      </div>

      {/* 3. In-Transit Detailed Stepper & Card */}
      <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono uppercase">
                {inTransitItem.id} · {inTransitItem.orderNumber}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 animate-pulse">
                🚚 Vehicle In Motion
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
              {inTransitItem.itemDescription} ({inTransitItem.weight})
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Serial: <strong className="text-amber-700 dark:text-[#D4AF37]">{inTransitItem.serialNumber}</strong> · Waybill: <strong>{inTransitItem.waybill}</strong>
            </span>
          </div>

          <Link
            href={`/dashboard/customer/orders/${inTransitItem.orderNumber}`}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 self-start transition-all"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View Full Live GPS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Step Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              STEP 1 · DONE (08:30)
            </span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
              Vault Depository Release
            </span>
            <span className="text-[10px] text-slate-500">Zurich Freezone</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              STEP 2 · DONE (09:15)
            </span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
              Tamper Seal Verified
            </span>
            <span className="text-[10px] text-slate-500">{inTransitItem.tamperSeal}</span>
          </div>

          <div className="p-3.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md">
            <span className="text-[10px] font-mono text-slate-900 font-black block">
              STEP 3 · IN TRANSIT (NOW)
            </span>
            <span className="font-extrabold block mt-0.5">
              Brink&apos;s Armored Escort
            </span>
            <span className="text-[10px] text-slate-900/90">
              ETA: 14:30 Today
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs opacity-60">
            <span className="text-[10px] font-mono text-slate-400 font-bold block">
              STEP 4 · PENDING
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
              PIN &amp; ID Handover
            </span>
            <span className="text-[10px] text-slate-500">Dual Signature Sign-off</span>
          </div>
        </div>

        {/* Instructions Alert Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Important Handover Instructions for Delivery</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Please have your government-issued photo ID (Passport / ID Card) ready. The Brink&apos;s armed security courier will verify your ID and request your 4-digit Vault Handover PIN before transferring the sealed tamper container.
          </p>
        </div>
      </div>
    </div>
  );
}
