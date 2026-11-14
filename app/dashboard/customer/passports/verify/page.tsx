'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Award,
  Coins,
  Gem,
  ExternalLink,
  Printer,
  Download,
  Building,
  Check,
  Copy,
  Sparkles,
  ArrowLeft,
  Camera,
  Upload,
  RefreshCw,
  FileCheck
} from 'lucide-react';

interface VerifiedResult {
  code: string;
  serialNumber: string;
  itemTitle: string;
  category: string;
  refiner: string;
  purity: string;
  weightGrams: number;
  assayerLicense: string;
  blockchainNetwork: string;
  contractAddress: string;
  tokenId: string;
  merkleHash: string;
  mintedDate: string;
  custodyLocation: string;
  insurancePolicy: string;
  isAuthentic: boolean;
}

const VERIFY_DB: Record<string, VerifiedResult> = {
  'CH-VAL-889012': {
    code: 'DPP-VAL-88901',
    serialNumber: 'CH-VAL-889012',
    itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
    category: 'Fine Gold Bullion Bar',
    refiner: 'Valcambi SA (Balerna, Switzerland · Est. 1961)',
    purity: '999.9 Fine Gold (Au) · 24 Karat',
    weightGrams: 100.0,
    assayerLicense: 'CH-FOCBS-ASSAY-0091 (Swiss Federal Customs)',
    blockchainNetwork: 'Polygon L2 (PoS Verified Contract)',
    contractAddress: '0x88F9A190b982C9E423b0198A82F10992',
    tokenId: '#88901',
    merkleHash: '0x3c99f12e8499201ab88219483c018247921a980c7491',
    mintedDate: '22 Aug 2026',
    custodyLocation: 'Zurich Duty-Free Depository · Safe Unit #B-402',
    insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
    isAuthentic: true,
  },
  'DPP-VAL-88901': {
    code: 'DPP-VAL-88901',
    serialNumber: 'CH-VAL-889012',
    itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
    category: 'Fine Gold Bullion Bar',
    refiner: 'Valcambi SA (Balerna, Switzerland · Est. 1961)',
    purity: '999.9 Fine Gold (Au) · 24 Karat',
    weightGrams: 100.0,
    assayerLicense: 'CH-FOCBS-ASSAY-0091 (Swiss Federal Customs)',
    blockchainNetwork: 'Polygon L2 (PoS Verified Contract)',
    contractAddress: '0x88F9A190b982C9E423b0198A82F10992',
    tokenId: '#88901',
    merkleHash: '0x3c99f12e8499201ab88219483c018247921a980c7491',
    mintedDate: '22 Aug 2026',
    custodyLocation: 'Zurich Duty-Free Depository · Safe Unit #B-402',
    insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
    isAuthentic: true,
  },
  'DPP-SOL-99120': {
    code: 'DPP-SOL-99120',
    serialNumber: 'ATELIER-SOL-99120',
    itemTitle: '24K Yellow Gold Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
    category: 'Bespoke Diamond Jewelry',
    refiner: 'Maison NEOS7 Haute Joaillerie (Geneva Studio)',
    purity: '24K Pure Alpine Gold (999.9) + 1.20ct D-VVS1 Diamond',
    weightGrams: 14.5,
    assayerLicense: 'CH-GENEVA-HALLMARK-2026',
    blockchainNetwork: 'Ethereum Mainnet (ERC-721 Certified)',
    contractAddress: '0x33A17B90C23812D90A11F99182C0198',
    tokenId: '#99120',
    merkleHash: '0x71890ca194091abff89102834019284102919abf',
    mintedDate: '18 Aug 2026',
    custodyLocation: 'Geneva Private Atelier Safe #G-08',
    insurancePolicy: "Lloyd's of London Atelier Policy #LL-ATELIER-994",
    isAuthentic: true,
  },
  'CH-ARG-771920': {
    code: 'DPP-ARG-10492',
    serialNumber: 'CH-ARG-771920',
    itemTitle: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot (999.0 Ag)',
    category: 'Fine Silver Ingot',
    refiner: 'Argor-Heraeus SA (Mendrisio, Switzerland · Est. 1951)',
    purity: '999.0 Fine Silver Cast Ingot',
    weightGrams: 1000.0,
    assayerLicense: 'CH-FOCBS-ASSAY-0019 (Swiss Federal Customs)',
    blockchainNetwork: 'Polygon L2 (PoS Verified Contract)',
    contractAddress: '0x88F9A190b982C9E423b0198A82F10992',
    tokenId: '#10492',
    merkleHash: '0x991823abf0192840192847109283471029384710',
    mintedDate: '10 Aug 2026',
    custodyLocation: 'Zurich Duty-Free Depository · Safe Unit #S-109',
    insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
    isAuthentic: true,
  },
};

export default function CustomerVerifyPassportPage() {
  const [inputCode, setInputCode] = useState('CH-VAL-889012');
  const [activeResult, setActiveResult] = useState<VerifiedResult | null>(VERIFY_DB['CH-VAL-889012']);
  const [isScanning, setIsScanning] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputCode.toUpperCase().trim();
    const match = VERIFY_DB[query] || null;
    setActiveResult(match);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setInputCode('DPP-SOL-99120');
      setActiveResult(VERIFY_DB['DPP-SOL-99120']);
    }, 1800);
  };

  const handleCopyHash = () => {
    if (activeResult) {
      navigator.clipboard.writeText(activeResult.merkleHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/passports"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Passports</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-mono">
              Cryptographic Authenticity Scanner
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              FOCBS Swiss Assayer &amp; W3C Verifiable Credentials
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Verify Digital Product Passport (DPP)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Scan physical bar QR codes, enter serial numbers, or upload assay certificates to verify blockchain ownership and laboratory assay fineness.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/passports"
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-500" />
            <span>My Passports Vault</span>
          </Link>
        </div>
      </div>

      {/* 2. Verification Controls: Search & QR Scanner Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search by Serial */}
        <div className="md:col-span-2 luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-500" />
              <span>Enter Serial Number or DPP Token Code</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Live Depository Database</span>
          </div>

          <form onSubmit={handleVerify} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. CH-VAL-889012, DPP-SOL-99120, CH-ARG-771920..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Audit Proof</span>
            </button>
          </form>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
            <span className="text-[10px] text-slate-400">Sample Ingot Serials:</span>
            {['CH-VAL-889012', 'DPP-SOL-99120', 'CH-ARG-771920'].map((serial) => (
              <button
                key={serial}
                type="button"
                onClick={() => {
                  setInputCode(serial);
                  setActiveResult(VERIFY_DB[serial]);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/15 text-slate-700 dark:text-slate-300 hover:text-amber-500 border border-slate-200 dark:border-slate-700 font-mono text-[10px] font-bold transition-all cursor-pointer"
              >
                {serial}
              </button>
            ))}
          </div>
        </div>

        {/* QR Camera Scanner Simulator */}
        <div className="luxury-glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Camera QR Scanner</span>
            </h3>
            <p className="text-xs text-slate-500">Point mobile camera or optical scanner at physical gold bar blister pack.</p>
          </div>

          <button
            type="button"
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="w-full py-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Scanning Ingot QR Code...</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>Simulate Optical Camera Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Live Verification Audit Dossier */}
      {activeResult ? (
        <div className="luxury-glass p-6 sm:p-10 rounded-3xl border border-emerald-500/40 bg-white/95 dark:bg-[#0A0E17]/95 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="h-2 w-full gold-gradient-bg absolute top-0 left-0 right-0" />

          {/* Green Status Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 uppercase">
                    100% Genuine &amp; Verified
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Token: {activeResult.code}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  Official Swiss Vault Depository &amp; Assayer Authenticity Title
                </h2>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37] block">
                Serial: {activeResult.serialNumber}
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Minted: {activeResult.mintedDate}
              </span>
            </div>
          </div>

          {/* Item Highlight */}
          <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 shrink-0 shadow-xl">
              {activeResult.category.includes('Jewelry') ? (
                <Gem className="w-7 h-7" />
              ) : (
                <Coins className="w-7 h-7" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-[#D4AF37] uppercase tracking-widest block font-mono">
                {activeResult.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {activeResult.itemTitle}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                Refiner &amp; Foundry: <strong>{activeResult.refiner}</strong>
              </span>
            </div>
          </div>

          {/* Technical Metallurgy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Fine Metallurgy Fineness
              </span>
              <strong className="text-slate-900 dark:text-white block font-mono text-xs">
                {activeResult.purity}
              </strong>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                Dual XRF Spectrometry Passed
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Net Certified Weight
              </span>
              <strong className="text-slate-900 dark:text-white block font-mono text-xs">
                {activeResult.weightGrams >= 1000 ? `${activeResult.weightGrams / 1000} kg` : `${activeResult.weightGrams} g`}
              </strong>
              <span className="text-[10px] text-slate-500 font-mono block">
                Tolerance ±0.001g Verified
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Swiss Assayer License
              </span>
              <strong className="text-amber-700 dark:text-[#D4AF37] block font-mono text-xs truncate">
                {activeResult.assayerLicense}
              </strong>
              <span className="text-[10px] text-slate-500 font-mono block">
                FOCBS Registered
              </span>
            </div>
          </div>

          {/* Digital Product Passport Authenticity Record */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-slate-500 text-[11px]">Passport Code:</span>
              <strong className="text-amber-600 dark:text-amber-400">{activeResult.code}</strong>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-slate-500 text-[11px]">Physical Serial Number:</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">{activeResult.serialNumber}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-slate-500 text-[11px]">Tamper-Proof Verification Hash:</span>
              <div className="flex items-center gap-1">
                <span className="text-slate-600 dark:text-slate-400 truncate max-w-[220px]">{activeResult.merkleHash}</span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="Copy Verification Hash"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-slate-200 dark:border-slate-800">
              <span className="text-slate-500 text-[11px]">Custody &amp; Specie Insurance:</span>
              <span className="text-slate-700 dark:text-slate-300">{activeResult.custodyLocation} ({activeResult.insurancePolicy})</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-amber-500" />
              <span>Print Verification Audit</span>
            </button>

            <Link
              href={`/verify/?code=${encodeURIComponent(activeResult.code)}`}
              target="_blank"
              className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Public Shareable Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
          <div className="text-rose-500 font-bold text-sm">No Ingot or Passport Found for &quot;{inputCode}&quot;</div>
          <p className="text-xs text-slate-500">Please check the serial number on your assay certificate or scan the QR code again.</p>
        </div>
      )}
    </div>
  );
}
