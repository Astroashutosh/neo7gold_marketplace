'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Download,
  Truck,
  ShieldCheck,
  Scale,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Award,
  Eye,
  Filter,
  Search,
  Check,
  Copy
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface SilverBarItem {
  id: string;
  refiner: string;
  productName: string;
  weightGrams: number;
  purity: string;
  serialNumber: string;
  certificateNumber: string;
  vaultLocation: string;
  allocatedDate: string;
  currentValue: number;
  purchasePrice: number;
  insurancePolicy: string;
  status: 'Allocated In-Vault' | 'In Transit (Armored)' | 'Delivery Requested' | 'Delivered';
  assayStamp: string;
  dimensions: string;
}

export default function CustomerSilverHoldingsPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'IN_VAULT' | 'IN_TRANSIT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSerial, setCopiedSerial] = useState<string | null>(null);
  const [selectedCertificateBar, setSelectedCertificateBar] = useState<AssayCertificateData | null>(null);

  const silverBars: SilverBarItem[] = [
    {
      id: 'CH-ARG-771920',
      refiner: 'Argor-Heraeus SA',
      productName: '1,000g Fine Silver Cast Ingot (999.0 Ag)',
      weightGrams: 1000,
      purity: '999.0 Fine Silver Cast Ingot',
      serialNumber: 'CH-ARG-771920',
      certificateNumber: 'ASSAY-ARG-2026-7719',
      vaultLocation: 'Zurich Duty-Free Vault · Safe #S-109',
      allocatedDate: '01 Mar 2026',
      currentValue: 1040.0,
      purchasePrice: 880.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
      assayStamp: 'CH-FOCBS-ASSAY-0019',
      dimensions: '117.0 × 52.0 × 17.5 mm',
    },
    {
      id: 'CH-VAL-AG-500',
      refiner: 'Valcambi SA',
      productName: '500g Pure Silver Cast Ingot (999.0 Ag)',
      weightGrams: 500,
      purity: '999.0 Pure Silver Cast Bar',
      serialNumber: 'CH-VAL-AG-50012',
      certificateNumber: 'ASSAY-VAL-AG-2026-88',
      vaultLocation: 'Zurich Duty-Free Vault · Safe #S-109',
      allocatedDate: '15 Mar 2026',
      currentValue: 520.0,
      purchasePrice: 445.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
      assayStamp: 'CH-FOCBS-ASSAY-0091',
      dimensions: '85.0 × 40.0 × 14.0 mm',
    },
  ];

  const totalSilverGrams = silverBars.reduce((sum, item) => sum + item.weightGrams, 0);
  const totalSilverValue = silverBars.reduce((sum, item) => sum + item.currentValue, 0);
  const totalPurchaseValue = silverBars.reduce((sum, item) => sum + item.purchasePrice, 0);
  const unrealizedGain = totalSilverValue - totalPurchaseValue;
  const unrealizedGainPct = ((unrealizedGain / totalPurchaseValue) * 100).toFixed(1);

  const filteredBars = silverBars.filter((bar) => {
    const matchesSearch =
      bar.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bar.refiner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bar.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bar.productName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'IN_VAULT') return bar.status === 'Allocated In-Vault';
    if (statusFilter === 'IN_TRANSIT') return bar.status === 'In Transit (Armored)' || bar.status === 'Delivery Requested';
    return true;
  });

  const handleCopySerial = (serial: string) => {
    navigator.clipboard.writeText(serial);
    setCopiedSerial(serial);
    setTimeout(() => setCopiedSerial(null), 2000);
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/vault"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Stored Metals</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              Fine Silver Holdings (Ag)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live LBMA Spot: €1.04 / gram (€32.40 / oz)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-cyan-400" />
            <span>My Stored Silver Bars (999.0 Fine Ag)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Allocated physical silver ingots stored in VAT-free Swiss bonded customs warehouses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/deliveries/request"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Request Home Delivery of Silver</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Silver Valuation</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {totalSilverValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{unrealizedGainPct}% (+€{unrealizedGain.toLocaleString('de-DE')}) Total Gain</span>
          </div>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Stored Silver Weight</span>
          <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono mt-1 block">
            {totalSilverGrams.toLocaleString('de-DE')} g Ag
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            {silverBars.length} Serialized Good Delivery Bars (1.50 kg)
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Bonded Customs Status</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">
            0% VAT Zurich Duty-Free
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            Fully Insured &amp; Audited by Swiss Customs
          </span>
        </div>
      </div>

      {/* 3. Search & Status Filter Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 px-2">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'gold-gradient-bg text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Silver Bars ({silverBars.length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('IN_VAULT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              statusFilter === 'IN_VAULT'
                ? 'gold-gradient-bg text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-[#0E1524] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Stored in Vault ({silverBars.filter((b) => b.status === 'Allocated In-Vault').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search serial, refiner, assay..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      {/* 4. Table Layout: Silver Bar Inventory Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Segregated Silver Ingot Ledger ({filteredBars.length} Items)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            0% VAT Swiss Bonded Warehouse
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Bar Specification &amp; Refiner</th>
                <th className="py-3.5 px-4">Serial &amp; Assay Cert</th>
                <th className="py-3.5 px-4">Fineness &amp; Weight</th>
                <th className="py-3.5 px-4">Current Valuation</th>
                <th className="py-3.5 px-4">Vault Location</th>
                <th className="py-3.5 px-4">Custody Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredBars.map((bar) => (
                <tr
                  key={bar.id}
                  className="hover:bg-cyan-500/[0.03] dark:hover:bg-cyan-500/[0.04] transition-colors group"
                >
                  {/* Refiner & Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-black text-xs shrink-0 shadow-md font-mono border border-slate-300 dark:border-slate-700">
                        {bar.weightGrams >= 1000 ? `${bar.weightGrams / 1000}kg` : `${bar.weightGrams}g`}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block text-xs">
                          {bar.refiner}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                          {bar.productName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Allocated: {bar.allocatedDate}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Serial & Assay */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 block">
                        {bar.serialNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySerial(bar.serialNumber)}
                        title="Copy Serial Number"
                        className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {copiedSerial === bar.serialNumber ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      Cert: {bar.certificateNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Stamp: {bar.assayStamp}
                    </span>
                  </td>

                  {/* Weight & Fineness */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {bar.weightGrams >= 1000 ? `${bar.weightGrams / 1000} kg` : `${bar.weightGrams} g`} Ag
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      {bar.purity}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Dim: {bar.dimensions}
                    </span>
                  </td>

                  {/* Current Valuation */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                      {bar.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                      100% Insured ({bar.insurancePolicy})
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Cost Basis: €{bar.purchasePrice.toLocaleString('de-DE')}
                    </span>
                  </td>

                  {/* Vault Storage Unit */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold block text-xs">
                      {bar.vaultLocation}
                    </span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold block">
                      Bonded Freezone Deposit
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{bar.status}</span>
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificateBar({
                            serialNumber: bar.serialNumber,
                            certificateNumber: bar.certificateNumber,
                            refiner: bar.refiner,
                            productName: bar.productName,
                            metal: 'Silver (Ag)',
                            metalType: 'silver',
                            weightGrams: bar.weightGrams,
                            purity: bar.purity,
                            assayStamp: bar.assayStamp,
                            dimensions: bar.dimensions,
                            vaultLocation: bar.vaultLocation,
                            allocatedDate: bar.allocatedDate,
                            currentValue: bar.currentValue,
                            insurancePolicy: bar.insurancePolicy,
                          })
                        }
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
                        title="View & Download Official Swiss Vault Assay Certificate"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href="/dashboard/customer/deliveries/request"
                        className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-[11px] font-bold transition-all"
                      >
                        Withdraw
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
            Showing <strong>{filteredBars.length}</strong> of <strong>{silverBars.length}</strong> silver ingots
          </span>
          <div className="flex items-center gap-4">
            <span>
              Total Weight: <strong className="text-slate-900 dark:text-white font-mono">{totalSilverGrams / 1000} kg Ag</strong>
            </span>
            <span>
              Total Valuation: <strong className="text-slate-900 dark:text-white font-mono">€{totalSilverValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Assay Certificate Popup Modal */}
      <AssayCertificateModal
        isOpen={Boolean(selectedCertificateBar)}
        onClose={() => setSelectedCertificateBar(null)}
        bar={selectedCertificateBar}
      />
    </div>
  );
}
