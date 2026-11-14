'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Share2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Mail,
  Phone,
  Coins
} from 'lucide-react';

interface InvitedUser {
  id: string;
  name: string;
  emailMasked: string;
  kycTier: 'Tier 2 Verified' | 'Tier 1 Standard' | 'Tier 3 VIP';
  registeredDate: string;
  ordersCount: number;
  totalVolume: number;
  commissionEarned: number;
  status: 'Active VIP Client' | 'Active Buyer' | 'Registered (No Orders)';
}

export default function MyInvitationUsersListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'active' | 'vip'>('all');

  const usersList: InvitedUser[] = [
    {
      id: 'USR-88210',
      name: 'Countess Beatrix von Habsburg',
      emailMasked: 'b.habsburg@***.at',
      kycTier: 'Tier 3 VIP',
      registeredDate: '12 Jan 2026',
      ordersCount: 6,
      totalVolume: 48900.0,
      commissionEarned: 2445.0,
      status: 'Active VIP Client',
    },
    {
      id: 'USR-88219',
      name: 'Jean-Luc Moreau',
      emailMasked: 'j.moreau@***.ch',
      kycTier: 'Tier 2 Verified',
      registeredDate: '18 Feb 2026',
      ordersCount: 3,
      totalVolume: 22400.0,
      commissionEarned: 1120.0,
      status: 'Active VIP Client',
    },
    {
      id: 'USR-88234',
      name: 'Elena Rostova',
      emailMasked: 'elena.r@***.ch',
      kycTier: 'Tier 2 Verified',
      registeredDate: '01 Mar 2026',
      ordersCount: 4,
      totalVolume: 35000.0,
      commissionEarned: 1750.0,
      status: 'Active VIP Client',
    },
    {
      id: 'USR-88250',
      name: 'Hans-Peter Ziegler',
      emailMasked: 'hp.ziegler@***.ch',
      kycTier: 'Tier 2 Verified',
      registeredDate: '14 Apr 2026',
      ordersCount: 2,
      totalVolume: 18600.0,
      commissionEarned: 930.0,
      status: 'Active Buyer',
    },
    {
      id: 'USR-88266',
      name: 'Sophie Laurent',
      emailMasked: 's.laurent@***.fr',
      kycTier: 'Tier 1 Standard',
      registeredDate: '22 May 2026',
      ordersCount: 2,
      totalVolume: 14000.0,
      commissionEarned: 700.0,
      status: 'Active Buyer',
    },
    {
      id: 'USR-88289',
      name: 'Maximilian Schwarz',
      emailMasked: 'm.schwarz@***.de',
      kycTier: 'Tier 2 Verified',
      registeredDate: '10 Jul 2026',
      ordersCount: 1,
      totalVolume: 18500.0,
      commissionEarned: 925.0,
      status: 'Active Buyer',
    },
    {
      id: 'USR-88301',
      name: 'Dr. Klaus Meier',
      emailMasked: 'k.meier@***.ch',
      kycTier: 'Tier 1 Standard',
      registeredDate: '05 Aug 2026',
      ordersCount: 0,
      totalVolume: 0.0,
      commissionEarned: 0.0,
      status: 'Registered (No Orders)',
    },
  ];

  const totalVolumeAll = usersList.reduce((sum, u) => sum + u.totalVolume, 0);
  const totalCommissionAll = usersList.reduce((sum, u) => sum + u.commissionEarned, 0);

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.emailMasked.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterTier === 'active') return matchesSearch && u.ordersCount > 0;
    if (filterTier === 'vip') return matchesSearch && u.kycTier.includes('Tier 3');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/referrals/invite"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Invite Friends</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Direct Downline
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              18 Total Registered Clients
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#D4AF37]" />
            <span>My Invitation Users List</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Comprehensive list of clients registered via your personal invite link, their order activity, and your lifetime 5% commissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/referrals/invite"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Invite More Friends</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Invited Clients</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {usersList.length} Clients
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            {usersList.filter((u) => u.ordersCount > 0).length} Active Buyers
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Client Trading Volume</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            €{totalVolumeAll.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">
            Gold Bullion &amp; Jewelry
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.04] shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Direct 5% Commission Earned</span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            €{totalCommissionAll.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
            ✓ Credited to Earnings Ledger
          </span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 dark:bg-[#0A0E17]/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTier === 'all'
                ? 'gold-gradient-bg text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Users ({usersList.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTier('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterTier === 'active'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
            }`}
          >
            Active Buyers ({usersList.filter((u) => u.ordersCount > 0).length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTier('vip')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterTier === 'vip'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-400'
            }`}
          >
            VIP Tier 3
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search user name, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* 4. Complete Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Client Name &amp; Ref ID</th>
                <th className="py-3.5 px-4">Verification KYC</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Purchased Volume</th>
                <th className="py-3.5 px-4">Your 5% Commission</th>
                <th className="py-3.5 px-4">Client Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                      {user.id}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs block">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {user.emailMasked}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        user.kycTier.includes('Tier 3')
                          ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>{user.kycTier}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-slate-600 dark:text-slate-400 font-mono text-xs block">
                      {user.registeredDate}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      {user.ordersCount} Orders
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                      €{user.totalVolume.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                      +€{user.commissionEarned.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        user.status.includes('VIP')
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                          : user.status.includes('Active')
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {user.status}
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
