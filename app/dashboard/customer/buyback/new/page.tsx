'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  RotateCcw,
  ArrowLeft,
  Scale,
  ShieldCheck,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  Upload,
  Coins,
  AlertCircle,
  Lock,
  Landmark,
  FileText
} from 'lucide-react';

export default function NewBuybackSubmissionPage() {
  const router = useRouter();

  const [metalKarat, setMetalKarat] = useState<'24K' | '22K' | '18K' | '14K' | '9K'>('18K');
  const [estimatedGrams, setEstimatedGrams] = useState<number>(35);
  const [itemType, setItemType] = useState('Broken Chains, Rings & Scrap Jewelry');
  const [payoutOption, setPayoutOption] = useState<'bank_wire' | 'vault_credit'>('vault_credit');
  
  // Shipping Kit Details
  const [fullName, setFullName] = useState('Dr. Alexander von Bern');
  const [shippingAddress, setShippingAddress] = useState('Bahnhofstrasse 45, 8001 Zurich, Switzerland');
  const [phone, setPhone] = useState('+41 44 211 88 00');
  const [iban, setIban] = useState('CH93 0070 0110 0029 4810 2');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Karat spot rates per gram (based on ~€88.36/g 24K)
  const karatRates = {
    '24K': 88.36,
    '22K': 80.93,
    '18K': 66.27,
    '14K': 51.54,
    '9K': 33.13,
  };

  const estimatedPayout = (estimatedGrams * karatRates[metalKarat]).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/customer/buyback"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Buy-Back Submissions</span>
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            Refiner Valuation Lock
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            15-Minute Guaranteed Spot Fix
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <RotateCcw className="w-6 h-6 text-[#D4AF37]" />
          <span>Request Insured Buy-Back Kit &amp; Lock Valuation</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Order a free tamper-evident shipping pack insured up to €25,000 to send your scrap gold directly to the Swiss Refinery.
        </p>
      </div>

      {isSubmitted ? (
        <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-emerald-500/40 bg-emerald-500/5 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Insured Shipping Kit Dispatched!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your prepaid security kit (Ref: <strong className="text-[#D4AF37] font-mono">KIT-SWISS-99820</strong>) has been scheduled for delivery to <strong className="text-slate-900 dark:text-white">{shippingAddress}</strong>.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/customer/buyback"
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md inline-block"
            >
              View Active Consignments &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
              {/* Karat Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Estimated Karat Purity *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['24K', '22K', '18K', '14K', '9K'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setMetalKarat(k)}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        metalKarat === k
                          ? 'gold-gradient-bg text-slate-950 shadow-md font-black'
                          : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="block text-sm font-extrabold">{k}</span>
                      <span className="text-[10px] opacity-75 font-mono">€{karatRates[k].toFixed(2)}/g</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Estimated Gross Weight (Grams) *
                  </label>
                  <span className="text-sm font-black font-mono text-amber-700 dark:text-[#D4AF37]">
                    {estimatedGrams} grams
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="1"
                  value={estimatedGrams}
                  onChange={(e) => setEstimatedGrams(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 font-mono">
                  Exact weight and purity will be verified by certified Swiss Assayers with non-destructive XRF spectrometry.
                </span>
              </div>

              {/* Item Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Item / Lot Description *
                </label>
                <input
                  type="text"
                  required
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  placeholder="e.g. 18K chains, broken rings, dental scrap, estate jewelry"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Payout Method */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Preferred Payout Settlement *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutOption('vault_credit')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      payoutOption === 'vault_credit'
                        ? 'gold-gradient-bg text-slate-950 shadow-md'
                        : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs block">Pure 999.9 Fine Gold Credit</span>
                    <span className="text-[10px] opacity-80 block mt-0.5 font-mono">
                      Added straight into your allocated vault account (0% fee).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutOption('bank_wire')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      payoutOption === 'bank_wire'
                        ? 'gold-gradient-bg text-slate-950 shadow-md'
                        : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs block">Direct SEPA / Wire Payout</span>
                    <span className="text-[10px] opacity-80 block mt-0.5 font-mono">
                      Transferred to your bank account within 24h of assay.
                    </span>
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#D4AF37]" />
                  <span>Insured Shipping Kit Destination Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Physical Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Valuation & Action Card */}
          <div className="space-y-6">
            <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  Live Valuation Lock
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
                  15:00 LOCK
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">
                  Estimated Net Payout
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
                  {estimatedPayout}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {estimatedGrams}g × €{karatRates[metalKarat].toFixed(2)}/g ({metalKarat})
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Prepaid Courier Pack:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE (€0.00)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Insurance Limit:</span>
                  <span className="font-bold text-slate-900 dark:text-white">€25,000.00</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Assay Fee:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Waived (0.00 €)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Package className="w-4 h-4" />
                <span>{isSubmitting ? 'Requesting Security Pack...' : 'Order Free Insured Pack'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
