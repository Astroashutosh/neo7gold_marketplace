'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building,
  Store,
  Truck,
  Landmark,
  User,
  ShieldCheck,
  KeyRound,
  FileCheck,
} from 'lucide-react';

interface SettingsTab {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'gold' | 'cyan' | 'emerald' | 'amber';
}

const TABS: SettingsTab[] = [
  {
    name: 'Store & Workshop',
    href: '/dashboard/seller/settings',
    icon: Building,
  },
  {
    name: 'Boutique Storefront',
    href: '/dashboard/seller/settings/storefront',
    icon: Store,
    badge: 'Public',
    badgeVariant: 'gold',
  },
  {
    name: 'Shipping & Returns',
    href: '/dashboard/seller/settings/policies',
    icon: Truck,
    badge: 'SLAs',
    badgeVariant: 'cyan',
  },
  {
    name: 'Bank & Payouts',
    href: '/dashboard/seller/settings/payments',
    icon: Landmark,
    badge: 'Withdraw',
    badgeVariant: 'amber',
  },
  /*
  // [EXTRA / REDUNDANT] Covered in Store & Workshop Settings
  {
    name: 'Craftsman Profile',
    href: '/dashboard/seller/profile',
    icon: User,
  },
  */
  {
    name: '2FA Security',
    href: '/dashboard/seller/settings/2fa',
    icon: ShieldCheck,
    badge: 'Security',
    badgeVariant: 'emerald',
  },
  {
    name: 'Password',
    href: '/dashboard/seller/password',
    icon: KeyRound,
  },
  /*
  // [DUPLICATE] Handled in standalone Goldsmith KYB & Compliance top-level sidebar menu
  {
    name: 'KYB Compliance',
    href: '/dashboard/seller/compliance',
    icon: FileCheck,
    badge: 'Verified',
    badgeVariant: 'emerald',
  },
  */
];

export default function SellerSettingsNav({ activePath }: { activePath?: string }) {
  const pathname = usePathname();
  const currentPath = activePath || pathname;

  const isTabActive = (href: string) => {
    if (!currentPath) return false;
    let cleanCurrent = currentPath.split('?')[0].replace(/\/+$/, '').toLowerCase();
    if (cleanCurrent.startsWith('/neos7gold_dashboard')) {
      cleanCurrent = cleanCurrent.substring('/neos7gold_dashboard'.length);
      if (!cleanCurrent.startsWith('/')) cleanCurrent = '/' + cleanCurrent;
    }
    const cleanTarget = href.replace(/\/+$/, '').toLowerCase();

    if (cleanTarget === '/dashboard/seller/settings') {
      return cleanCurrent === '/dashboard/seller/settings';
    }
    return cleanCurrent === cleanTarget || cleanCurrent.startsWith(cleanTarget + '/');
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-1">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max p-1 bg-[#0A0E17]/90 luxury-glass rounded-2xl border border-slate-800 shadow-lg">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isTabActive(tab.href);

          let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
          if (tab.badgeVariant === 'gold') {
            badgeColor = 'bg-[#D4AF37]/15 text-[#D4AF37] border-amber-500/30';
          } else if (tab.badgeVariant === 'cyan') {
            badgeColor = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
          } else if (tab.badgeVariant === 'emerald') {
            badgeColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
          } else if (tab.badgeVariant === 'amber') {
            badgeColor = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none ${
                active
                  ? 'bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-transparent text-[#D4AF37] border border-amber-500/40 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${active ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
              <span>{tab.name}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border uppercase tracking-wider font-bold ${badgeColor}`}
                >
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
