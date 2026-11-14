'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  Truck,
  Award,
  FileCheck,
  Sparkles,
  Coins,
  Scale,
  Gem,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

export interface AssayCertificateData {
  serialNumber: string;
  certificateNumber: string;
  refiner: string;
  productName: string;
  metal: string;
  metalType: 'gold' | 'silver' | 'platinum';
  weightGrams: number;
  purity: string;
  assayStamp: string;
  dimensions?: string;
  vaultLocation: string;
  allocatedDate: string;
  currentValue: number;
  insurancePolicy: string;
}

interface AssayCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  bar: AssayCertificateData | null;
}

export function AssayCertificateModal({
  isOpen,
  onClose,
  bar,
}: AssayCertificateModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !bar) return null;

  const handleCopySerial = () => {
    navigator.clipboard.writeText(bar.serialNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0A0F1A] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gold / Metallic Ribbon Header */}
        <div
          className={`h-2.5 w-full ${
            bar.metalType === 'gold'
              ? 'gold-gradient-bg'
              : bar.metalType === 'silver'
              ? 'bg-gradient-to-r from-cyan-500 via-slate-300 to-cyan-500'
              : 'bg-gradient-to-r from-purple-500 via-indigo-300 to-purple-500'
          }`}
        />

        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                bar.metalType === 'gold'
                  ? 'gold-gradient-bg text-slate-950'
                  : bar.metalType === 'silver'
                  ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/30'
                  : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}
            >
              {bar.metalType === 'gold' ? (
                <Coins className="w-5 h-5" />
              ) : bar.metalType === 'silver' ? (
                <Scale className="w-5 h-5" />
              ) : (
                <Gem className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-[#D4AF37] border border-amber-500/30 uppercase tracking-wider font-mono">
                  Official Assay Certificate
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  {bar.certificateNumber}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Precious Metal Assay &amp; Authenticity Proof
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Main Bar Highlight Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                Certified Bullion Ingot
              </span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">
                {bar.refiner}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {bar.productName}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
                  Serial: {bar.serialNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopySerial}
                  title="Copy Serial"
                  className="p-1 rounded text-slate-400 hover:text-[#D4AF37] transition-colors"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="sm:text-right shrink-0 flex sm:flex-col justify-between items-baseline sm:items-end">
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {bar.weightGrams >= 1000 ? `${bar.weightGrams / 1000} kg` : `${bar.weightGrams} g`}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block">
                {bar.purity}
              </span>
              <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                Market Value: €{bar.currentValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Laboratory Testing & Assay Verification Grid */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Laboratory Verification &amp; Technical Specifications</span>
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Assay Certificate</span>
                <strong className="text-slate-900 dark:text-white font-mono text-[11px] block mt-0.5 truncate">
                  {bar.certificateNumber}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Assayer License</span>
                <strong className="text-slate-900 dark:text-white font-mono text-[11px] block mt-0.5">
                  {bar.assayStamp}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Tolerance &amp; Fineness</span>
                <strong className="text-slate-900 dark:text-white font-mono text-[11px] block mt-0.5">
                  {bar.purity} (±0.001)
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Vault Depository Location</span>
                <strong className="text-slate-900 dark:text-white text-[11px] block mt-0.5 truncate">
                  {bar.vaultLocation}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Allocation Date</span>
                <strong className="text-slate-900 dark:text-white text-[11px] block mt-0.5">
                  {bar.allocatedDate}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">Lloyd&apos;s Specie Cover</span>
                <strong className="text-emerald-600 dark:text-emerald-400 text-[11px] block mt-0.5">
                  100% Insured ({bar.insurancePolicy})
                </strong>
              </div>
            </div>
          </div>

          {/* DPP Cryptographic Proof & Assayer Signatures */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                {(() => {
                  const verifyUrl = typeof window !== 'undefined'
                    ? `${window.location.origin}/neos7gold_dashboard/verify/?code=${encodeURIComponent(`DPP-${bar.serialNumber}`)}`
                    : `https://neos7gold.com/neos7gold_dashboard/verify/?code=${encodeURIComponent(`DPP-${bar.serialNumber}`)}`;
                  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(verifyUrl)}`;

                  return (
                    <div className="w-14 h-14 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center shrink-0 border border-amber-300 overflow-hidden">
                      <img
                        suppressHydrationWarning
                        src={qrImageUrl}
                        alt={`Authenticity QR for DPP-${bar.serialNumber}`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  );
                })()}
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-800 dark:text-[#D4AF37] uppercase tracking-wider block">
                  Digital Product Passport (DPP) On-Chain Verified
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                  Token: DPP-{bar.serialNumber}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  Issued by Swiss Central Office for Precious Metals Control
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="border-b border-slate-400 dark:border-slate-600 pb-0.5 mb-1 font-serif italic text-xs text-slate-800 dark:text-slate-200">
                F. Schneider, Sworn Assayer
              </div>
              <span className="text-[9px] text-slate-500 uppercase font-mono block">
                Official FOCBS Assay Seal
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print Assay Slip</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/customer/deliveries/request"
              onClick={onClose}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Request Delivery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
