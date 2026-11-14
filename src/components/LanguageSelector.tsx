'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

// Crisp vector national flag components (immune to OS emoji limitations)
function UKFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="12" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

function GermanyFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="60" height="13.33" fill="#000000" />
      <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
      <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
    </svg>
  );
}

function FranceFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="20" height="40" fill="#002654" />
      <rect x="20" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" width="20" height="40" fill="#CE1126" />
    </svg>
  );
}

function ItalyFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="20" height="40" fill="#009246" />
      <rect x="20" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" width="20" height="40" fill="#CE2B37" />
    </svg>
  );
}

function SpainFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="60" height="10" fill="#AA151B" />
      <rect y="10" width="60" height="20" fill="#F1BF00" />
      <rect y="30" width="60" height="10" fill="#AA151B" />
      <circle cx="18" cy="20" r="3.5" fill="#AA151B" opacity="0.85" />
    </svg>
  );
}

function UAEFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="60" height="13.33" fill="#00732F" />
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.66" width="60" height="13.34" fill="#000000" />
      <rect width="16" height="40" fill="#FF0000" />
    </svg>
  );
}

function IndiaFlag({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[3px] overflow-hidden shadow-sm shrink-0 border border-slate-700/40`} viewBox="0 0 60 40" fill="none">
      <rect width="60" height="13.33" fill="#FF9933" />
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.66" width="60" height="13.34" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="30" cy="20" r="5" stroke="#000080" strokeWidth="1.2" fill="none" />
      <circle cx="30" cy="20" r="1.5" fill="#000080" />
      <path d="M30 15V25M25 20H35M26.46 16.46L33.54 23.54M26.46 23.54L33.54 16.46" stroke="#000080" strokeWidth="0.8" />
    </svg>
  );
}


export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'EN',
    name: 'English',
    nativeName: 'English',
    region: 'UK & Global',
    FlagComponent: UKFlag,
  },
  {
    code: 'DE',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'DACH / Schweiz',
    FlagComponent: GermanyFlag,
  },
  {
    code: 'FR',
    name: 'French',
    nativeName: 'Français',
    region: 'Suisse / France',
    FlagComponent: FranceFlag,
  },
  {
    code: 'IT',
    name: 'Italian',
    nativeName: 'Italiano',
    region: 'Ticino / Italia',
    FlagComponent: ItalyFlag,
  },
  {
    code: 'ES',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'España / LatAm',
    FlagComponent: SpainFlag,
  },
  {
    code: 'AR',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Dubai / Gulf Bullion',
    FlagComponent: UAEFlag,
  },
  {
    code: 'HI',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'India',
    FlagComponent: IndiaFlag,
  },
];

interface LanguageSelectorProps {
  isGoldHeader?: boolean;
  theme?: 'light' | 'dark' | string;
  align?: 'left' | 'right';
}

export default function LanguageSelector({
  isGoldHeader = false,
  theme = 'dark',
  align = 'right',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState('EN');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Check cookies for active translation
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
      if (match && match[1]) {
        const langCode = match[1].toUpperCase();
        if (LANGUAGES.some((l) => l.code === langCode)) {
          setSelectedCode(langCode);
          return;
        }
      }

      const saved = localStorage.getItem('neos_preferred_lang');
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setSelectedCode(saved);
      }
    } catch {
      // localStorage not accessible
    }

    // Auto-sync select element if already loaded
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('neos_preferred_lang');
        if (saved && saved !== 'EN') {
          const target = saved.toLowerCase();
          const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
          if (selectElement && selectElement.value !== target) {
            selectElement.value = target;
            selectElement.dispatchEvent(new Event('change'));
          }
        }
      } catch {
        // ignore
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (code: string) => {
    setSelectedCode(code);
    setIsOpen(false);
    try {
      localStorage.setItem('neos_preferred_lang', code);
      const targetLang = code.toLowerCase();

      // Configure cookies for Google Translate across localhost, IP, and production domains
      const host = window.location.hostname;
      const isIpOrLocal = host === 'localhost' || host === '127.0.0.1' || /^(\d{1,3}\.){3}\d{1,3}$/.test(host);

      if (targetLang === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=/en/en; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/neos7gold_marketplace/;';
        document.cookie = 'googtrans=/en/en; path=/neos7gold_marketplace/;';
        if (!isIpOrLocal) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
          document.cookie = `googtrans=/en/en; path=/; domain=.${host};`;
        }
      } else {
        document.cookie = `googtrans=/en/${targetLang}; path=/;`;
        document.cookie = `googtrans=/en/${targetLang}; path=/neos7gold_marketplace/;`;
        if (!isIpOrLocal) {
          document.cookie = `googtrans=/en/${targetLang}; path=/; domain=.${host};`;
        }
      }

      // Try triggering direct change on hidden select combo if available
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Smooth page refresh to immediately apply translation across the entire dashboard
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === selectedCode) || LANGUAGES[0];
  const CurrentFlag = currentLang.FlagComponent;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        title={`Change Language (Current: ${currentLang.nativeName})`}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${isGoldHeader
          ? 'bg-black/15 text-slate-950 hover:bg-black/25 border-black/25'
          : theme === 'light'
            ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200 shadow-sm'
            : 'bg-[#0E131F] text-slate-200 hover:bg-slate-800 border-slate-800 shadow-sm'
          }`}
      >
        <CurrentFlag className="w-5 h-3.5" />
        <span className="text-xs font-bold font-mono tracking-wider">{currentLang.code}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            } ${isGoldHeader ? 'text-slate-950' : 'text-slate-400'}`}
        />
      </button>

      {isOpen && (
        <div
          className={`fixed left-3 right-3 top-16 sm:absolute sm:top-auto sm:mt-2 sm:w-64 rounded-2xl p-2.5 z-50 space-y-1 shadow-2xl border ${align === 'right' ? 'sm:left-auto sm:right-0' : 'sm:left-0 sm:right-auto'
            } ${theme === 'light'
              ? 'bg-white/95 border-slate-200 shadow-slate-300/50 backdrop-blur-xl'
              : 'bg-[#0D121D]/95 border-slate-800 shadow-black/80 backdrop-blur-xl'
            }`}
        >
          {/* Header */}
          <div
            className={`px-2.5 py-2 border-b flex items-center justify-between ${theme === 'light' ? 'border-slate-100' : 'border-slate-800/80'
              }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                  }`}
              >
                Select Language
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">6 Locales</span>
          </div>

          {/* Languages List */}
          <div className="space-y-0.5 pt-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === selectedCode;
              const Flag = lang.FlagComponent;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${isSelected
                    ? theme === 'light'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-900 font-bold'
                      : 'bg-amber-500/15 border border-amber-500/30 text-[#D4AF37] font-bold'
                    : theme === 'light'
                      ? 'hover:bg-slate-100 text-slate-700'
                      : 'hover:bg-[#151D2C] text-slate-300 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Flag className="w-6 h-4" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold truncate leading-tight">
                          {lang.nativeName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">({lang.code})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate leading-tight mt-0.5">
                        {lang.region}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
