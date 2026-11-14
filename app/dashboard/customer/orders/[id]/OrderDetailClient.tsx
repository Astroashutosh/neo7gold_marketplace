'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Package,
  CheckCircle2,
  Clock,
  Download,
  QrCode,
  Lock,
  Coins,
  Gem,
  FileText,
  MapPin,
  ExternalLink,
  Award,
  Landmark,
  Eye,
  KeyRound
} from 'lucide-react';

export default function CustomerOrderDetailClient({ id }: { id: string }) {
  const [isSigned, setIsSigned] = useState(false);
  const [signaturePin, setSignaturePin] = useState('');
  const [isSigningSuccess, setIsSigningSuccess] = useState(false);

  const orderData = {
    id: id || 'ORD-98301',
    itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
    category: 'Bullion Vault Bar',
    date: '22 Aug 2026',
    total: 8836.0,
    metalWeight: '100.000 g',
    purity: '999.9 Fine Gold (Au)',
    serialNumber: 'CH-VAL-889012',
    assayerLicense: 'CH-FOCBS-ASSAY-0091',
    carrier: "Brink's Global Services (Armored Courier)",
    vehicleCode: 'BR-892 (Armed Dual Escort)',
    waybill: 'CH-BRINKS-998201',
    tamperSeal: 'SEAL-77921-A',
    deliveryAddress: 'Bahnhofstrasse 45, 8001 Zurich, Switzerland',
    escrowStatus: 'Funds Protected in Escrow Vault',
    dppToken: '0x88f9...4b92 (DPP-VAL-88901)',
  };

  const handleSignDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (signaturePin.length >= 4) {
      setIsSigningSuccess(true);
      setIsSigned(true);
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Orders</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Order Dossier #{orderData.id}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live Armored Dispatch
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {orderData.itemTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/dashboard/customer/orders/${orderData.id}/invoice`}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-500/30"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>View &amp; Print Invoice</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Progress Stepper */}
      <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <span>Armored Carrier Live Tracking — {orderData.carrier}</span>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            ETA: Today by 14:30
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-mono">
              <span>Step 1</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white block mt-1">
              Zurich Vault Release
            </span>
            <span className="text-[10px] text-slate-500 font-mono">22 Aug · 08:45 CET</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-mono">
              <span>Step 2</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white block mt-1">
              Tamper Seal Verified
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Seal #{orderData.tamperSeal}</span>
          </div>

          <div className="p-3.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono">
              <span>Step 3</span>
              <Truck className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold block mt-1">
              In Transit (Armored Escort)
            </span>
            <span className="text-[10px] text-slate-900/80 font-mono">GPS Active · En Route</span>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs ${
            isSigned
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-slate-50 dark:bg-[#0E1524] border-slate-200 dark:border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between font-bold text-[10px] uppercase font-mono">
              <span>Step 4</span>
              {isSigned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            <span className="font-bold text-slate-900 dark:text-white block mt-1">
              {isSigned ? 'Handover Signed' : 'ID & PIN Handover'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {isSigned ? 'Released to Client' : 'Requires Dual Signature'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Metallurgy & Escrow Protection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metallurgy & Physical Bar Certification */}
          <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              <span>Precious Metal Assay &amp; Physical Specifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Refinery Serial Number</span>
                <span className="font-bold text-amber-700 dark:text-[#D4AF37] text-sm block">
                  {orderData.serialNumber}
                </span>
                <span className="text-[10px] text-slate-400 block">Swiss Federal Hallmarked</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Certified Weight &amp; Purity</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  {orderData.metalWeight} · {orderData.purity}
                </span>
                <span className="text-[10px] text-slate-400 block">Assayer License #{orderData.assayerLicense}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Digital Product Passport (DPP)</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 block">
                  {orderData.dppToken}
                </span>
                <Link
                  href="/dashboard/customer/passports"
                  className="text-[10px] text-[#D4AF37] hover:underline block"
                >
                  Inspect Polygon NFT Certificate &rarr;
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Insurance Coverage</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  100% In-Transit Cover (€8,836.00)
                </span>
                <span className="text-[10px] text-slate-400 block">Underwritten by Lloyd&apos;s</span>
              </div>
            </div>
          </div>

          {/* Delivery & Security Verification Signing Box */}
          <div className="luxury-glass p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Armed Courier Handover Digital PIN Sign-off</span>
            </h3>

            {isSigningSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Handover PIN Authorized! The courier will release the tamper-evident package upon physical arrival.</span>
              </div>
            ) : (
              <form onSubmit={handleSignDelivery} className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  To ensure maximum anti-theft security, please generate or enter your 4-digit Vault PIN to authenticate the armored handover at <strong className="text-slate-900 dark:text-white">{orderData.deliveryAddress}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Enter 4 or 6-digit PIN"
                    value={signaturePin}
                    onChange={(e) => setSignaturePin(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all cursor-pointer"
                  >
                    Authorize Handover PIN
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right 1 Column: Summary & Escrow Protection */}
        <div className="space-y-6">
          <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Financial &amp; Escrow Settlement
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Gold Spot Base (100g)</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">€8,836.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Armored Courier &amp; Insurance</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Complimentary (VIP)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>VAT / Tax (Investment Gold)</span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">0.00 € (Exempt)</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="text-slate-900 dark:text-white">Total Order Value</span>
                <span className="font-mono text-base font-black text-amber-700 dark:text-[#D4AF37]">
                  €8,836.00
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Smart Contract Escrow Protected</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Payment is locked until the armored courier verifies your PIN and handover signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
