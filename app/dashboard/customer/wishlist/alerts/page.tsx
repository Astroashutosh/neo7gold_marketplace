'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  TrendingDown,
  TrendingUp,
  Sparkles,
  ArrowLeft,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Lock,
  Coins,
  Gem,
  Smartphone,
  Mail,
  PhoneCall,
  Search,
  Check,
  AlertTriangle,
  RefreshCw,
  Zap,
  ChevronRight
} from 'lucide-react';

interface PriceAlertItem {
  id: string;
  assetTitle: string;
  assetCategory: 'Gold Spot Bullion' | 'Silver Spot Bullion' | 'Platinum Spot Bullion' | 'Bespoke Jewelry Item';
  conditionType: 'DROPS_BELOW' | 'RISES_ABOVE' | 'PERCENT_DROP';
  targetThreshold: number;
  currentPrice: number;
  currency: string;
  unit: string;
  channels: ('PUSH' | 'SMS' | 'EMAIL' | 'CONCIERGE')[];
  autoLockPrice: boolean;
  status: 'ACTIVE' | 'TRIGGERED' | 'PAUSED';
  createdDate: string;
  lastTriggered?: string;
}

export default function CustomerPriceAlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [testTriggeredId, setTestTriggeredId] = useState<string | null>(null);

  // Form states for new alert
  const [newAssetCategory, setNewAssetCategory] = useState<'Gold Spot Bullion' | 'Silver Spot Bullion' | 'Platinum Spot Bullion' | 'Bespoke Jewelry Item'>('Gold Spot Bullion');
  const [newAssetTitle, setNewAssetTitle] = useState('Spot Gold 999.9 (per Gram)');
  const [newConditionType, setNewConditionType] = useState<'DROPS_BELOW' | 'RISES_ABOVE'>('DROPS_BELOW');
  const [newTargetPrice, setNewTargetPrice] = useState('87.50');
  const [newAutoLock, setNewAutoLock] = useState(false);
  const [newChannels, setNewChannels] = useState<('PUSH' | 'SMS' | 'EMAIL' | 'CONCIERGE')[]>(['PUSH', 'SMS']);

  const [alerts, setAlerts] = useState<PriceAlertItem[]>([
    {
      id: 'ALT-1092',
      assetTitle: 'Spot Gold 999.9 (per Gram)',
      assetCategory: 'Gold Spot Bullion',
      conditionType: 'DROPS_BELOW',
      targetThreshold: 87.5,
      currentPrice: 88.36,
      currency: 'EUR',
      unit: '/ gram',
      channels: ['PUSH', 'SMS', 'CONCIERGE'],
      autoLockPrice: true,
      status: 'ACTIVE',
      createdDate: '15 Aug 2026',
    },
    {
      id: 'ALT-1093',
      assetTitle: '24K Royal Pavé Solitaire Ring (Wishlist)',
      assetCategory: 'Bespoke Jewelry Item',
      conditionType: 'DROPS_BELOW',
      targetThreshold: 15800.0,
      currentPrice: 16250.0,
      currency: 'EUR',
      unit: 'total',
      channels: ['PUSH', 'EMAIL'],
      autoLockPrice: false,
      status: 'ACTIVE',
      createdDate: '18 Aug 2026',
    },
    {
      id: 'ALT-1094',
      assetTitle: 'Spot Silver 999.0 (per Gram)',
      assetCategory: 'Silver Spot Bullion',
      conditionType: 'RISES_ABOVE',
      targetThreshold: 1.1,
      currentPrice: 1.04,
      currency: 'EUR',
      unit: '/ gram',
      channels: ['PUSH', 'EMAIL'],
      autoLockPrice: false,
      status: 'ACTIVE',
      createdDate: '10 Aug 2026',
    },
    {
      id: 'ALT-1095',
      assetTitle: 'Valcambi 100g Minted Gold Bar (CombiBar)',
      assetCategory: 'Gold Spot Bullion',
      conditionType: 'DROPS_BELOW',
      targetThreshold: 8850.0,
      currentPrice: 8980.0,
      currency: 'EUR',
      unit: 'bar',
      channels: ['PUSH', 'SMS'],
      autoLockPrice: true,
      status: 'ACTIVE',
      createdDate: '12 Aug 2026',
    },
    {
      id: 'ALT-1090',
      assetTitle: 'Spot Platinum 999.5 (per Gram)',
      assetCategory: 'Platinum Spot Bullion',
      conditionType: 'DROPS_BELOW',
      targetThreshold: 31.0,
      currentPrice: 31.67,
      currency: 'EUR',
      unit: '/ gram',
      channels: ['EMAIL'],
      autoLockPrice: false,
      status: 'TRIGGERED',
      createdDate: '01 Aug 2026',
      lastTriggered: '08 Aug 2026 at 14:15 CET',
    },
  ]);

  const toggleAlertStatus = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSimulateTrigger = (id: string) => {
    setTestTriggeredId(id);
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'TRIGGERED', lastTriggered: 'Just now' } : a))
      );
      setTestTriggeredId(null);
    }, 1500);
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: PriceAlertItem = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      assetTitle: newAssetTitle,
      assetCategory: newAssetCategory,
      conditionType: newConditionType,
      targetThreshold: parseFloat(newTargetPrice) || 88.0,
      currentPrice: newAssetCategory.includes('Gold') ? 88.36 : newAssetCategory.includes('Silver') ? 1.04 : 31.67,
      currency: 'EUR',
      unit: newAssetCategory.includes('Spot') ? '/ gram' : 'total',
      channels: newChannels,
      autoLockPrice: newAutoLock,
      status: 'ACTIVE',
      createdDate: 'Today',
    };
    setAlerts([newAlert, ...alerts]);
    setShowCreateModal(false);
  };

  const activeCount = alerts.filter((a) => a.status === 'ACTIVE').length;
  const triggeredCount = alerts.filter((a) => a.status === 'TRIGGERED').length;

  const filteredAlerts = alerts.filter(
    (a) =>
      a.assetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.assetCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/wishlist"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Wishlist</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Market Trigger Engine ({activeCount} Active)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live LBMA &amp; LPPM Spot Stream
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>Precious Metal &amp; Jewelry Price Alerts</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Automated threshold alerts, dip-buying triggers, SMS/Push instant notifications, and auto-lock escrow reservations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Price Alert</span>
          </button>
        </div>
      </div>

      {/* 2. Live Spot Price Tickers Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Gold Ticker */}
        <div className="luxury-glass p-5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.03] dark:bg-[#0A0E17]/90 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
              Au
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">Gold (999.9 LBMA)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                €88.36 / g
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              <TrendingUp className="w-3 h-3" /> +0.42%
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">€2,748.20 / oz</span>
          </div>
        </div>

        {/* Silver Ticker */}
        <div className="luxury-glass p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.03] dark:bg-[#0A0E17]/90 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 flex items-center justify-center font-bold text-xs shadow-md">
              Ag
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">Silver (999.0 LBMA)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                €1.04 / g
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              <TrendingUp className="w-3 h-3" /> +1.15%
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">€32.35 / oz</span>
          </div>
        </div>

        {/* Platinum Ticker */}
        <div className="luxury-glass p-5 rounded-2xl border border-purple-500/30 bg-purple-500/[0.03] dark:bg-[#0A0E17]/90 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs shadow-md">
              Pt
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 block">Platinum (999.5 LPPM)</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
                €31.67 / g
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-500 font-mono">
              <TrendingDown className="w-3 h-3" /> -0.18%
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">€985.00 / oz</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Control Bar */}
      <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search price alerts, asset, or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-slate-500">
          <span>Active Alerts: <strong className="text-slate-900 dark:text-white">{activeCount}</strong></span>
          <span>·</span>
          <span>Triggered: <strong className="text-amber-600 dark:text-[#D4AF37]">{triggeredCount}</strong></span>
        </div>
      </div>

      {/* 4. Active Price Alerts Table */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Configured Price Triggers Ledger ({filteredAlerts.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            24/7 Spot Market Polling
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Alert Ref &amp; Target Asset</th>
                <th className="py-3.5 px-4">Trigger Condition</th>
                <th className="py-3.5 px-4">Current Price</th>
                <th className="py-3.5 px-4">Target Threshold</th>
                <th className="py-3.5 px-4">Dispatch Channels</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredAlerts.map((alert) => {
                const diff = alert.currentPrice - alert.targetThreshold;
                return (
                  <tr
                    key={alert.id}
                    className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors"
                  >
                    {/* Alert Ref & Asset */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                          {alert.assetCategory.includes('Jewelry') ? (
                            <Gem className="w-5 h-5" />
                          ) : (
                            <Coins className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <span className="font-mono font-bold text-xs text-amber-700 dark:text-[#D4AF37] block">
                            {alert.id}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white block text-xs truncate max-w-xs">
                            {alert.assetTitle}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {alert.assetCategory} · Created {alert.createdDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Trigger Condition */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                          alert.conditionType === 'DROPS_BELOW'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {alert.conditionType === 'DROPS_BELOW' ? (
                          <>
                            <TrendingDown className="w-3 h-3" />
                            <span>Drops Below Target</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-3 h-3" />
                            <span>Surges Above Target</span>
                          </>
                        )}
                      </span>
                      {alert.autoLockPrice && (
                        <span className="text-[10px] text-amber-700 dark:text-[#D4AF37] font-semibold block mt-1 flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          Auto-Lock Price
                        </span>
                      )}
                    </td>

                    {/* Current Price */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs block">
                        {alert.currentPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} {alert.unit}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Live Streamed
                      </span>
                    </td>

                    {/* Target Threshold */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-amber-700 dark:text-[#D4AF37] text-sm block">
                        {alert.targetThreshold.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} {alert.unit}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {diff > 0 ? `€${diff.toFixed(2)} to trigger` : 'Threshold reached'}
                      </span>
                    </td>

                    {/* Channels */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        {alert.channels.includes('SMS') && (
                          <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold" title="SMS Enabled">
                            SMS
                          </span>
                        )}
                        {alert.channels.includes('PUSH') && (
                          <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold" title="In-App Push Enabled">
                            Push
                          </span>
                        )}
                        {alert.channels.includes('EMAIL') && (
                          <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold" title="Email Digest Enabled">
                            Email
                          </span>
                        )}
                        {alert.channels.includes('CONCIERGE') && (
                          <span className="p-1 rounded bg-amber-500/20 text-amber-800 dark:text-[#D4AF37] text-[10px] font-bold" title="Private Concierge Call">
                            Call
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          alert.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : alert.status === 'TRIGGERED'
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            alert.status === 'ACTIVE'
                              ? 'bg-emerald-500'
                              : alert.status === 'TRIGGERED'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span>{alert.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSimulateTrigger(alert.id)}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-[11px] font-bold transition-all cursor-pointer"
                          title="Simulate Market Dip Trigger"
                        >
                          {testTriggeredId === alert.id ? (
                            <span className="text-amber-500">Firing...</span>
                          ) : (
                            <span>Test</span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleAlertStatus(alert.id)}
                          className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/20 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          {alert.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteAlert(alert.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete Alert"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0A0F1A] text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="h-2 w-full gold-gradient-bg" />

            <form onSubmit={handleCreateAlert} className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      Create Spot Price Trigger
                    </h3>
                    <p className="text-xs text-slate-500">Real-time market dip execution notification</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Category Selection */}
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Target Metal or Jewelry Asset
                  </label>
                  <select
                    value={newAssetCategory}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setNewAssetCategory(cat);
                      if (cat === 'Gold Spot Bullion') setNewAssetTitle('Spot Gold 999.9 (per Gram)');
                      else if (cat === 'Silver Spot Bullion') setNewAssetTitle('Spot Silver 999.0 (per Gram)');
                      else if (cat === 'Platinum Spot Bullion') setNewAssetTitle('Spot Platinum 999.5 (per Gram)');
                      else setNewAssetTitle('24K Royal Pavé Solitaire Ring (Wishlist)');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Gold Spot Bullion">Gold Spot Bullion (LBMA 999.9 Au)</option>
                    <option value="Silver Spot Bullion">Silver Spot Bullion (LBMA 999.0 Ag)</option>
                    <option value="Platinum Spot Bullion">Platinum Spot Bullion (LPPM 999.5 Pt)</option>
                    <option value="Bespoke Jewelry Item">Saved Wishlist Jewelry Piece</option>
                  </select>
                </div>

                {/* Condition Type */}
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Trigger Condition
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewConditionType('DROPS_BELOW')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        newConditionType === 'DROPS_BELOW'
                          ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>Price Drops Below</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewConditionType('RISES_ABOVE')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        newConditionType === 'RISES_ABOVE'
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Price Rises Above</span>
                    </button>
                  </div>
                </div>

                {/* Target Price */}
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Target Threshold Price (€ EUR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={newTargetPrice}
                      onChange={(e) => setNewTargetPrice(e.target.value)}
                      placeholder="e.g. 87.50"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">
                      EUR
                    </span>
                  </div>
                </div>

                {/* Auto-Lock Checkbox */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="autoLock"
                    checked={newAutoLock}
                    onChange={(e) => setNewAutoLock(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="autoLock" className="text-xs text-slate-800 dark:text-slate-200 cursor-pointer">
                    <strong className="text-amber-800 dark:text-[#D4AF37] block">Auto-Lock Price &amp; 15-Minute Reservation:</strong>
                    Automatically reserve ingot at the triggered spot price and hold in escrow for 15 minutes.
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md cursor-pointer transition-all"
                >
                  Activate Trigger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
