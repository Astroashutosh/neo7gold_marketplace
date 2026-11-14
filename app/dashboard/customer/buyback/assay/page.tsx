'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Scale,
  ShieldCheck,
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Search,
  Lock,
  Coins,
  MessageSquare
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface AssaySubmissionItem {
  id: string;
  itemDescription: string;
  metalPurityDeclared: string;
  labPurityDetected: string;
  weightGrams: number;
  lockedSpotRate: number;
  finalEstimatedPayout: number;
  submissionDate: string;
  labLocation: string;
  assayerName: string;
  testingMethod: string;
  spectrometryScanCode: string;
  assayStage: number;
  payoutOption: string;
  certData: AssayCertificateData;
}

export default function BuybackAssayPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertBar, setSelectedCertBar] = useState<AssayCertificateData | null>(null);

  const assayItems: AssaySubmissionItem[] = [
    {
      id: 'BB-2026-081',
      itemDescription: '18K Estate Yellow Gold Chains & Scrap Jewelry Rings',
      metalPurityDeclared: '18K Gold (750 / 1000)',
      labPurityDetected: '75.2% Fine Au (18.05 Karat Verified)',
      weightGrams: 42.5,
      lockedSpotRate: 66.27,
      finalEstimatedPayout: 2816.48,
      submissionDate: '21 Aug 2026',
      labLocation: 'Zurich Central Depository Assay Laboratory · Sluice #2',
      assayerName: 'Dr. Lukas Meier, FOCBS Sworn Assayer',
      testingMethod: 'Dual X-Ray Fluorescence (XRF) + Ultrasound Core Density Scan',
      spectrometryScanCode: 'XRF-ZUR-889102-AU',
      assayStage: 2,
      payoutOption: 'Allocated Fine Gold Vault Credit (999.9 Ingot)',
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
        dimensions: 'Smelt Lot #BB-081',
        vaultLocation: 'Zurich Smelt Holding Safe #M-12',
        allocatedDate: '21 Aug 2026',
        currentValue: 2816.48,
        insurancePolicy: 'Lloyds-ZUR-99201',
      },
    },
  ];

  const totalAssayValue = assayItems.reduce((sum, item) => sum + item.finalEstimatedPayout, 0);

  const filteredItems = assayItems.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.spectrometryScanCode.toLowerCase().includes(searchTerm.toLowerCase())
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
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider animate-pulse font-mono">
              Laboratory Assaying &amp; XRF Testing ({assayItems.length} Lot)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Swiss Federal Central Office for Precious Metals Control (FOCBS)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-amber-500" />
            <span>In Lab Assay &amp; Smelting Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Real-time spectrometry readings, purity verification, and laboratory crucible melting audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/messages"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult Lab Assayer</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Consignments on Test Bench</span>
          <span className="text-2xl font-black text-amber-600 dark:text-[#D4AF37] font-mono mt-1 block">
            {assayItems.length} Active Lot
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 font-semibold">
            Stage 2 of 3 · XRF Spectrometry Complete
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Verified Smelt Payout Valuation</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {totalAssayValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            +€18.20 Higher Than Initial Estimation (75.2% Au Tested)
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Expected Payout Settlement</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            Today by 16:00 CET
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1 font-mono">
            Vault Gold Credit Payout
          </span>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3">
          Lab Bench Consignments ({filteredItems.length})
        </span>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search lot ref, XRF scan code..."
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
                <th className="py-3.5 px-4">Lot Ref &amp; Item Specification</th>
                <th className="py-3.5 px-4">XRF Spectrometry Purity</th>
                <th className="py-3.5 px-4">Net Gold Weight</th>
                <th className="py-3.5 px-4">Locked Spot Rate</th>
                <th className="py-3.5 px-4">Audited Payout Value</th>
                <th className="py-3.5 px-4">Assay Bench Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
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
                          {item.id}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                          {item.itemDescription}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          XRF Code: {item.spectrometryScanCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Purity Tested */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs">
                      {item.labPurityDetected}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Declared: {item.metalPurityDeclared}
                    </span>
                  </td>

                  {/* Weight */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white font-mono block text-xs">
                      {item.weightGrams}.00 g
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Calibrated ±0.001g Scale
                    </span>
                  </td>

                  {/* Locked Spot Rate */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{item.lockedSpotRate.toFixed(2)} / g
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                      Rate Protected
                    </span>
                  </td>

                  {/* Final Payout */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      €{item.finalEstimatedPayout.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {item.payoutOption}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>Stage 2: XRF Tested</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCertBar(item.certData)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View Official Assay & Smelt Report"
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
