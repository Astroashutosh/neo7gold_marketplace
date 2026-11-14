'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPublicSettings, getCategoryImageUrl } from '@/lib/api';

export interface SiteSettings {
  site_name?: string;
  tagline?: string;
  logo?: string;
  dashboard_logo?: string;
  marketplace_logo?: string;
  favicon?: string;
  currency?: string;
  currency_symbol?: string;
  company_legal_name?: string;
  registration_number?: string;
  tax_vat_number?: string;
  support_email?: string;
  compliance_email?: string;
  support_phone?: string;
  registered_address?: string;
  [key: string]: any;
}

interface SettingsContextType {
  settings: SiteSettings;
  siteName: string;
  tagline: string;
  logoUrl: string | null;
  dashboardLogoUrl: string | null;
  marketplaceLogoUrl: string | null;
  faviconUrl: string | null;
  currency: string;
  currencySymbol: string;
  formatPrice: (amount: number | string | null | undefined, options?: { showCode?: boolean; decimals?: number }) => string;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  site_name: 'Neos7 Gold',
  tagline: 'Institutional Precious Metals & Fine Jewelry Marketplace',
  currency: 'EUR',
  currency_symbol: '€',
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  siteName: 'Neos7 Gold',
  tagline: 'Institutional Precious Metals & Fine Jewelry Marketplace',
  logoUrl: null,
  dashboardLogoUrl: null,
  marketplaceLogoUrl: null,
  faviconUrl: null,
  currency: 'EUR',
  currencySymbol: '€',
  formatPrice: (val) => `€${Number(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
  isLoading: true,
  refreshSettings: async () => {},
});

export function updateDynamicFavicon(favUrl: string) {
  if (typeof document === 'undefined' || !favUrl) return;

  try {
    const existing = document.querySelectorAll("link[rel*='icon']") as NodeListOf<HTMLLinkElement>;
    if (existing.length > 0) {
      existing.forEach((el) => {
        el.href = favUrl;
      });
    } else {
      const link = document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';
      link.href = favUrl;
      document.head.appendChild(link);
    }
  } catch (e) {
    console.warn('Could not update dynamic favicon:', e);
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetchPublicSettings();
      if (res && res.success && res.data?.settings) {
        const fetched = res.data.settings;
        setSettings((prev) => ({
          ...prev,
          ...fetched,
        }));

        // Dynamically update favicon in document head
        if (fetched.favicon) {
          const favUrl = getCategoryImageUrl(fetched.favicon);
          updateDynamicFavicon(favUrl);
        }
      }
    } catch (err) {
      console.warn('Could not load global site settings, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const siteName = settings.site_name || 'Neos7 Gold';
  const tagline = settings.tagline || 'Institutional Precious Metals & Fine Jewelry Marketplace';
  
  // Dashboard logo takes priority for sidebar top-left, with fallback to main logo
  const dashboardLogoUrl = settings.dashboard_logo
    ? getCategoryImageUrl(settings.dashboard_logo)
    : settings.logo
    ? getCategoryImageUrl(settings.logo)
    : null;

  // Main Marketplace logo
  const marketplaceLogoUrl = settings.marketplace_logo
    ? getCategoryImageUrl(settings.marketplace_logo)
    : settings.logo
    ? getCategoryImageUrl(settings.logo)
    : null;

  const logoUrl = dashboardLogoUrl || marketplaceLogoUrl;
  const faviconUrl = settings.favicon ? getCategoryImageUrl(settings.favicon) : null;
  const currency = settings.currency || 'EUR';
  const currencySymbol = settings.currency_symbol || '€';

  const formatPrice = useCallback(
    (amount: number | string | null | undefined, options?: { showCode?: boolean; decimals?: number }) => {
      const num = typeof amount === 'string' ? parseFloat(amount) : Number(amount || 0);
      const dec = options?.decimals !== undefined ? options.decimals : 2;
      const formattedNumber = isNaN(num) ? '0.00' : num.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
      
      if (options?.showCode) {
        return `${currencySymbol}${formattedNumber} ${currency}`;
      }
      return `${currencySymbol}${formattedNumber}`;
    },
    [currency, currencySymbol]
  );

  return (
    <SettingsContext.Provider
      value={{
        settings,
        siteName,
        tagline,
        logoUrl,
        dashboardLogoUrl,
        marketplaceLogoUrl,
        faviconUrl,
        currency,
        currencySymbol,
        formatPrice,
        isLoading,
        refreshSettings: loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
