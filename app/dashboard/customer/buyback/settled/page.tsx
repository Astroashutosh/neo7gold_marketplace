'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Scale,
  Coins,
  QrCode,
  Search,
  Award,
  Landmark
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface SettledBuybackItem {
  id: string;
  itemDescription: string;
  metalPurity: string;
  finalWeightGrams: number;
  lockedSpotRate: number;
  totalPaidAmount: number;
  settlementDate: string;
  payoutMethod: 'Bank Wire Transfer' | 'Allocated Fine Gold Vault Credit';
  paymentReference: string;
  assayerCertNumber: string;
  certData: AssayCertificateData;
}

export default function BuybackSettledPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const settledItems: SettledBuybackItem[] = [
    {
      id: 'BB-2026-064',
      itemDescription: '22K Traditional Bridal Bangle (916 Hallmarked)',
      metalPurity: '22K Gold (916 / 1000)',
      finalWeightGrams: 28.0,
      lockedSpotRate: 80.93,
      totalPaidAmount: 2266.04,
      settlementDate: '08 Aug 2026',
      payoutMethod: 'Bank Wire Transfer',
      paymentReference: 'SEPA-CH-TX-8891028',
      assayerCertNumber: 'FOCBS-SMELT-7721',
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
        dimensions: 'Settled Lot #BB-064',
        vaultLocation: 'Zurich Smelt Archive Safe #M-04',
        allocatedDate: '08 Aug 2026',
        currentValue: 2266.04,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
    {
      id: 'BB-2026-052',
      itemDescription: '18K & 24K Estate Scrap Gold & Dental Ingot',
      metalPurity: 'Mixed High Karat (750 - 999)',
      finalWeightGrams: 65.0,
      lockedSpotRate: 68.46,
      totalPaidAmount: 4450.20,
      settlementDate: '28 Jul 2026',
      payoutMethod: 'Allocated Fine Gold Vault Credit',
      paymentReference: 'VAULT-CREDIT-INGOT-50G',
      assayerCertNumber: 'FOCBS-SMELT-6610',
      certData: {
        serialNumber: 'SMELT-BB-052',
        certificateNumber: 'FOCBS-SMELT-6610',
        refiner: 'NEOS7 Swiss Depository & Smelting Desk',
        productName: 'Mixed Scrap Gold Smelt Consignment (65.00g)',
        metal: 'Fine Gold (999.9 Au Credit)',
        metalType: 'gold',
        weightGrams: 50.0,
        purity: '999.9 Fine Gold Vault Credit Ingot',
        assayStamp: 'CH-FOCBS-ASSAY-0019',
        dimensions: 'Allocated Safe #B-402',
        vaultLocation: 'Zurich Duty-Free Vault · Safe #B-402',
        allocatedDate: '28 Jul 2026',
        currentValue: 4450.20,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
  ];

  const totalPaidOut = settledItems.reduce((sum, item) => sum + item.totalPaidAmount, 0);

  const filteredItems = settledItems.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentReference.toLowerCase().includes(searchTerm.toLowerCase())
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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase tracking-wider font-mono">
              Payout Settled Archive ({settledItems.length} Consignments)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Bank Wire &amp; Vault Gold Credits Cleared
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <span>Payout Settled &amp; Credited Archive</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Historical ledger of completed scrap gold buy-backs, SEPA bank wire receipts, and allocated vault credit certificates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/buyback/new"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Sell Submission</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Settled Consignments</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {settledItems.length} Consignments
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            100% Payouts Completed
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Liquidated Payout</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {totalPaidOut.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Direct Swiss Refinery Payouts
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Payout Methods Executed</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            1 Wire + 1 Vault Credit
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1 font-mono">
            50g 999.9 Fine Gold Added
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Settled Payouts Ledger ({filteredItems.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search lot ref, payment ref, cert #..."
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
                <th className="py-3.5 px-4">Lot Ref &amp; Consignment Description</th>
                <th className="py-3.5 px-4">Final Audited Weight &amp; Karat</th>
                <th className="py-3.5 px-4">Settlement Date</th>
                <th className="py-3.5 px-4">Payout Method &amp; Reference</th>
                <th className="py-3.5 px-4">Total Paid Amount</th>
                <th className="py-3.5 px-4">Assay Seal #</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-emerald-500/[0.03] dark:hover:bg-emerald-500/[0.04] transition-colors"
                >
                  {/* Ref & Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                        <Coins className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                          {item.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                          {item.itemDescription}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Weight & Karat */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white font-mono block text-xs">
                      {item.finalWeightGrams}.00 g Gold
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      {item.metalPurity}
                    </span>
                  </td>

                  {/* Settlement Date */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block text-xs">
                      {item.settlementDate}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                      ✓ Cleared
                    </span>
                  </td>

                  {/* Payout Method */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block text-xs">
                      {item.payoutMethod}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Ref: {item.paymentReference}
                    </span>
                  </td>

                  {/* Total Paid Amount */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                      {item.totalPaidAmount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                      Direct Credit
                    </span>
                  </td>

                  {/* Assay Seal */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-amber-700 dark:text-[#D4AF37] text-xs block">
                      {item.assayerCertNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      FOCBS Smelt Certified
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCertBar(item.certData)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View Final Smelt Assay Certificate"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                      </button>
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
