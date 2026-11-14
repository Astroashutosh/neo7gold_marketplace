'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Gem,
  Sparkles,
  ArrowLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MessageSquare,
  Award,
  Download,
  ExternalLink,
  ChevronRight,
  User,
  Hammer,
  Search,
  Eye
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface ProcessingOrder {
  id: string;
  itemTitle: string;
  category: string;
  orderDate: string;
  estimatedCompletion: string;
  totalAmount: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  atelierLocation: string;
  masterGoldsmith: string;
  giaCert: string;
  metalSpec: string;
  gemSpec: string;
  currentStage: number;
  stages: {
    step: number;
    title: string;
    date: string;
    desc: string;
    completed: boolean;
    active?: boolean;
  }[];
  certData: AssayCertificateData;
}

export default function OrdersProcessingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const processingOrders: ProcessingOrder[] = [
    {
      id: 'ORD-98302',
      itemTitle: '24K Yellow Gold Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
      category: 'Fine Jewelry Atelier',
      orderDate: '18 Aug 2026',
      estimatedCompletion: '28 Aug 2026 (In 4 Days)',
      totalAmount: 14500.0,
      paymentStatus: 'Held in Escrow',
      fulfillmentStatus: 'In Atelier Setting (Stage 3 of 5)',
      atelierLocation: 'Maison NEOS7 High Jewelry Atelier · Geneva Private Studio',
      masterGoldsmith: 'Jean-Luc Mercier (Master Setter & Lapidary)',
      giaCert: 'GIA-5591028391',
      metalSpec: '24K (999.9) Pure Swiss Alpine Gold · 8.40g',
      gemSpec: '1.20ct Round Brilliant · Color D · Clarity VVS1 · Triple Excellent Cut',
      currentStage: 3,
      stages: [
        {
          step: 1,
          title: 'Alpine Gold Smelting & Master Shank Casting',
          date: '18 Aug 2026',
          desc: 'Segregated 24K Swiss Alpine gold refined and vacuum-cast into master ring profile.',
          completed: true,
        },
        {
          step: 2,
          title: 'CNC Micro-Milling & Pavé Bridge Pre-Drill',
          date: '20 Aug 2026',
          desc: 'Precision laser pre-drilling of micro-pavé bridge channels and comfort-fit contouring.',
          completed: true,
        },
        {
          step: 3,
          title: 'Master Pavé Diamond Micro-Setting',
          date: 'In Progress (Active Bench Stage)',
          desc: 'Hand-setting 28 micro-pavé diamonds under 40x stereomicroscope and claw-mounting the 1.20ct D-VVS1 center stone.',
          completed: false,
          active: true,
        },
        {
          step: 4,
          title: 'Independent Gemological Inspection & Hallmarking',
          date: 'Est. 26 Aug 2026',
          desc: 'Gemologist audit, Swiss Central Office hallmark stamping, and mirror buffing.',
          completed: false,
        },
        {
          step: 5,
          title: 'DPP Minting & Armored Vault Packaging',
          date: 'Est. 28 Aug 2026',
          desc: 'On-chain NFT passport creation, tamper RFID seal, and dispatch booking with Brink’s.',
          completed: false,
        },
      ],
      certData: {
        serialNumber: 'ATELIER-SOL-99120',
        certificateNumber: 'GIA-5591028391',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: '24K Royal Pavé Solitaire Ring (1.20ct D-VVS1)',
        metal: '24K Swiss Alpine Gold',
        metalType: 'gold',
        weightGrams: 8.4,
        purity: '24K Pure Alpine Gold (999.9) + 1.20ct D-VVS1 Diamond',
        assayStamp: 'CH-GENEVA-HALLMARK-2026',
        dimensions: 'Custom Comfort Shank (Size 54 EU)',
        vaultLocation: 'Geneva Private Atelier Safe #G-08',
        allocatedDate: '18 Aug 2026',
        currentValue: 14500.0,
        insurancePolicy: 'Lloyds-ATELIER-994',
      },
    },
    {
      id: 'ORD-98305',
      itemTitle: 'Platinum 950 Emerald-Cut Colombian Emerald & Diamond Halo Pendant',
      category: 'Bespoke Diamond & Gemstone',
      orderDate: '20 Aug 2026',
      estimatedCompletion: '02 Sep 2026 (In 9 Days)',
      totalAmount: 19200.0,
      paymentStatus: 'Held in Escrow',
      fulfillmentStatus: 'In Atelier Setting (Stage 2 of 5)',
      atelierLocation: 'Maison NEOS7 High Jewelry Atelier · Place Vendôme Studio',
      masterGoldsmith: 'Hélène Delacroix (Senior Lapidary Artisan)',
      giaCert: 'SSEF-COL-889102',
      metalSpec: 'Platinum 950 (Pt950) · 12.80g Solid Ingot Mounting',
      gemSpec: '2.80ct Vivid Green Minor Oil Colombian Emerald + 0.90ct Baguette Diamonds',
      currentStage: 2,
      stages: [
        {
          step: 1,
          title: 'Platinum 950 Precision Hand-Forging',
          date: '20 Aug 2026',
          desc: 'High-density Pt950 ingot hand-forged into custom bezel collet.',
          completed: true,
        },
        {
          step: 2,
          title: 'Bespoke Collet Fitting for 2.80ct Emerald',
          date: 'In Progress (Active Bench Stage)',
          desc: 'Precision optical alignment of Colombian emerald corners and baguette side mounts.',
          completed: false,
          active: true,
        },
        {
          step: 3,
          title: 'Micro-Bead Diamond Halo Setting',
          date: 'Est. 28 Aug 2026',
          desc: 'Microscopic grain setting of surrounding F-VVS collection diamonds.',
          completed: false,
        },
        {
          step: 4,
          title: 'SSEF Verification & Swiss Stamping',
          date: 'Est. 31 Aug 2026',
          desc: 'Swiss Gemmological Institute (SSEF) passport verification and official assay stamp.',
          completed: false,
        },
        {
          step: 5,
          title: 'Tamper-Seal & Armored Dispatch Box',
          date: 'Est. 02 Sep 2026',
          desc: 'Final high-jewelry presentation box and insured armored pickup scheduling.',
          completed: false,
        },
      ],
      certData: {
        serialNumber: 'ATELIER-EMR-88910',
        certificateNumber: 'SSEF-COL-889102',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: 'Pt950 Colombian Emerald & Diamond Halo Pendant (2.80ct)',
        metal: 'Platinum (Pt950)',
        metalType: 'platinum',
        weightGrams: 12.8,
        purity: 'Pt950 Platinum + 2.80ct Colombian Emerald (Minor Oil)',
        assayStamp: 'CH-GENEVA-HALLMARK-2026',
        dimensions: 'Pendant: 24.5 × 16.0 × 6.8 mm',
        vaultLocation: 'Geneva Private Atelier Safe #G-12',
        allocatedDate: '20 Aug 2026',
        currentValue: 19200.0,
        insurancePolicy: 'Lloyds-ATELIER-994',
      },
    },
    {
      id: 'ORD-98306',
      itemTitle: '18K Rose Gold Hand-Engraved Renaissance Filigree Bangle',
      category: 'Fine Jewelry Atelier',
      orderDate: '15 Aug 2026',
      estimatedCompletion: '26 Aug 2026 (In 2 Days)',
      totalAmount: 6400.0,
      paymentStatus: 'Held in Escrow',
      fulfillmentStatus: 'In Atelier Setting (Stage 4 of 5)',
      atelierLocation: 'Maison NEOS7 High Jewelry Atelier · Zurich Studio',
      masterGoldsmith: 'Markus Weber (Master Chaser & Engraver)',
      giaCert: 'HALLMARK-ZH-2026-99',
      metalSpec: '18K 4N Rose Gold (750 Au) · 22.00g Solid Core',
      gemSpec: 'Florentine Intaglio Scrollwork & 0.40ct Secret Diamond Accent',
      currentStage: 4,
      stages: [
        {
          step: 1,
          title: '18K 4N Rose Gold Alloy Smelting',
          date: '15 Aug 2026',
          desc: 'High-purity Swiss copper & gold molten alloy cast into oval cuff bar.',
          completed: true,
        },
        {
          step: 2,
          title: 'Hand-Rolled Oval Profile & Hinge Mechanism',
          date: '18 Aug 2026',
          desc: 'Integrated hidden box-clasp with dual safety catch assembly.',
          completed: true,
        },
        {
          step: 3,
          title: 'Florentine Master Hand-Chasing & Intaglio',
          date: '22 Aug 2026',
          desc: 'Over 16 hours of microscopic chisel intaglio and relief scroll engraving.',
          completed: true,
        },
        {
          step: 4,
          title: 'Secret Diamond Flush Setting & Buffing',
          date: 'In Progress (Active Bench Stage)',
          desc: 'Inner flush setting of secret accent diamond and fine satin-brushed finish.',
          completed: false,
          active: true,
        },
        {
          step: 5,
          title: 'Assay Hallmarking & Armored Handover',
          date: 'Est. 26 Aug 2026',
          desc: 'Swiss St. Bernard dog head assay stamp and insured armored logistics booking.',
          completed: false,
        },
      ],
      certData: {
        serialNumber: 'ATELIER-BAN-55102',
        certificateNumber: 'HALLMARK-ZH-2026-99',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: '18K Rose Gold Hand-Engraved Renaissance Bangle (22.0g)',
        metal: '18K 4N Rose Gold',
        metalType: 'gold',
        weightGrams: 22.0,
        purity: '18K 4N Swiss Rose Gold (750 Au)',
        assayStamp: 'CH-ZURICH-HALLMARK-2026',
        dimensions: 'Wrist Size: Medium (17.5 cm) · Width: 6.5 mm',
        vaultLocation: 'Zurich Atelier Depository #Z-04',
        allocatedDate: '15 Aug 2026',
        currentValue: 6400.0,
        insurancePolicy: 'Lloyds-ATELIER-994',
      },
    },
  ];

  const [activeSelectedOrder, setActiveSelectedOrder] = useState<ProcessingOrder>(processingOrders[0]);

  const totalProcessingValue = processingOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = processingOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.masterGoldsmith.toLowerCase().includes(searchTerm.toLowerCase())
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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider animate-pulse">
              Processing Orders · Active Atelier ({processingOrders.length})
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Geneva &amp; Zurich Private High Jewelry Studios
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Hammer className="w-6 h-6 text-amber-500" />
            <span>Processing Orders (In Atelier Crafting)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Table list of bespoke jewelry creations currently on the goldsmith bench with live multi-stage inspection telemetry.
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
            href="/dashboard/customer/messages"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Concierge Atelier Chat</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total In-Crafting Pieces</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {processingOrders.length} Pieces Active
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1">
            Maison NEOS7 Master Studios
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total In-Progress Escrow Value</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {totalProcessingValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block mt-1">
            100% Escrow Protected · 0% Release Until Delivery
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Next Expected Completion</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            26 Aug 2026 (In 2 Days)
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Renaissance Bangle (#{processingOrders[2].id})
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Active Atelier Crafting Ledger ({filteredOrders.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ID, piece title, artisan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Processing Orders Table List */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order Ref &amp; Piece Specification</th>
                <th className="py-3.5 px-4">Bench Stage Milestone</th>
                <th className="py-3.5 px-4">Master Craftsman &amp; Studio</th>
                <th className="py-3.5 px-4">Estimated Ready Date</th>
                <th className="py-3.5 px-4">Total Amount</th>
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
                        ? 'bg-amber-500/10 dark:bg-amber-500/15'
                        : 'hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04]'
                    }`}
                    onClick={() => setActiveSelectedOrder(order)}
                  >
                    {/* Order & Specification */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                          <Gem className="w-5 h-5" />
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

                    {/* Bench Stage */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Stage {order.currentStage} of 5</span>
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1 font-semibold">
                        {order.fulfillmentStatus}
                      </span>
                    </td>

                    {/* Master Craftsman */}
                    <td className="py-4 px-4">
                      <span className="text-slate-900 dark:text-white font-bold block text-xs">
                        {order.masterGoldsmith}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-xs">
                        {order.atelierLocation}
                      </span>
                    </td>

                    {/* Estimated Ready */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block text-xs font-mono">
                        {order.estimatedCompletion}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                        Insured Crafting Cover
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                        {order.totalAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Assay Certificate Popup Trigger */}
                        <button
                          type="button"
                          onClick={() => setSelectedCertBar(order.certData)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                          title="View GIA / Assay Certificate"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-500" />
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

                        {/* Select Stage Button */}
                        <button
                          type="button"
                          onClick={() => setActiveSelectedOrder(order)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer ${
                            isSelected
                              ? 'gold-gradient-bg text-slate-950'
                              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <span>{isSelected ? 'Live Stage' : 'View Stage'}</span>
                          <ChevronRight className="w-3 h-3" />
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

      {/* 5. Live Bench Stage Detail Card for the Selected Processing Piece */}
      <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Gem className="w-7 h-7" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-amber-700 dark:text-[#D4AF37] block">
                {activeSelectedOrder.id} · Ordered {activeSelectedOrder.orderDate}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {activeSelectedOrder.itemTitle}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                {activeSelectedOrder.atelierLocation}
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 animate-pulse font-mono">
              ⚡ Stage {activeSelectedOrder.currentStage} of 5: Active Bench
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Master Artisan: <strong>{activeSelectedOrder.masterGoldsmith}</strong>
            </span>
          </div>
        </div>

        {/* Specifications Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
              Gemological Certification
            </span>
            <strong className="text-slate-900 dark:text-white block font-semibold">
              {activeSelectedOrder.gemSpec}
            </strong>
            <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-mono block">
              Certificate #{activeSelectedOrder.giaCert}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
              Precious Metal Specification
            </span>
            <strong className="text-slate-900 dark:text-white block font-semibold">
              {activeSelectedOrder.metalSpec}
            </strong>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block">
              Swiss Assay Bureau Hallmarked
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
              Escrow &amp; Insurance Protection
            </span>
            <strong className="text-slate-900 dark:text-white block font-semibold">
              100% Locked in Escrow Account
            </strong>
            <span className="text-[11px] text-slate-500 font-mono block">
              Lloyd&apos;s Policy #LL-ATELIER-994
            </span>
          </div>
        </div>

        {/* Vertical Stepper for Selected Piece */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Hammer className="w-4 h-4 text-amber-500" />
            <span>Live Atelier Bench Stages &amp; Quality Milestones</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {activeSelectedOrder.stages.map((st) => (
              <div key={st.step} className="relative">
                <div
                  className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                    st.completed
                      ? 'bg-emerald-500 text-white'
                      : st.active
                      ? 'gold-gradient-bg text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {st.completed ? <CheckCircle2 className="w-4 h-4" /> : st.step}
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    st.active
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-md ring-1 ring-amber-500/30'
                      : st.completed
                      ? 'bg-slate-50/70 dark:bg-[#0E1524]/70 border-slate-200 dark:border-slate-800'
                      : 'bg-slate-50/40 dark:bg-[#090D15]/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Stage {st.step}: {st.title}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-amber-700 dark:text-[#D4AF37]">
                      {st.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.desc}
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
            <span>View Full Order Dossier</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={`/dashboard/customer/orders/${activeSelectedOrder.id}/invoice`}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Official Tax Invoice</span>
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
