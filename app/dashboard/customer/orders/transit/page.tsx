'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  KeyRound,
  Download,
  ExternalLink,
  ChevronRight,
  MapPin,
  QrCode,
  Lock,
  Phone,
  Search,
  Award,
  Eye,
  Coins
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface TransitOrder {
  id: string;
  itemTitle: string;
  category: string;
  orderDate: string;
  estimatedArrival: string;
  totalAmount: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  carrier: string;
  vehicleCode: string;
  waybill: string;
  tamperSeal: string;
  handoverPin: string;
  deliveryAddress: string;
  recipientName: string;
  insurancePolicy: string;
  currentStage: number;
  transitMilestones: {
    time: string;
    title: string;
    location: string;
    status: string;
    completed: boolean;
    active?: boolean;
  }[];
  certData: AssayCertificateData;
}

export default function OrdersTransitPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const transitOrders: TransitOrder[] = [
    {
      id: 'ORD-98301',
      itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
      category: 'Bullion Vault Bar',
      orderDate: '22 Aug 2026',
      estimatedArrival: 'Today by 14:30 CET (In approx 1 hr 15 min)',
      totalAmount: 8836.0,
      paymentStatus: 'Instant Wire Cleared',
      fulfillmentStatus: 'Out for Delivery (Armored Van Escort)',
      carrier: "Brink's Global Services (Armored Division)",
      vehicleCode: 'Armored Van #BR-892 (Dual Armed Escort)',
      waybill: 'CH-BRINKS-998201',
      tamperSeal: 'SEAL-77921-A (Dual Barcode Verification)',
      handoverPin: '8492',
      deliveryAddress: 'Bahnhofstrasse 45, 8001 Zurich, Switzerland',
      recipientName: 'Dr. Alexander von Bern',
      insurancePolicy: "Lloyd's Policy #LL-ZUR-99201",
      currentStage: 3,
      transitMilestones: [
        {
          time: '08:30 CET',
          title: 'Vault Release & Bar Dual Assay Seal',
          location: 'Zurich High-Security Freezone Depository',
          status: 'Completed',
          completed: true,
        },
        {
          time: '10:45 CET',
          title: 'Loaded into Brink’s Armored Van #BR-892',
          location: 'Depository Secure Sluice Gate #3',
          status: 'Completed',
          completed: true,
        },
        {
          time: '13:15 CET',
          title: 'In Transit · Live Satellite Escort Route',
          location: 'Zurich Enge Corridor (ETA: 14:30)',
          status: 'Active · On Route',
          completed: false,
          active: true,
        },
        {
          time: 'Pending',
          title: 'Arrival & Armed Verbal Handover PIN Check',
          location: 'Bahnhofstrasse 45',
          status: 'Pending',
          completed: false,
        },
        {
          time: 'Pending',
          title: 'Biometric Handover Signature & Final Discharge Receipt',
          location: 'Private Client Suite',
          status: 'Pending',
          completed: false,
        },
      ],
      certData: {
        serialNumber: 'CH-VAL-889012',
        certificateNumber: 'ASSAY-VAL-2026-9901',
        refiner: 'Valcambi SA',
        productName: '100g Fine Gold Cast Bar (999.9 Au)',
        metal: 'Gold (Au)',
        metalType: 'gold',
        weightGrams: 100,
        purity: '999.9 Fine Gold (Au)',
        assayStamp: 'CH-FOCBS-ASSAY-0091',
        dimensions: '47.0 × 27.0 × 4.5 mm',
        vaultLocation: 'Zurich Duty-Free Vault · Safe #B-402',
        allocatedDate: '22 Aug 2026',
        currentValue: 8836.0,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'ORD-98307',
      itemTitle: 'Argor-Heraeus 500g Fine Gold Cast Ingot (999.9 Au)',
      category: 'Bullion Vault Bar',
      orderDate: '23 Aug 2026',
      estimatedArrival: 'Tomorrow by 11:00 CET (Scheduled Convoy)',
      totalAmount: 44180.0,
      paymentStatus: 'Instant Wire Cleared',
      fulfillmentStatus: 'Convoy Staged & GPS Monitored',
      carrier: 'Ferrari Group Armored Express',
      vehicleCode: 'Armored Transport #FER-409',
      waybill: 'FERRARI-EXP-44102',
      tamperSeal: 'SEAL-88192-B',
      handoverPin: '9210',
      deliveryAddress: 'Grand Hotel Dolder Private Suite, Zurich',
      recipientName: 'Dr. Alexander von Bern',
      insurancePolicy: "Lloyd's Policy #LL-FER-8820",
      currentStage: 2,
      transitMilestones: [
        {
          time: '09:00 CET',
          title: 'Segregated Vault Unit Release Verification',
          location: 'Zurich Customs Bonded Depository',
          status: 'Completed',
          completed: true,
        },
        {
          time: '11:30 CET',
          title: 'RFID Tamper-Proof Ingot Casket Sealing',
          location: 'Ferrari Group Secure Sluice',
          status: 'Completed',
          completed: true,
        },
        {
          time: 'Tomorrow 08:00',
          title: 'Convoy Departure & Satellite Telemetry Live',
          location: 'Zurich Depository Exit',
          status: 'Upcoming',
          completed: false,
          active: true,
        },
        {
          time: 'Tomorrow 11:00',
          title: 'Private Suite Delivery & Dual PIN Handover',
          location: 'Grand Hotel Dolder Private Suite',
          status: 'Scheduled',
          completed: false,
        },
      ],
      certData: {
        serialNumber: 'CH-ARG-500192',
        certificateNumber: 'ASSAY-ARG-2026-5001',
        refiner: 'Argor-Heraeus SA',
        productName: '500g Fine Gold Cast Ingot (999.9 Au)',
        metal: 'Gold (Au)',
        metalType: 'gold',
        weightGrams: 500,
        purity: '999.9 Fine Gold Cast Bar',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        dimensions: '91.0 × 41.0 × 7.5 mm',
        vaultLocation: 'Zurich Duty-Free Vault · Safe #S-109',
        allocatedDate: '23 Aug 2026',
        currentValue: 44180.0,
        insurancePolicy: 'Lloyds-FER-8820',
      },
    },
  ];

  const [activeSelectedOrder, setActiveSelectedOrder] = useState<TransitOrder>(transitOrders[0]);

  const totalTransitValue = transitOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = transitOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.waybill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.carrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider animate-pulse">
              Live Armored Transit ({transitOrders.length} Convoys Active)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Brink&apos;s &amp; Ferrari Group Armored Divisions
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-purple-500" />
            <span>Out for Delivery (Armored Transit)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Table list of active high-value dispatches, live satellite escort routes, security seals, and verbal handover PINs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/invoices"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Tax Invoices</span>
          </Link>
          <Link
            href="/dashboard/customer/deliveries/in-transit"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>GPS Satellite Map</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Active Armored Convoys</span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
            {transitOrders.length} In Transit
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 font-mono">
            Dual Armed Guard Escorts
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total In-Transit Cargo Value</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {totalTransitValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            100% Primary Specie Insurance Cover
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Next Expected Handover</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            Today by 14:30 CET
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1 font-mono">
            PIN: {activeSelectedOrder.handoverPin} (Verbal)
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Out for Delivery Transit Ledger ({filteredOrders.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ID, waybill, vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Transit Orders Table List */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order Ref &amp; Item Specification</th>
                <th className="py-3.5 px-4">Armored Carrier &amp; Convoy</th>
                <th className="py-3.5 px-4">Live Waybill</th>
                <th className="py-3.5 px-4">Estimated Arrival Window</th>
                <th className="py-3.5 px-4">Handover PIN</th>
                <th className="py-3.5 px-4">Insured Value</th>
                <th className="py-3.5 px-4 text-right">Actions (Click to View)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredOrders.map((order) => {
                const isSelected = activeSelectedOrder.id === order.id;
                return (
                  <tr
                    key={order.id}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/10 dark:bg-purple-500/15'
                        : 'hover:bg-purple-500/[0.03] dark:hover:bg-purple-500/[0.04]'
                    }`}
                    onClick={() => setActiveSelectedOrder(order)}
                  >
                    {/* Order & Title */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                          <Coins className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                            {order.id}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                            {order.itemTitle}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Ordered: {order.orderDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Carrier & Vehicle */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block text-xs">
                        {order.carrier}
                      </span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block font-mono">
                        {order.vehicleCode}
                      </span>
                    </td>

                    {/* Waybill */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-slate-900 dark:text-white block text-xs">
                        {order.waybill}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        Seal: {order.tamperSeal}
                      </span>
                    </td>

                    {/* Estimated Arrival */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 animate-pulse font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        <span>{order.estimatedArrival}</span>
                      </span>
                    </td>

                    {/* Handover PIN */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 tracking-wider">
                        {order.handoverPin}
                      </span>
                    </td>

                    {/* Insured Value */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                        {order.totalAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                        100% Insured
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Assay Certificate Popup */}
                        <button
                          type="button"
                          onClick={() => setSelectedCertBar(order.certData)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-purple-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                          title="View Official Assay Certificate"
                        >
                          <Award className="w-3.5 h-3.5 text-purple-400" />
                        </button>

                        {/* Tax Invoice Direct Link */}
                        <Link
                          href={`/dashboard/customer/orders/${order.id}/invoice`}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1 hover:border-amber-500/30 shadow-sm"
                          title="View Official Tax Invoice"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-500" />
                          <span className="hidden sm:inline">Invoice</span>
                        </Link>

                        {/* Telemetry Switcher Button */}
                        <button
                          type="button"
                          onClick={() => setActiveSelectedOrder(order)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          <Truck className="w-3 h-3" />
                          <span>{isSelected ? 'Live Route' : 'View Route'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Detailed Route Telemetry Card for Selected Transit Ingot */}
      <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <span className="font-mono text-xs font-bold text-amber-700 dark:text-[#D4AF37] block">
              {activeSelectedOrder.id} · {activeSelectedOrder.category}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeSelectedOrder.itemTitle}
            </h2>
            <span className="text-xs text-slate-500 font-mono block mt-0.5">
              Insured Cargo Value: €{activeSelectedOrder.totalAmount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-mono">
              Vehicle: {activeSelectedOrder.vehicleCode}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Tamper Seal: <strong className="font-mono">{activeSelectedOrder.tamperSeal}</strong>
            </span>
          </div>
        </div>

        {/* Live Route Milestones for Selected Convoy */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>Armored Transit Checkpoint Telemetry ({activeSelectedOrder.carrier})</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {activeSelectedOrder.transitMilestones.map((m, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    m.completed
                      ? 'bg-emerald-500 text-white shadow-md'
                      : m.active
                      ? 'bg-purple-600 text-white ring-4 ring-purple-500/20 animate-pulse shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {m.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    m.active
                      ? 'bg-purple-500/10 border-purple-500/40 shadow-md ring-1 ring-purple-500/30'
                      : m.completed
                      ? 'bg-slate-50/70 dark:bg-[#0E1524]/70 border-slate-200 dark:border-slate-800'
                      : 'bg-slate-50/30 dark:bg-[#090D15]/30 border-slate-200/50 dark:border-slate-800/50 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {m.title}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300">
                      {m.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Location: <strong>{m.location}</strong> · Status: <span className="font-semibold">{m.status}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/dashboard/customer/orders/${activeSelectedOrder.id}`}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>Order Dossier</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={`/dashboard/customer/orders/${activeSelectedOrder.id}/invoice`}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Tax Invoice</span>
          </Link>
        </div>
      </div>

      {/* Assay Certificate Popup Modal */}
      <AssayCertificateModal
        isOpen={Boolean(selectedCertBar)}
        onClose={() => setSelectedCertBar(null)}
        bar={selectedCertBar}
      />
    </div>
  );
}
