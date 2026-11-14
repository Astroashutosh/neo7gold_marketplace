'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type PrimaryColor =
  | 'gold'
  | 'emerald'
  | 'sapphire'
  | 'ruby'
  | 'amethyst'
  | 'platinum'
  | 'cyan'
  | 'amber'
  | 'rosegold'
  | 'forest';

export type BaseTheme = 'dark' | 'light';

export type SidebarTheme = 'obsidian' | 'black' | 'navy' | 'forest' | 'slate' | 'white' | 'gold_gradient' | 'gold_solid';

export type HeaderTheme = 'glass' | 'solid' | 'elevated' | 'match_sidebar' | 'gold_gradient' | 'gold_solid';

export type LogoBgTheme =
  | 'match_sidebar'
  | 'gold_gradient'
  | 'gold_solid'
  | 'obsidian'
  | 'black'
  | 'navy'
  | 'forest'
  | 'ruby'
  | 'amethyst'
  | 'cyan'
  | 'slate'
  | 'white'
  | 'elevated';

export interface ThemeConfig {
  primaryColor: PrimaryColor;
  baseTheme: BaseTheme;
  sidebarTheme: SidebarTheme;
  headerTheme: HeaderTheme;
  logoBgTheme: LogoBgTheme;
}

export interface PrimaryColorMeta {
  id: PrimaryColor;
  name: string;
  hex: string;
  hoverHex: string;
  subtleRgba: string;
  borderRgba: string;
  textDark: string;
  description: string;
}

export const PRIMARY_COLOR_PRESETS: PrimaryColorMeta[] = [
  {
    id: 'gold',
    name: 'Royal Imperial Gold',
    hex: '#D4AF37',
    hoverHex: '#E5C158',
    subtleRgba: 'rgba(212, 175, 55, 0.12)',
    borderRgba: 'rgba(212, 175, 55, 0.28)',
    textDark: '#997B1E',
    description: 'Classic Bullion & Luxury Vault Standard',
  },
  {
    id: 'emerald',
    name: 'Rolex Emerald Green',
    hex: '#10B981',
    hoverHex: '#34D399',
    subtleRgba: 'rgba(16, 185, 129, 0.12)',
    borderRgba: 'rgba(16, 185, 129, 0.28)',
    textDark: '#047857',
    description: 'Swiss Precision & Wealth Aesthetics',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire Blue',
    hex: '#3B82F6',
    hoverHex: '#60A5FA',
    subtleRgba: 'rgba(59, 130, 246, 0.12)',
    borderRgba: 'rgba(59, 130, 246, 0.28)',
    textDark: '#1D4ED8',
    description: 'Institutional Banking & High-Trust Blue',
  },
  {
    id: 'ruby',
    name: 'Imperial Velvet Ruby',
    hex: '#EF4444',
    hoverHex: '#F87171',
    subtleRgba: 'rgba(239, 68, 68, 0.12)',
    borderRgba: 'rgba(239, 68, 68, 0.28)',
    textDark: '#B91C1C',
    description: 'Regal Crown Jewels & Precious Ruby',
  },
  {
    id: 'amethyst',
    name: 'Crown Amethyst Violet',
    hex: '#8B5CF6',
    hoverHex: '#A78BFA',
    subtleRgba: 'rgba(139, 92, 246, 0.12)',
    borderRgba: 'rgba(139, 92, 246, 0.28)',
    textDark: '#6D28D9',
    description: 'Sovereign Royalty & High-Value Tier',
  },
  {
    id: 'platinum',
    name: 'Platinum Diamond Titanium',
    hex: '#94A3B8',
    hoverHex: '#CBD5E1',
    subtleRgba: 'rgba(148, 163, 184, 0.12)',
    borderRgba: 'rgba(148, 163, 184, 0.28)',
    textDark: '#475569',
    description: 'Fine Diamond Assay & Industrial Platinum',
  },
  {
    id: 'cyan',
    name: 'Aquamarine Electric Cyan',
    hex: '#06B6D4',
    hoverHex: '#22D3EE',
    subtleRgba: 'rgba(6, 182, 212, 0.12)',
    borderRgba: 'rgba(6, 182, 212, 0.28)',
    textDark: '#0E7490',
    description: 'Modern Web3 Vault & Electric Cyan',
  },
  {
    id: 'amber',
    name: 'Sunset Bronze Amber',
    hex: '#F59E0B',
    hoverHex: '#FBBF24',
    subtleRgba: 'rgba(245, 158, 11, 0.12)',
    borderRgba: 'rgba(245, 158, 11, 0.28)',
    textDark: '#B45309',
    description: 'Warm Cast Bullion & Ingot Copper',
  },
  {
    id: 'rosegold',
    name: 'Haute Rose Gold Boutique',
    hex: '#F43F5E',
    hoverHex: '#FB7185',
    subtleRgba: 'rgba(244, 63, 94, 0.12)',
    borderRgba: 'rgba(244, 63, 94, 0.28)',
    textDark: '#BE123C',
    description: 'Fine Jewelry Atelier & 18k Rose Gold',
  },
  {
    id: 'forest',
    name: 'British Racing Green',
    hex: '#059669',
    hoverHex: '#10B981',
    subtleRgba: 'rgba(5, 150, 105, 0.12)',
    borderRgba: 'rgba(5, 150, 105, 0.28)',
    textDark: '#065F46',
    description: 'Deep Aristocratic Forest Green',
  },
];

export const SIDEBAR_THEMES = [
  { id: 'obsidian', name: 'Deep Obsidian', bg: '#0A0E17', border: '#161F33' },
  { id: 'gold_gradient', name: 'Imperial 24k Gold Ingot', bg: 'linear-gradient(180deg, #E6CA65 0%, #D4AF37 50%, #B38F24 100%)', border: '#997B1E' },
  { id: 'gold_solid', name: 'Brushed Pure Gold', bg: '#D4AF37', border: '#B8860B' },
  { id: 'black', name: 'Pitch Black OLED', bg: '#000000', border: '#1A1A1A' },
  { id: 'navy', name: 'Midnight Navy', bg: '#070E1E', border: '#12203D' },
  { id: 'forest', name: 'Deep Forest', bg: '#04120B', border: '#0A2617' },
  { id: 'slate', name: 'Executive Slate', bg: '#161F30', border: '#253552' },
  { id: 'white', name: 'Pure White', bg: '#FFFFFF', border: '#E2E8F0' },
];

export const HEADER_THEMES = [
  { id: 'glass', name: 'Frosted Glass', bg: 'rgba(10, 14, 23, 0.85)' },
  { id: 'gold_gradient', name: 'Imperial 24k Gold', bg: 'linear-gradient(90deg, #F3DE8A 0%, #D4AF37 50%, #9C7918 100%)' },
  { id: 'gold_solid', name: 'Brushed Pure Gold', bg: '#D4AF37' },
  { id: 'solid', name: 'Solid Midnight', bg: '#0A0E17' },
  { id: 'match_sidebar', name: 'Match Sidebar', bg: '#121A2C' },
  { id: 'elevated', name: 'Elevated Contrast', bg: '#0E1422' },
];

export const LOGO_BG_THEMES = [
  { id: 'match_sidebar', name: 'Match Sidebar (Default)', bg: 'transparent', border: '#161F33' },
  { id: 'gold_gradient', name: 'Imperial 24k Gold', bg: 'linear-gradient(135deg, #F3DE8A 0%, #D4AF37 50%, #9C7918 100%)', border: '#B38F24' },
  { id: 'gold_solid', name: 'Brushed Pure Gold', bg: '#D4AF37', border: '#B8860B' },
  { id: 'obsidian', name: 'Deep Obsidian', bg: '#0A0E17', border: '#161F33' },
  { id: 'black', name: 'Pitch Black OLED', bg: '#000000', border: '#1F293D' },
  { id: 'navy', name: 'Midnight Sapphire Navy', bg: '#070E1E', border: '#12203D' },
  { id: 'forest', name: 'Deep Emerald Forest', bg: '#04180F', border: '#064E3B' },
  { id: 'ruby', name: 'Imperial Velvet Ruby', bg: '#1A060A', border: '#881337' },
  { id: 'amethyst', name: 'Royal Sovereign Violet', bg: '#130A24', border: '#581C87' },
  { id: 'cyan', name: 'Aquamarine Web3 Cyan', bg: '#061822', border: '#0E7490' },
  { id: 'slate', name: 'Executive Slate', bg: '#161F30', border: '#253552' },
  { id: 'white', name: 'Pure White Luxury', bg: '#FFFFFF', border: '#E2E8F0' },
  { id: 'elevated', name: 'Frosted Glass Contrast', bg: '#151D2C', border: 'rgba(212, 175, 55, 0.25)' },
];

const DEFAULT_CONFIG: ThemeConfig = {
  primaryColor: 'gold',
  baseTheme: 'dark',
  sidebarTheme: 'obsidian',
  headerTheme: 'glass',
  logoBgTheme: 'match_sidebar',
};

interface ThemeContextType {
  theme: BaseTheme; // for backwards compatibility
  themeConfig: ThemeConfig;
  setPrimaryColor: (color: PrimaryColor) => void;
  setBaseTheme: (base: BaseTheme) => void;
  setSidebarTheme: (sidebar: SidebarTheme) => void;
  setHeaderTheme: (header: HeaderTheme) => void;
  setLogoBgTheme: (logoBg: LogoBgTheme) => void;
  toggleTheme: () => void;
  resetThemeConfig: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('neos7_theme_engine_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedConfig = { ...DEFAULT_CONFIG, ...parsed };
        setThemeConfig(mergedConfig);
        applyThemeToDOM(mergedConfig);
      } else {
        applyThemeToDOM(DEFAULT_CONFIG);
      }
    } catch {
      applyThemeToDOM(DEFAULT_CONFIG);
    }
  }, []);

  const applyThemeToDOM = (config: ThemeConfig) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 1. Base Theme Mode (dark / light)
    if (config.baseTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }

    // 2. Primary Color Tokens Injection
    const colorMeta =
      PRIMARY_COLOR_PRESETS.find((c) => c.id === config.primaryColor) ||
      PRIMARY_COLOR_PRESETS[0];

    root.style.setProperty('--color-primary', colorMeta.hex);
    root.style.setProperty('--color-primary-hover', colorMeta.hoverHex);
    root.style.setProperty('--color-primary-subtle', colorMeta.subtleRgba);
    root.style.setProperty('--color-primary-border', colorMeta.borderRgba);
    root.style.setProperty('--color-gold-dark', colorMeta.textDark);
    root.style.setProperty('--text-brand', colorMeta.hex);
    root.style.setProperty('--shadow-gold', `0 0 20px ${colorMeta.subtleRgba}`);

    // Set dataset for CSS targeting
    root.setAttribute('data-primary', config.primaryColor);
    root.setAttribute('data-sidebar', config.sidebarTheme);
    root.setAttribute('data-header', config.headerTheme);
    root.setAttribute('data-logo', config.logoBgTheme || 'match_sidebar');
  };

  const updateConfig = (newConfig: ThemeConfig) => {
    setThemeConfig(newConfig);
    try {
      localStorage.setItem('neos7_theme_engine_v2', JSON.stringify(newConfig));
    } catch {}
    applyThemeToDOM(newConfig);
  };

  const setPrimaryColor = (primaryColor: PrimaryColor) => {
    updateConfig({ ...themeConfig, primaryColor });
  };

  const setBaseTheme = (baseTheme: BaseTheme) => {
    const sidebarTheme = baseTheme === 'light' ? 'white' : themeConfig.sidebarTheme === 'white' ? 'obsidian' : themeConfig.sidebarTheme;
    updateConfig({ ...themeConfig, baseTheme, sidebarTheme });
  };

  const setSidebarTheme = (sidebarTheme: SidebarTheme) => {
    updateConfig({ ...themeConfig, sidebarTheme });
  };

  const setHeaderTheme = (headerTheme: HeaderTheme) => {
    updateConfig({ ...themeConfig, headerTheme });
  };

  const setLogoBgTheme = (logoBgTheme: LogoBgTheme) => {
    updateConfig({ ...themeConfig, logoBgTheme });
  };

  const toggleTheme = () => {
    const nextBase = themeConfig.baseTheme === 'dark' ? 'light' : 'dark';
    setBaseTheme(nextBase);
  };

  const resetThemeConfig = () => {
    updateConfig(DEFAULT_CONFIG);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeConfig.baseTheme,
        themeConfig,
        setPrimaryColor,
        setBaseTheme,
        setSidebarTheme,
        setHeaderTheme,
        setLogoBgTheme,
        toggleTheme,
        resetThemeConfig,
        isCustomizerOpen,
        setIsCustomizerOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
