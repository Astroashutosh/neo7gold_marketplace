'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Plus,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Package,
  ExternalLink,
  Coins,
  Download,
  AlertCircle,
  Truck,
  Search,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface BuybackSubmission {
  id: string;
  itemDescription: string;
  metalPurity: string;
  estimatedWeightGrams: number;
  lockedSpotRate: number;
  totalEstimatedPayout: number;
  submissionDate: string;
  packStatus: 'Insured Pack In Transit' | 'Assay in Progress (XRF)' | 'Payout Settled (Wire)';
  statusKey: 'shipping' | 'assay' | 'settled';
  payoutMethod: 'Bank Wire Transfer' | 'Allocated Fine Gold Vault Credit';
  trackingKitCode: string;
  certData: AssayCertificateData;
}

export default function CustomerBuybackPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'shipping' | 'assay' | 'settled'>('all');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const submissions: BuybackSubmission[] = [
    {
      id: 'BB-2026-085',
      itemDescription: '14K Gold Vintage Watch Cases, Chains & Dental Scrap',
      metalPurity: '14K Gold (585 / 1000)',
      estimatedWeightGrams: 55.0,
      lockedSpotRate: 51.54,
      totalEstimatedPayout: 2834.70,
      submissionDate: '23 Aug 2026',
      packStatus: 'Insured Pack In Transit',
      statusKey: 'shipping',
      payoutMethod: 'Bank Wire Transfer',
      trackingKitCode: 'CH-POST-SEC-998102',
      certData: {
        serialNumber: 'KIT-BB-085',
        certificateNumber: 'WAYBILL-POST-9981',
        refiner: 'NEOS7 Swiss Depository Logistics',
        productName: '14K Scrap Gold Consignment (55.00g)',
        metal: '14K Scrap Gold (585 Au)',
        metalType: 'gold',
        weightGrams: 55.0,
        purity: '58.5% Gold (14 Karat)',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        vaultLocation: 'In Transit to Zurich Sluice',
        allocatedDate: '23 Aug 2026',
        currentValue: 2834.70,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'BB-2026-081',
      itemDescription: '18K Estate Yellow Gold Chains & Scrap Jewelry Rings',
      metalPurity: '18K Gold (750 / 1000)',
      estimatedWeightGrams: 42.5,
      lockedSpotRate: 66.27,
      totalEstimatedPayout: 2816.48,
      submissionDate: '21 Aug 2026',
      packStatus: 'Assay in Progress (XRF)',
      statusKey: 'assay',
      payoutMethod: 'Allocated Fine Gold Vault Credit',
      trackingKitCode: 'KIT-SWISS-88910',
      certData: {
        serialNumber: 'XRF-ZUR-889102',
        certificateNumber: 'ASSAY-MELT-2026-881',
        refiner: 'NEOS7 Swiss Depository & Smelting Desk',
        productName: '18K Gold Scrap Consignment (42.50g)',
        metal: '18K Scrap Gold (750 Au)',
        metalType: 'gold',
        weightGrams: 42.5,
        purity: '75.2% Tested Gold (18.05K)',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        vaultLocation: 'Zurich Smelt Holding Safe #M-12',
        allocatedDate: '21 Aug 2026',
        currentValue: 2816.48,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'BB-2026-064',
      itemDescription: '22K Traditional Bridal Bangle (916 Hallmarked)',
      metalPurity: '22K Gold (916 / 1000)',
      estimatedWeightGrams: 28.0,
      lockedSpotRate: 80.93,
      totalEstimatedPayout: 2266.04,
      submissionDate: '08 Aug 2026',
      packStatus: 'Payout Settled (Wire)',
      statusKey: 'settled',
      payoutMethod: 'Bank Wire Transfer',
      trackingKitCode: 'KIT-SWISS-77219',
      certData: {
        serialNumber: 'SMELT-BB-064',
        certificateNumber: 'FOCBS-SMELT-7721',
        refiner: 'NEOS7 Swiss Depository & Smelting Desk',
        productName: '22K Gold Bangle Smelt Consignment (28.00g)',
        metal: '22K Gold (916 Au)',
        metalType: 'gold',
        weightGrams: 28.0,
        purity: '91.6% Pure Gold (22 Karat)',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        vaultLocation: 'Zurich Smelt Archive Safe #M-04',
        allocatedDate: '08 Aug 2026',
        currentValue: 2266.04,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
  ];

  const totalValue = submissions.reduce((sum, sub) => sum + sub.totalEstimatedPayout, 0);
  const activeCount = submissions.filter((s) => s.statusKey !== 'settled').length;

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.trackingKitCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sub.statusKey === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Gold Recycling &amp; Buy-Back Desk
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Direct Swiss Refinery Assay Rates
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <RotateCcw className="w-6 h-6 text-[#D4AF37]" />
            <span>Sell My Gold &amp; Scrap Submissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Turn broken jewelry, estate scrap, and dental gold into instant bank cash or pure 999.9 vault gold bullion credits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/buyback/new"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Sell Submission &amp; Price Lock</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Submissions</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {submissions.length} Consignments
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1">
            {activeCount} Active in Transit/Assay
          </span>
        </div>

        <Link
          href="/dashboard/customer/buyback/shipping"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-purple-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-purple-400 transition-colors">
            Kits in Transit
          </span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
            1 Pack
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>Insured Courier Pouch</span>
            <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/dashboard/customer/buyback/assay"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-amber-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-amber-500 transition-colors">
            In Lab Assay &amp; Testing
          </span>
          <span className="text-2xl font-black text-amber-600 dark:text-[#D4AF37] font-mono mt-1 block">
            1 Lot
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>XRF Spectrometry</span>
            <ChevronRight className="w-3 h-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/dashboard/customer/buyback/settled"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-emerald-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-emerald-400 transition-colors">
            Payout Settled
          </span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
            1 Cleared
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>Bank Wire / Vault Credit</span>
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
          All Submissions ({submissions.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('shipping')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'shipping'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-purple-400'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Kits in Transit (1)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('assay')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'assay'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>In Lab Assay (1)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('settled')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            filterStatus === 'settled'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Payout Settled (1)</span>
        </button>

        <Link
          href="/dashboard/customer/buyback/new"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-amber-500/10 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all ml-auto flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>New Submission Form</span>
        </Link>
      </div>

      {/* 3. Search Bar */}
      <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search submission ID, metal type, waybill kit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="text-xs text-slate-500">
          <span>Total Liquidated Value: <strong className="text-slate-900 dark:text-white font-mono">€{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong></span>
        </div>
      </div>

      {/* 4. Complete Table Ledger */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              All Buy-Back Consignments ({filteredSubmissions.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            Institutional Swiss Melting Rates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Submission Ref &amp; Consignment</th>
                <th className="py-3.5 px-4">Weight &amp; Karat</th>
                <th className="py-3.5 px-4">Locked Spot Rate</th>
                <th className="py-3.5 px-4">Estimated / Settled Payout</th>
                <th className="py-3.5 px-4">Payout Method</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4 text-right">Actions (Click to View)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredSubmissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors"
                >
                  {/* Ref & Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                          {sub.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                          {sub.itemDescription}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Submitted {sub.submissionDate} · Kit: {sub.trackingKitCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Weight & Karat */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white font-mono block text-xs">
                      {sub.estimatedWeightGrams}.0g Gold
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      {sub.metalPurity}
                    </span>
                  </td>

                  {/* Locked Spot Rate */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{sub.lockedSpotRate.toFixed(2)} / g
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                      Spot Fixed
                    </span>
                  </td>

                  {/* Payout Amount */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      €{sub.totalEstimatedPayout.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Payout Method */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-semibold block">
                      {sub.payoutMethod}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        sub.statusKey === 'shipping'
                          ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 animate-pulse font-mono'
                          : sub.statusKey === 'assay'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse font-mono'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sub.statusKey === 'shipping'
                            ? 'bg-purple-500'
                            : sub.statusKey === 'assay'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span>{sub.packStatus}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Assay Certificate Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => setSelectedCertBar(sub.certData)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View Official Assay & Smelt Certificate"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                      </button>

                      {/* Status-Specific Page Link */}
                      {sub.statusKey === 'shipping' && (
                        <Link
                          href="/dashboard/customer/buyback/shipping"
                          className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Track Kit</span>
                        </Link>
                      )}

                      {sub.statusKey === 'assay' && (
                        <Link
                          href="/dashboard/customer/buyback/assay"
                          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <Scale className="w-3 h-3" />
                          <span>Lab Assay</span>
                        </Link>
                      )}

                      {sub.statusKey === 'settled' && (
                        <Link
                          href="/dashboard/customer/buyback/settled"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Receipt</span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
