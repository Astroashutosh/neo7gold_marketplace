'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Truck,
  TrendingDown,
  QrCode,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Check,
  Filter,
  Sparkles,
  Settings
} from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'delivery' | 'price_alert' | 'passport' | 'buyback' | 'kyc';
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  actionHref: string;
  actionLabel: string;
}

export default function CustomerNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'delivery' | 'price_alert' | 'vault'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'NOTIF-01',
      category: 'delivery',
      title: 'Armored Vault Convoy En Route (Brink’s)',
      description: 'Your 100g Valcambi Gold Bar (#ORD-98301) has departed Zurich Depository. Armored escort ETA: Today at 14:30. Ensure your 4-digit verbal PIN #8892 is ready.',
      timestamp: '15 mins ago',
      unread: true,
      actionHref: '/dashboard/customer/orders/transit',
      actionLabel: 'Track Convoy Live',
    },
    {
      id: 'NOTIF-02',
      category: 'price_alert',
      title: 'Wishlist Spot Price Dip Triggered (-€550.00)',
      description: '24K Royal Pavé Diamond Solitaire Ring has dropped from €6,450 to €5,900 following LBMA London afternoon gold spot fix.',
      timestamp: '2 hours ago',
      unread: true,
      actionHref: '/dashboard/customer/wishlist',
      actionLabel: 'View Wishlist Item',
    },
    {
      id: 'NOTIF-03',
      category: 'buyback',
      title: 'Scrap Gold XRF Assay Test Completed (75.2% Pure Au)',
      description: 'Consignment #BB-2026-081 (18K Yellow Gold Chains) passed Swiss Federal XRF spectrometry. Payout of €2,816.48 approved for vault credit.',
      timestamp: '5 hours ago',
      unread: true,
      actionHref: '/dashboard/customer/buyback/assay',
      actionLabel: 'View Assay Report',
    },
    {
      id: 'NOTIF-04',
      category: 'passport',
      title: 'Digital Product Passport (DPP) Minted On-Chain',
      description: 'Cryptographic NFT Passport #DPP-SOL-99120 has been minted on Polygon L2 with GIA Report #649102830 permanently bound.',
      timestamp: '1 day ago',
      unread: false,
      actionHref: '/dashboard/customer/passports/DPP-SOL-99120',
      actionLabel: 'View DPP Dossier',
    },
    {
      id: 'NOTIF-05',
      category: 'kyc',
      title: 'Tier 2 Private Client Clearance Approved',
      description: 'Your Zurich residence proof was verified by our compliance team. Annual gold bullion purchase limit increased to €250,000.00.',
      timestamp: '3 days ago',
      unread: false,
      actionHref: '/dashboard/customer/kyc',
      actionLabel: 'View Limit Status',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'delivery') return n.category === 'delivery';
    if (activeTab === 'price_alert') return n.category === 'price_alert';
    if (activeTab === 'vault') return n.category === 'buyback' || n.category === 'passport' || n.category === 'kyc';
    return true;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Alerts &amp; Updates
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live Push, Convoy &amp; Market Alerts
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-amber-500" />
            <span>Notification Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Stay updated with real-time armored convoy dispatches, price drop alerts, assay results, and DPP minting.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark All as Read</span>
            </button>
          )}

          <Link
            href="/dashboard/customer/settings"
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-all"
            title="Notification Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Quick Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#0E1524]/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'gold-gradient-bg text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Alerts ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'unread'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <span>Unread</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900 text-white font-mono">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('delivery')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'delivery'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-purple-400'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Deliveries</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('price_alert')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'price_alert'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Price Drops</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vault')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'vault'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-cyan-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vault &amp; KYC</span>
        </button>
      </div>

      {/* 3. Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`luxury-glass p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                notif.unread
                  ? 'border-amber-500/40 bg-amber-500/[0.04] dark:bg-amber-500/[0.03] shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-sm opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Category Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-md ${
                    notif.category === 'delivery'
                      ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                      : notif.category === 'price_alert'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : notif.category === 'passport'
                      ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                      : notif.category === 'buyback'
                      ? 'bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                  }`}
                >
                  {notif.category === 'delivery' && <Truck className="w-5 h-5" />}
                  {notif.category === 'price_alert' && <TrendingDown className="w-5 h-5" />}
                  {notif.category === 'passport' && <QrCode className="w-5 h-5" />}
                  {notif.category === 'buyback' && <RotateCcw className="w-5 h-5" />}
                  {notif.category === 'kyc' && <ShieldCheck className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    )}
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-mono">
                      · {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {notif.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Link
                  href={notif.actionHref}
                  onClick={() => handleMarkSingleRead(notif.id)}
                  className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>{notif.actionLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Dismiss Alert"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="luxury-glass p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">You&apos;re All Caught Up!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No alerts in this category. We&apos;ll notify you when your next convoy dispatches or spot price dips.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
