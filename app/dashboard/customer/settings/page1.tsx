'use client';

import { useEffect, useState } from 'react';

import {
  fetchCustomerSettings,
  updateCustomerSettings,
} from '@/lib/api';
import Link from 'next/link';
import {
  Settings,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Globe,
  Bell,
  ShieldCheck,
  Building,
  Lock,
  KeyRound,
  Landmark
} from 'lucide-react';

interface DeliveryAddress {
  id: string;
  label: string;
  recipientName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function CustomerSettingsPage() {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([
    {
      id: 'ADDR-1',
      label: 'Primary Residence (Zurich)',
      recipientName: 'Dr. Alexander von Bern',
      street: 'Bahnhofstrasse 45',
      city: 'Zurich',
      postalCode: '8001',
      country: 'Switzerland (CHE)',
      phone: '+41 44 211 88 00',
      isDefault: true,
    },
    {
      id: 'ADDR-2',
      label: 'Geneva Private Depository Residence',
      recipientName: 'Dr. Alexander von Bern',
      street: 'Rue du Rhône 14',
      city: 'Geneva',
      postalCode: '1204',
      country: 'Switzerland (CHE)',
      phone: '+41 22 819 90 20',
      isDefault: false,
    },
  ]);

  const [preferredCurrency, setPreferredCurrency] = useState('EUR (€)');
  const [emailDigest, setEmailDigest] = useState(true);
  const [spotPriceAlerts, setSpotPriceAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await updateCustomerSettings({
      addresses: addresses.map((addr) => ({
        id: addr.id,
        label: addr.label,
        recipient_name: addr.recipientName,
        street: addr.street,
        city: addr.city,
        postal_code: addr.postalCode,
        country: addr.country,
        phone: addr.phone,
        is_default: addr.isDefault,
      })),

      preferences: {
        preferred_currency: preferredCurrency,
        email_digest: emailDigest,
        spot_price_alerts: spotPriceAlerts,
      },
    });

    if (response.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  } catch (error: any) {
    alert(error.message);
  }
};



useEffect(() => {
  const loadSettings = async () => {
    try {
      const response = await fetchCustomerSettings();

      if (response.success && response.data) {
        const data = response.data;

        setAddresses(
          data.addresses.map((addr) => ({
            id: addr.id,
            label: addr.label,
            recipientName: addr.recipient_name,
            street: addr.street,
            city: addr.city,
            postalCode: addr.postal_code,
            country: addr.country,
            phone: addr.phone,
            isDefault: addr.is_default,
          }))
        );

        setPreferredCurrency(
          data.preferences.preferred_currency || 'EUR (€)'
        );

        setEmailDigest(data.preferences.email_digest ?? true);
        setSpotPriceAlerts(data.preferences.spot_price_alerts ?? true);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  loadSettings();
}, []);


  return (
    <div className="space-y-6 w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Preferences &amp; Logistics
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Vault Delivery Endpoints
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vault Delivery Addresses &amp; Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Manage your verified destinations for armored bullion couriers, currency display, and market notifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer/settings/bank-accounts"
            className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all flex items-center gap-1.5"
          >
            <Landmark className="w-4 h-4" />
            <span>Payout Bank Accounts (IBAN)</span>
          </Link>
          <Link
            href="/dashboard/customer/settings/2fa"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>2FA Security</span>
          </Link>
          <Link
            href="/dashboard/customer/password"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-4 h-4 text-[#D4AF37]" />
            <span>Password</span>
          </Link>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Delivery addresses and preferences saved successfully!</span>
        </div>
      )}

      {/* Main Settings Body */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Armored Delivery Addresses */}
        <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Verified Armored Delivery Addresses</span>
              </h3>
              <p className="text-xs text-slate-500">
                Addresses pre-screened for Brink&apos;s and Ferrari Group armored vehicle access.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Add new verified address dialog...')}
              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Default Destination
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{addr.recipientName}</p>
                  <p>{addr.street}</p>
                  <p>
                    {addr.postalCode} {addr.city}, {addr.country}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500 pt-1">Tel: {addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Currency & Notification Preferences */}
        <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>Valuation Currency &amp; Market Alerts</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Primary Vault Display Currency
              </label>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="EUR (€)">EUR (€) — Euro</option>
                <option value="CHF (Fr.)">CHF (Fr.) — Swiss Franc</option>
                <option value="USD ($)">USD ($) — US Dollar</option>
                <option value="GBP (£)">GBP (£) — British Pound</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37]"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Receive Weekly Depository Valuation &amp; Audit Digest
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={spotPriceAlerts}
                  onChange={(e) => setSpotPriceAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D4AF37]"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Receive Real-Time LBMA Gold Spot Price Drop Alerts
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
