'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Gem,
  Coins,
  CheckCircle2,
  Lock,
  Download,
  ExternalLink,
  Share2,
  Sparkles,
  Award,
  Layers,
  FileText,
  Printer,
  Copy,
  Check,
  X,
  Building
} from 'lucide-react';

interface PassportDetailData {
  id: string;
  itemTitle: string;
  category: 'Fine Jewelry' | 'Investment Bullion Bar';
  refinerOrAtelier: string;
  mintedDate: string;
  blockchainNetwork: string;
  contractAddress: string;
  tokenId: string;
  merkleRoot: string;
  metallurgy: string;
  assayerStamp: string;
  serialNumber: string;
  currentOwner: string;
  custodyDepository: string;
  insurancePolicy: string;
  giaReport?: string;
  dimensions?: string;
}

const PASSPORT_RECORDS: Record<string, PassportDetailData> = {
  'DPP-VAL-88901': {
    id: 'DPP-VAL-88901',
    itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
    category: 'Investment Bullion Bar',
    refinerOrAtelier: 'Valcambi SA (Balerna, Switzerland · Est. 1961)',
    mintedDate: '22 Aug 2026',
    blockchainNetwork: 'Polygon L2 (PoS Mainnet)',
    contractAddress: '0x88F9A190b982C9E423b0198A82F10',
    tokenId: '#88901',
    merkleRoot: '0x3c99f12e8499201ab88219483c018247921a980c',
    metallurgy: '100.00g Fine Gold (Au) · 999.9 Purity (24K)',
    assayerStamp: 'CH-FOCBS-ASSAY-0091 (Swiss Federal Customs)',
    serialNumber: 'CH-VAL-889012',
    currentOwner: '0x71C...88B0 (Dr. Alexander von Bern)',
    custodyDepository: 'Zurich Duty-Free Vault · Safe Deposit Unit #B-402',
    insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
    dimensions: '47.0 × 27.0 × 4.5 mm',
  },
  'DPP-SOL-99120': {
    id: 'DPP-SOL-99120',
    itemTitle: '24K Yellow Gold Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
    category: 'Fine Jewelry',
    refinerOrAtelier: 'Maison NEOS7 Haute Joaillerie (Geneva Studio)',
    mintedDate: '18 Aug 2026',
    blockchainNetwork: 'Ethereum Mainnet (ERC-721 Certified)',
    contractAddress: '0x33A17B90C23812D90A11F99182C0198',
    tokenId: '#99120',
    merkleRoot: '0x71890ca194091abff89102834019284102919abf',
    metallurgy: '14.50g 24K Pure Alpine Gold (999.9)',
    assayerStamp: 'CH-GENEVA-HALLMARK-2026 (Swiss Central Office)',
    serialNumber: 'ATELIER-SOL-99120',
    currentOwner: '0x71C...88B0 (Dr. Alexander von Bern)',
    custodyDepository: 'Geneva Private Atelier Vault · Safe Unit #G-08',
    insurancePolicy: "Lloyd's of London Atelier Policy #LL-ATELIER-994",
    giaReport: '1.20ct Cushion D-VVS1 · GIA Report #649102830',
    dimensions: 'Size 54 EU (Comfort Shank)',
  },
  'DPP-ARG-10492': {
    id: 'DPP-ARG-10492',
    itemTitle: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot (999.0 Ag)',
    category: 'Investment Bullion Bar',
    refinerOrAtelier: 'Argor-Heraeus SA (Mendrisio, Switzerland · Est. 1951)',
    mintedDate: '10 Aug 2026',
    blockchainNetwork: 'Polygon L2 (PoS Mainnet)',
    contractAddress: '0x88F9A190b982C9E423b0198A82F10',
    tokenId: '#10492',
    merkleRoot: '0x991823abf0192840192847109283471029384710',
    metallurgy: '1,000.00g Fine Silver (Ag) · 999.0 Purity',
    assayerStamp: 'CH-FOCBS-ASSAY-0019 (Swiss Federal Customs)',
    serialNumber: 'CH-ARG-771920',
    currentOwner: '0x71C...88B0 (Dr. Alexander von Bern)',
    custodyDepository: 'Zurich Duty-Free Vault · Safe Unit #S-109',
    insurancePolicy: "Lloyd's of London Specie Policy #LL-ZUR-99201",
    dimensions: '117.0 × 53.0 × 15.0 mm',
  },
  'DPP-TNS-77821': {
    id: 'DPP-TNS-77821',
    itemTitle: '18K White Gold Micro-Pavé Tennis Bracelet (5.50ct F-VS+)',
    category: 'Fine Jewelry',
    refinerOrAtelier: 'Maison NEOS7 Haute Joaillerie (Geneva Studio)',
    mintedDate: '02 Aug 2026',
    blockchainNetwork: 'Ethereum Mainnet (ERC-721 Certified)',
    contractAddress: '0x33A17B90C23812D90A11F99182C0198',
    tokenId: '#77821',
    merkleRoot: '0x1029384710293847102938471029384710293847',
    metallurgy: '18.50g 18K White Gold (750) + 5.50ct F-VS+ Diamonds',
    assayerStamp: 'CH-GENEVA-HALLMARK-2026 (Swiss Central Office)',
    serialNumber: 'ATELIER-TNS-77821',
    currentOwner: '0x71C...88B0 (Dr. Alexander von Bern)',
    custodyDepository: 'Handover Completed & Client Biometric Signed',
    insurancePolicy: "Lloyd's Primary Courier Policy #LL-MALCA-9930",
    giaReport: '5.50ct Total Weight · 48 Round Brilliant Cut Diamonds',
    dimensions: '18.0 cm length · 3.2 mm width',
  },
};

export default function CustomerPassportDetailClient({ id }: { id: string }) {
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [recipientWallet, setRecipientWallet] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const passportData: PassportDetailData =
    PASSPORT_RECORDS[id] ||
    PASSPORT_RECORDS['DPP-VAL-88901'];

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setIsTransferred(true);
      setTimeout(() => {
        setTransferModalOpen(false);
      }, 2000);
    }, 2000);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passportData.merkleRoot);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleTriggerPdfDownload = () => {
    setIsDownloadingPdf(true);
    setTimeout(() => {
      setIsDownloadingPdf(false);
      // Create a simulated downloadable text/cert file
      const element = document.createElement('a');
      const file = new Blob(
        [
          `NEOS7 SWISS PRECIOUS METALS & HAUTE JOAILLERIE\n` +
          `OFFICIAL DIGITAL PRODUCT PASSPORT (DPP) DOSSIER\n` +
          `=======================================================\n` +
          `PASSPORT ID:        ${passportData.id}\n` +
          `TOKEN ID:           ${passportData.tokenId}\n` +
          `ITEM:               ${passportData.itemTitle}\n` +
          `REFINER / ATELIER:  ${passportData.refinerOrAtelier}\n` +
          `SERIAL NUMBER:      ${passportData.serialNumber}\n` +
          `METALLURGY:         ${passportData.metallurgy}\n` +
          `SWISS ASSAY STAMP:  ${passportData.assayerStamp}\n` +
          `GIA REPORT:         ${passportData.giaReport || 'N/A'}\n` +
          `BLOCKCHAIN:         ${passportData.blockchainNetwork}\n` +
          `SMART CONTRACT:     ${passportData.contractAddress}\n` +
          `MERKLE ROOT HASH:   ${passportData.merkleRoot}\n` +
          `LEGAL OWNER:        ${passportData.currentOwner}\n` +
          `CUSTODY VAULT:      ${passportData.custodyDepository}\n` +
          `INSURANCE POLICY:   ${passportData.insurancePolicy}\n` +
          `MINTED DATE:        ${passportData.mintedDate}\n` +
          `=======================================================\n` +
          `Swiss Federal Office for Customs & Border Security (FOCBS) Approved\n`
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${passportData.id}_Digital_Passport_Certificate.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
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
            <span>Back to Digital Passports</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 uppercase tracking-wider font-mono">
              Cryptographic Passport #{passportData.id}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {passportData.blockchainNetwork} · Token {passportData.tokenId}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {passportData.itemTitle}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setTransferModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transfer Digital Title</span>
          </button>
          <button
            type="button"
            onClick={() => setCertModalOpen(true)}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Passport Certificate</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 3D Hologram Badge Card */}
        <div className="space-y-6">
          <div className="luxury-glass p-7 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0E182A] to-[#080D17] text-center space-y-5 shadow-2xl relative overflow-hidden">
            {/* Holographic glowing orb background */}
            <div className="w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl absolute -top-10 -right-10 pointer-events-none" />

            <div className="relative inline-block">
              {(() => {
                const verifyUrl = typeof window !== 'undefined'
                  ? `${window.location.origin}/neos7gold_dashboard/verify/?code=${encodeURIComponent(passportData.id)}`
                  : `https://neos7gold.com/neos7gold_dashboard/verify/?code=${encodeURIComponent(passportData.id)}`;
                const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=6&data=${encodeURIComponent(verifyUrl)}`;

                return (
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 via-[#D4AF37] to-amber-200 p-[2px] shadow-2xl shadow-cyan-900/40">
                    <div className="w-full h-full bg-white rounded-[22px] p-2 flex items-center justify-center">
                      <img
                        suppressHydrationWarning
                        src={qrImageUrl}
                        alt={`Scannable QR for ${passportData.id}`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                );
              })()}
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-slate-950 shadow-md">
                VERIFIED
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">{passportData.itemTitle}</h3>
              <p className="text-xs text-[#D4AF37] font-semibold">{passportData.refinerOrAtelier}</p>
              <p className="text-[11px] text-slate-400 font-mono">Serial: {passportData.serialNumber}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 text-left space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Blockchain:</span>
                <span className="text-cyan-400 font-bold">{passportData.blockchainNetwork}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Token ID:</span>
                <span className="text-[#D4AF37] font-bold">{passportData.tokenId}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Assay PMCA:</span>
                <span className="text-emerald-400 font-bold">CH-FOCBS-0091</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCertModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Official Certificate Modal</span>
            </button>
          </div>
        </div>

        {/* Right 2 Columns: Proof of Provenance & Technical Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Physical Metallurgy Specs */}
          <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              <span>Assay Metallurgy &amp; Physical Specifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Refiner Ingot Serial</span>
                <span className="font-bold text-amber-700 dark:text-[#D4AF37] text-sm block">
                  {passportData.serialNumber}
                </span>
                <span className="text-[10px] text-slate-400 block">Stamped with Swiss Federal Assayer Hallmark</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block uppercase">Weight &amp; Purity</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  {passportData.metallurgy}
                </span>
                <span className="text-[10px] text-slate-400 block">LBMA Good Delivery Standard</span>
              </div>

              {passportData.giaReport && (
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                  <span className="text-cyan-400 text-[10px] block uppercase font-bold">GIA Gemological Grading</span>
                  <span className="font-bold text-white text-xs block">{passportData.giaReport}</span>
                  <span className="text-[10px] text-slate-400 block">Laser Micro-Inscription on Girdle Verified</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: DPP Cryptographic Proof */}
          <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Digital Product Passport (DPP) Cryptographic Provenance</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Passport Registry ID</span>
                <span className="font-bold text-slate-900 dark:text-white break-all">
                  {passportData.id}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Cryptographic Merkle Root Hash</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 break-all text-[11px]">
                    {passportData.merkleRoot}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0 ml-2"
                  title="Copy Hash"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Current Legal Title Holder</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {passportData.currentOwner}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                  Verified Ownership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official Digital Product Passport (DPP) Certificate Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-[#070B14] rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden text-slate-100 font-sans">
            {/* Top Gold Foil Accent Bar */}
            <div className="h-2 w-full gold-gradient-bg" />

            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-slate-950 shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 uppercase font-mono">
                      Official DPP Certificate
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref: {passportData.id}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-white mt-0.5">
                    Swiss Digital Product Passport Certificate
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Certificate Body (High Resolution Printable Dossier) */}
            <div className="p-6 sm:p-8 space-y-6 text-xs">
              {/* Product Header */}
              <div className="p-4 rounded-2xl bg-[#0B1220] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                      {passportData.category}
                    </span>
                    <span className="text-sm font-extrabold text-white block">
                      {passportData.itemTitle}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      Refiner: {passportData.refinerOrAtelier}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 font-mono">
                  <span className="text-xs font-bold text-[#D4AF37] block">
                    Serial: {passportData.serialNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Minted: {passportData.mintedDate}
                  </span>
                </div>
              </div>

              {/* Technical Specifications 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block uppercase">Metallurgy &amp; Fineness</span>
                  <span className="text-white font-bold block text-xs">{passportData.metallurgy}</span>
                  <span className="text-emerald-400 text-[10px] block">Swiss XRF Assayed</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block uppercase">Swiss Assayer Seal</span>
                  <span className="text-[#D4AF37] font-bold block text-xs truncate">{passportData.assayerStamp}</span>
                  <span className="text-slate-400 text-[10px] block">FOCBS Sworn Assay Stamp</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block uppercase">Verification Standard</span>
                  <span className="text-amber-400 font-bold block text-xs">EU DPP / W3C Schema</span>
                  <span className="text-slate-400 text-[10px] block">Passport: {passportData.id}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[10px] block uppercase">Depository Custody</span>
                  <span className="text-slate-200 font-bold block text-xs truncate">{passportData.custodyDepository}</span>
                  <span className="text-slate-400 text-[10px] block">Insured by Lloyd&apos;s London</span>
                </div>
              </div>

              {/* Cryptographic SHA-256 Hash */}
              <div className="p-3.5 rounded-xl bg-[#090E1A] border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-500 text-[10px] block uppercase">Tamper-Proof Verification Hash (SHA-256)</span>
                <span className="text-cyan-400 font-bold block text-[11px] break-all">{passportData.merkleRoot}</span>
                <span className="text-slate-500 text-[10px] block">Registry Code: {passportData.id}</span>
              </div>

              {/* QR Code & Authority Footer */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const verifyUrl = typeof window !== 'undefined'
                      ? `${window.location.origin}/neos7gold_dashboard/verify/?code=${encodeURIComponent(passportData.id)}`
                      : `https://neos7gold.com/neos7gold_dashboard/verify/?code=${encodeURIComponent(passportData.id)}`;
                    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(verifyUrl)}`;

                    return (
                      <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                        <img
                          suppressHydrationWarning
                          src={qrImageUrl}
                          alt={`QR for ${passportData.id}`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    );
                  })()}
                  <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div className="text-white font-bold">W3C Verifiable Credential v2.0</div>
                    <div>Scan with smartphone camera for live on-chain validation.</div>
                    <div className="text-emerald-400">Swiss Federal Customs (FOCBS) Regulated</div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-400 hidden sm:block">
                  <div className="text-amber-400 font-bold">NEOS7 SWITZERLAND</div>
                  <div>ZURICH DEPOSITORY</div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 bg-[#090E1A] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Certificate</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerPdfDownload}
                  disabled={isDownloadingPdf}
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all flex-1 sm:flex-none"
                >
                  {isDownloadingPdf ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Generating PDF Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Ownership Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0A0E17] max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                Transfer Digital Product Title
              </span>
              <button
                type="button"
                onClick={() => setTransferModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isTransferred ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="font-bold text-white text-sm block">Title Transferred On-Chain!</span>
                <p className="text-[11px] text-slate-400">
                  Ownership of Passport #{passportData.id} has been transferred to {recipientWallet}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter the recipient&apos;s Ethereum / Polygon wallet address or registered Neos7 Gold Client ID to transfer immutable legal ownership.
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Recipient Wallet Address (0x...) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0x992B0491823Ac..."
                    value={recipientWallet}
                    onChange={(e) => setRecipientWallet(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTransferModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isTransferring}
                    className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {isTransferring ? 'Broadcasting Tx...' : 'Sign & Transfer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
