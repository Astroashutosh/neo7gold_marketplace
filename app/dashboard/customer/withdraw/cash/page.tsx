'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  ArrowRight,
  Clock,
  Coins,
  FileText,
  Plus,
  Lock,
  Sparkles
} from 'lucide-react';

interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  bicSwift: string;
  currency: string;
}

interface WithdrawalTransaction {
  id: string;
  amountRequested: number;
  feeAmount: number;
  netPayout: number;
  bankName: string;
  ibanMasked: string;
  date: string;
  status: 'Settled to Bank' | 'Processing Wire' | 'Compliance Review';
}

export default function CashPayoutWithdrawPage() {
  const [availableBalance, setAvailableBalance] = useState(3450.0);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('500');
  const [selectedBankId, setSelectedBankId] = useState('BANK-01');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bankAccounts: BankAccount[] = [
    {
      id: 'BANK-01',
      bankName: 'UBS Switzerland AG (Zurich Paradeplatz)',
      accountHolder: 'Dr. Alexander von Bern',
      iban: 'CH93 0070 0110 0029 4810 2',
      bicSwift: 'UBSWCHZH80A',
      currency: 'EUR / CHF',
    },
    {
      id: 'BANK-02',
      bankName: 'Deutsche Bank AG (Frankfurt Main)',
      accountHolder: 'Dr. Alexander von Bern',
      iban: 'DE89 5007 0010 0129 8401 92',
      bicSwift: 'DEUTDEDDFXX',
      currency: 'EUR (€)',
    },
  ];

  const [history, setHistory] = useState<WithdrawalTransaction[]>([
    {
      id: 'WDR-99201',
      amountRequested: 2000.0,
      feeAmount: 100.0,
      netPayout: 1900.0,
      bankName: 'UBS Switzerland AG',
      ibanMasked: 'CH93 0070 •••• 4810 2',
      date: '15 Aug 2026',
      status: 'Settled to Bank',
    },
    {
      id: 'WDR-98944',
      amountRequested: 1500.0,
      feeAmount: 75.0,
      netPayout: 1425.0,
      bankName: 'UBS Switzerland AG',
      ibanMasked: 'CH93 0070 •••• 4810 2',
      date: '02 Aug 2026',
      status: 'Settled to Bank',
    },
  ]);

  const numAmount = parseFloat(withdrawAmount) || 0;
  const minWithdraw = 10.0;
  const feeRate = 0.05; // 5% fee
  const feeAmount = numAmount * feeRate;
  const netPayout = Math.max(0, numAmount - feeAmount);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (numAmount < minWithdraw) {
      setErrorMessage(`Minimum withdrawal amount is €${minWithdraw.toFixed(2)} (or $10.00).`);
      return;
    }

    if (numAmount > availableBalance) {
      setErrorMessage(`Requested amount exceeds your available balance (€${availableBalance.toFixed(2)}).`);
      return;
    }

    const selectedBank = bankAccounts.find((b) => b.id === selectedBankId);
    if (!selectedBank) {
      setErrorMessage('Please select a registered bank account for payout.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newTx: WithdrawalTransaction = {
        id: `WDR-${Math.floor(10000 + Math.random() * 90000)}`,
        amountRequested: numAmount,
        feeAmount: feeAmount,
        netPayout: netPayout,
        bankName: selectedBank.bankName,
        ibanMasked: `${selectedBank.iban.slice(0, 9)} •••• ${selectedBank.iban.slice(-6)}`,
        date: 'Today (Just now)',
        status: 'Processing Wire',
      };

      setHistory((prev) => [newTx, ...prev]);
      setAvailableBalance((prev) => prev - numAmount);
      setSuccessMessage(
        `Withdrawal request for €${numAmount.toFixed(2)} (Net Payout: €${netPayout.toFixed(2)}) submitted successfully! SEPA wire initiated to ${selectedBank.bankName}.`
      );
      setWithdrawAmount('100');
    }, 1500);
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Cash Settlement Desk
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              SEPA, SWIFT &amp; Swiss SIC Transfers
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Landmark className="w-6 h-6 text-[#D4AF37]" />
            <span>Cash Payout Withdrawal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Withdraw your referral earnings and vault liquidation proceeds directly to your verified bank account.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/settings/bank-accounts"
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building className="w-4 h-4 text-[#D4AF37]" />
            <span>Manage Bank Accounts</span>
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-2 shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Main Form & Payout Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Withdrawal Form */}
        <div className="lg:col-span-2 luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" />
              <span>Create Cash Payout Request</span>
            </h3>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
              Available: €{availableBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-5 text-xs">
            {/* Amount Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Withdrawal Amount (EUR / USD) *
                </label>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(availableBalance.toString())}
                  className="text-[11px] font-mono font-bold text-amber-700 dark:text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Max Available (€{availableBalance.toFixed(2)})
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">
                  €
                </span>
                <input
                  type="number"
                  min="10"
                  step="any"
                  required
                  placeholder="e.g. 500.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono px-1">
                <span>Minimum Withdrawal: <strong>$10.00 / €10.00</strong></span>
                <span>Processing Fee: <strong>5.0%</strong></span>
              </div>
            </div>

            {/* Bank Selection */}
            <div className="space-y-2 pt-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Select Destination Bank Account (IBAN) *
              </label>

              <div className="space-y-2.5">
                {bankAccounts.map((b) => (
                  <label
                    key={b.id}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      selectedBankId === b.id
                        ? 'border-[#D4AF37] bg-amber-500/10 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0E1524]/70 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bankAccount"
                      value={b.id}
                      checked={selectedBankId === b.id}
                      onChange={() => setSelectedBankId(b.id)}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                          {b.bankName}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          ✓ Verified Account
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        IBAN: <strong className="text-amber-700 dark:text-[#D4AF37]">{b.iban}</strong>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Holder: {b.accountHolder} · BIC/SWIFT: {b.bicSwift}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Fee Calculation Breakdown Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Gross Withdrawal Request:</span>
                <span className="font-bold text-slate-900 dark:text-white">€{numAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Withdrawal Processing Fee (5%):</span>
                <span className="text-rose-500 font-bold">-€{feeAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-900 dark:text-white">Net Payout to Your Bank:</span>
                <span className="font-black text-amber-700 dark:text-[#D4AF37] text-base">
                  €{netPayout.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || numAmount <= 0 || availableBalance === 0}
                className="w-full py-3 rounded-2xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Landmark className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? 'Submitting Wire Request...'
                    : `Confirm & Withdraw €${numAmount.toFixed(2)} (Net €${netPayout.toFixed(2)})`}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Swiss Depository Policy Notice */}
        <div className="luxury-glass p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl flex flex-col justify-between space-y-5 text-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Withdrawal Terms &amp; Limits</span>
            </div>

            <div className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white block">Minimum Amount:</strong>
                <p>Minimum payout request is <strong>$10.00 / €10.00</strong> per transaction.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white block">5% Processing Fee:</strong>
                <p>A standard 5% gateway and Swiss banking wire fee is deducted automatically.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white block">Processing Time:</strong>
                <p>SEPA and Swiss SIC transfers clear within <strong>1–24 business hours</strong>.</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-600 dark:text-slate-400 text-[10px] font-mono">
            Direct Bank Wire Execution by <strong>NEOS7 Gold Jakob AG (Zurich)</strong>.
          </div>
        </div>
      </div>

      {/* 3. Payout History Ledger */}
      <div className="luxury-glass rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Withdrawal History &amp; Wire Status
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {history.length} Requests Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#090D15] text-slate-500 dark:text-slate-400 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Withdrawal Ref</th>
                <th className="py-3.5 px-4">Bank Destination</th>
                <th className="py-3.5 px-4">Gross Requested</th>
                <th className="py-3.5 px-4">5% Fee</th>
                <th className="py-3.5 px-4">Net Payout</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {history.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.04] transition-colors"
                >
                  <td className="py-4 px-4 font-mono font-bold text-amber-700 dark:text-[#D4AF37]">
                    {tx.id}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block">{tx.bankName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.ibanMasked}</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-900 dark:text-white font-bold">
                    €{tx.amountRequested.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 font-mono text-rose-500">
                    -€{tx.feeAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    €{tx.netPayout.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-500">
                    {tx.date}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full font-mono ${
                        tx.status === 'Settled to Bank'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 animate-pulse'
                      }`}
                    >
                      {tx.status === 'Settled to Bank' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>{tx.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
