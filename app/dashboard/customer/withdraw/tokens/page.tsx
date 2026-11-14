'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Gift,
  Coins,
  ArrowRightLeft,
  Landmark,
  Layers,
  Award
} from 'lucide-react';

export default function NB7TokensRedeemPage() {
  const [tokenBalance, setTokenBalance] = useState(12450);
  const [tokensToRedeem, setTokensToRedeem] = useState(5000);
  const [redeemOption, setRedeemOption] = useState<'vault_gold' | 'cash_wire'>('vault_gold');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const tokenRateEur = 0.50; // €0.50 per NB7 token
  const estimatedEurValue = tokensToRedeem * tokenRateEur;
  const estimatedGramsGold = (estimatedEurValue / 88.36).toFixed(2); // At €88.36/g 24K Gold

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokensToRedeem > tokenBalance) return;
    setIsRedeeming(true);
    setTimeout(() => {
      setIsRedeeming(false);
      setRedeemSuccess(true);
      setTokenBalance((prev) => prev - tokensToRedeem);
      setTimeout(() => setRedeemSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/withdraw/cash"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cash Payout</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider font-mono">
              Loyalty Token Settlement
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Convert NB7 to Real Physical Gold or Bank Wire
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span>NB7 Loyalty Tokens Redeem</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Redeem accumulated NB7 loyalty rewards for physical LBMA 999.9 gold bullion in your safe deposit unit or execute an instant SEPA wire payout.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/earnings/tokens"
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Coins className="w-4 h-4 text-purple-500" />
            <span>Token Earnings Report</span>
          </Link>
        </div>
      </div>

      {redeemSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
          <span>
            {redeemOption === 'vault_gold'
              ? `Successfully converted ${tokensToRedeem.toLocaleString()} NB7 Tokens into ${estimatedGramsGold}g of 999.9 Fine Gold in your Zurich Safe!`
              : `Successfully executed €${estimatedEurValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} wire to your primary Swiss IBAN!`}
          </span>
        </div>
      )}

      {/* 2. Top Token Overview & Convert Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Token Balance Card */}
        <div className="luxury-glass p-7 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#140D24] to-[#080710] text-center space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="w-40 h-40 rounded-full bg-purple-500/10 blur-3xl absolute -top-10 -right-10 pointer-events-none" />

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-purple-400">
              Total Accumulated Balance
            </span>
            <div className="w-20 h-20 rounded-3xl gold-gradient-bg mx-auto flex items-center justify-center font-black text-slate-950 text-2xl shadow-xl">
              NB7
            </div>
            <h2 className="text-3xl font-black text-white font-mono">
              {tokenBalance.toLocaleString()} <span className="text-xs text-purple-400 font-normal">NB7</span>
            </h2>
            <span className="text-xs text-emerald-400 font-mono font-bold block">
              ≈ €{(tokenBalance * tokenRateEur).toLocaleString('de-DE', { minimumFractionDigits: 2 })} Gold Equivalent
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Tier Status:</span>
              <span className="text-purple-400 font-bold">Gold Staker Level</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-500">Spot Discount:</span>
              <span className="text-emerald-400 font-bold">-1.20% on LBMA Margin</span>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: 1-Click Token Redemption Terminal */}
        <div className="lg:col-span-2 luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#D4AF37]" />
              <span>Redeem NB7 Tokens for Physical Gold or Bank Cash</span>
            </h3>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Instant Execution
            </span>
          </div>

          <form onSubmit={handleRedeem} className="space-y-4 text-xs">
            {/* Amount to Redeem Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Select Tokens to Redeem:
                </label>
                <span className="font-mono font-black text-purple-600 dark:text-purple-400 text-sm">
                  {tokensToRedeem.toLocaleString()} NB7
                </span>
              </div>
              <input
                type="range"
                min="500"
                max={tokenBalance}
                step="250"
                value={tokensToRedeem}
                onChange={(e) => setTokensToRedeem(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            {/* Payout Target Radio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  redeemOption === 'vault_gold'
                    ? 'border-[#D4AF37] bg-amber-500/10 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1524]/70'
                }`}
              >
                <input
                  type="radio"
                  name="redeemType"
                  checked={redeemOption === 'vault_gold'}
                  onChange={() => setRedeemOption('vault_gold')}
                  className="mt-0.5 accent-[#D4AF37]"
                />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">
                    Convert to 999.9 Fine Gold Ingot
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-[#D4AF37] font-mono font-bold block mt-0.5">
                    Yields +{estimatedGramsGold}g Gold in Safe #B-402
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    0% Swiss VAT · Allocated Depository Bar
                  </span>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  redeemOption === 'cash_wire'
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1524]/70'
                }`}
              >
                <input
                  type="radio"
                  name="redeemType"
                  checked={redeemOption === 'cash_wire'}
                  onChange={() => setRedeemOption('cash_wire')}
                  className="mt-0.5 accent-emerald-500"
                />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">
                    Direct Bank Wire Transfer (IBAN)
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold block mt-0.5">
                    Yields €{estimatedEurValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} Cash Wire
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    To Registered UBS Switzerland IBAN
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={isRedeeming || tokensToRedeem <= 0}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all cursor-pointer"
              >
                {isRedeeming ? 'Executing Redemption...' : `Confirm & Redeem ${tokensToRedeem.toLocaleString()} NB7`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
