'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Package,
  Heart,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Settings,
  KeyRound,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  Search,
  User as UserIcon,
  Palette,
  Check,
  Flame,
  Clock,
  Coins,
  Scale,
  QrCode,
  Lock,
  Compass,
  FileCheck,
  TrendingUp,
  MapPin,
  ExternalLink,
  Shield,
  HelpCircle,
  Gem,
  Truck,
  Gift,
  Users,
  Share2,
  Landmark,
  Gavel,
} from 'lucide-react';
import {
  useTheme,
  PRIMARY_COLOR_PRESETS,
  SIDEBAR_THEMES,
  HEADER_THEMES,
} from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/context/SettingsContext';
import AuthGuard from '@/components/AuthGuard';
import { ThemeCustomizerDrawer } from '@/components/ThemeCustomizerDrawer';
import LanguageSelector from '@/components/LanguageSelector';

interface SubMenuItem {
  name: string;
  href: string;
  badge?: string;
}

interface NavItem {
  name: string;
  icon: any;
  href?: string;
  badge?: string;
  subItems?: SubMenuItem[];
  onClick?: () => void;
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, themeConfig, setPrimaryColor, setIsCustomizerOpen } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const { siteName, logoUrl } = useSettings();

  const isGoldSidebar =
    theme !== 'light' &&
    (themeConfig?.sidebarTheme === 'gold_gradient' || themeConfig?.sidebarTheme === 'gold_solid');

  const isGoldHeader =
    theme !== 'light' &&
    (themeConfig?.headerTheme === 'gold_gradient' ||
      themeConfig?.headerTheme === 'gold_solid' ||
      (themeConfig?.headerTheme === 'match_sidebar' && isGoldSidebar));

  // Dynamic Theme Classes
  const getSidebarClasses = () => {
    if (theme === 'light') return 'bg-[#FFFFFF] border-slate-200 text-slate-800';
    switch (themeConfig?.sidebarTheme) {
      case 'gold_gradient':
        return 'bg-gradient-to-b from-[#F3DE8A] via-[#D4AF37] to-[#8C6B10] text-slate-950 border-r border-[#B38F24] shadow-xl';
      case 'gold_solid':
        return 'bg-[#D4AF37] text-slate-950 border-r border-[#B8860B] shadow-xl';
      case 'black':
        return 'bg-[#000000] text-slate-100 border-r border-[#1F293D]';
      case 'navy':
        return 'bg-[#070E1E] text-slate-100 border-r border-[#12203D]';
      case 'forest':
        return 'bg-[#04180F] text-slate-100 border-r border-[#064E3B]';
      case 'slate':
        return 'bg-[#121A2A] text-slate-100 border-r border-[#334155]';
      case 'white':
        return 'bg-[#FFFFFF] text-slate-900 border-r border-slate-200 shadow-md';
      case 'obsidian':
      default:
        return 'bg-[#090D15] border-r border-slate-800 text-slate-200';
    }
  };

  const getLogoHeaderClasses = () => {
    const logoTheme = themeConfig?.logoBgTheme || 'match_sidebar';
    switch (logoTheme) {
      case 'gold_gradient':
        return 'bg-gradient-to-r from-[#F3DE8A] via-[#D4AF37] to-[#9C7918] text-slate-950 border-b border-[#B38F24] shadow-md';
      case 'gold_solid':
        return 'bg-[#D4AF37] text-slate-950 border-b border-[#B8860B] shadow-md';
      case 'obsidian':
        return 'bg-[#0A0E17] text-white border-b border-[#161F33]';
      case 'black':
        return 'bg-[#000000] text-white border-b border-[#1F293D]';
      case 'navy':
        return 'bg-[#070E1E] text-white border-b border-[#12203D]';
      case 'forest':
        return 'bg-[#04180F] text-white border-b border-[#064E3B]';
      case 'ruby':
        return 'bg-[#1A060A] text-white border-b border-[#881337]';
      case 'amethyst':
        return 'bg-[#12071C] text-white border-b border-[#581C87]';
      case 'cyan':
        return 'bg-[#04151B] text-white border-b border-[#155E75]';
      case 'slate':
        return 'bg-[#121A2A] text-white border-b border-[#334155]';
      case 'white':
        return 'bg-[#FFFFFF] text-slate-900 border-b border-slate-200 shadow-sm';
      case 'elevated':
        return 'bg-[#151D2C] text-white border-b border-amber-500/25 shadow-md';
      case 'match_sidebar':
      default:
        return theme === 'light'
          ? 'bg-transparent text-slate-900 border-b border-slate-200'
          : 'bg-transparent text-white border-b border-[#161F33]';
    }
  };

  const getHeaderClasses = () => {
    if (theme === 'light') return 'bg-white/95 border-slate-200 text-slate-800 shadow-sm';
    switch (themeConfig?.headerTheme) {
      case 'gold_gradient':
        return 'bg-gradient-to-r from-[#F3DE8A] via-[#D4AF37] to-[#9C7918] border-[#7D600F] text-slate-950 shadow-md';
      case 'gold_solid':
        return 'bg-[#D4AF37] border-[#B38F24] text-slate-950 shadow-md';
      case 'solid':
        return 'bg-[#0A0E17] border-slate-800 text-slate-100';
      case 'elevated':
        return 'bg-[#0E1422] border-slate-800 text-slate-100';
      case 'match_sidebar':
        return getSidebarClasses();
      case 'glass':
      default:
        return 'bg-[#090D15]/95 border-slate-800 text-slate-100';
    }
  };

  // Dynamic open submenus state (only open the active one)
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [paletteDropdownOpen, setPaletteDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const paletteRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Mock Customer Notifications
  const [recentNotifications, setRecentNotifications] = useState([
    {
      id: 'N-1',
      title: 'Armored Vault Dispatch Out for Delivery',
      desc: 'Brink’s Secure Courier with 100g Valcambi Gold Bar is in transit. ETA: Today 14:30.',
      time: '20m ago',
      unread: true,
      href: '/dashboard/customer/orders/ORD-98301',
    },
    {
      id: 'N-2',
      title: 'Wishlist Gold Price Drop Alert',
      desc: '24K Pavé Royal Solitaire Ring dropped by €180 due to LBMA spot fix adjustment.',
      time: '2h ago',
      unread: true,
      href: '/dashboard/customer/wishlist',
    },
    {
      id: 'N-3',
      title: 'Digital Product Passport Minted',
      desc: 'On-chain certificate #DPP-88901 is now verified in your private gallery.',
      time: '1d ago',
      unread: false,
      href: '/dashboard/customer/passports',
    },
  ]);

  // Click Outside Hook
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setPaletteDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Exact Standard B2C Navigation Items (Simple, Clear & User-Friendly per Neos7 Gold Jakob Specification)
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard/customer',
    },
    {
      name: 'My Stored Metals',
      icon: Lock,
      subItems: [
        { name: 'All Stored Metals', href: '/dashboard/customer/vault' },
        { name: 'Gold Holdings (Au)', href: '/dashboard/customer/vault/gold' },
        { name: 'Silver Holdings (Ag)', href: '/dashboard/customer/vault/silver' },
        { name: 'Platinum Holdings (Pt)', href: '/dashboard/customer/vault/platinum' },
      ],
    },
    {
      name: 'Metal Deliveries',
      icon: Truck,
      subItems: [
        { name: 'All Delivery Requests', href: '/dashboard/customer/deliveries' },
        { name: 'In Transit', href: '/dashboard/customer/deliveries/in-transit' },
        { name: 'Delivered & Completed', href: '/dashboard/customer/deliveries/delivered' },
        { name: 'Request Home Delivery', href: '/dashboard/customer/deliveries/request' },
      ],
    },


   {
      name: 'Auctions',
      icon: Gavel,
      badge: 'BID',
      subItems: [
        { name: 'Browse Auctions', href: '/dashboard/customer/auctions' },
      ],
    },



    {
      name: 'Jewelry Orders',
      icon: Package,
      subItems: [
        { name: 'All Orders', href: '/dashboard/customer/orders' },
        { name: 'Processing Orders', href: '/dashboard/customer/orders/processing' },
        { name: 'Out for Delivery', href: '/dashboard/customer/orders/transit' },
        { name: 'Delivered & Completed', href: '/dashboard/customer/orders/completed' },
        { name: 'Tax Invoices & Receipts', href: '/dashboard/customer/invoices' },
      ],
    },
    {
      name: 'Returns & Refunds',
      href: '/dashboard/customer/returns',
      icon: RotateCcw,
    },
    {
      name: 'Wishlist & Price Alerts',
      icon: Heart,
      subItems: [
        { name: 'Wishlist', href: '/dashboard/customer/wishlist' },
        { name: 'Price Alerts', href: '/dashboard/customer/wishlist/alerts' },
      ],
    },
    // Extra B2B / Affiliate / Partner modules commented out per customer specification:
    // {
    //   name: 'Referrals',
    //   icon: Users,
    //   subItems: [
    //     { name: 'Invite Friends', href: '/dashboard/customer/referrals/invite' },
    //     { name: 'My Invitation Users list', href: '/dashboard/customer/referrals/users' },
    //     { name: 'My Network Tree', href: '/dashboard/customer/referrals/network' },
    //   ],
    // },
    // {
    //   name: 'Earning Report',
    //   icon: TrendingUp,
    //   subItems: [
    //     { name: 'Referral Earnings', href: '/dashboard/customer/earnings/referrals' },
    //     { name: 'NB7 Loyalty Tokens', href: '/dashboard/customer/earnings/tokens' },
    //   ],
    // },
    // {
    //   name: 'Withdraw',
    //   icon: Landmark,
    //   subItems: [
    //     { name: 'Cash Payout', href: '/dashboard/customer/withdraw/cash' },
    //     { name: 'NB7 Loyalty Tokens Redeem', href: '/dashboard/customer/withdraw/tokens' },
    //   ],
    // },
    {
      name: 'Sell My Gold & Scrap',
      icon: RotateCcw,
      subItems: [
        { name: 'New Sell Submission', href: '/dashboard/customer/buyback/new' },
        { name: 'All Sell Submissions', href: '/dashboard/customer/buyback' },
        { name: 'Kits in Transit', href: '/dashboard/customer/buyback/shipping' },
        { name: 'In Lab Assay & Testing', href: '/dashboard/customer/buyback/assay' },
        { name: 'Payout Settled & Credited', href: '/dashboard/customer/buyback/settled' },
      ],
    },
    {
      name: 'Digital Certificates (DPP)',
      icon: QrCode,
      subItems: [
        { name: 'My Digital Passports', href: '/dashboard/customer/passports' },
        { name: 'Verify Authenticity (QR)', href: '/dashboard/customer/passports/verify' },
      ],
    },
    {
      name: 'ID Verification & Limits',
      icon: ShieldCheck,
      subItems: [
        { name: 'My Verification Level', href: '/dashboard/customer/kyc' },
        { name: 'Increase Buying Limit', href: '/dashboard/customer/kyc/request' },
      ],
    },
    {
      name: 'Messages & Support',
      icon: MessageSquare,
      href: '/dashboard/customer/messages',
    },
    {
      name: 'Notifications',
      icon: Bell,
      href: '/dashboard/customer/notifications',
    },
    {
      name: 'Account Settings',
      icon: Settings,
      subItems: [
        { name: 'My Profile', href: '/dashboard/customer/profile' },
        { name: 'Payout Bank Accounts', href: '/dashboard/customer/settings/bank-accounts' },
        { name: 'Delivery Addresses', href: '/dashboard/customer/settings' },
        { name: 'Security (2FA)', href: '/dashboard/customer/settings/2fa' },
      ],
    },
    {
      name: 'Change Password',
      href: '/dashboard/customer/password',
      icon: KeyRound,
    },
    {
      name: 'Sign Out',
      icon: LogOut,
      onClick: () => logout(),
    },
  ];

  // Auto-expand only the parent menu containing the currently active page
  useEffect(() => {
    const newOpenState: Record<string, boolean> = {};

    navItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some((sub) => {
          const subBasePath = sub.href.split('?')[0];
          return pathname === subBasePath || (subBasePath !== '/dashboard/customer' && pathname.startsWith(subBasePath + '/'));
        });
        if (hasActiveChild) {
          newOpenState[item.name] = true;
        }
      }
    });

    setOpenSubMenus(newOpenState);
  }, [pathname]);

  return (
    <AuthGuard
      allowedRoles={['customer', 'super_admin']}
      loginUrl="/login/"
      portalName="Customer Vault & Depository Portal"
    >
      <div className="min-h-screen flex bg-[#F4F6FB] dark:bg-[#07090E] text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col border-r transition-all duration-300 lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          } ${getSidebarClasses()}`}
      >
        {/* Brand Header */}
        <div
          className={`h-16 px-4 ${getLogoHeaderClasses()} shrink-0 flex items-center justify-between transition-colors`}
        >
          <Link
            href="/dashboard/customer"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 group min-w-0"
          >
            {logoUrl ? (
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-500/20 bg-black/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img src={logoUrl} alt={siteName} className="w-full h-full object-contain p-0.5" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-[#D4AF37] to-amber-200 p-[1px] shadow-md shadow-amber-900/30 group-hover:scale-105 transition-transform shrink-0">
                <div
                  className={`w-full h-full ${themeConfig?.logoBgTheme === 'gold_gradient' || themeConfig?.logoBgTheme === 'gold_solid'
                    ? 'bg-black/90'
                    : theme === 'light'
                      ? 'bg-white'
                      : 'bg-[#0A101D]'
                    } rounded-[10px] flex items-center justify-center`}
                >
                  <Gem className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
            )}
            <div className="min-w-0">
              <span
                className={`text-sm font-bold tracking-wider ${themeConfig?.logoBgTheme === 'gold_gradient' || themeConfig?.logoBgTheme === 'gold_solid'
                  ? 'text-slate-950 font-black'
                  : 'gold-gradient-text'
                  } block leading-tight truncate`}
              >
                {siteName.toUpperCase()}
              </span>
              <span
                className={`text-[9px] tracking-widest ${themeConfig?.logoBgTheme === 'gold_gradient' || themeConfig?.logoBgTheme === 'gold_solid'
                  ? 'text-slate-900 font-bold'
                  : 'text-amber-500 font-semibold'
                  } uppercase flex items-center gap-1 truncate`}
              >
                <span>Private Client Vault</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Reference Vertical Menu List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item, itemIdx) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = Boolean(openSubMenus[item.name]);

            // Parent Active if exact match or any child matches
            const isParentOfActive = Boolean(
              hasSubItems &&
              item.subItems?.some((sub) => {
                const subBasePath = sub.href.split('?')[0];
                return pathname === subBasePath || (subBasePath !== '/dashboard/customer' && pathname.startsWith(subBasePath + '/'));
              })
            );

            // Single item active
            const itemBasePath = item.href?.split('?')[0];
            const isSingleActive =
              !hasSubItems &&
              item.href &&
              (pathname === itemBasePath || (itemBasePath !== '/dashboard/customer' && pathname.startsWith(itemBasePath + '/')));

            if (hasSubItems) {
              return (
                <div key={itemIdx} className="space-y-1">
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group ${isParentOfActive
                      ? isGoldSidebar
                        ? 'bg-[#0A0E17] text-[#D4AF37] font-bold shadow-md'
                        : 'text-[#D4AF37] font-semibold bg-amber-500/10'
                      : isGoldSidebar
                        ? 'text-[#181102] hover:text-black hover:bg-black/10 font-semibold'
                        : theme === 'light'
                          ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                          : 'text-slate-300 hover:text-white hover:bg-[#121A2C]'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${isParentOfActive
                          ? isGoldSidebar ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
                          : isGoldSidebar
                            ? 'text-[#2B2005] group-hover:text-black'
                            : theme === 'light'
                              ? 'text-slate-500 group-hover:text-slate-800'
                              : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${isGoldSidebar
                            ? 'bg-black/20 text-[#181102] border-black/30'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isOpen ? (
                        <ChevronDown
                          className={`w-3.5 h-3.5 ${isGoldSidebar
                            ? 'text-slate-800 group-hover:text-black'
                            : 'text-slate-500 group-hover:text-slate-400'
                            }`}
                        />
                      ) : (
                        <ChevronRight
                          className={`w-3.5 h-3.5 ${isGoldSidebar
                            ? 'text-slate-800 group-hover:text-black'
                            : 'text-slate-500 group-hover:text-slate-400'
                            }`}
                        />
                      )}
                    </div>
                  </button>

                  {/* Child Tree Accordion */}
                  {isOpen && (
                    <div
                      className={`pl-4 pr-1 py-1 space-y-1 border-l ml-5 transition-all ${isGoldSidebar
                        ? 'border-black/25'
                        : theme === 'light'
                          ? 'border-slate-200'
                          : 'border-[#1E293B]'
                        }`}
                    >
                      {item.subItems?.map((sub, subIdx) => {
                        const subBasePath = sub.href.split('?')[0];
                        const isChildActive =
                          pathname === subBasePath || (subBasePath !== '/dashboard/customer' && pathname.startsWith(subBasePath + '/'));

                        return (
                          <Link
                            key={subIdx}
                            href={sub.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all group ${isChildActive
                              ? isGoldSidebar
                                ? 'bg-[#0A0E17] text-[#D4AF37] font-bold shadow'
                                : theme === 'light'
                                  ? 'bg-amber-100/70 text-amber-800 font-bold'
                                  : 'bg-[#152033] text-[#D4AF37] font-bold'
                              : isGoldSidebar
                                ? 'text-[#241A04] hover:text-black hover:bg-black/10 font-medium'
                                : theme === 'light'
                                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#121A2C]/60'
                              }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Reference -o- Tree Node Bullet */}
                              <svg
                                className={`w-3.5 h-3.5 shrink-0 transition-opacity ${isChildActive
                                  ? isGoldSidebar
                                    ? 'text-[#D4AF37]'
                                    : 'text-[#D4AF37] opacity-100'
                                  : isGoldSidebar
                                    ? 'text-[#3D2C08] opacity-70'
                                    : 'text-slate-500 opacity-60 group-hover:opacity-100'
                                  }`}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M1 8H5M11 8H15"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="8"
                                  cy="8"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>

                              <span className="truncate">{sub.name}</span>
                            </div>

                            {sub.badge && (
                              <span
                                className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full ${isGoldSidebar
                                  ? 'bg-black/20 text-slate-950'
                                  : 'bg-amber-500/10 text-[#D4AF37] border border-amber-500/20'
                                  }`}
                              >
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Single Non-Accordion Nav Item
            if (item.onClick) {
              return (
                <button
                  key={itemIdx}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-red-500 hover:bg-red-500/10 cursor-pointer`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={itemIdx}
                href={item.href || '#'}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${isSingleActive
                  ? isGoldSidebar
                    ? 'bg-[#0A0E17] text-[#D4AF37] font-bold shadow-md'
                    : theme === 'light'
                      ? 'bg-amber-500/10 text-amber-800 font-bold border border-amber-300/60 shadow-sm'
                      : 'bg-amber-500/10 text-[#D4AF37] border border-amber-500/30 shadow-sm font-semibold'
                  : isGoldSidebar
                    ? 'text-[#181102] hover:text-black hover:bg-black/10 font-semibold'
                    : theme === 'light'
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-[#121A2C]'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${isSingleActive
                      ? isGoldSidebar
                        ? 'text-[#D4AF37]'
                        : 'text-[#D4AF37]'
                      : isGoldSidebar
                        ? 'text-[#2B2005] group-hover:text-black'
                        : theme === 'light'
                          ? 'text-slate-500 group-hover:text-slate-800'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${isGoldSidebar
                      ? 'bg-black/20 text-[#181102] border-black/30'
                      : 'bg-amber-500/10 text-[#D4AF37] border-amber-500/20'
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout at Bottom */}
        <div
          className={`p-3 border-t shrink-0 space-y-2 ${theme === 'light'
            ? 'border-slate-200 bg-slate-50/90'
            : 'border-slate-800/80 bg-[#070B12]'
            }`}
        >
          <div
            className={`w-full flex items-center justify-between p-2 rounded-xl ${theme === 'light'
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0E1524] border-[#1C283F] text-white'
              } border`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                {user?.name?.[0] || 'C'}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold truncate block">{user?.name || 'Private Client'}</span>
                <span className="text-[10px] text-amber-700 dark:text-[#D4AF37] font-semibold block uppercase">
                  Tier 2 Verified
                </span>
              </div>
            </div>
            <Link
              href="/dashboard/customer/profile"
              title="My Profile"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-500 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button> */}

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Navbar Header */}
        <header
          className={`sticky top-0 z-40 h-16 px-4 sm:px-6 border-b shrink-0 flex items-center justify-between gap-4 backdrop-blur-md transition-colors ${getHeaderClasses()}`}
        >
          {/* Left: Mobile Toggle & Global Search */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => {
                setOpenSubMenus({});
                setIsMobileOpen(true);
              }}
              className={`p-2 rounded-xl ${isGoldHeader
                ? 'bg-black/15 border-black/25 text-slate-950'
                : theme === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-[#0E131F] border-slate-800 text-slate-300'
                } border lg:hidden transition-colors cursor-pointer`}
            >
              <Menu className="w-5 h-5 text-[#D4AF37]" />
            </button>

            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, physical bars, certificates, passports..."
                className={`w-full pl-10 pr-4 py-2 ${isGoldHeader
                  ? 'bg-black/15 border-black/25 text-slate-950 placeholder-slate-800 font-medium'
                  : theme === 'light'
                    ? 'bg-slate-100/80 border-slate-200 text-slate-900 placeholder-slate-400'
                    : 'bg-[#0E131F] border-slate-800 text-slate-200 placeholder-slate-500'
                  } border rounded-xl text-xs focus:outline-none focus:border-[#D4AF37] transition-all`}
              />
            </div>

            {/* Live Spot Quick Ribbon */}
            <div
              className={`hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-xl ${isGoldHeader
                ? 'bg-black/15 border-black/25 text-slate-950 font-bold'
                : theme === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-[#0E131F] border-slate-800 text-slate-200'
                } border text-xs`}
            >
              <span
                className={`flex items-center gap-1.5 font-mono ${isGoldHeader
                  ? 'text-slate-950 font-bold'
                  : theme === 'light'
                    ? 'text-amber-800 font-bold'
                    : 'text-[#D4AF37] font-semibold'
                  }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Au: $2,748.20/oz</span>
              </span>
              <span
                className={`font-mono text-[11px] ${isGoldHeader ? 'text-slate-900' : 'text-slate-400'
                  }`}
              >
                Ag: $32.40
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vault Balance Quick Chip */}
            <Link
              href="/dashboard/customer/vault"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl ${isGoldHeader
                ? 'bg-black/20 text-slate-950 border border-black/30'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                } text-xs font-bold hover:brightness-110 transition-all`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>250.00g Au Vaulted</span>
            </Link>

            {/* Theme Studio Customizer Trigger Button */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              title="Open Theme Studio (Sidebar, Header, Logo & Colors)"
              className={`p-2 rounded-xl ${isGoldHeader
                ? 'bg-black/15 text-slate-950 hover:bg-black/25 border-black/25'
                : theme === 'light'
                  ? 'bg-slate-100 text-[#B8860B] hover:bg-slate-200 border-slate-200'
                  : 'bg-[#0E131F] text-[#D4AF37] hover:bg-slate-800 border-slate-800'
                } border transition-all cursor-pointer flex items-center justify-center`}
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-xl ${isGoldHeader
                ? 'bg-black/15 text-slate-950 hover:bg-black/25 border-black/25'
                : theme === 'light'
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  : 'bg-[#0E131F] text-slate-300 hover:bg-slate-800 border-slate-800'
                } border transition-all cursor-pointer`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setPaletteDropdownOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className={`p-2 rounded-xl ${isGoldHeader
                  ? 'bg-black/15 text-slate-950 hover:bg-black/25 border-black/25'
                  : theme === 'light'
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    : 'bg-[#0E131F] text-slate-300 hover:bg-slate-800 border-slate-800'
                  } border relative transition-all cursor-pointer`}
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5" />
              </button>

              {notifDropdownOpen && (
                <div
                  className={`fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-80 rounded-2xl ${theme === 'light'
                    ? 'bg-white border-slate-200 shadow-2xl'
                    : 'bg-[#0E131F] border-slate-800 shadow-2xl'
                    } border p-4 z-50 space-y-3`}
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Vault &amp; Order Alerts
                    </span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                      2 Unread
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {recentNotifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.href}
                        onClick={() => setNotifDropdownOpen(false)}
                        className={`block p-2.5 rounded-xl border text-xs transition-all ${notif.unread
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : theme === 'light'
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-[#090D15] border-slate-800/80'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {notif.desc}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-center">
                    <Link
                      href="/dashboard/customer/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-[11px] font-bold text-amber-700 dark:text-[#D4AF37] hover:underline"
                    >
                      Open Notification Center &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <LanguageSelector isGoldHeader={isGoldHeader} theme={theme} />

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setPaletteDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className={`flex items-center gap-2 p-1.5 rounded-xl ${isGoldHeader
                  ? 'hover:bg-black/15'
                  : theme === 'light'
                    ? 'hover:bg-slate-100'
                    : 'hover:bg-[#0E131F]'
                  } transition-all cursor-pointer`}
              >
                <div className="w-8 h-8 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
                  {user?.name?.[0] || 'C'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div
                  className={`fixed left-3 right-3 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-64 rounded-2xl ${theme === 'light'
                    ? 'bg-white border-slate-200 shadow-2xl'
                    : 'bg-[#0E131F] border-slate-800 shadow-2xl'
                    } border p-3 z-50 space-y-2`}
                >
                  <div className="p-2 border-b border-slate-800/80">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user?.name || 'Private Client'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">
                      {user?.email || 'client@neos7vault.com'}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-[#D4AF37]">
                      Private Depository Vault
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <Link
                      href="/dashboard/customer/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:bg-[#151D2C] hover:text-white'
                        } transition-all`}
                    >
                      <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      href="/dashboard/customer/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:bg-[#151D2C] hover:text-white'
                        } transition-all`}
                    >
                      <Settings className="w-4 h-4 text-[#D4AF37]" />
                      <span>Vault Addresses</span>
                    </Link>

                    <Link
                      href="/dashboard/customer/settings/2fa"
                      onClick={() => setProfileDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:bg-[#151D2C] hover:text-white'
                        } transition-all`}
                    >
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>2FA Security</span>
                    </Link>

                    <Link
                      href="/dashboard/customer/password"
                      onClick={() => setProfileDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'light'
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 hover:bg-[#151D2C] hover:text-white'
                        } transition-all`}
                    >
                      <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                      <span>Change Password</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Viewport Container (w-full Full area) */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-8 ${theme === 'light' ? 'bg-[#F4F6FB]' : 'bg-[#07090E]'
            }`}
        >
          <div className="w-full mx-auto">{children}</div>
        </main>
      </div>

      {/* Global Theme Customizer Drawer */}
      <ThemeCustomizerDrawer />
    </div>
    </AuthGuard>
  );
}
