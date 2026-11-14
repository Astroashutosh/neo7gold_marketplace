'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Copy,
  Check,
  QrCode,
  Users,
  Coins,
  Gift,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  DollarSign,
  Send,
  Mail,
  MessageCircle,
  ExternalLink,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function CustomerInvitePage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const referralCode = 'VONBERN77';
  const referralLink = `https://neos7gold.ch/invite/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 w-full pb-16">
      {/* 1. Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
              Client Referral Program
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Earn Lifetime Bullion &amp; Jewelry Commissions
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Share2 className="w-6 h-6 text-[#D4AF37]" />
            <span>Invite Friends &amp; Share Personal Link</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Share your private VIP invite link. Earn up to 5% commission on every gold bar, silver ingot, or bespoke jewelry purchase your friends make.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/customer/rewards"
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all"
          >
            <Coins className="w-4 h-4" />
            <span>View Earnings Dashboard</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Share Card & QR Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal Invite Link & Sharing Tools */}
        <div className="lg:col-span-2 luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center font-black text-slate-950 text-base shadow-md">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Your Exclusive Client Referral Link
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Friends get €50 off their first bullion order + 0% vault fees for 3 months
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hidden sm:inline">
              Active Link
            </span>
          </div>

          {/* Copyable Link Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Personal Referral URL
            </label>
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full bg-transparent px-3 text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37] focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Copyable Referral Code */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-[#0E1524]/70 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                VIP Referral Code
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Give this code to friends checking out manually
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#070B12] border border-slate-300 dark:border-slate-700 font-mono font-black text-sm text-slate-900 dark:text-white tracking-widest">
                {referralCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              1-Click Share with Your Network:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Join me on Neos7 Swiss Gold Vault! Use my link for €50 off your first certified gold or jewelry purchase: ${referralLink}`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me on Neos7 Swiss Gold Vault! Certified precious metals & jewelry.')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-[#0088cc] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent('Exclusive VIP Invitation to Neos7 Swiss Gold Vault')}&body=${encodeURIComponent(`Hi,\n\nI invite you to explore Neos7 Gold Swiss Vault. Use my referral link to get €50 off your first precious metals or jewelry order:\n\n${referralLink}\n\nBest regards,\nDr. Alexander von Bern`)}`}
                className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-[#D4AF37] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Invite</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Instant Scannable QR Code Card */}
        <div className="luxury-glass p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl flex flex-col items-center justify-between text-center space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-[#D4AF37]">
              In-Person Optical Invite
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Scan Invite QR Code
            </h3>
            <p className="text-xs text-slate-500">
              Let clients scan with their smartphone camera to instantly register under your referral tree.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white shadow-2xl border-4 border-[#D4AF37]/40 flex items-center justify-center">
            <QrCode className="w-36 h-36 text-slate-950" />
          </div>

          <div className="space-y-1 w-full font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-500">
              Assigned Sponsoring Code: <strong className="text-slate-900 dark:text-white font-bold">{referralCode}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 3-Tier Commission Structure Explainer */}
      <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Multi-Tier Network Commission &amp; Rewards Program</span>
          </h3>
          <Link
            href="/dashboard/customer/rewards/network"
            className="text-xs font-bold text-amber-700 dark:text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>View Network Tree</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Tier 1 */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-[#D4AF37]">
                LEVEL 1 · DIRECT
              </span>
              <span className="text-xl font-black text-amber-700 dark:text-[#D4AF37] font-mono">5.0%</span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Direct Client Referrals</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Earn 5.0% commission on every bullion spread and jewelry order placed by your direct invitees.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                LEVEL 2 · INDIRECT
              </span>
              <span className="text-xl font-black text-cyan-700 dark:text-cyan-300 font-mono">3.0%</span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Second-Generation Referrals</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Earn 3.0% override commission when your referred clients invite their friends.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">
                LEVEL 3 · NETWORK
              </span>
              <span className="text-xl font-black text-purple-700 dark:text-purple-300 font-mono">1.5%</span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Network Tier Referrals</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Earn 1.5% passive volume commission from Level 3 purchases across the Swiss depository.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
