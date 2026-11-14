'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Filter,
  Download,
  Gem,
  Coins,
  QrCode,
  FileText,
  Lock,
  ChevronRight,
  TrendingUp,
  Hammer,
  Eye,
  Award,
  ExternalLink
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface CustomerOrder {
  id: string;
  itemTitle: string;
  category: 'Bullion Vault Bar' | 'Fine Jewelry Atelier' | 'Bespoke Diamond Ring';
  orderDate: string;
  totalAmount: number;
  paymentStatus: 'Settled (Escrow Released)' | 'Held in Escrow' | 'Instant Wire Cleared';
  fulfillmentStatus: 'Out for Delivery (Armored)' | 'In Atelier Setting' | 'Delivered & Vault Signed';
  carrier: string;
  waybill: string;
  dppTokenId?: string;
  statusKey: 'processing' | 'transit' | 'completed';
  // Certificate data for popup
  certData: AssayCertificateData;
}

export default function CustomerOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'processing' | 'transit' | 'completed'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const orders: CustomerOrder[] = [
    {
      id: 'ORD-98301',
      itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
      category: 'Bullion Vault Bar',
      orderDate: '22 Aug 2026',
      totalAmount: 8836.0,
      paymentStatus: 'Instant Wire Cleared',
      fulfillmentStatus: 'Out for Delivery (Armored)',
      carrier: "Brink's Global Services",
      waybill: 'CH-BRINKS-998201',
      dppTokenId: 'DPP-VAL-88901',
      statusKey: 'transit',
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
      id: 'ORD-98302',
      itemTitle: '24K Yellow Gold Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
      category: 'Fine Jewelry Atelier',
      orderDate: '18 Aug 2026',
      totalAmount: 14500.0,
      paymentStatus: 'Held in Escrow',
      fulfillmentStatus: 'In Atelier Setting',
      carrier: 'Ferrari Group Armored',
      waybill: 'FERRARI-EXP-44102',
      dppTokenId: 'DPP-SOL-99120',
      statusKey: 'processing',
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
      id: 'ORD-98303',
      itemTitle: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot (999.0 Ag)',
      category: 'Bullion Vault Bar',
      orderDate: '10 Aug 2026',
      totalAmount: 1040.0,
      paymentStatus: 'Settled (Escrow Released)',
      fulfillmentStatus: 'Delivered & Vault Signed',
      carrier: 'Loomis International',
      waybill: 'LOOMIS-ZUR-10029',
      dppTokenId: 'DPP-ARG-10492',
      statusKey: 'completed',
      certData: {
        serialNumber: 'CH-ARG-771920',
        certificateNumber: 'ASSAY-ARG-2026-7719',
        refiner: 'Argor-Heraeus SA',
        productName: '1,000g Fine Silver Cast Ingot (999.0 Ag)',
        metal: 'Silver (Ag)',
        metalType: 'silver',
        weightGrams: 1000,
        purity: '999.0 Fine Silver Cast Ingot',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        dimensions: '117.0 × 53.0 × 15.0 mm',
        vaultLocation: 'Zurich Duty-Free Vault · Safe #S-109',
        allocatedDate: '10 Aug 2026',
        currentValue: 1040.0,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'ORD-98304',
      itemTitle: '18K White Gold Micro-Pavé Tennis Bracelet (5.50ct F-VS+)',
      category: 'Fine Jewelry Atelier',
      orderDate: '02 Aug 2026',
      totalAmount: 9800.0,
      paymentStatus: 'Settled (Escrow Released)',
      fulfillmentStatus: 'Delivered & Vault Signed',
      carrier: 'Malca-Amit Global',
      waybill: 'MALCA-ZUR-33910',
      dppTokenId: 'DPP-TNS-77821',
      statusKey: 'completed',
      certData: {
        serialNumber: 'ATELIER-TNS-77821',
        certificateNumber: 'DPP-TNS-77821-CERT',
        refiner: 'Maison NEOS7 Haute Joaillerie',
        productName: '18K White Gold Micro-Pavé Tennis Bracelet',
        metal: '18K White Gold (750)',
        metalType: 'platinum',
        weightGrams: 18.5,
        purity: '18K White Gold (750) + 5.50ct F-VS+ Diamonds',
        assayStamp: 'CH-GENEVA-HALLMARK-2026',
        dimensions: '18.0 cm length · 3.2 mm width',
        vaultLocation: 'Delivered & Handover Signed',
        allocatedDate: '02 Aug 2026',
        currentValue: 9800.0,
        insurancePolicy: 'Lloyds-MALCA-9930',
      },
    },
  ];

  const totalValue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const processingCount = orders.filter((o) => o.statusKey === 'processing').length;
  const transitCount = orders.filter((o) => o.statusKey === 'transit').length;
  const completedCount = orders.filter((o) => o.statusKey === 'completed').length;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.waybill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.statusKey === filterStatus;
    const matchesCategory = filterCategory === 'all' || order.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Jewelry Atelier &amp; Bullion Orders
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Lloyd&apos;s 100% In-Transit &amp; Escrow Security
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-[#D4AF37]" />
            <span>All Orders &amp; Purchases</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Master status ledger for your fine jewelry creations, armored dispatches, digital assay certificates, and tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/invoices"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Tax Invoices &amp; Receipts</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Purchases</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {orders.length} Orders
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1">
            €{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} Total
          </span>
        </div>

        <Link
          href="/dashboard/customer/orders/processing"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-amber-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-amber-500 transition-colors">
            Processing Orders
          </span>
          <span className="text-2xl font-black text-amber-600 dark:text-[#D4AF37] font-mono mt-1 block">
            {processingCount} Active
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>In Atelier Setting</span>
            <ChevronRight className="w-3 h-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/dashboard/customer/orders/transit"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-purple-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-purple-400 transition-colors">
            Out for Delivery
          </span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
            {transitCount} Active
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>Brink&apos;s Armored Van</span>
            <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/dashboard/customer/orders/completed"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-emerald-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-emerald-400 transition-colors">
            Delivered &amp; Completed
          </span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
            {completedCount} Delivered
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>Signed &amp; Released</span>
            <ChevronRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* 2.1 Status Quick Filter Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#0E1524]/80 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-500 px-3">Filter by Status:</span>
        <button
          type="button"
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterStatus === 'all'
              ? 'gold-gradient-bg text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Orders ({orders.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('processing')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'processing'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Hammer className="w-3.5 h-3.5" />
          <span>Processing Orders ({processingCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('transit')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'transit'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-purple-400'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Out for Delivery ({transitCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'completed'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Delivered &amp; Completed ({completedCount})</span>
        </button>

        <Link
          href="/dashboard/customer/invoices"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-amber-500/10 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all ml-auto flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Tax Invoices &amp; Receipts</span>
        </Link>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order ID, item name, waybill, serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Categories</option>
            <option value="Bullion Vault Bar">Bullion Vault Bar</option>
            <option value="Fine Jewelry Atelier">Fine Jewelry Atelier</option>
          </select>
        </div>
      </div>

      {/* 4. Complete Orders Table Ledger */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              All Orders &amp; Purchases Ledger ({filteredOrders.length} Items)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            100% Escrow &amp; Insured Fulfillment
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order Ref &amp; Item Specification</th>
                <th className="py-3.5 px-4">Category &amp; Date</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Carrier &amp; Waybill</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Actions (Click to View Page)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors group"
                >
                  {/* Order & Specification */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                        {order.category.includes('Jewelry') ? (
                          <Gem className="w-5 h-5" />
                        ) : (
                          <Coins className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                          {order.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                          {order.itemTitle}
                        </span>
                        {order.dppTokenId && (
                          <span className="text-[10px] text-slate-400 font-mono block">
                            DPP Token: {order.dppTokenId}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category & Date */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold block text-xs">
                      {order.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Ordered {order.orderDate}
                    </span>
                  </td>

                  {/* Total Amount & Escrow */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                      {order.totalAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Carrier & Waybill */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold block">
                      {order.carrier}
                    </span>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold block">
                      {order.waybill}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        order.statusKey === 'transit'
                          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 animate-pulse'
                          : order.statusKey === 'processing'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          order.statusKey === 'transit'
                            ? 'bg-purple-500'
                            : order.statusKey === 'processing'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span>{order.fulfillmentStatus}</span>
                    </span>
                  </td>

                  {/* Actions: Click to View Respective Page & Certificate Modal */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Assay Certificate Modal Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedCertBar(order.certData)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View Official Assay & Authenticity Certificate"
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

                      {/* Status-Specific Respective Page Button */}
                      {order.statusKey === 'processing' && (
                        <Link
                          href="/dashboard/customer/orders/processing"
                          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1 transition-all shadow-sm"
                          title="View In-Atelier Crafting Stages"
                        >
                          <Hammer className="w-3 h-3 text-amber-500" />
                          <span>Atelier Page</span>
                        </Link>
                      )}

                      {order.statusKey === 'transit' && (
                        <Link
                          href="/dashboard/customer/orders/transit"
                          className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-bold text-xs flex items-center gap-1 transition-all shadow-sm"
                          title="View Out for Delivery Transit Telemetry"
                        >
                          <Truck className="w-3 h-3 text-purple-400" />
                          <span>Transit Page</span>
                        </Link>
                      )}

                      {order.statusKey === 'completed' && (
                        <Link
                          href="/dashboard/customer/orders/completed"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center gap-1 transition-all shadow-sm"
                          title="View Delivered & Completed Archive"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Delivered Page</span>
                        </Link>
                      )}

                      {/* Full Order Dossier Link */}
                      <Link
                        href={`/dashboard/customer/orders/${order.id}`}
                        className="px-2.5 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center gap-1 transition-all"
                        title="View Full Order Dossier"
                      >
                        <span>Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> purchases across all statuses
          </span>
          <div className="flex items-center gap-4">
            <span>
              Total Order Value: <strong className="text-slate-900 dark:text-white font-mono">€{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Assay / Authenticity Certificate Popup Modal */}
      <AssayCertificateModal
        isOpen={Boolean(selectedCertBar)}
        onClose={() => setSelectedCertBar(null)}
        bar={selectedCertBar}
      />
    </div>
  );
}
