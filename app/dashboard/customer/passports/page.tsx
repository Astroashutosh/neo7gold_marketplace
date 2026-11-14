'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  ShieldCheck,
  Gem,
  Coins,
  ExternalLink,
  Download,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Search
} from 'lucide-react';

interface PassportItem {
  id: string;
  itemTitle: string;
  category: 'Fine Jewelry' | 'Investment Bullion Bar';
  atelierOrRefiner: string;
  mintedDate: string;
  blockchainNetwork: string;
  contractAddress: string;
  tokenId: string;
  metallurgy: string;
  gemstoneGrading?: string;
  ownerAddress: string;
}

export default function CustomerPassportsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const passports: PassportItem[] = [
    {
      id: 'DPP-VAL-88901',
      itemTitle: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
      category: 'Investment Bullion Bar',
      atelierOrRefiner: 'Valcambi SA (Balerna, Switzerland)',
      mintedDate: '22 Aug 2026',
      blockchainNetwork: 'Polygon L2 (PoS)',
      contractAddress: '0x88F9A190b982C9E423b0198A82',
      tokenId: '#88901',
      metallurgy: '100.00g Fine Gold 999.9 (Au)',
      ownerAddress: '0x71C...88B0 (Alexander von Bern)',
    },
    {
      id: 'DPP-SOL-99120',
      itemTitle: '24K Yellow Gold Royal Pavé Diamond Solitaire Ring',
      category: 'Fine Jewelry',
      atelierOrRefiner: 'Pforzheim Fine Goldsmiths GmbH',
      mintedDate: '18 Aug 2026',
      blockchainNetwork: 'Ethereum Mainnet (ERC-721)',
      contractAddress: '0x33A17B90C23812D90A11',
      tokenId: '#99120',
      metallurgy: '14.50g 24K Pure Gold (999.9)',
      gemstoneGrading: '1.20ct Cushion D-VVS1 · GIA Report #649102830',
      ownerAddress: '0x71C...88B0 (Alexander von Bern)',
    },
  ];

  const filteredPassports = passports.filter(
    (p) =>
      p.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tokenId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
              On-Chain Cryptographic Proof
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              EU DPP Standard &amp; W3C Verifiable Credentials
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Digital Product Passports (DPP)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Immutable blockchain certificates proving legal title, physical assay metallurgy, conflict-free provenance, and GIA diamond reports.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search passport ID, token ID, jewelry item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Passports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPassports.map((item) => (
          <div
            key={item.id}
            className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {item.blockchainNetwork} · Token {item.tokenId}
                </span>
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
                  {item.id}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 shrink-0 shadow-lg">
                  {item.category.includes('Jewelry') ? (
                    <Gem className="w-7 h-7" />
                  ) : (
                    <Coins className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.itemTitle}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono block">
                    Issued by: {item.atelierOrRefiner}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Metallurgy:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{item.metallurgy}</span>
                </div>
                {item.gemstoneGrading && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">GIA Report:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">{item.gemstoneGrading}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Owner Wallet:</span>
                  <span className="text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                    {item.ownerAddress}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50/60 dark:bg-[#090D15]/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Immutable On-Chain
              </span>

              <Link
                href={`/dashboard/customer/passports/${item.id}`}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>3D Hologram Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
