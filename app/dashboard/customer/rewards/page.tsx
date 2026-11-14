'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coins,
  Share2,
  Users,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Landmark,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  DollarSign,
  Gift
} from 'lucide-react';

interface CommissionRecord {
  id: string;
  referredClient: string;
  tierLevel: 'Level 1 (Direct 5%)' | 'Level 2 (Indirect 3%)' | 'Level 3 (Network 1.5%)';
  itemPurchased: string;
  orderValue: number;
  commissionEarned: number;
  nb7TokensAwarded: number;
  date: string;
  status: 'Settled to Bank' | 'Available for Payout' | 'Pending Clearing';
}

export default function CustomerRewardsEarningsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'settled'>('all');
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [availableBalance, setAvailableBalance] = useState(3450.0);
  const [lifetimeEarned, setLifetimeEarned] = useState(14820.5);
  const [nb7TokenBalance, setNb7TokenBalance] = useState(12450);

  const records: CommissionRecord[] = [
    {
      id: 'COMM-9921',
      referredClient: 'Countess Beatrix von Habsburg',
      tierLevel: 'Level 1 (Direct 5%)',
      itemPurchased: '100g Valcambi Gold Bar (999.9 Fine Investment Cast)',
      orderValue: 8836.0,
      commissionEarned: 441.80,
      nb7TokensAwarded: 500,
      date: '23 Aug 2026',
      status: 'Available for Payout',
    },
    {
      id: 'COMM-9918',
      referredClient: 'Jean-Luc Moreau (Geneva)',
      tierLevel: 'Level 1 (Direct 5%)',
      itemPurchased: '24K Royal Pavé Diamond Solitaire Ring (1.20ct D-VVS1)',
      orderValue: 5900.0,
      commissionEarned: 295.00,
      nb7TokensAwarded: 350,
      date: '20 Aug 2026',
      status: 'Available for Payout',
    },
    {
      id: 'COMM-9905',
      referredClient: 'Hans-Peter Ziegler (Zurich)',
      tierLevel: 'Level 2 (Indirect 3%)',
      itemPurchased: 'Argor-Heraeus 1,000g Fine Silver Cast Ingot',
      orderValue: 1040.0,
      commissionEarned: 31.20,
      nb7TokensAwarded: 100,
      date: '16 Aug 2026',
      status: 'Settled to Bank',
    },
    {
      id: 'COMM-9892',
      referredClient: 'Elena Rostova (St. Moritz)',
      tierLevel: 'Level 1 (Direct 5%)',
      itemPurchased: 'PAMP Suisse 250g Fine Gold Cast Bar',
      orderValue: 22090.0,
      commissionEarned: 1104.50,
      nb7TokensAwarded: 1200,
      date: '08 Aug 2026',
      status: 'Settled to Bank',
    },
    {
      id: 'COMM-9870',
      referredClient: 'Maximilian Schwarz (Basel)',
      tierLevel: 'Level 3 (Network 1.5%)',
      itemPurchased: '18K White Gold Micro-Pavé Tennis Bracelet',
      orderValue: 4850.0,
      commissionEarned: 72.75,
      nb7TokensAwarded: 150,
      date: '01 Aug 2026',
      status: 'Settled to Bank',
    },
  ];

  const handleRequestPayoutWire = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPayoutSuccess(true);
      setAvailableBalance(0);
      setTimeout(() => setPayoutSuccess(false), 4000);
    }, 1500);
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.referredClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.itemPurchased.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'available') return matchesSearch && r.status === 'Available for Payout';
    if (filterStatus === 'settled') return matchesSearch && r.status === 'Settled to Bank';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Commission &amp; Rewards Ledger
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Multi-Level Network Earnings
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Coins className="w-6 h-6 text-[#D4AF37]" />
            <span>My Referral &amp; Network Earnings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Track real-time commissions earned from referred gold &amp; jewelry purchases, manage NB7 tokens, and withdraw cash.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/rewards/invite"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Invite New Client</span>
          </Link>
        </div>
      </div>

      {/* Payout Success Toast */}
      {payoutSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span>
            Payout wire of €3,450.00 has been initiated to your registered Swiss IBAN (UBS Switzerland AG · CH93 0070...)!
          </span>
        </div>
      )}

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Available Payout */}
        <div className="luxury-glass p-5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.04] shadow-md flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Available Cash Payout</span>
            <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
              €{availableBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRequestPayoutWire}
            disabled={availableBalance === 0 || isProcessing}
            className={`w-full py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
              availableBalance > 0 && !isProcessing
                ? 'hover:opacity-95 cursor-pointer'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Executing Wire...' : 'Withdraw to Bank IBAN'}</span>
          </button>
        </div>

        {/* Lifetime Earnings */}
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Lifetime Commission</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
              €{lifetimeEarned.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.5% this month</span>
          </span>
        </div>

        {/* Invited Network */}
        <Link
          href="/dashboard/customer/rewards/network"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 block group-hover:text-cyan-400 transition-colors">
              Active Network Members
            </span>
            <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono mt-1 block">
              18 Clients
            </span>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Across 3 Downline Tiers</span>
            <ChevronRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* NB7 Loyalty Tokens */}
        <Link
          href="/dashboard/customer/rewards/tokens"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-purple-500/40 transition-all flex flex-col justify-between group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 block group-hover:text-purple-400 transition-colors">
              NB7 Loyalty Tokens
            </span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
              {nb7TokenBalance.toLocaleString()} NB7
            </span>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Est. Value: ~€6,225.00</span>
            <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* 3. Filter Ribbon & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'gold-gradient-bg text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Transactions ({records.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('available')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'available'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
            }`}
          >
            Available Payouts (2)
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus('settled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'settled'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
            }`}
          >
            Settled to Bank (3)
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search client, item, ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* 4. Complete Commission Ledger Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Ref &amp; Referred Client</th>
                <th className="py-3.5 px-4">MLM Tier Level</th>
                <th className="py-3.5 px-4">Purchased Asset</th>
                <th className="py-3.5 px-4">Order Value</th>
                <th className="py-3.5 px-4">Commission Earned</th>
                <th className="py-3.5 px-4">NB7 Tokens</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors"
                >
                  {/* Client */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                      {item.id}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      {item.referredClient}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.date}
                    </span>
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        item.tierLevel.includes('Level 1')
                          ? 'bg-amber-500/15 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30'
                          : item.tierLevel.includes('Level 2')
                          ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                          : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {item.tierLevel}
                    </span>
                  </td>

                  {/* Item */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white text-xs block truncate max-w-xs">
                      {item.itemPurchased}
                    </span>
                  </td>

                  {/* Order Value */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{item.orderValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Commission */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      +€{item.commissionEarned.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Tokens */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-xs block">
                      +{item.nb7TokensAwarded} NB7
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                        item.status === 'Available for Payout'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 animate-pulse'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {item.status === 'Available for Payout' ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
