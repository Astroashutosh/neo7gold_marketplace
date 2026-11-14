'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Truck,
  Package,
  ShieldCheck,
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  MapPin,
  QrCode,
  Lock,
  Search,
  Scale,
  Coins,
  AlertCircle
} from 'lucide-react';

interface ShippingKitItem {
  id: string;
  itemDescription: string;
  metalPurity: string;
  estimatedWeightGrams: number;
  lockedSpotRate: number;
  totalEstimatedPayout: number;
  submissionDate: string;
  courierCarrier: string;
  trackingNumber: string;
  kitStatus: string;
  payoutOption: string;
  tamperSealCode: string;
  pickupScheduled: string;
  insuranceValue: number;
}

export default function BuybackShippingPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const shippingKits: ShippingKitItem[] = [
    {
      id: 'BB-2026-085',
      itemDescription: '14K Gold Vintage Watch Cases, Chains & Dental Scrap',
      metalPurity: '14K Gold (585 / 1000)',
      estimatedWeightGrams: 55.0,
      lockedSpotRate: 51.54,
      totalEstimatedPayout: 2834.70,
      submissionDate: '23 Aug 2026',
      courierCarrier: 'Swiss Post Express Priority (Armored Sluice)',
      trackingNumber: 'CH-POST-SEC-998102',
      kitStatus: 'Prepaid Security Pouch En Route to Refinery',
      payoutOption: 'Bank Wire Transfer (SEPA)',
      tamperSealCode: 'SEAL-BB-9921',
      pickupScheduled: 'Scanned at Zurich Sluice · In Transit',
      insuranceValue: 5000.0,
    },
    {
      id: 'BB-2026-088',
      itemDescription: '18K Scrap Gold Necklaces & Broken Earring Studs',
      metalPurity: '18K Gold (750 / 1000)',
      estimatedWeightGrams: 30.0,
      lockedSpotRate: 66.27,
      totalEstimatedPayout: 1988.10,
      submissionDate: '24 Aug 2026',
      courierCarrier: "Brink's Secure Parcel Logistics",
      trackingNumber: 'BRINKS-KIT-440192',
      kitStatus: 'Security Pack Dispatched to Client',
      payoutOption: 'Allocated 999.9 Gold Vault Credit',
      tamperSealCode: 'SEAL-BB-4402',
      pickupScheduled: 'Courier Delivery to Client Address Today',
      insuranceValue: 10000.0,
    },
  ];

  const totalTransitValue = shippingKits.reduce((sum, k) => sum + k.totalEstimatedPayout, 0);

  const filteredKits = shippingKits.filter(
    (k) =>
      k.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/buyback"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Submissions</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider animate-pulse font-mono">
              Kits in Transit ({shippingKits.length} Active Packs)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Lloyd&apos;s €25,000 Transit Insurance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-purple-500" />
            <span>Buy-Back Kits in Transit</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Track tamper-evident prepaid shipping pouches dispatched to you or en route to the Zurich precious metals refinery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/buyback/new"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Order New Shipping Kit</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Kits in Courier Transit</span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
            {shippingKits.length} Consignments
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 font-semibold">
            Tracked via Swiss Post &amp; Brink&apos;s
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Estimated Locked Payout</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {totalTransitValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block mt-1">
            15-Minute Guaranteed Spot Fix Applied
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Transit Cargo Protection</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            100% Insured up to €25,000
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            Tamper-Evident RFID Sealed
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Active Courier Consignments ({filteredKits.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search submission ID, tracking #, metal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Table List */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Submission Ref &amp; Item Summary</th>
                <th className="py-3.5 px-4">Courier &amp; Tracking Waybill</th>
                <th className="py-3.5 px-4">Est. Weight &amp; Karat</th>
                <th className="py-3.5 px-4">Locked Spot Rate</th>
                <th className="py-3.5 px-4">Est. Total Payout</th>
                <th className="py-3.5 px-4">Courier Kit Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredKits.map((kit) => (
                <tr
                  key={kit.id}
                  className="hover:bg-purple-500/[0.03] dark:hover:bg-purple-500/[0.04] transition-colors"
                >
                  {/* Ref & Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                          {kit.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                          {kit.itemDescription}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Submitted {kit.submissionDate} · Seal: {kit.tamperSealCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Courier & Tracking */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block text-xs">
                      {kit.courierCarrier}
                    </span>
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-[11px] block">
                      {kit.trackingNumber}
                    </span>
                  </td>

                  {/* Weight & Karat */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white font-mono block text-xs">
                      {kit.estimatedWeightGrams}.0g Gold
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      {kit.metalPurity}
                    </span>
                  </td>

                  {/* Locked Spot Rate */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{kit.lockedSpotRate.toFixed(2)} / g
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                      Guaranteed Rate
                    </span>
                  </td>

                  {/* Est Payout */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      €{kit.totalEstimatedPayout.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      via {kit.payoutOption}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 animate-pulse font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{kit.kitStatus}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => alert(`Tracking Swiss Post & Brink's Waybill ${kit.trackingNumber}...`)}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer"
                      >
                        Track Courier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
