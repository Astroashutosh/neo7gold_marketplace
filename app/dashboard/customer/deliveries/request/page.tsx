'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Calendar,
  Clock,
  MapPin,
  Building,
  KeyRound,
  AlertCircle,
  FileCheck,
  Sparkles,
  ChevronRight,
  User,
  Phone,
  HelpCircle,
  QrCode,
  Coins,
  Scale,
  ExternalLink,
  Check,
  Info
} from 'lucide-react';

interface VaultBarOption {
  id: string;
  serialNumber: string;
  refiner: string;
  metal: 'Gold (Au)' | 'Silver (Ag)' | 'Platinum (Pt)';
  metalKey: 'gold' | 'silver' | 'platinum';
  weightGrams: number;
  weightLabel: string;
  purity: string;
  currentValue: number;
  vaultLocation: string;
  certificateNumber: string;
  insuredValue: string;
}

export default function RequestHomeDeliveryPage() {
  // Step State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Metal Filter for Selection
  const [metalFilter, setMetalFilter] = useState<'all' | 'gold' | 'silver' | 'platinum'>('all');

  // Selected Vault Holdings to withdraw (Multi-select or single)
  const [selectedBarIds, setSelectedBarIds] = useState<string[]>(['CH-VAL-889012']);

  // Delivery Courier & Method
  const [carrier, setCarrier] = useState<'brinks' | 'loomis' | 'malca' | 'depository'>('brinks');
  const [dispatchPriority, setDispatchPriority] = useState<'express_armored' | 'standard_secure'>('express_armored');

  // Address & Recipient
  const [addressType, setAddressType] = useState<'primary' | 'secondary' | 'custom'>('primary');
  const [recipientName, setRecipientName] = useState('Dr. Alexander von Bern');
  const [recipientPhone, setRecipientPhone] = useState('+41 44 211 88 00');
  const [recipientEmail, setRecipientEmail] = useState('a.vonbern@private-holdings.ch');
  const [idDocumentType, setIdDocumentType] = useState('Swiss Passport (Valid until 2031)');
  const [deliveryStreet, setDeliveryStreet] = useState('Bahnhofstrasse 45');
  const [deliveryCity, setDeliveryCity] = useState('Zurich');
  const [deliveryPostal, setDeliveryPostal] = useState('8001');
  const [deliveryCountry, setDeliveryCountry] = useState('Switzerland');
  const [securityNotes, setSecurityNotes] = useState('Underground secure garage entry. Concierge will announce Brink’s armed officers upon arrival.');

  // Date & Handover Window
  const [deliveryDate, setDeliveryDate] = useState('2026-08-27');
  const [deliveryWindow, setDeliveryWindow] = useState<'morning' | 'afternoon' | 'vip_exact'>('morning');

  // Security 2FA & Authorization
  const [pinCode, setPinCode] = useState('');
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [hasAgreedInsurance, setHasAgreedInsurance] = useState(true);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    waybill: string;
    orderId: string;
    sealCode: string;
    handoverPin: string;
  } | null>(null);

  // Available Vault Bars for Withdrawal
  const availableBars: VaultBarOption[] = [
    {
      id: 'CH-VAL-889012',
      serialNumber: 'CH-VAL-889012',
      refiner: 'Valcambi SA (Balerna, Switzerland)',
      metal: 'Gold (Au)',
      metalKey: 'gold',
      weightGrams: 100,
      weightLabel: '100.00g (999.9 Fine Gold)',
      purity: '999.9 Fine Gold Cast Bar',
      currentValue: 8836.0,
      vaultLocation: 'Zurich Depository · Vault Unit #B-402',
      certificateNumber: 'ASSAY-VAL-2026-9901',
      insuredValue: '€8,836.00',
    },
    {
      id: 'CH-PAMP-992144',
      serialNumber: 'CH-PAMP-992144',
      refiner: 'PAMP Suisse (Castel San Pietro, Switzerland)',
      metal: 'Gold (Au)',
      metalKey: 'gold',
      weightGrams: 100,
      weightLabel: '100.00g (999.9 Fine Gold)',
      purity: '999.9 Lady Fortuna Minted Ingot',
      currentValue: 8836.0,
      vaultLocation: 'Zurich Depository · Vault Unit #B-402',
      certificateNumber: 'ASSAY-PAMP-2026-4412',
      insuredValue: '€8,836.00',
    },
    {
      id: 'CH-ARG-881903',
      serialNumber: 'CH-ARG-881903',
      refiner: 'Argor-Heraeus SA (Mendrisio, Switzerland)',
      metal: 'Gold (Au)',
      metalKey: 'gold',
      weightGrams: 50,
      weightLabel: '50.00g (999.9 Fine Gold)',
      purity: '999.9 Fine Gold Cast Bar',
      currentValue: 4418.0,
      vaultLocation: 'Zurich Depository · Vault Unit #B-402',
      certificateNumber: 'ASSAY-ARG-2026-1029',
      insuredValue: '€4,418.00',
    },
    {
      id: 'CH-ARG-771920',
      serialNumber: 'CH-ARG-771920',
      refiner: 'Argor-Heraeus SA (Mendrisio, Switzerland)',
      metal: 'Silver (Ag)',
      metalKey: 'silver',
      weightGrams: 1000,
      weightLabel: '1,000.00g (999.0 Fine Silver)',
      purity: '999.0 Fine Silver Cast Ingot',
      currentValue: 1040.0,
      vaultLocation: 'Zurich Depository · Vault Unit #S-109',
      certificateNumber: 'ASSAY-ARG-2026-7719',
      insuredValue: '€1,040.00',
    },
    {
      id: 'CH-VAL-PT-5012',
      serialNumber: 'CH-VAL-PT-5012',
      refiner: 'Valcambi SA (Balerna, Switzerland)',
      metal: 'Platinum (Pt)',
      metalKey: 'platinum',
      weightGrams: 50,
      weightLabel: '50.00g (999.5 Pure Platinum)',
      purity: '999.5 Pure Platinum Minted Bar',
      currentValue: 1583.5,
      vaultLocation: 'Zurich Depository · Vault Unit #P-088',
      certificateNumber: 'ASSAY-VAL-PT-2026-55',
      insuredValue: '€1,583.50',
    },
  ];

  // Filtered bars
  const filteredBars = availableBars.filter(
    (b) => metalFilter === 'all' || b.metalKey === metalFilter
  );

  // Selected bars list & aggregates
  const selectedBars = availableBars.filter((b) => selectedBarIds.includes(b.id));
  const totalSelectedValue = selectedBars.reduce((sum, b) => sum + b.currentValue, 0);
  const totalWeightGrams = selectedBars.reduce((sum, b) => sum + b.weightGrams, 0);

  // Toggle Bar Selection
  const toggleSelectBar = (id: string) => {
    if (selectedBarIds.includes(id)) {
      if (selectedBarIds.length === 1) return; // keep at least one
      setSelectedBarIds(selectedBarIds.filter((item) => item !== id));
    } else {
      setSelectedBarIds([...selectedBarIds, id]);
    }
  };

  // Submit Booking
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAgreedTerms) {
      alert('Please confirm that you agree to the physical release & ID verification terms.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingResult({
        waybill: `CH-BRK-${Math.floor(100000 + Math.random() * 900000)}`,
        orderId: `DISPATCH-2026-${Math.floor(100 + Math.random() * 900)}`,
        sealCode: `SEAL-#${Math.floor(10000 + Math.random() * 90000)}`,
        handoverPin: `${Math.floor(1000 + Math.random() * 9000)}`,
      });
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Top Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard/customer/deliveries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Deliveries</span>
            </Link>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs font-bold text-amber-700 dark:text-[#D4AF37]">
              Request Home Delivery
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Armored Depository Dispatch
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Lloyd&apos;s 100% Insured Bullion Transit
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-amber-500" />
            <span>Request Home Delivery &amp; Physical Withdrawal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Book fully insured, armored vehicle delivery directly from the high-security Zurich Depository to your residence or private office.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/vault"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Vault Holdings</span>
          </Link>
          <Link
            href="/dashboard/customer/deliveries/in-transit"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>Active Shipments</span>
          </Link>
        </div>
      </div>

      {/* 2. Success Screen State */}
      {isSuccess && bookingResult ? (
        <div className="luxury-glass p-8 sm:p-10 rounded-3xl border border-emerald-500/30 bg-white/95 dark:bg-[#0A0E17]/95 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider inline-block font-mono">
              Dispatch Request Confirmed · {bookingResult.orderId}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Armored Transit Successfully Scheduled!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              The Zurich Depository has authorized the vault release of your allocated bullion. Brink&apos;s Global Services armored division is preparing the dual-sealed transport container.
            </p>
          </div>

          {/* Key Dispatch Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 block">Waybill Tracking Number</span>
              <span className="text-base font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
                {bookingResult.waybill}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">Brink&apos;s High-Value Network</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 block">Tamper Security Seal</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono mt-1 block">
                {bookingResult.sealCode}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                Verified RFID Barcode
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 block">One-Time Handover PIN</span>
              <span className="text-base font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block tracking-wider">
                {bookingResult.handoverPin}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">Give to Armed Driver on Arrival</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Insured Value</span>
              <span className="text-base font-black text-slate-900 dark:text-white font-mono mt-1 block">
                {totalSelectedValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                100% Lloyd&apos;s Policy Covered
              </span>
            </div>
          </div>

          {/* Detailed Summary Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Released Bullion Items ({selectedBars.length} Bar{selectedBars.length > 1 ? 's' : ''})</span>
            </h3>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {selectedBars.map((bar) => (
                <div key={bar.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {bar.refiner} · {bar.weightLabel}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Serial: {bar.serialNumber} · Certificate: {bar.certificateNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 dark:text-white block">
                      {bar.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-[#D4AF37] font-semibold">
                      Vault Release Authorized
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
              <div>
                <strong>Destination:</strong> {deliveryStreet}, {deliveryPostal} {deliveryCity}, {deliveryCountry}
              </div>
              <div>
                <strong>Authorized Recipient:</strong> {recipientName} ({recipientPhone})
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard/customer/deliveries/in-transit"
              className="px-6 py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Open Live Armored Transit Tracker &rarr;</span>
            </Link>

            <Link
              href="/dashboard/customer/deliveries"
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all"
            >
              Back to All Delivery Requests
            </Link>
          </div>
        </div>
      ) : (
        /* 3. Main Multi-Step Booking Wizard */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Booking Form Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step Progress Pills */}
            <div className="luxury-glass p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { num: 1, label: 'Select Metals', icon: Lock },
                  { num: 2, label: 'Carrier & Priority', icon: Truck },
                  { num: 3, label: 'Delivery Address', icon: MapPin },
                  { num: 4, label: 'Authorize & 2FA', icon: ShieldCheck },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = currentStep === s.num;
                  const isCompleted = currentStep > s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setCurrentStep(s.num as any)}
                      className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'gold-gradient-bg text-slate-950 shadow-sm'
                          : isCompleted
                          ? 'bg-amber-500/10 text-[#D4AF37] border border-amber-500/20'
                          : 'bg-slate-50 dark:bg-[#0E1524] text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isActive
                            ? 'bg-slate-950 text-amber-400'
                            : isCompleted
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3 h-3" /> : s.num}
                      </div>
                      <span className="hidden sm:inline truncate">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: SELECT VAULT BARS */}
            {currentStep === 1 && (
              <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-[#D4AF37]" />
                      <span>Step 1: Choose Allocated Precious Metals to Withdraw</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select which serialized bar(s) you wish to withdraw from your Zurich vault holding.
                    </p>
                  </div>

                  {/* Metal Category Filter Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0E1524] p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
                    {[
                      { key: 'all', label: 'All Metals' },
                      { key: 'gold', label: 'Gold (Au)' },
                      { key: 'silver', label: 'Silver (Ag)' },
                      { key: 'platinum', label: 'Platinum (Pt)' },
                    ].map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setMetalFilter(t.key as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          metalFilter === t.key
                            ? 'gold-gradient-bg text-slate-950 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Holdings Selection List */}
                <div className="space-y-3">
                  {filteredBars.map((bar) => {
                    const isSelected = selectedBarIds.includes(bar.id);

                    return (
                      <div
                        key={bar.id}
                        onClick={() => toggleSelectBar(bar.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-50/70 dark:bg-[#0E1524]/70 border-slate-200 dark:border-slate-800 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                                {bar.refiner}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                                  bar.metalKey === 'gold'
                                    ? 'bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30'
                                    : bar.metalKey === 'silver'
                                    ? 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border border-slate-500/30'
                                    : 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30'
                                }`}
                              >
                                {bar.metal}
                              </span>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {bar.weightLabel}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                              <span>
                                Serial: <strong className="font-mono text-slate-700 dark:text-slate-300">{bar.serialNumber}</strong>
                              </span>
                              <span>•</span>
                              <span>
                                Assay: <strong className="font-mono text-slate-700 dark:text-slate-300">{bar.certificateNumber}</strong>
                              </span>
                              <span>•</span>
                              <span>{bar.vaultLocation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0 flex sm:flex-col justify-between items-center sm:items-end">
                          <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-mono">
                            {bar.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                            100% Allocated &amp; Free of Lien
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedBarIds.length} item{selectedBarIds.length > 1 ? 's' : ''} selected ({totalWeightGrams}g total)
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={selectedBarIds.length === 0}
                    className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Proceed to Carrier &amp; Priority</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CARRIER & PRIORITY */}
            {currentStep === 2 && (
              <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#D4AF37]" />
                    <span>Step 2: Choose Armored Carrier &amp; Transit Method</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your preferred licensed high-security logistics operator and transit priority tier.
                  </p>
                </div>

                {/* Carrier Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'brinks',
                      name: "Brink's Global Services",
                      badge: 'Recommended',
                      desc: 'Dedicated armored van with dual armed escorts, biometric safe deposit lockbox & live GPS satellite ping.',
                      speed: 'Next-Day Delivery',
                      insurance: "Lloyd's €10M Transit Policy",
                    },
                    {
                      id: 'loomis',
                      name: 'Loomis International Armored',
                      badge: 'High Security',
                      desc: 'Bespoke European bullion transport with tamper-evident dual barcode seal and verified courier ID.',
                      speed: '24-48 Hours',
                      insurance: "Lloyd's Full Cargo Cover",
                    },
                    {
                      id: 'malca',
                      name: 'Malca-Amit Ultra-Secure',
                      badge: 'VIP White Glove',
                      desc: 'Door-to-vault private luxury dispatch with armored executive transport and armed escort officer.',
                      speed: 'Express 24h',
                      insurance: '100% Direct Specie Cover',
                    },
                    {
                      id: 'depository',
                      name: 'Depository Vault Handover (Zurich)',
                      badge: 'In-Person VIP',
                      desc: 'In-person collection at the Zurich High-Security Depository Private Client Suite with booth inspection.',
                      speed: 'Same-Day by Appointment',
                      insurance: 'Direct Vault Custody',
                    },
                  ].map((c) => {
                    const isSelected = carrier === c.id;

                    return (
                      <div
                        key={c.id}
                        onClick={() => setCarrier(c.id as any)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                            : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 hover:border-amber-500/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {c.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30">
                              {c.badge}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            {c.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-500">
                            Speed: <strong className="text-slate-700 dark:text-slate-300">{c.speed}</strong>
                          </span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {c.insurance}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Priority Selection */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Transit Priority &amp; Security Protocol
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDispatchPriority('express_armored')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        dispatchPriority === 'express_armored'
                          ? 'gold-gradient-bg text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-[#0A0E17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>Express Priority Armored Escort</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 text-slate-950 font-mono">
                          VIP
                        </span>
                      </div>
                      <span className="text-[11px] opacity-80 block font-normal">
                        Guaranteed next-morning arrival with dedicated two-man armed guard unit.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDispatchPriority('standard_secure')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        dispatchPriority === 'standard_secure'
                          ? 'gold-gradient-bg text-slate-950 shadow-sm'
                          : 'bg-white dark:bg-[#0A0E17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>Standard Scheduled Armored Transit</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                          Standard
                        </span>
                      </div>
                      <span className="text-[11px] opacity-80 block font-normal">
                        Scheduled batch dispatch on upcoming depository route (2-3 business days).
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-slate-900 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Metal Selection</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Proceed to Delivery Address</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DELIVERY ADDRESS & RECIPIENT */}
            {currentStep === 3 && (
              <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span>Step 3: Delivery Address &amp; Recipient Verification</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enter the authorized destination and official legal recipient identity details.
                  </p>
                </div>

                {/* Address Selector Quick Tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Choose Destination Address
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: 'primary',
                        title: 'Primary Residence',
                        addr: 'Bahnhofstrasse 45, Zurich, 8001',
                      },
                      {
                        id: 'secondary',
                        title: 'Private Family Office',
                        addr: 'Rue du Rhône 12, Geneva, 1204',
                      },
                      {
                        id: 'custom',
                        title: 'Custom Destination',
                        addr: 'Enter new verified address',
                      },
                    ].map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => {
                          setAddressType(a.id as any);
                          if (a.id === 'primary') {
                            setDeliveryStreet('Bahnhofstrasse 45');
                            setDeliveryCity('Zurich');
                            setDeliveryPostal('8001');
                            setDeliveryCountry('Switzerland');
                          } else if (a.id === 'secondary') {
                            setDeliveryStreet('Rue du Rhône 12');
                            setDeliveryCity('Geneva');
                            setDeliveryPostal('1204');
                            setDeliveryCountry('Switzerland');
                          }
                        }}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          addressType === a.id
                            ? 'gold-gradient-bg text-slate-950 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="block font-extrabold">{a.title}</span>
                        <span className="text-[11px] opacity-80 block truncate mt-0.5">{a.addr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination Inputs */}
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Street Address &amp; Suite / Building *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryStreet}
                        onChange={(e) => setDeliveryStreet(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        City / Canton *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Postal Code / ZIP *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryPostal}
                        onChange={(e) => setDeliveryPostal(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCountry}
                        onChange={(e) => setDeliveryCountry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Recipient Legal Identity */}
                <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" />
                    <span>Authorized Legal Recipient (Must Present Government ID)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Full Legal Name *
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
                        Government Identity Document *
                      </label>
                      <input
                        type="text"
                        required
                        value={idDocumentType}
                        onChange={(e) => setIdDocumentType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Encrypted Dispatch Coordination Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Confirmation &amp; Waybill Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Security &amp; Gate Protocol Instructions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={securityNotes}
                        onChange={(e) => setSecurityNotes(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        placeholder="E.g. Security barrier access code, concierge handoff, basement elevator direct..."
                      />
                    </div>
                  </div>
                </div>

                {/* Handover Window & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Requested Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Arrival Time Slot Window *
                    </label>
                    <select
                      value={deliveryWindow}
                      onChange={(e) => setDeliveryWindow(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="morning">Morning Secure Window (09:00 - 12:30 CET)</option>
                      <option value="afternoon">Afternoon Secure Window (13:00 - 17:00 CET)</option>
                      <option value="vip_exact">VIP Exact Scheduled Rendezvous (+/- 15 min)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-slate-900 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Carrier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Proceed to Security &amp; 2FA</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: AUTHORIZE & 2FA VERIFICATION */}
            {currentStep === 4 && (
              <form onSubmit={handleFinalSubmit} className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Step 4: Vault Release Security Authorization &amp; 2FA</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Finalize your high-security bullion withdrawal request with Two-Factor Authentication.
                  </p>
                </div>

                {/* Pre-Authorization Summary Box */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Ready for Armed Dispatch Release</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-200">
                      {selectedBars.length} Bar{selectedBars.length > 1 ? 's' : ''} ({totalWeightGrams}g)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Total Release Value:</span>
                      <strong className="text-slate-950 dark:text-white font-mono text-sm block">
                        {totalSelectedValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Assigned Courier:</span>
                      <strong className="text-slate-950 dark:text-white block">
                        {carrier === 'brinks'
                          ? "Brink's Armored Services"
                          : carrier === 'loomis'
                          ? 'Loomis International'
                          : carrier === 'malca'
                          ? 'Malca-Amit Ultra-Secure'
                          : 'Zurich Vault VIP Pickup'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block">Delivery Window:</span>
                      <strong className="text-slate-950 dark:text-white block">
                        {deliveryDate} ({deliveryWindow})
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Security 2FA Input */}
                <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                      <span>Enter Vault Release Security PIN / 2FA Code *</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Authenticator App or SMS Code
                    </span>
                  </label>

                  <div className="flex items-center gap-3">
                    <input
                      type="password"
                      maxLength={6}
                      required
                      placeholder="••••••"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-48 px-4 py-3 rounded-xl bg-white dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-[0.5em] text-lg focus:outline-none focus:border-[#D4AF37]"
                    />
                    <span className="text-xs text-slate-500">
                      Enter your 6-digit client vault master authorization code.
                    </span>
                  </div>
                </div>

                {/* Terms and Confirmation Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAgreedTerms}
                      onChange={(e) => setHasAgreedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>
                      I certify that I am the authorized legal owner of these allocated precious metals and will physically inspect and present my government photo ID upon armed vehicle handover.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAgreedInsurance}
                      onChange={(e) => setHasAgreedInsurance(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>
                      I acknowledge that this dispatch is fully insured under Lloyd&apos;s of London Specie Policy #LL-CH-2026 until final dual biometric signature.
                    </span>
                  </label>
                </div>

                {/* Final Submit Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-slate-900 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Address</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !hasAgreedTerms}
                    className="px-8 py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? 'Verifying & Generating Armored Seal...'
                        : 'Confirm & Authorize Armored Dispatch'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Summary & Security Credentials */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Order Summary Sticky Card */}
            <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-5 sticky top-20">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Dispatch Summary
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono">
                  100% Insured
                </span>
              </div>

              {/* Selected Bars Mini List */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Allocated Bars for Release ({selectedBars.length}):
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
                  {selectedBars.map((bar) => (
                    <div
                      key={bar.id}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                          {bar.weightLabel}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {bar.serialNumber}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                        {bar.currentValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost & Fee Breakdown */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Precious Metal Market Value</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {totalSelectedValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Brink&apos;s Armored Courier Fee</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    €0.00 (Complimentary Tier)
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Lloyd&apos;s Cargo Transit Insurance</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    Included
                  </span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Dual Tamper RFID Security Seal</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    Included
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 dark:text-white">Total Transit Liability</span>
                  <span className="text-base font-black text-amber-700 dark:text-[#D4AF37] font-mono">
                    {totalSelectedValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>

              {/* Security Badges Grid */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2.5 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Two-man armed courier escort standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Real-time GPS satellite vehicle telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Original Assayer Certificate delivered in box</span>
                </div>
              </div>

              {/* Need Help Concierge Banner */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold block flex items-center gap-1.5 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>VIP Vault Concierge Desk</span>
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 block leading-tight">
                  Need a bespoke delivery time or international cross-border armored transport? Contact our 24/7 Swiss Vault Desk at <strong>+41 44 211 88 00</strong>.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
