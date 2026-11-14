'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  TrendingDown,
  Sparkles,
  ShoppingBag,
  Trash2,
  Bell,
  CheckCircle2,
  ExternalLink,
  Coins,
  Gem,
  Lock,
  ArrowRight,
  Plus,
  LayoutGrid,
  Table as TableIcon,
  Search,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

interface WishlistItem {
  id: string;
  title: string;
  atelier: string;
  category: string;
  metalSpecs: string;
  gemSpecs: string;
  initialPrice: number;
  currentPrice: number;
  priceDrop: number;
  inStock: boolean;
  alertEnabled: boolean;
  targetPriceAlert?: number;
}

export default function CustomerWishlistPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedCartId, setAddedCartId] = useState<string | null>(null);

  const [items, setItems] = useState<WishlistItem[]>([
    {
      id: 'WISH-01',
      title: '24K Yellow Gold Royal Pavé Solitaire Ring',
      atelier: 'Maison NEOS7 High Jewelry Atelier',
      category: 'Bespoke Diamond Ring',
      metalSpecs: '14.50g 24K Pure Gold (999.9)',
      gemSpecs: '1.50ct Cushion Cut D-IF Diamond (GIA)',
      initialPrice: 16800.0,
      currentPrice: 16250.0,
      priceDrop: 550.0,
      inStock: true,
      alertEnabled: true,
      targetPriceAlert: 15800.0,
    },
    {
      id: 'WISH-02',
      title: '18K White Gold Emerald Cut Diamond Tennis Choker',
      atelier: 'Geneva Haute Joaillerie Studio',
      category: 'Fine Jewelry Atelier',
      metalSpecs: '32.00g 18K White Gold (750)',
      gemSpecs: '12.80ct Total Emerald Diamonds (VVS1)',
      initialPrice: 28500.0,
      currentPrice: 27900.0,
      priceDrop: 600.0,
      inStock: true,
      alertEnabled: true,
      targetPriceAlert: 27000.0,
    },
    {
      id: 'WISH-03',
      title: 'Valcambi 100g Minted Gold Bar (CombiBar 100x1g)',
      atelier: 'Valcambi Direct SA',
      category: 'Investment Bullion',
      metalSpecs: '100.00g 999.9 Fine Gold',
      gemSpecs: 'Serialized Mint Assay Blister Card',
      initialPrice: 9100.0,
      currentPrice: 8980.0,
      priceDrop: 120.0,
      inStock: true,
      alertEnabled: false,
    },
    {
      id: 'WISH-04',
      title: 'Argor-Heraeus 500g Fine Silver Cast Ingot',
      atelier: 'Argor-Heraeus Depository',
      category: 'Investment Bullion',
      metalSpecs: '500.00g 999.0 Fine Silver',
      gemSpecs: 'Bonded Freezone Duty-Free Ingot',
      initialPrice: 540.0,
      currentPrice: 520.0,
      priceDrop: 20.0,
      inStock: true,
      alertEnabled: true,
      targetPriceAlert: 500.0,
    },
  ]);

  const toggleAlert = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInstantBuy = (id: string) => {
    setAddedCartId(id);
    setTimeout(() => setAddedCartId(null), 2500);
  };

  const totalValue = items.reduce((sum, item) => sum + item.currentPrice, 0);
  const totalSavings = items.reduce((sum, item) => sum + item.priceDrop, 0);
  const activeAlertsCount = items.filter((i) => i.alertEnabled).length;

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.atelier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Private Curation &amp; Saved Pieces
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live LBMA Spot Price Sync
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>My Wishlist</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Personal vault of curated fine jewelry masterworks and investment bars with live spot market price tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/wishlist/alerts"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Bell className="w-4 h-4" />
            <span>Manage Price Alerts ({activeAlertsCount})</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Total Curated Pieces</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">
            {items.length} Items Saved
          </span>
          <span className="text-[11px] text-amber-600 dark:text-[#D4AF37] font-bold block mt-1">
            €{totalValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} Total Value
          </span>
        </div>

        <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md">
          <span className="text-xs font-semibold text-slate-500 block">Live Price Drops Detected</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
            -€{totalSavings.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Across 4 tracked items since added
          </span>
        </div>

        <Link
          href="/dashboard/customer/wishlist/alerts"
          className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md hover:border-amber-500/50 transition-all group block"
        >
          <span className="text-xs font-semibold text-slate-500 block group-hover:text-amber-500 transition-colors">
            Active Spot Price Alerts
          </span>
          <span className="text-2xl font-black text-amber-700 dark:text-[#D4AF37] font-mono mt-1 block">
            {activeAlertsCount} Triggers Active
          </span>
          <span className="text-[11px] text-slate-500 block mt-1 flex items-center gap-1">
            <span>Configure target price triggers</span>
            <ArrowRight className="w-3 h-3 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* 3. Search & View Mode Switcher */}
      <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved pieces, metals, ateliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Table Ledger View"
            >
              <TableIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Table View */}
      {viewMode === 'table' && (
        <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Saved Wishlist Items ({filteredItems.length})
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Live Price Tracking Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Item &amp; Atelier</th>
                  <th className="py-3.5 px-4">Specifications</th>
                  <th className="py-3.5 px-4">Current Price</th>
                  <th className="py-3.5 px-4">Price Drop</th>
                  <th className="py-3.5 px-4">Price Alert</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors group"
                  >
                    {/* Title & Atelier */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-md">
                          {item.category.includes('Ring') || item.category.includes('Jewelry') ? (
                            <Gem className="w-5 h-5" />
                          ) : (
                            <Coins className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block text-xs">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                            {item.atelier} · {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Specs */}
                    <td className="py-4 px-4">
                      <span className="text-slate-800 dark:text-slate-200 font-semibold block text-xs">
                        {item.metalSpecs}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {item.gemSpecs}
                      </span>
                    </td>

                    {/* Current Price */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-black text-slate-900 dark:text-white text-sm block">
                        {item.currentPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through font-mono block">
                        €{item.initialPrice.toLocaleString('de-DE')}
                      </span>
                    </td>

                    {/* Price Drop */}
                    <td className="py-4 px-4">
                      {item.priceDrop > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-mono">
                          <TrendingDown className="w-3 h-3" />
                          -€{item.priceDrop.toLocaleString('de-DE')}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>

                    {/* Price Alert Toggle */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => toggleAlert(item.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                          item.alertEnabled
                            ? 'bg-amber-500/15 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700'
                        }`}
                        title={item.alertEnabled ? 'Price alert active' : 'Click to enable alert'}
                      >
                        <Bell className={`w-3.5 h-3.5 ${item.alertEnabled ? 'fill-current' : ''}`} />
                        <span>{item.alertEnabled ? 'Alert Active' : 'Set Alert'}</span>
                      </button>
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>In Atelier Stock</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleInstantBuy(item.id)}
                          className="px-3 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{addedCartId === item.id ? 'Reserved!' : 'Buy / Allocate'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="luxury-glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-[#D4AF37] font-mono">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleAlert(item.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        item.alertEnabled
                          ? 'text-amber-500 bg-amber-500/10'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Toggle Price Drop Alert"
                    >
                      <Bell className={`w-3.5 h-3.5 ${item.alertEnabled ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="py-3 space-y-1">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.atelier}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.metalSpecs}
                  </div>
                  <div className="text-slate-500 text-[11px]">{item.gemSpecs}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono block">
                    {item.currentPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </span>
                  {item.priceDrop > 0 && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-0.5">
                      <TrendingDown className="w-2.5 h-2.5" />
                      Save €{item.priceDrop.toLocaleString('de-DE')}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleInstantBuy(item.id)}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{addedCartId === item.id ? 'Reserved!' : 'Allocate'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
