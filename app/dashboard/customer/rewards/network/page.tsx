'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Share2,
  Coins,
  ShieldCheck,
  Award,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

interface NetworkMember {
  id: string;
  clientName: string;
  levelTier: 'Level 1 (Direct)' | 'Level 2 (Indirect)' | 'Level 3 (Sub-Tier)';
  location: string;
  joinedDate: string;
  totalOrders: number;
  totalVolumePurchased: number;
  commissionGenerated: number;
  status: 'Active VIP Client' | 'Verified Client';
}

export default function CustomerNetworkTreePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'level1' | 'level2' | 'level3'>('all');

  const members: NetworkMember[] = [
    {
      id: 'MBR-101',
      clientName: 'Countess Beatrix von Habsburg',
      levelTier: 'Level 1 (Direct)',
      location: 'Vienna, Austria',
      joinedDate: '12 Jan 2026',
      totalOrders: 6,
      totalVolumePurchased: 48900.0,
      commissionGenerated: 2445.0,
      status: 'Active VIP Client',
    },
    {
      id: 'MBR-102',
      clientName: 'Jean-Luc Moreau',
      levelTier: 'Level 1 (Direct)',
      location: 'Geneva, Switzerland',
      joinedDate: '18 Feb 2026',
      totalOrders: 3,
      totalVolumePurchased: 22400.0,
      commissionGenerated: 1120.0,
      status: 'Active VIP Client',
    },
    {
      id: 'MBR-103',
      clientName: 'Elena Rostova',
      levelTier: 'Level 1 (Direct)',
      location: 'St. Moritz, Switzerland',
      joinedDate: '01 Mar 2026',
      totalOrders: 4,
      totalVolumePurchased: 35000.0,
      commissionGenerated: 1750.0,
      status: 'Active VIP Client',
    },
    {
      id: 'MBR-201',
      clientName: 'Hans-Peter Ziegler',
      levelTier: 'Level 2 (Indirect)',
      location: 'Zurich, Switzerland',
      joinedDate: '14 Apr 2026',
      totalOrders: 2,
      totalVolumePurchased: 18600.0,
      commissionGenerated: 558.0,
      status: 'Verified Client',
    },
    {
      id: 'MBR-202',
      clientName: 'Sophie Laurent',
      levelTier: 'Level 2 (Indirect)',
      location: 'Lausanne, Switzerland',
      joinedDate: '22 May 2026',
      totalOrders: 2,
      totalVolumePurchased: 14000.0,
      commissionGenerated: 420.0,
      status: 'Verified Client',
    },
    {
      id: 'MBR-301',
      clientName: 'Maximilian Schwarz',
      levelTier: 'Level 3 (Sub-Tier)',
      location: 'Basel, Switzerland',
      joinedDate: '10 Jul 2026',
      totalOrders: 1,
      totalVolumePurchased: 18500.0,
      commissionGenerated: 277.50,
      status: 'Verified Client',
    },
  ];

  const totalNetworkVolume = members.reduce((sum, m) => sum + m.totalVolumePurchased, 0);
  const totalNetworkCommission = members.reduce((sum, m) => sum + m.commissionGenerated, 0);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (tierFilter === 'level1') return matchesSearch && m.levelTier.includes('Level 1');
    if (tierFilter === 'level2') return matchesSearch && m.levelTier.includes('Level 2');
    if (tierFilter === 'level3') return matchesSearch && m.levelTier.includes('Level 3');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/rewards"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Rewards Ledger</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-mono">
              Multi-Level Downline
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              3 Active Referral Generations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-500" />
            <span>My Network Downline Tree (MLM)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            View all invited private clients, their precious metals trading volume, and multi-tier override payouts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/rewards/invite"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Invite More Clients</span>
          </Link>
        </div>
      </div>

      {/* 2. 3-Tier Multi-Level Hierarchy Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1 */}
        <div className="luxury-glass p-5 rounded-2xl border-2 border-amber-500/40 bg-amber-500/[0.04] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
              TIER 1 · DIRECT (5.0%)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-[#D4AF37]">
              12 Members
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
              €106,300.00
            </span>
            <span className="text-[11px] text-slate-500 block">Total Bullion Volume</span>
          </div>
          <div className="pt-2 border-t border-amber-500/20 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">Your Commission:</span>
            <span className="font-bold text-amber-700 dark:text-[#D4AF37]">€5,315.00</span>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="luxury-glass p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.03] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              TIER 2 · INDIRECT (3.0%)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              5 Members
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
              €32,600.00
            </span>
            <span className="text-[11px] text-slate-500 block">Total Bullion Volume</span>
          </div>
          <div className="pt-2 border-t border-cyan-500/20 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">Your Commission:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">€978.00</span>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="luxury-glass p-5 rounded-2xl border border-purple-500/30 bg-purple-500/[0.03] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              TIER 3 · NETWORK (1.5%)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
              1 Member
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
              €18,500.00
            </span>
            <span className="text-[11px] text-slate-500 block">Total Bullion Volume</span>
          </div>
          <div className="pt-2 border-t border-purple-500/20 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">Your Commission:</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">€277.50</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Ribbon & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setTierFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tierFilter === 'all'
                ? 'gold-gradient-bg text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Downline ({members.length})
          </button>

          <button
            type="button"
            onClick={() => setTierFilter('level1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tierFilter === 'level1'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
            }`}
          >
            Tier 1 Direct (3)
          </button>

          <button
            type="button"
            onClick={() => setTierFilter('level2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tierFilter === 'level2'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-cyan-400'
            }`}
          >
            Tier 2 Indirect (2)
          </button>

          <button
            type="button"
            onClick={() => setTierFilter('level3')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tierFilter === 'level3'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-400'
            }`}
          >
            Tier 3 Network (1)
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search member name, location, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* 4. Complete Downline Members Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Member ID &amp; Client Name</th>
                <th className="py-3.5 px-4">Downline Generation</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Total Bullion Volume</th>
                <th className="py-3.5 px-4 text-right">Commission Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredMembers.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-cyan-500/[0.03] dark:hover:bg-cyan-500/[0.04] transition-colors"
                >
                  {/* Member */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                      {m.id}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      {m.clientName}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      ✓ {m.status}
                    </span>
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        m.levelTier.includes('Level 1')
                          ? 'bg-amber-500/15 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30'
                          : m.levelTier.includes('Level 2')
                          ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                          : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {m.levelTier}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4">
                    <span className="text-slate-800 dark:text-slate-200 text-xs font-semibold block">
                      {m.location}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-4">
                    <span className="text-slate-600 dark:text-slate-400 font-mono text-xs block">
                      {m.joinedDate}
                    </span>
                  </td>

                  {/* Orders */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      {m.totalOrders} Orders
                    </span>
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{m.totalVolumePurchased.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Commission */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      +€{m.commissionGenerated.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
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
