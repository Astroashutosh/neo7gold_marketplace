'use client';

import React from 'react';
import {
  Palette,
  X,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Sparkles,
  Layout,
  Sliders,
  Eye,
  ShieldCheck
} from 'lucide-react';
import {
  useTheme,
  PRIMARY_COLOR_PRESETS,
  SIDEBAR_THEMES,
  HEADER_THEMES,
  LOGO_BG_THEMES,
  PrimaryColor,
  SidebarTheme,
  HeaderTheme,
  LogoBgTheme,
  BaseTheme
} from '@/context/ThemeContext';

export function ThemeCustomizerDrawer() {
  const {
    themeConfig,
    setPrimaryColor,
    setBaseTheme,
    setSidebarTheme,
    setHeaderTheme,
    setLogoBgTheme,
    resetThemeConfig,
    isCustomizerOpen,
    setIsCustomizerOpen,
  } = useTheme();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCustomizerOpen(false)}
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex pl-10">
        <div className="w-full luxury-glass border-l border-slate-800 bg-[#0A0E17]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37]">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Theme & Appearance Studio</h3>
                <p className="text-xs text-slate-400">Customize primary accent, sidebar, header & theme</p>
              </div>
            </div>

            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-8 flex-1">
            {/* 1. Base Theme Mode (Dark vs Light) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Base Theme Mode</span>
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold capitalize">
                  {themeConfig.baseTheme} Mode
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBaseTheme('dark')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    themeConfig.baseTheme === 'dark'
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-md'
                      : 'bg-[#0E131F] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-xs font-bold block">Obsidian Dark</span>
                      <span className="text-[10px] text-slate-400">Midnight Luxury</span>
                    </div>
                  </div>
                  {themeConfig.baseTheme === 'dark' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setBaseTheme('light')}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    themeConfig.baseTheme === 'light'
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-md'
                      : 'bg-[#0E131F] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold block">Swiss Light</span>
                      <span className="text-[10px] text-slate-400">Banking Clean</span>
                    </div>
                  </div>
                  {themeConfig.baseTheme === 'light' && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              </div>
            </div>

            {/* 2. Primary Brand Color (10 Color Options) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Primary Accent Color (10 Luxury Presets)</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {PRIMARY_COLOR_PRESETS.map((preset) => {
                  const isSelected = themeConfig.primaryColor === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setPrimaryColor(preset.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-white/5 border-amber-500/40 shadow-sm'
                          : 'bg-[#0E131F] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Color Circle Swatch */}
                      <div
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center shadow-inner"
                        style={{ backgroundColor: preset.hex }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-black font-extrabold" />}
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {preset.hex}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Sidebar Background Color Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Layout className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sidebar Surface Style</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SIDEBAR_THEMES.map((st) => {
                  const isSelected = themeConfig.sidebarTheme === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSidebarTheme(st.id as SidebarTheme)}
                      className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-slate-800 bg-[#0E131F] hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 border border-slate-700/50"
                        style={{ background: st.bg }}
                      />
                      <span className="text-[10px] font-bold text-slate-200 block truncate">
                        {st.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Top Header Surface Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#D4AF37]" />
                  <span>Top Header Surface</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {HEADER_THEMES.map((ht) => {
                  const isSelected = themeConfig.headerTheme === ht.id;
                  return (
                    <button
                      key={ht.id}
                      type="button"
                      onClick={() => setHeaderTheme(ht.id as HeaderTheme)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/40 text-white'
                          : 'bg-[#0E131F] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-slate-700/60 shrink-0"
                          style={{ background: ht.bg || '#1E293B' }}
                        />
                        <span className="text-xs font-bold text-slate-200 truncate">{ht.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Logo & Brand Header Surface Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Logo & Brand Header Surface</span>
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">13 Styles</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {LOGO_BG_THEMES.map((lt) => {
                  const isSelected = (themeConfig.logoBgTheme || 'match_sidebar') === lt.id;
                  return (
                    <button
                      key={lt.id}
                      type="button"
                      onClick={() => setLogoBgTheme(lt.id as LogoBgTheme)}
                      className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-slate-800 bg-[#0E131F] hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-full h-5 rounded-md mb-1.5 border border-slate-700/50 flex items-center justify-center text-[9px] font-extrabold"
                        style={{
                          background: lt.bg === 'transparent' ? '#0A0E17' : lt.bg,
                          borderColor: lt.border,
                        }}
                      />
                      <span className="text-[10px] font-bold text-slate-200 block truncate">
                        {lt.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-[#080B12]">
            <button
              type="button"
              onClick={resetThemeConfig}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCustomizerOpen(false)}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs hover:opacity-95 shadow-md cursor-pointer transition-all"
            >
              Apply & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
