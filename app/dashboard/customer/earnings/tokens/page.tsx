'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Coins,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowRightLeft,
  Gem,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface TokenTransaction {
  id: string;
  source: string;
  tokensAmount: number;
  eurValue: number;
  date: string;
  type: 'Purchase Reward' | 'Referral Bonus' | 'Staking Yield';
}

export default function NB7LoyaltyTokensReportPage() {
  const [tokenBalance] = useState(12450);

  const transactions: TokenTransaction[] = [
    {
      id: 'TX-NB7-9912',
      source: 'Direct Referral Purchase (Countess Beatrix)',
      tokensAmount: 500,
      eurValue: 250.0,
      date: '23 Aug 2026',
      type: 'Referral Bonus',
    },
    {
      id: 'TX-NB7-9908',
      source: 'Own 100g Valcambi Gold Bar Purchase',
      tokensAmount: 1000,
      eurValue: 500.0,
      date: '20 Aug 2026',
      type: 'Purchase Reward',
    },
    {
      id: 'TX-NB7-9874',
      source: 'Monthly Vault Holding Staking Yield',
      tokensAmount: 450,
      eurValue: 225.0,
      date: '15 Aug 2026',
      type: 'Staking Yield',
    },
    {
      id: 'TX-NB7-9840',
      source: 'Direct Referral Purchase (Jean-Luc Moreau)',
      tokensAmount: 350,
      eurValue: 175.0,
      date: '10 Aug 2026',
      type: 'Referral Bonus',
    },
  ];

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider font-mono">
              Ecosystem Loyalty Asset
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              1 NB7 = €0.50 Guaranteed Value
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span>NB7 Loyalty Tokens</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Accumulated utility tokens earned from your bullion purchases, holding tenure, and network referrals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/withdraw/tokens"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Redeem Tokens</span>
          </Link>
        </div>
      </div>

      {/* 2. Balance & Perks Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-purple-500/40 bg-purple-500/[0.04] shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total NB7 Token Balance</span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 block">
            {tokenBalance.toLocaleString()} NB7
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            ≈ €6,225.00 Gold Value
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Current Staking Tier</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            Gold Staker
          </span>
          <span className="text-[11px] text-amber-700 dark:text-[#D4AF37] font-bold block mt-1">
            -1.20% Spot Margin Discount
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Tokens Earned This Month</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            +2,300 NB7
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            +24% vs Last Month
          </span>
        </div>
      </div>

      {/* 3. Token Earnings Ledger */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Recent Token Distribution History
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Auto-credited upon order settlement
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Transaction ID &amp; Source</th>
                <th className="py-3.5 px-4">Reward Type</th>
                <th className="py-3.5 px-4">Tokens Awarded</th>
                <th className="py-3.5 px-4">Gold Value Equivalent</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-purple-500/[0.03] dark:hover:bg-purple-500/[0.04] transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400 block">
                      {tx.id}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      {tx.source}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 font-mono">
                      {tx.type}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-purple-600 dark:text-purple-400 text-sm block">
                      +{tx.tokensAmount} NB7
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{tx.eurValue.toFixed(2)}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono text-slate-500 text-xs block">
                      {tx.date}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Credited</span>
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
