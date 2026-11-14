'use client';

import React, { useState } from 'react';
import {
  changeCustomerPassword,
} from '@/lib/api';
import Link from 'next/link';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
  Check,
  X,
  Smartphone,
  Info
} from 'lucide-react';

export default function CustomerChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [logoutOtherSessions, setLogoutOtherSessions] = useState(true);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Complexity Validations
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const isFormValid =
    currentPassword.trim().length > 0 &&
    hasMinLength &&
    hasUppercase &&
    hasNumber &&
    hasSpecialChar &&
    passwordsMatch;


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isFormValid) {
    setErrorMessage(
      'Please ensure your new password meets all security policy requirements.'
    );
    return;
  }

  setErrorMessage(null);
  setSuccessMessage(false);
  setIsSubmitting(true);

  try {
    const response = await changeCustomerPassword({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
      two_factor_code: twoFactorCode,
      logout_other_sessions: logoutOtherSessions,
    });

    if (response.success) {
      setSuccessMessage(true);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTwoFactorCode('');
    } else {
      setErrorMessage(
        response.message || 'Unable to update password.'
      );
    }
  } catch (error: any) {
    setErrorMessage(
      error.message || 'Something went wrong while updating password.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="space-y-6 w-full pb-12">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Vault Overview</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Security Protocol
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Vault Access Protection
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] shrink-0" />
            <span>Change Master Vault Password</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Update your account password to safeguard your physical bullion vault holdings and private jewelry certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer/settings/2fa"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Two-Factor (2FA)</span>
          </Link>
        </div>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2.5 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="font-bold">
            Your master password has been successfully updated! Active sessions have been refreshed.
          </span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}

      {/* 2. Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Password Update Form */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D4AF37]" />
                <span>Password Update Protocol</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">Security Clearance</span>
            </div>

            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  placeholder="Enter a strong new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Optional 2FA Field */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Two-Factor Authenticator Code (Optional)</span>
                <span className="text-[10px] text-slate-400 font-mono font-normal">If 2FA is active</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 123456"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37] tracking-widest"
                />
                <Smartphone className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Logout other sessions checkbox */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={logoutOtherSessions}
                  onChange={(e) => setLogoutOtherSessions(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-100 dark:bg-[#0E1524] border-slate-300 dark:border-slate-700 text-[#D4AF37] focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Log out of all other active browser sessions &amp; mobile devices
                </span>
              </label>
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setTwoFactorCode('');
                  setErrorMessage(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel &amp; Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`px-8 py-2.5 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-2 cursor-pointer transition-all ${
                  isFormValid && !isSubmitting
                    ? 'gold-gradient-bg hover:brightness-110 text-slate-950 shadow-amber-900/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Updating Master Password...' : 'Save New Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Column: Security Policy & Master Note */}
        <div className="space-y-6">
          {/* Complexity Checklist Card */}
          <div className="luxury-glass p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Password Security Policy</span>
            </h3>

            <ul className="space-y-2.5 text-xs font-mono">
              <li
                className={`flex items-center gap-2.5 ${
                  hasMinLength
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {hasMinLength ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>At least 8 characters long</span>
              </li>

              <li
                className={`flex items-center gap-2.5 ${
                  hasUppercase
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {hasUppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Contains uppercase letter (A-Z)</span>
              </li>

              <li
                className={`flex items-center gap-2.5 ${
                  hasNumber
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {hasNumber ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Contains at least one number (0-9)</span>
              </li>

              <li
                className={`flex items-center gap-2.5 ${
                  hasSpecialChar
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {hasSpecialChar ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>Contains a special symbol (!@#$)</span>
              </li>

              <li
                className={`flex items-center gap-2.5 ${
                  passwordsMatch
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {passwordsMatch ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                <span>New passwords match exactly</span>
              </li>
            </ul>
          </div>

          {/* Master Security Note */}
          <div className="luxury-glass p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-[#D4AF37] font-bold text-xs">
              <Info className="w-4 h-4" />
              <span>Master Depository Key Note</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Your password encrypts your private bullion vault certificate storage. Never share your password or authenticator credentials with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
