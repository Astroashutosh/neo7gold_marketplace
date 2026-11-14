'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  Package,
  ArrowRight
} from 'lucide-react';

export default function CustomerDeliveredPage() {
  const deliveredItems = [
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
      dateDelivered: '12 Jul 2026 at 11:20',
      tamperSeal: 'SEAL-#55104',
      signedBy: 'Dr. Alexander von Bern (Verified via Biometric ID)',
    },
  ];

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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Completed Handover Archive
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Dual Signatures Verified
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>Delivered &amp; Signed Metals</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Archive of successfully completed physical metal handovers with official carrier waybills and Lloyd&apos;s discharge receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/deliveries/request"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Request New Home Delivery</span>
          </Link>
        </div>
      </div>

      {/* 2. Delivered List */}
      <div className="space-y-4">
        {deliveredItems.map((item) => (
          <div
            key={item.id}
            className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono uppercase">
                  {item.id} · {item.orderNumber}
                </span>
                <span className="text-xs text-slate-500 font-mono">Delivered on {item.dateDelivered}</span>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Handover Completed
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {item.itemDescription} ({item.weight})
                </h3>
                <div className="text-xs text-slate-500 font-mono space-y-0.5 mt-1">
                  <div>Serial: <strong className="text-slate-700 dark:text-slate-300">{item.serialNumber}</strong> · Courier: {item.courier}</div>
                  <div>Signed by: <strong className="text-emerald-600 dark:text-emerald-400">{item.signedBy}</strong></div>
                  <div>Delivered to: {item.destination}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Downloading official signed delivery receipt for ${item.id}...`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  <span>Download Signed Receipt PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
