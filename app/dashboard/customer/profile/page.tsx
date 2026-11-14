'use client';

import React, { useState, useRef, useEffect } from 'react';

import {
  fetchCustomerProfile,
  updateCustomerProfile,
} from '@/lib/api';


import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  CheckCircle2,
  ShieldCheck,
  Camera,
  Upload,
  Trash2,
  KeyRound,
  Lock,
  Landmark
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Form States
  const [fullName, setFullName] = useState(user?.name || 'Dr. Alexander von Bern');
  const [email, setEmail] = useState(user?.email || 'alexander.vonbern@vault-client.ch');
  const [phone, setPhone] = useState('+41 44 211 88 00');
  const [passportNumber, setPassportNumber] = useState('CH-X8890124');
  const [nationality, setNationality] = useState('Switzerland (CHE)');
  const [taxResidency, setTaxResidency] = useState('Switzerland (Canton Zurich)');
  const [primaryAddress, setPrimaryAddress] = useState('Bahnhofstrasse 45, 8001 Zurich, Switzerland');
  



// new code 
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [avatarFile, setAvatarFile] = useState<File | null>(null);
const [removeAvatar, setRemoveAvatar] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
  const loadProfile = async () => {
    try {
      const response = await fetchCustomerProfile();

      if (response.success && response.data) {
        const data = response.data;

        setFullName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setPassportNumber(data.passport_number || '');
        setNationality(data.nationality || '');
        setTaxResidency(data.tax_residency || '');
        setPrimaryAddress(data.primary_address || '');
        setAvatarUrl(data.avatar_url || null);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, []);

// end





  // Profile Picture State
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setAvatarUrl(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

const handleAvatarChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    setErrorMessage('Image size must be below 5MB.');
    return;
  }

  setAvatarFile(file);
  setRemoveAvatar(false);

  const reader = new FileReader();

  reader.onload = () => {
    setAvatarUrl(reader.result as string);
  };

  reader.readAsDataURL(file);
};



  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    setAvatarFile(null);
    setRemoveAvatar(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSaving(true);
  setErrorMessage('');

  try {
    const formData = new FormData();

    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('passport_number', passportNumber);
    formData.append('nationality', nationality);
    formData.append('tax_residency', taxResidency);
    formData.append('primary_address', primaryAddress);

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    if (removeAvatar) {
      formData.append('remove_avatar', '1');
    }

    const response = await updateCustomerProfile(formData);

    if (response.success) {
      setAvatarUrl(response.data?.avatar_url || null);
      setAvatarFile(null);
      setRemoveAvatar(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 3000);
    }
  } catch (error: any) {
    setErrorMessage(error.message);
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Hidden File Input for Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Private Client Identity
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              FINMA Tier 2 Clearance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personal Profile &amp; Contact Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Manage your depository client profile, legal passport registration, and secure contact telephone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer/password"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-4 h-4 text-[#D4AF37]" />
            <span>Change Password</span>
          </Link>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile details and picture updated successfully!</span>
        </div>
      )}

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl luxury-glass border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/95 text-center space-y-4 shadow-xl">
            {/* Interactive Profile Photo Box */}
            <div className="relative inline-block">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-amber-600 via-[#D4AF37] to-amber-200 p-[2px] shadow-xl shadow-amber-900/30">
                <div className="w-full h-full bg-slate-100 dark:bg-[#0E1524] rounded-[14px] overflow-hidden flex items-center justify-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-extrabold text-amber-700 dark:text-[#D4AF37]">
                      {fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-2.5 rounded-xl gold-gradient-bg text-slate-950 hover:brightness-110 transition-all shadow-md cursor-pointer"
                title="Upload Profile Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Pic Upload & Remove Actions */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{fullName}</h3>
              <p className="text-xs text-amber-700 dark:text-[#D4AF37] font-semibold">Private Client Vault</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{email}</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Profile Picture</span>
              </button>

              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Picture</span>
                </button>
              )}

              <p className="text-[10px] text-slate-500 leading-tight">
                JPG, PNG or WEBP up to 5MB. Recommended square 400x400px.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">KYC Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Tier 2 Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">Depository Unit:</span>
                <span className="text-amber-700 dark:text-[#D4AF37] font-bold">#B-402 (Zurich)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">2FA Security:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">Enforced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Profile Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 space-y-6 shadow-xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>Personal Identification &amp; Contact Details</span>
              </h3>
              <span className="text-xs font-mono text-amber-700 dark:text-[#D4AF37]">Login Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Legal Name (as per Passport) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Registered Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Security Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Passport Number *
                </label>
                <input
                  type="text"
                  required
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nationality
                </label>
                <input
                  type="text"
                  required
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tax Residency Jurisdiction
                </label>
                <input
                  type="text"
                  required
                  value={taxResidency}
                  onChange={(e) => setTaxResidency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Primary Registered Residence
              </label>
              <input
                type="text"
                required
                value={primaryAddress}
                onChange={(e) => setPrimaryAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Details</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
