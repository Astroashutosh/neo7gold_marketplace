'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Download,
  Truck,
  ShieldCheck,
  Building,
  Coins,
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  QrCode,
  Landmark,
  Eye,
  Plus
} from 'lucide-react';
import { AssayCertificateModal, AssayCertificateData } from '@/components/AssayCertificateModal';

interface VaultBar {
  id: string;
  metal: 'Gold (Au)' | 'Silver (Ag)' | 'Platinum (Pt)';
  refiner: string;
  weightGrams: number;
  purity: string;
  serialNumber: string;
  certificateNumber: string;
  vaultLocation: string;
  allocatedDate: string;
  currentValue: number;
  insurancePolicy: string;
  status: 'Allocated In-Vault' | 'Withdrawal Processing' | 'Dispatched';
}

export default function CustomerVaultPage() {
  const [activeTab, setActiveTab] = useState<'holdings' | 'withdraw'>('holdings');
  const [selectedBar, setSelectedBar] = useState<VaultBar | null>(null);
  const [selectedCertificateBar, setSelectedCertificateBar] = useState<AssayCertificateData | null>(null);

  // Withdrawal form states
  const [withdrawBarId, setWithdrawBarId] = useState('CH-VAL-889012');
  const [deliveryType, setDeliveryType] = useState<'armored_courier' | 'depository_pickup'>('armored_courier');
  const [shippingAddress, setShippingAddress] = useState('Bahnhofstrasse 45, 8001 Zurich, Switzerland');
  const [recipientName, setRecipientName] = useState('Dr. Alexander von Bern');
  const [recipientPhone, setRecipientPhone] = useState('+41 44 211 88 00');
  const [isSubmittingWithdrawal, setIsSubmittingWithdrawal] = useState(false);
  const [isWithdrawalSuccess, setIsWithdrawalSuccess] = useState(false);

  const vaultHoldings: VaultBar[] = [
    {
      id: 'CH-VAL-889012',
      metal: 'Gold (Au)',
      refiner: 'Valcambi SA (Balerna, Switzerland)',
      weightGrams: 100,
      purity: '999.9 Fine Gold',
      serialNumber: 'CH-VAL-889012',
      certificateNumber: 'ASSAY-VAL-2026-9901',
      vaultLocation: 'Zurich Duty-Free Vault · Safe Deposit Unit #B-402',
      allocatedDate: '12 Jan 2026',
      currentValue: 8836.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
    },
    {
      id: 'CH-PAMP-992144',
      metal: 'Gold (Au)',
      refiner: 'PAMP Suisse (Castel San Pietro, Switzerland)',
      weightGrams: 100,
      purity: '999.9 Fine Gold (Lady Fortuna)',
      serialNumber: 'CH-PAMP-992144',
      certificateNumber: 'ASSAY-PAMP-2026-4412',
      vaultLocation: 'Zurich Duty-Free Vault · Safe Deposit Unit #B-402',
      allocatedDate: '04 Feb 2026',
      currentValue: 8836.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
    },
    {
      id: 'CH-ARG-881903',
      metal: 'Gold (Au)',
      refiner: 'Argor-Heraeus SA (Mendrisio, Switzerland)',
      weightGrams: 50,
      purity: '999.9 Fine Gold Cast Bar',
      serialNumber: 'CH-ARG-881903',
      certificateNumber: 'ASSAY-ARG-2026-1029',
      vaultLocation: 'Zurich Duty-Free Vault · Safe Deposit Unit #B-402',
      allocatedDate: '18 Feb 2026',
      currentValue: 4418.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
    },
    {
      id: 'CH-ARG-771920',
      metal: 'Silver (Ag)',
      refiner: 'Argor-Heraeus SA (Mendrisio, Switzerland)',
      weightGrams: 1000,
      purity: '999.0 Fine Silver Cast Ingot',
      serialNumber: 'CH-ARG-771920',
      certificateNumber: 'ASSAY-ARG-2026-7719',
      vaultLocation: 'Zurich Duty-Free Vault · Safe Deposit Unit #S-109',
      allocatedDate: '01 Mar 2026',
      currentValue: 1040.0,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
    },
    {
      id: 'CH-VAL-PT-5012',
      metal: 'Platinum (Pt)',
      refiner: 'Valcambi SA (Balerna, Switzerland)',
      weightGrams: 50,
      purity: '999.5 Pure Platinum Minted Bar',
      serialNumber: 'CH-VAL-PT-5012',
      certificateNumber: 'ASSAY-VAL-PT-2026-55',
      vaultLocation: 'Zurich Duty-Free Vault · Safe Deposit Unit #P-088',
      allocatedDate: '10 Mar 2026',
      currentValue: 1583.5,
      insurancePolicy: 'Lloyds-ZUR-99201',
      status: 'Allocated In-Vault',
    },
  ];

  const totalVaultValue = vaultHoldings.reduce((sum, item) => sum + item.currentValue, 0);

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWithdrawal(true);
    setTimeout(() => {
      setIsSubmittingWithdrawal(false);
      setIsWithdrawalSuccess(true);
    }, 1800);
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              My Stored Precious Metals
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Zurich High-Security Vault · Lloyd&apos;s 100% Insured
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Stored Precious Metals (Gold, Silver &amp; Platinum)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Precious metal bars safely stored under your direct legal ownership in the Swiss high-security vault.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/vault/deliveries"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Truck className="w-3.5 h-3.5 text-amber-500" />
            <span>Delivery &amp; Status Tracking</span>
          </Link>
          <Link
            href="/dashboard/customer/deliveries/request"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Request Home Delivery</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Value of Stored Metals</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {totalVaultValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            +€3,420.00 (+4.5%) this month
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Stored Pure Gold Weight</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            250.000 g Au
          </span>
          <span className="text-[11px] text-amber-700 dark:text-[#D4AF37] font-mono block mt-1">
            3 Serialized Bars (999.9 Fine)
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Silver &amp; Platinum Holdings</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            1,000g Ag · 50g Pt
          </span>
          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono block mt-1">
            2 Cast &amp; Minted Ingots
          </span>
        </div>
      </div>

      {/* 2.1 Metal Category Quick Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#0E1524]/80 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-500 px-3">View by Metal:</span>
        <span className="px-3 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-sm cursor-default">
          All Metals (5 Bars)
        </span>
        <Link
          href="/dashboard/customer/vault/gold"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-amber-500/10 text-slate-700 dark:text-slate-300 hover:text-amber-500 border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span>Gold Holdings (250g)</span>
        </Link>
        <Link
          href="/dashboard/customer/vault/silver"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 hover:text-cyan-400 border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>Silver Holdings (1.5kg)</span>
        </Link>
        <Link
          href="/dashboard/customer/vault/platinum"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-purple-500/10 text-slate-700 dark:text-slate-300 hover:text-purple-400 border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Platinum Holdings (150g)</span>
        </Link>
        <Link
          href="/dashboard/customer/vault/deliveries"
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141C2E] hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 border border-slate-200/80 dark:border-slate-800 text-xs font-bold transition-all ml-auto flex items-center gap-1.5"
        >
          <Truck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Status &amp; Deliveries (1 Active)</span>
        </Link>
      </div>

      {/* 3. Action Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('holdings');
            setIsWithdrawalSuccess(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'holdings'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Stored Metal Bars ({vaultHoldings.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('withdraw')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'withdraw'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Request Home Delivery
        </button>
      </div>

      {/* Tab 1: Physical Bar Holdings Table */}
      {activeTab === 'holdings' && (
        <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>Serialized Gold &amp; Silver Bars in Safe Storage</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Live LBMA Spot Marked</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Bar / Ingot Specification</th>
                  <th className="p-4">Serial &amp; Certificate</th>
                  <th className="p-4">Weight &amp; Purity</th>
                  <th className="p-4">Current Valuation</th>
                  <th className="p-4">Storage Location</th>
                  <th className="p-4">Assay &amp; Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {vaultHoldings.map((bar) => (
                  <tr key={bar.id} className="hover:bg-slate-50/60 dark:hover:bg-[#0E1524]/60 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                          bar.metal.includes('Gold') ? 'gold-gradient-bg text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {bar.weightGrams >= 1000 ? `${bar.weightGrams / 1000}kg` : `${bar.weightGrams}g`}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {bar.refiner}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Allocated on {bar.allocatedDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-bold text-amber-700 dark:text-[#D4AF37] block">
                        {bar.serialNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Cert: {bar.certificateNumber}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {bar.weightGrams} grams
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {bar.purity}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-bold text-slate-900 dark:text-white block">
                        {bar.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                        100% Insured
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="text-slate-700 dark:text-slate-300 block truncate max-w-xs">
                        {bar.vaultLocation}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        {bar.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCertificateBar({
                              serialNumber: bar.serialNumber,
                              certificateNumber: bar.certificateNumber,
                              refiner: bar.refiner,
                              productName: `${bar.weightGrams}g ${bar.purity}`,
                              metal: bar.metal,
                              metalType: bar.metal.includes('Gold')
                                ? 'gold'
                                : bar.metal.includes('Silver')
                                ? 'silver'
                                : 'platinum',
                              weightGrams: bar.weightGrams,
                              purity: bar.purity,
                              assayStamp: `CH-FOCBS-ASSAY-${bar.serialNumber.slice(-4)}`,
                              vaultLocation: bar.vaultLocation,
                              allocatedDate: bar.allocatedDate,
                              currentValue: bar.currentValue,
                              insurancePolicy: bar.insurancePolicy,
                            })
                          }
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
                          title="View & Download Official Vault Assay Certificate"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setWithdrawBarId(bar.serialNumber);
                            setActiveTab('withdraw');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/20 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Withdraw
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Withdrawal / Physical Courier Delivery Request Form */}
      {activeTab === 'withdraw' && (
        <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#D4AF37]" />
              <span>Physical Bar Withdrawal &amp; Armored Dispatch Protocol</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Initiate physical release of allocated bullion from the Zurich Depository for insured armored home delivery or vault pickup.
            </p>
          </div>

          {isWithdrawalSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Withdrawal Dispatch Booked!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Brink&apos;s Global Services has received your request for Bar Serial <strong className="text-amber-700 dark:text-[#D4AF37] font-mono">{withdrawBarId}</strong>. Tracking Waybill: <strong className="font-mono">CH-BRK-990182</strong>.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/dashboard/customer/orders"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md inline-block"
                >
                  Track in My Orders &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWithdrawalSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Select Allocated Bar to Withdraw *
                  </label>
                  <select
                    value={withdrawBarId}
                    onChange={(e) => setWithdrawBarId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                  >
                    {vaultHoldings.map((b) => (
                      <option key={b.id} value={b.serialNumber}>
                        {b.refiner} — {b.weightGrams}g ({b.serialNumber}) · €{b.currentValue.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Delivery / Handover Method *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('armored_courier')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        deliveryType === 'armored_courier'
                          ? 'gold-gradient-bg text-slate-950 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Brink&apos;s Armored Courier
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('depository_pickup')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        deliveryType === 'depository_pickup'
                          ? 'gold-gradient-bg text-slate-950 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Zurich Vault In-Person Pickup
                    </button>
                  </div>
                </div>
              </div>

              {deliveryType === 'armored_courier' && (
                <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Destination Physical Address (Insured Armored Delivery) *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Authorized Recipient Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Security Contact Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  High-Value Withdrawal Security Protocol: Release requires Two-Factor Authentication (2FA) verification and government photo ID inspection upon armed handover. Fully covered by Lloyd&apos;s transit insurance.
                </span>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmittingWithdrawal}
                  className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmittingWithdrawal ? 'Verifying Vault Release...' : 'Confirm & Request Armored Dispatch'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Official Vault Assay Certificate Popup Modal */}
      <AssayCertificateModal
        isOpen={Boolean(selectedCertificateBar)}
        onClose={() => setSelectedCertificateBar(null)}
        bar={selectedCertificateBar}
      />
    </div>
  );
}
