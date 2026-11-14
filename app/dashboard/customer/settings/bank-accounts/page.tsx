'use client';

import React, {useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  Plus,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Building,
  ArrowLeft,
  CreditCard,
  Lock,
  Globe,
  AlertCircle,
  FileText
} from 'lucide-react';




import {
  fetchCustomerBankAccounts,
  addCustomerBankAccount,
  setPrimaryCustomerBankAccount,
  deleteCustomerBankAccount,
} from '@/lib/api';

interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  bicSwift: string;
  currency: 'EUR (€)' | 'CHF (Fr.)' | 'USD ($)';
  country: string;
  isPrimary: boolean;
  status: 'Verified (Instant Wire)' | 'Pending Verification';
}

export default function CustomerBankAccountsPage() {
  // const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
  //   {
  //     id: 'BANK-01',
  //     bankName: 'UBS Switzerland AG (Zurich Paradeplatz)',
  //     accountHolder: 'Dr. Alexander von Bern',
  //     iban: 'CH93 0070 0110 0029 4810 2',
  //     bicSwift: 'UBSWCHZH80A',
  //     currency: 'CHF (Fr.)',
  //     country: 'Switzerland (CHE)',
  //     isPrimary: true,
  //     status: 'Verified (Instant Wire)',
  //   },
  //   {
  //     id: 'BANK-02',
  //     bankName: 'Deutsche Bank AG (Frankfurt Main)',
  //     accountHolder: 'Dr. Alexander von Bern',
  //     iban: 'DE89 5007 0010 0129 8401 92',
  //     bicSwift: 'DEUTDEDDFXX',
  //     currency: 'EUR (€)',
  //     country: 'Germany (DEU)',
  //     isPrimary: false,
  //     status: 'Verified (Instant Wire)',
  //   },
  // ]);

const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');



  const [modalOpen, setModalOpen] = useState(false);
  const [newBankName, setNewBankName] = useState('');
  const [newAccountHolder, setNewAccountHolder] = useState('Dr. Alexander von Bern');
  const [newIban, setNewIban] = useState('');
  const [newBic, setNewBic] = useState('');
  const [newCurrency, setNewCurrency] = useState<'EUR (€)' | 'CHF (Fr.)' | 'USD ($)'>('EUR (€)');
  const [newCountry, setNewCountry] = useState('Switzerland (CHE)');
  const [isAdding, setIsAdding] = useState(false);

  // const handleSetPrimary = (id: string) => {
  //   setBankAccounts((prev) =>
  //     prev.map((b) => ({ ...b, isPrimary: b.id === id }))
  //   );
  // };

  const handleSetPrimary = async (id: string) => {
  try {
    const response = await setPrimaryCustomerBankAccount(id);

    if (response.success) {
      await loadBankAccounts();
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  }
};

  // const handleDelete = (id: string) => {
  //   setBankAccounts((prev) => prev.filter((b) => b.id !== id));
  // };

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this bank account?')) {
    return;
  }

  try {
    const response = await deleteCustomerBankAccount(id);

    if (response.success) {
      await loadBankAccounts();
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  }
};



  // const handleAddAccount = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsAdding(true);
  //   setTimeout(() => {
  //     setIsAdding(false);
  //     const newAcc: BankAccount = {
  //       id: `BANK-${Date.now()}`,
  //       bankName: newBankName,
  //       accountHolder: newAccountHolder,
  //       iban: newIban,
  //       bicSwift: newBic || 'SWIFT-CODE-AUTO',
  //       currency: newCurrency,
  //       country: newCountry,
  //       isPrimary: bankAccounts.length === 0,
  //       status: 'Verified (Instant Wire)',
  //     };
  //     setBankAccounts((prev) => [...prev, newAcc]);
  //     setModalOpen(false);
  //     setNewBankName('');
  //     setNewIban('');
  //     setNewBic('');
  //   }, 1200);
  // };

const handleAddAccount = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsAdding(true);
  setErrorMessage('');

  try {
    const response = await addCustomerBankAccount({
      bank_name: newBankName,
      account_holder: newAccountHolder,
      iban: newIban,
      bic_swift: newBic,
      currency: newCurrency,
      country: newCountry,
    });

    if (response.success) {
      setModalOpen(false);

      setNewBankName('');
      setNewIban('');
      setNewBic('');

      await loadBankAccounts();
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setIsAdding(false);
  }
};

  // new Code

  const loadBankAccounts = async () => {
  try {
    const response = await fetchCustomerBankAccounts();

    if (response.success && response.data) {
      setBankAccounts(
        response.data.map((account) => ({
          id: account.id,
          bankName: account.bank_name,
          accountHolder: account.account_holder,
          iban: account.iban,
          bicSwift: account.bic_swift,
          currency: account.currency as BankAccount['currency'],
          country: account.country,
          isPrimary: account.is_primary,
          status: account.status === 'Verified (Instant Wire)'
            ? 'Verified (Instant Wire)'
            : 'Pending Verification',
        }))
      );
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  loadBankAccounts();
}, []);

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/settings"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Settings</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase tracking-wider font-mono">
              Cash-Out &amp; Payout Settings
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              SEPA, SWIFT &amp; Swiss SIC Clearances
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Landmark className="w-6 h-6 text-[#D4AF37]" />
            <span>Payout Bank Accounts (IBAN / SEPA / SWIFT)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Manage your registered bank accounts for receiving instant cash wires when liquidating bullion or scrap gold.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bank Account</span>
        </button>
      </div>

      {/* 2. Security Notice Banner */}
      <div className="luxury-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 flex items-start gap-3.5 shadow-md">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">
            Institutional Anti-Money Laundering (AML) Bank Account Rule
          </span>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Payout wires can only be executed to bank accounts registered in your exact legal name (<strong>Dr. Alexander von Bern</strong>). Third-party payouts are prohibited under FINMA Swiss regulations.
          </p>
        </div>
      </div>

      {/* 3. Registered Bank Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankAccounts.map((acc) => (
          <div
            key={acc.id}
            className={`luxury-glass p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-5 relative overflow-hidden ${
              acc.isPrimary
                ? 'border-[#D4AF37]/50 bg-amber-500/[0.03] shadow-xl'
                : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-md'
            }`}
          >
            {acc.isPrimary && (
              <span className="absolute top-0 right-0 px-3 py-1 rounded-bl-2xl gold-gradient-bg text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wider shadow-md">
                Primary Payout Account
              </span>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center font-bold text-slate-950 shrink-0 shadow-md">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {acc.bankName}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono block">
                    {acc.country} · Currency: {acc.currency}
                  </span>
                </div>
              </div>

              {/* Account Details Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Account Holder</span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">{acc.accountHolder}</span>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">IBAN (International Bank Account Number)</span>
                  <span className="font-bold text-amber-700 dark:text-[#D4AF37] text-xs tracking-wider break-all">
                    {acc.iban}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase">BIC / SWIFT</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{acc.bicSwift}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified for Instant Wire</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
              {!acc.isPrimary ? (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(acc.id)}
                  className="text-amber-700 dark:text-[#D4AF37] font-bold hover:underline cursor-pointer"
                >
                  Set as Primary Payout Destination
                </button>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Default Cash Payout Target
                </span>
              )}

              {bankAccounts.length > 1 && !acc.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleDelete(acc.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Remove Bank Account"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Add Bank Account Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 bg-[#0A0E17] max-w-md w-full space-y-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
                Register New Payout Bank Account
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Bank Name &amp; Branch *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Credit Suisse / UBS Zurich Paradeplatz"
                  value={newBankName}
                  onChange={(e) => setNewBankName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Account Holder Legal Name *</label>
                <input
                  type="text"
                  required
                  value={newAccountHolder}
                  onChange={(e) => setNewAccountHolder(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-slate-500">Must match your verified KYC identity.</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">IBAN (International Bank Account Number) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CH93 0070 0110 0029 4810 2"
                  value={newIban}
                  onChange={(e) => setNewIban(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">BIC / SWIFT Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UBSWCHZH80A"
                    value={newBic}
                    onChange={(e) => setNewBic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Payout Currency</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E1524] border border-slate-800 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="CHF (Fr.)">CHF (Fr.)</option>
                    <option value="USD ($)">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-6 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {isAdding ? 'Verifying with Bank...' : 'Save & Verify Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}















