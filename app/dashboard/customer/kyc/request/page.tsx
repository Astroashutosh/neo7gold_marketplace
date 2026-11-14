'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowLeft,
  User,
  Building,
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  Lock,
  Trash2,
  RefreshCw,
  Sparkles,
  Award
} from 'lucide-react';

export default function CustomerKYCUpgradeRequestPage() {
  const passportFileRef = useRef<HTMLInputElement>(null);
  const proofOfAddressRef = useRef<HTMLInputElement>(null);
  const sourceOfWealthRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Personal Identification
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('Switzerland (CHE)');
  const [passportNumber, setPassportNumber] = useState('');
  const [taxResidency, setTaxResidency] = useState('Switzerland');

  // Step 2: Source of Wealth & Financial Profile
  const [employmentStatus, setEmploymentStatus] = useState('Executive / Entrepreneur');
  const [annualIncome, setAnnualIncome] = useState('€250,000 - €1,000,000');
  const [sourceOfFunds, setSourceOfFunds] = useState('Business Profits & Family Estate');
  const [expectedAnnualVolume, setExpectedAnnualVolume] = useState('> €500,000');

  // Step 3: Declarations
  const [pepDeclaration, setPepDeclaration] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Uploaded Files State
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string } }>({});

  const handleFileSelect = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = file.size / 1024;
      const formattedSize = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(2)} MB` : `${sizeKB.toFixed(1)} KB`;
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: { name: file.name, size: formattedSize },
      }));
      setErrorMessage(null);
    }
  };

  const removeFile = (key: string) => {
    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handlePreFillDemo = () => {
    setFullName('Dr. Alexander von Bern');
    setDob('1982-05-14');
    setNationality('Switzerland (CHE)');
    setPassportNumber('CH-X8890124');
    setTaxResidency('Switzerland (CHE)');

    setEmploymentStatus('Executive / Managing Partner');
    setAnnualIncome('> €1,000,000');
    setSourceOfFunds('Private Investment Portfolio & Capital Gains');
    setExpectedAnnualVolume('> €1,000,000');

    setPepDeclaration(true);
    setTermsAgreed(true);

    setUploadedFiles({
      passport: { name: 'VonBern_Alexander_Passport_Scan.pdf', size: '1.6 MB' },
      proofOfAddress: { name: 'Zurich_Utility_Bill_Jul2026.pdf', size: '920 KB' },
      sourceOfWealth: { name: 'Bank_Statement_Wealth_Declaration.pdf', size: '2.4 MB' },
    });
    setErrorMessage(null);
  };

  const isStep1Valid = Boolean(
    fullName.trim() &&
      dob.trim() &&
      passportNumber.trim() &&
      uploadedFiles.passport
  );

  const isStep2Valid = Boolean(
    isStep1Valid &&
      sourceOfFunds.trim() &&
      uploadedFiles.sourceOfWealth &&
      uploadedFiles.proofOfAddress
  );

  const isStep3Valid = Boolean(
    isStep2Valid &&
      pepDeclaration &&
      termsAgreed
  );

  const handleProceedToStep2 = () => {
    if (!fullName.trim() || !dob.trim() || !passportNumber.trim()) {
      setErrorMessage('Please complete all personal identification fields.');
      return;
    }
    if (!uploadedFiles.passport) {
      setErrorMessage('Please upload your certified Passport or National ID scan.');
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleProceedToStep3 = () => {
    if (!uploadedFiles.proofOfAddress) {
      setErrorMessage('Please upload proof of residential address (< 3 months old).');
      return;
    }
    if (!uploadedFiles.sourceOfWealth) {
      setErrorMessage('Please upload source of wealth documentary evidence.');
      return;
    }
    setErrorMessage(null);
    setStep(3);
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pepDeclaration || !termsAgreed) {
      setErrorMessage('Please confirm the PEP and AML regulatory declarations.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={passportFileRef}
        onChange={(e) => handleFileSelect('passport', e)}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />
      <input
        type="file"
        ref={proofOfAddressRef}
        onChange={(e) => handleFileSelect('proofOfAddress', e)}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />
      <input
        type="file"
        ref={sourceOfWealthRef}
        onChange={(e) => handleFileSelect('sourceOfWealth', e)}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer/kyc"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Verification Status</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 uppercase tracking-wider font-mono">
              Tier 3 Limit Upgrade
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Higher Buying Limit (€1,000,000+)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <span>Increase Your Buying Limit</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Submit simple proof of address to unlock higher gold and jewelry purchase limits.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            type="button"
            onClick={handlePreFillDemo}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-[#D4AF37] border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-fill Sample Data</span>
          </button>
          <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Review SLA: 24h</span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2.5 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span className="font-bold">{errorMessage}</span>
        </div>
      )}

      {/* Success Modal */}
      {isSubmitted ? (
        <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-emerald-500/40 bg-emerald-500/5 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Tier 3 Dossier Submitted!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your documentation has been securely transferred to the Chief Compliance Officer under FINMA guidelines. Case Ref: <strong className="text-[#D4AF37] font-mono">KYC-HNW-2026-902</strong>.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/customer/kyc"
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md inline-block"
            >
              View Verification Status &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Stepper Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                step === 1
                  ? 'gold-gradient-bg text-slate-950 shadow-md font-bold'
                  : isStep1Valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-white dark:bg-[#0A0E17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                <span>Step 01</span>
                {isStep1Valid && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-xs font-extrabold truncate">Identity Verification</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => isStep1Valid && setStep(2)}
              disabled={!isStep1Valid}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                step === 2
                  ? 'gold-gradient-bg text-slate-950 shadow-md font-bold'
                  : isStep2Valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : isStep1Valid
                  ? 'bg-white dark:bg-[#0A0E17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  : 'bg-slate-100 dark:bg-[#070A10] border-slate-200 dark:border-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                <span>Step 02</span>
                {isStep2Valid && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-extrabold truncate">Source of Wealth</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => isStep2Valid && setStep(3)}
              disabled={!isStep2Valid}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                step === 3
                  ? 'gold-gradient-bg text-slate-950 shadow-md font-bold'
                  : isStep3Valid
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : isStep2Valid
                  ? 'bg-white dark:bg-[#0A0E17] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  : 'bg-slate-100 dark:bg-[#070A10] border-slate-200 dark:border-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                <span>Step 03</span>
                {isStep3Valid && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-extrabold truncate">Compliance Declarations</span>
              </div>
            </button>
          </div>

          {/* Form Wizard Body */}
          <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <span>Personal Identification &amp; Passport Details</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">Step 1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Legal Name (as in Passport) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alexander von Bern"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Passport / National ID Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CH-X8890124"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tax Residency Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={taxResidency}
                      onChange={(e) => setTaxResidency(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Upload Passport */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Certified Passport Scan (PDF/JPG) *</span>
                  </label>

                  {uploadedFiles.passport ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {uploadedFiles.passport.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {uploadedFiles.passport.size}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('passport')}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => passportFileRef.current?.click()}
                      className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl hover:border-amber-500/50 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer bg-slate-50/50 dark:bg-[#090D15]/50"
                    >
                      <Upload className="w-6 h-6 text-amber-500" />
                      <span className="text-xs font-bold">Click to Browse &amp; Upload Passport Copy</span>
                    </button>
                  )}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleProceedToStep2}
                    className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md cursor-pointer"
                  >
                    Proceed to Step 2: Source of Wealth &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>Source of Wealth &amp; Financial Background</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">Step 2 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Primary Source of Wealth *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Business Ownership / Capital Gains / Family Inheritance"
                      value={sourceOfFunds}
                      onChange={(e) => setSourceOfFunds(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Expected Annual Bullion Allocation Volume
                    </label>
                    <select
                      value={expectedAnnualVolume}
                      onChange={(e) => setExpectedAnnualVolume(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="€250k - €500k">€250k - €500k (Private Investor)</option>
                      <option value="€500k - €2M">€500k - €2M (High Net Worth)</option>
                      <option value="> €2M">&gt; €2M (Family Office / Institutional)</option>
                    </select>
                  </div>
                </div>

                {/* Uploads: Proof of Address & Source of Wealth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Proof of Residential Address (&lt; 3 months) *
                    </label>
                    {uploadedFiles.proofOfAddress ? (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {uploadedFiles.proofOfAddress.name}
                        </span>
                        <button type="button" onClick={() => removeFile('proofOfAddress')} className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => proofOfAddressRef.current?.click()}
                        className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-white cursor-pointer"
                      >
                        <Upload className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-bold">Upload Utility Bill / Bank Statement</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Source of Wealth Proof (Tax Return / Portfolio) *
                    </label>
                    {uploadedFiles.sourceOfWealth ? (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {uploadedFiles.sourceOfWealth.name}
                        </span>
                        <button type="button" onClick={() => removeFile('sourceOfWealth')} className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sourceOfWealthRef.current?.click()}
                        className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-white cursor-pointer"
                      >
                        <Upload className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-bold">Upload Wealth Evidence PDF</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    &larr; Back to Step 1
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToStep3}
                    className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md cursor-pointer"
                  >
                    Proceed to Step 3: Declarations &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmitFinal} className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Regulatory &amp; Politically Exposed Person (PEP) Declarations</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#D4AF37]">Step 3 of 3</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={pepDeclaration}
                        onChange={(e) => setPepDeclaration(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#D4AF37]"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        I confirm that neither I nor any direct family members are Politically Exposed Persons (PEPs) as defined under Swiss Anti-Money Laundering legislation and EU Directives.
                      </span>
                    </label>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#D4AF37]"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        I declare that all funds used for precious metals purchases are 100% tax-compliant and originate from legitimate, non-sanctioned sources.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    &larr; Back to Step 2
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isStep3Valid}
                    className={`px-8 py-2.5 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-2 cursor-pointer transition-all ${
                      isStep3Valid && !isSubmitting
                        ? 'gold-gradient-bg hover:brightness-110 text-slate-950'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Encrypting &amp; Submitting...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Submit Tier 3 Upgrade Dossier</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
