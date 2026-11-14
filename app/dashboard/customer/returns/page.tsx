'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Truck,
  Download,
  Eye,
  Plus,
  ArrowRight,
  ExternalLink,
  Search,
  Check,
  XCircle,
  Gem,
  Coins,
  RefreshCw,
  Landmark,
  CreditCard,
  Camera,
  Info
} from 'lucide-react';
import { DataTable, Column } from '@/components/DataTable';

export interface ReturnItem {
  id: string;
  orderId: string;
  orderDate: string;
  itemTitle: string;
  category: 'Fine Jewelry' | 'Custom Atelier Piece' | 'Investment Bullion (Buyback)';
  merchant: string;
  amount: string;
  refundAmount: string;
  reason: 'Size Exchange' | 'Atelier Finish / Gemstone Mismatch' | 'Damaged in Armored Transit' | '14-Day EU Peace of Mind';
  trackingNumber: string;
  carrier: 'Loomis Armored Courier' | 'DHL Express Secure' | 'Swiss Post Valoren';
  status: 'RMA Pending Approval' | 'Return Label Issued' | 'In-Transit to Vault' | 'Under Assay Inspection' | 'Refund Settled' | 'Rejected';
  securitySealIntact: boolean;
  refundMethod: 'Original Bank Card (Visa/Mastercard)' | 'Bank Wire (UBS Swiss IBAN)' | 'Gold Vault Credit';
  requestedAt: string;
  completedAt?: string;
  notes: string;
  timeline: { title: string; date: string; status: 'completed' | 'current' | 'pending'; note: string }[];
}

export const mockCustomerReturns: ReturnItem[] = [
  {
    id: 'RMA-2026-891',
    orderId: 'ORD-98301',
    orderDate: '2026-08-15',
    itemTitle: 'Royal Heritage 22k Byzantine Chain (65g)',
    category: 'Fine Jewelry',
    merchant: 'Pforzheim Fine Goldsmiths',
    amount: '€4,890.00',
    refundAmount: '€4,890.00',
    reason: 'Size Exchange',
    trackingNumber: 'LM-ARM-CH-994102',
    carrier: 'Loomis Armored Courier',
    status: 'Under Assay Inspection',
    securitySealIntact: true,
    refundMethod: 'Bank Wire (UBS Swiss IBAN)',
    requestedAt: '2026-08-20 11:30',
    notes: 'Exchanging for 75cm custom length. Security seal verified unbroken upon arrival at Pforzheim inspection hub.',
    timeline: [
      { title: 'RMA Authorized', date: '2026-08-20 14:00', status: 'completed', note: 'Prepaid insured return label generated.' },
      { title: 'Armored Courier Pickup', date: '2026-08-21 09:30', status: 'completed', note: 'Collected by Loomis Armored Switzerland.' },
      { title: 'Delivered to Inspection Vault', date: '2026-08-23 15:45', status: 'completed', note: 'Assay Department logged receipt.' },
      { title: 'Spectrometer 22k Assay Test', date: '2026-08-24 10:15', status: 'current', note: 'XRF purity testing in progress (916/1000).' },
      { title: 'Refund / Replacement Dispatch', date: 'Pending Assay', status: 'pending', note: 'New 75cm chain will be dispatched upon pass.' },
    ],
  },
  {
    id: 'RMA-2026-742',
    orderId: 'ORD-98110',
    orderDate: '2026-07-28',
    itemTitle: 'Artisan Emerald & 18k Solitaire Ring',
    category: 'Fine Jewelry',
    merchant: 'Zurich Vault Gems AG',
    amount: '€3,450.00',
    refundAmount: '€3,450.00',
    reason: '14-Day EU Peace of Mind',
    trackingNumber: 'DHL-VAL-881920',
    carrier: 'DHL Express Secure',
    status: 'Refund Settled',
    securitySealIntact: true,
    refundMethod: 'Original Bank Card (Visa/Mastercard)',
    requestedAt: '2026-08-02 16:15',
    completedAt: '2026-08-07 14:20',
    notes: 'Item returned in original presentation box with unbroken holographic seal. Full refund credited to card ending in 4910.',
    timeline: [
      { title: 'RMA Requested', date: '2026-08-02 16:15', status: 'completed', note: 'Customer initiated 14-day statutory return.' },
      { title: 'Item Received & Inspected', date: '2026-08-05 11:20', status: 'completed', note: 'Gemological & 750 gold purity verified.' },
      { title: 'Refund Completed', date: '2026-08-07 14:20', status: 'completed', note: '€3,450.00 returned to Visa card.' },
    ],
  },
];

function ReturnsPageContent() {
  const [returnsList, setReturnsList] = useState<ReturnItem[]>(mockCustomerReturns);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'settled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null);
  const [isNewRmaOpen, setIsNewRmaOpen] = useState(false);

  // New RMA Form States
  const [selectedOrder, setSelectedOrder] = useState('ORD-98303');
  const [selectedItemName, setSelectedItemName] = useState('18k Gold Diamond Tennis Bracelet (12.4g)');
  const [returnReason, setReturnReason] = useState<ReturnItem['reason']>('Size Exchange');
  const [returnNotes, setReturnNotes] = useState('');
  const [preferredRefundMethod, setPreferredRefundMethod] = useState<ReturnItem['refundMethod']>('Bank Wire (UBS Swiss IBAN)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReturns = returnsList.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.merchant.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return r.status !== 'Refund Settled' && r.status !== 'Rejected';
    if (activeTab === 'settled') return r.status === 'Refund Settled';
    return true;
  });

  const handleCreateRMA = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `RMA-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry: ReturnItem = {
      id: newId,
      orderId: selectedOrder,
      orderDate: '2026-08-20',
      itemTitle: selectedItemName,
      category: 'Fine Jewelry',
      merchant: 'Geneva Goldsmiths Guild',
      amount: '€2,650.00',
      refundAmount: '€2,650.00',
      reason: returnReason,
      trackingNumber: `LM-ARM-CH-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: 'Loomis Armored Courier',
      status: 'RMA Pending Approval',
      securitySealIntact: true,
      refundMethod: preferredRefundMethod,
      requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: returnNotes || 'Customer requested return with intact tamper security seal.',
      timeline: [
        { title: 'RMA Submitted', date: 'Just now', status: 'completed', note: 'Awaiting merchant & vault authorization.' },
        { title: 'Insured Return Shipping Box Dispatch', date: 'Within 24h', status: 'current', note: 'Prepaid armored box will be couriered to your address.' },
        { title: 'Vault Assay & Purity Verification', date: 'Pending Arrival', status: 'pending', note: 'Spectrometer XRF test upon receipt.' },
        { title: 'Refund Release', date: 'Pending Assay', status: 'pending', note: `Settlement to ${preferredRefundMethod}.` },
      ],
    };

    setReturnsList([newEntry, ...returnsList]);
    setIsNewRmaOpen(false);
    showToast(`RMA #${newId} submitted successfully! Our concierge team will issue your armored shipping kit.`);
  };

  const columns: Column<ReturnItem>[] = [
    {
      header: 'RMA & Order',
      accessorKey: 'id',
      cell: (row: ReturnItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-[#D4AF37] shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 dark:text-white font-mono block">
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
              <span>Order: {row.orderId}</span>
              <span>•</span>
              <span>{row.requestedAt.split(' ')[0]}</span>
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Returned Item',
      accessorKey: 'itemTitle',
      cell: (row: ReturnItem) => (
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
            {row.itemTitle}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Gem className="w-3 h-3 text-amber-500" />
            <span>{row.merchant}</span>
          </span>
        </div>
      ),
    },
    {
      header: 'Reason & Value',
      accessorKey: 'amount',
      cell: (row: ReturnItem) => (
        <div>
          <span className="text-xs font-black text-amber-700 dark:text-[#D4AF37] font-mono block">
            {row.amount}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            {row.reason}
          </span>
        </div>
      ),
    },
    {
      header: 'Inspection Status',
      accessorKey: 'status',
      cell: (row: ReturnItem) => {
        const badges: Record<string, string> = {
          'Refund Settled': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          'Under Assay Inspection': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse',
          'In-Transit to Vault': 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
          'RMA Pending Approval': 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30',
          'Return Label Issued': 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          Rejected: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
        };

        return (
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badges[row.status] || badges['RMA Pending Approval']}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      cell: (row: ReturnItem) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedReturn(row)}
            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-[#D4AF37] border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Track RMA</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-500/30 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-amber-400 dark:text-slate-950" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-[#D4AF37] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>14-Day Guaranteed Return &amp; Assay Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight flex items-center gap-3">
            <span>Returns &amp; Refund Center (RMA)</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              100% Insured Armored Return
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Initiate jewelry exchanges, request armored prepaid return boxes, and track real-time spectrometer assay inspection &amp; refund disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewRmaOpen(true)}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Request New Return (RMA)</span>
          </button>
        </div>
      </div>

      {/* Policy Notice Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-amber-600 dark:text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">
            NEOS7 Gold Luxury Return &amp; Liquidation Rules
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            • <strong>Fine Jewelry &amp; Atelier Pieces:</strong> Eligible for full refund or exchange within 14 days of delivery provided the tamper-evident holographic security seal is unbroken.<br />
            • <strong>Investment Bullion (Cast &amp; Minted Gold Bars):</strong> Under EU law, raw precious metals subject to live financial market fluctuations are liquidated instantly via our{' '}
            <Link href="/dashboard/customer/buyback" className="text-amber-700 dark:text-[#D4AF37] underline font-bold">
              Instant Buyback Engine &rarr;
            </Link>
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Active RMA Requests</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {returnsList.filter((r) => r.status !== 'Refund Settled').length} Active
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">In inspection / transit</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Settled Refunds</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            €3,450.00
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Credited to original payment</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Armored Courier Partner</span>
            <Truck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">Loomis &amp; DHL</p>
          <p className="text-[11px] text-slate-500 mt-0.5">100% Insured Valoren Transit</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
          {[
            { id: 'all', label: 'All Returns', count: returnsList.length },
            { id: 'active', label: 'Active In-Inspection', count: returnsList.filter((r) => r.status !== 'Refund Settled').length },
            { id: 'settled', label: 'Completed Refunds', count: returnsList.filter((r) => r.status === 'Refund Settled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-black/20 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search RMA #, Order #, item..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Returns Data Table */}
      <div className="rounded-2xl bg-white dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <DataTable data={filteredReturns} columns={columns} />
      </div>

      {/* Modal 1: RMA Details & Assay Timeline Tracker */}
      {selectedReturn && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0C101A] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-[#0E1524]/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      RMA Case #{selectedReturn.id}
                    </h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] font-bold">
                      {selectedReturn.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Order: {selectedReturn.orderId} • Merchant: {selectedReturn.merchant} • Requested: {selectedReturn.requestedAt}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReturn(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* Item Card */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111927] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Item Returning:</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                    {selectedReturn.itemTitle}
                  </span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-0.5 block">
                    Refund Amount: <strong>{selectedReturn.refundAmount}</strong> ({selectedReturn.reason})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Refund Method:</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                    {selectedReturn.refundMethod}
                  </span>
                </div>
              </div>

              {/* Real-Time Return Timeline */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Return &amp; Assay Verification Progress</span>
                </h3>

                <div className="space-y-3">
                  {selectedReturn.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                    >
                      <div className="mt-0.5">
                        {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        {step.status === 'current' && <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />}
                        {step.status === 'pending' && <Clock className="w-4 h-4 text-slate-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${step.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : step.status === 'current' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                            {step.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{step.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{step.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Armored Courier & Waybill Info */}
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-purple-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {selectedReturn.carrier}
                    </span>
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                      Tracking: {selectedReturn.trackingNumber}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Prepaid armored shipping label downloaded for RMA #${selectedReturn.id}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Return Label</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1524] flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Need concierge help?{' '}
                <Link href="/dashboard/customer/messages" className="text-amber-600 dark:text-[#D4AF37] font-bold underline">
                  Chat with Concierge &rarr;
                </Link>
              </span>

              <button
                onClick={() => setSelectedReturn(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Request New RMA Wizard */}
      {isNewRmaOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0C101A] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <form onSubmit={handleCreateRMA} className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#0E1524]/60">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Request Jewelry Return / Exchange (RMA)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    14-Day EU peace-of-mind return with 100% insured armored courier pickup.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewRmaOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Delivered Order
                  </label>
                  <select
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none"
                  >
                    <option value="ORD-98303">ORD-98303 · Delivered 3 days ago (€2,650.00 · Geneva Goldsmiths)</option>
                    <option value="ORD-98302">ORD-98302 · Delivered 8 days ago (€1,890.00 · Pforzheim Atelier)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Item to Return / Exchange
                  </label>
                  <input
                    type="text"
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Return / Exchange Reason
                    </label>
                    <select
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value as any)}
                      className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none"
                    >
                      <option value="Size Exchange">Size Exchange (e.g. Ring / Chain length)</option>
                      <option value="14-Day EU Peace of Mind">14-Day EU Peace of Mind (Changed mind)</option>
                      <option value="Atelier Finish / Gemstone Mismatch">Atelier Finish / Gemstone Mismatch</option>
                      <option value="Damaged in Armored Transit">Damaged in Armored Transit</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Preferred Refund / Settlement Method
                    </label>
                    <select
                      value={preferredRefundMethod}
                      onChange={(e) => setPreferredRefundMethod(e.target.value as any)}
                      className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none"
                    >
                      <option value="Bank Wire (UBS Swiss IBAN)">Bank Wire (UBS Swiss IBAN)</option>
                      <option value="Original Bank Card (Visa/Mastercard)">Original Bank Card (Visa/Mastercard)</option>
                      <option value="Gold Vault Credit">Gold Vault Credit (Instant balance)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Details / Exchange Notes
                  </label>
                  <textarea
                    value={returnNotes}
                    onChange={(e) => setReturnNotes(e.target.value)}
                    placeholder="Provide ring size required, or details regarding the return..."
                    rows={3}
                    className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-[#111927] border border-slate-200 dark:border-slate-800 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* Security Seal Check Reminder */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Please ensure the jewelry security tag and holographic seal remain attached to guarantee immediate inspection pass.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0E1524] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsNewRmaOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Return &amp; Request Courier Box</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerReturnsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading Returns Center...</div>}>
      <ReturnsPageContent />
    </Suspense>
  );
}
