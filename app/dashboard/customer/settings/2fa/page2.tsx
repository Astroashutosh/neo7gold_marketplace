'use client';


import { useEffect, useState } from 'react';

import {
  fetchCustomer2FASetup,
  enableCustomer2FA,
  disableCustomer2FA,
  regenerateCustomer2FARecoveryCodes,
  updateCustomer2FAPolicies,
} from '@/lib/api';

import { QRCodeSVG } from 'qrcode.react';

import Link from 'next/link';
import {
  ShieldCheck,
  Smartphone,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Copy,
  RefreshCw,
  Lock,
  Check,
  QrCode,
  ShieldAlert,
  Key,
} from 'lucide-react';

export default function CustomerTwoFactorPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Customer Mandatory Trigger Policies
  const [vaultWithdrawalsEnforced, setVaultWithdrawalsEnforced] = useState(true);
  const [cashWithdrawalsEnforced, setCashWithdrawalsEnforced] = useState(true);
  const [bankChangesEnforced, setBankChangesEnforced] = useState(true);

  // const secretKey = 'NEOS7-CUST-VAUL-ZRH2-5509';

  // const [backupCodes, setBackupCodes] = useState([
  //   'CUST-8902-1194',
  //   'ZRH-4412-9901',
  //   'GOLD-7731-0024',
  //   'GVA-3310-8842',
  //   'CHE-9921-6650',
  //   'SWISS-5501-2298',
  //   'HM12-9043-PF55',
  //   'UM77-3310-EU90',
  // ]);


  const [secretKey, setSecretKey] = useState('');
const [otpauthUrl, setOtpauthUrl] = useState('');
const [backupCodes, setBackupCodes] = useState<string[]>([]);
const [isSavingPolicies, setIsSavingPolicies] = useState(false);


useEffect(() => {
  const load2FA = async () => {
    try {
      const response = await fetchCustomer2FASetup();

      if (response.success && response.data) {
        setIs2FAEnabled(response.data.is_enabled);
        setSecretKey(response.data.secret_key || '');
        setOtpauthUrl(response.data.otpauth_url || '');
        // Recovery codes are intentionally not returned by the setup endpoint.
        setBackupCodes([]);

        if (response.data.policies) {
          setVaultWithdrawalsEnforced(
            response.data.policies.vault_withdrawals_enforced ?? true
          );
          setCashWithdrawalsEnforced(
            response.data.policies.cash_withdrawals_enforced ?? true
          );
          setBankChangesEnforced(
            response.data.policies.bank_changes_enforced ?? true
          );
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  load2FA();
}, []);


  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  // const handleToggle2FA = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMessage(null);

  //   if (verificationCode.length !== 6) {
  //     setErrorMessage('Please enter a valid 6-digit authenticator code to confirm.');
  //     return;
  //   }

  //   setIsVerifying(true);
  //   setTimeout(() => {
  //     setIsVerifying(false);
  //     const nextState = !is2FAEnabled;
  //     setIs2FAEnabled(nextState);
  //     setVerificationCode('');
  //     setSuccessMessage(
  //       nextState
  //         ? 'Two-Factor Authentication (2FA) is now active and enforced across your private vault account!'
  //         : 'Two-Factor Authentication has been disabled. Vault security risk warning is active.'
  //     );
  //     setTimeout(() => setSuccessMessage(null), 5000);
  //   }, 800);
  // };


const handleToggle2FA = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage(null);

  if (verificationCode.length !== 6) {
    setErrorMessage('Please enter a valid 6-digit code.');
    return;
  }

  setIsVerifying(true);

  try {
    const response = is2FAEnabled
      ? await disableCustomer2FA(verificationCode)
      : await enableCustomer2FA(verificationCode);

    if (response.success) {
      setIs2FAEnabled(!is2FAEnabled);
      setVerificationCode('');

      if (!is2FAEnabled && response.data?.backup_codes) {
        setBackupCodes(response.data.backup_codes);
      }

      setSuccessMessage(response.message || '2FA status updated successfully.');

      setTimeout(() => setSuccessMessage(null), 5000);
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setIsVerifying(false);
  }
};



  // const handleRegenerateBackup = () => {
  //   if (confirm('Regenerating will invalidate all previous backup codes. Continue?')) {
  //     const newCodes = Array.from({ length: 8 }).map(
  //       () =>
  //         `GOLD${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 8999)}-CH${Math.floor(10 + Math.random() * 89)}`
  //     );
  //     setBackupCodes(newCodes);
  //     alert('New backup recovery codes generated successfully!');
  //   }
  // };


  const handleRegenerateBackup = async () => {
  if (!is2FAEnabled) {
    setErrorMessage('Enable 2FA before regenerating recovery codes.');
    return;
  }

  if (!confirm('Regenerating will invalidate all previous backup codes. Continue?')) {
    return;
  }

  const currentPassword = window.prompt('Enter your current account password:');
  if (!currentPassword) return;

  const authenticatorCode = window.prompt('Enter the current 6-digit authenticator code:');
  if (!authenticatorCode || !/^\\d{6}$/.test(authenticatorCode)) {
    setErrorMessage('Please enter a valid 6-digit authenticator code.');
    return;
  }

  try {
    const response = await regenerateCustomer2FARecoveryCodes(
      currentPassword,
      authenticatorCode
    );

    if (response.success && response.data) {
      setBackupCodes(response.data.backup_codes || []);
      setSuccessMessage('New recovery codes generated. Save them securely; they are shown only once.');
      setErrorMessage(null);
    }
  } catch (error: any) {
    setErrorMessage(error.message || 'Unable to regenerate recovery codes.');
  }
};

  const save2FAPolicies = async (
    nextPolicies: {
      vault_withdrawals_enforced: boolean;
      cash_withdrawals_enforced: boolean;
      bank_changes_enforced: boolean;
    }
  ) => {
    setIsSavingPolicies(true);
    setErrorMessage(null);

    try {
      const response = await updateCustomer2FAPolicies(nextPolicies);
      if (!response.success) {
        throw new Error(response.message || 'Unable to save security policies.');
      }
      setSuccessMessage('Security policies saved successfully.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Unable to save security policies.');
      // Reload persisted values so the UI does not show unsaved settings.
      try {
        const latest = await fetchCustomer2FASetup();
        const policies = latest.data?.policies;
        if (policies) {
          setVaultWithdrawalsEnforced(policies.vault_withdrawals_enforced ?? true);
          setCashWithdrawalsEnforced(policies.cash_withdrawals_enforced ?? true);
          setBankChangesEnforced(policies.bank_changes_enforced ?? true);
        }
      } catch {
        // Keep the original API error visible.
      }
    } finally {
      setIsSavingPolicies(false);
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
            <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#D4AF37] font-bold border border-amber-500/20 uppercase tracking-wider">
              Vault Security &amp; Identity
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
              TOTP Multi-Factor Authentication Gateway
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] shrink-0" />
            <span>Two-Factor Authentication (2FA) &amp; Vault Key</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Protect your physical depository bullion withdrawals, jewelry orders, and ownership transfers with time-based one-time passwords (TOTP).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer/password"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <KeyRound className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Change Password</span>
          </Link>

          <Link
            href="/dashboard/customer/profile"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all shadow-sm"
          >
            <span>Customer Profile</span>
          </Link>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2.5 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span className="font-bold">{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2.5 shadow-lg animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}

      {/* 2. Top Status Banner Card */}
      <div
        className={`p-6 sm:p-7 rounded-2xl luxury-glass border transition-all shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
          is2FAEnabled
            ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-white to-white dark:from-emerald-950/20 dark:via-[#0A0E17] dark:to-[#0A0E17]'
            : 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-white to-white dark:from-amber-950/20 dark:via-[#0A0E17] dark:to-[#0A0E17]'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              is2FAEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            {is2FAEnabled ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {is2FAEnabled
                  ? 'Authenticator 2FA Protection: Active & Enforced'
                  : 'Two-Factor Authentication: Currently Inactive'}
              </h3>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border uppercase ${
                  is2FAEnabled
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                }`}
              >
                {is2FAEnabled ? 'Protected' : 'Action Recommended'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {is2FAEnabled
                ? 'Your physical vault bar releases, insured home delivery bookings, and fiat withdrawals require 6-digit TOTP confirmation from your mobile authenticator.'
                : 'Enable 2FA using Google Authenticator, Apple Passwords, or Authy to secure your gold holdings and prevent unauthorized bullion releases.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Status: <strong className={is2FAEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{is2FAEnabled ? 'ACTIVE' : 'DISABLED'}</strong>
          </span>
        </div>
      </div>

      {/* 3. Setup / Configure Authenticator Wizard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: QR Code & Seed Key */}
        <div className="p-6 sm:p-8 rounded-2xl luxury-glass border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 space-y-5 shadow-xl">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#D4AF37]" />
              <span>1. Scan QR Code or Enter Key</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Google / Apple / Authy</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Open your authenticator app (e.g. <strong>Google Authenticator</strong>, <strong>Apple Keychain</strong>, <strong>1Password</strong>, or <strong>Authy</strong>) and scan the QR code below:
          </p>

          {/* QR Code Container */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-3">
            {/* Vector QR Preview */}
            <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-4 border-amber-500/20">
              {/* <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
            
                <rect x="5" y="5" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                <rect x="15" y="15" width="10" height="10" rx="1" fill="currentColor" />

        
                <rect x="65" y="5" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
                <rect x="75" y="15" width="10" height="10" rx="1" fill="currentColor" />

                <rect x="5" y="65" width="30" height="30" rx="4" fill="currentColor" />
                <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
                <rect x="15" y="75" width="10" height="10" rx="1" fill="currentColor" />

           
                <rect x="42" y="8" width="6" height="6" rx="1" />
                <rect x="52" y="15" width="6" height="6" rx="1" />
                <rect x="42" y="24" width="6" height="6" rx="1" />
                <rect x="12" y="42" width="6" height="6" rx="1" />
                <rect x="22" y="50" width="6" height="6" rx="1" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="#D4AF37" />
                <rect x="65" y="42" width="6" height="6" rx="1" />
                <rect x="75" y="52" width="6" height="6" rx="1" />
                <rect x="85" y="42" width="6" height="6" rx="1" />
                <rect x="42" y="65" width="6" height="6" rx="1" />
                <rect x="52" y="75" width="6" height="6" rx="1" />
                <rect x="65" y="70" width="12" height="6" rx="1" />
                <rect x="80" y="80" width="12" height="12" rx="2" />
              </svg> */}

 {otpauthUrl && !is2FAEnabled ? (
  <QRCodeSVG
    value={otpauthUrl}
    size={160}
    level="M"
    includeMargin
    className="w-40 h-40"
  />
) : (
  <div className="text-center text-xs text-slate-500 dark:text-slate-400">
    {is2FAEnabled
      ? 'Authenticator is already configured.'
      : 'QR code will appear when setup data is available.'}
  </div>
)}


            </div>

            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Account: <strong className="text-slate-900 dark:text-white">Alexander von Bern (Customer Vault #88901)</strong>
            </span>
          </div>

          {/* Manual Entry Secret Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Or Enter Key Manually:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={secretKey}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-bold text-[#D4AF37] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyKey}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all shadow-sm"
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Code Verification & Enable/Disable Action */}
        <div className="space-y-6">
          <form
            onSubmit={handleToggle2FA}
            className="p-6 sm:p-8 rounded-2xl luxury-glass border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 space-y-5 shadow-xl"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>2. Confirm with 6-Digit Code</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Instant Verification</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter the 6-digit code currently generated by your authenticator app to{' '}
              <strong className="text-slate-900 dark:text-white">{is2FAEnabled ? 'disable or re-verify' : 'activate & enforce'}</strong> 2FA security:
            </p>

            {/* 6-Digit Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Authenticator 6-Digit Code *</label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="492810"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-[0.5em] text-xl font-mono font-extrabold py-3 bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 rounded-xl text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className={`w-full py-3 rounded-xl text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  is2FAEnabled
                    ? 'bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#B38F24] hover:brightness-110 text-slate-950 shadow-amber-900/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isVerifying ? (
                  <span>Verifying Cryptographic Seed...</span>
                ) : is2FAEnabled ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Disable Authenticator 2FA</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify &amp; Enable 2FA Protection</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Enforced Actions Settings */}
          <div className="p-6 rounded-2xl luxury-glass border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 space-y-4 shadow-xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                Mandatory 2FA Trigger Actions
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800/80 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300">Physical Vault Bullion Release &amp; Armored Delivery</span>
                <input
                  type="checkbox"
                  checked={vaultWithdrawalsEnforced}
                  disabled={isSavingPolicies}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setVaultWithdrawalsEnforced(value);
                    void save2FAPolicies({
                      vault_withdrawals_enforced: value,
                      cash_withdrawals_enforced: cashWithdrawalsEnforced,
                      bank_changes_enforced: bankChangesEnforced,
                    });
                  }}
                  className="w-4 h-4 rounded bg-white dark:bg-[#0A0E17] border-slate-300 dark:border-slate-700 text-[#D4AF37] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800/80 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300">Cash Balance &amp; Staking Yield Withdrawals</span>
                <input
                  type="checkbox"
                  checked={cashWithdrawalsEnforced}
                  disabled={isSavingPolicies}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setCashWithdrawalsEnforced(value);
                    void save2FAPolicies({
                      vault_withdrawals_enforced: vaultWithdrawalsEnforced,
                      cash_withdrawals_enforced: value,
                      bank_changes_enforced: bankChangesEnforced,
                    });
                  }}
                  className="w-4 h-4 rounded bg-white dark:bg-[#0A0E17] border-slate-300 dark:border-slate-700 text-[#D4AF37] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800/80 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300">Adding / Modifying Linked Payout Bank Accounts</span>
                <input
                  type="checkbox"
                  checked={bankChangesEnforced}
                  disabled={isSavingPolicies}
                  onChange={(e) => {
                    const value = e.target.checked;
                    setBankChangesEnforced(value);
                    void save2FAPolicies({
                      vault_withdrawals_enforced: vaultWithdrawalsEnforced,
                      cash_withdrawals_enforced: cashWithdrawalsEnforced,
                      bank_changes_enforced: value,
                    });
                  }}
                  className="w-4 h-4 rounded bg-white dark:bg-[#0A0E17] border-slate-300 dark:border-slate-700 text-[#D4AF37] focus:ring-0"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Emergency Backup Recovery Codes */}
      <div className="p-6 sm:p-8 rounded-2xl luxury-glass border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 space-y-5 shadow-xl">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" />
              <span>Emergency 2FA Backup Recovery Codes</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              If you lose access to your phone or authenticator app, each single-use backup code can be used once to regain access.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyBackupCodes}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              {copiedBackup ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBackup ? 'Copied!' : 'Copy All'}</span>
            </button>

            <button
              type="button"
              onClick={handleRegenerateBackup}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* 8 Codes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {backupCodes.map((code, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-[#D4AF37] tracking-wider select-all"
            >
              {code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
