'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  AlertTriangle,
  Clock,
  Eye,
  Check,
  ExternalLink,
  Lock,
  Download,
  Filter,
  Globe,
  Sliders,
  Sparkles,
  RefreshCw,
  Award,
  AlertCircle
} from 'lucide-react';
import { DataTable, Column } from '@/components/DataTable';
import { useAuth } from '@/context/AuthContext';
import {
  fetchKycCases,
  updateComplianceCaseStatus,
  KycCase,
  ComplianceBadges
} from '@/lib/complianceService';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/lib/sweetalert';

interface KycCasesViewProps {
  fixedStatus?: 'all' | 'pending' | 'approved' | 'pep' | 'escalated';
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function KycCasesView({
  fixedStatus = 'all',
  pageTitle = 'KYC Tier 2 Verification & Biometrics',
  pageSubtitle = 'FINMA GwG, EU 5AMLD & UK MLR compliant identity verification and PEP / Sanctions screening'
}: KycCasesViewProps) {
  const { token, user } = useAuth();

  const [cases, setCases] = useState<KycCase[]>([]);
  const [badges, setBadges] = useState<ComplianceBadges>({
    kyc_pending: 0,
    kyb_pending: 0,
    kyc_pep: 0,
    kyc_escalated: 0,
  });
  const [selectedCase, setSelectedCase] = useState<KycCase | null>(null);
  const [auditNote, setAuditNote] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchKycCases(token || undefined, fixedStatus);
      if (res && res.success && res.data) {
        setCases(res.data.cases || []);
        if (res.data.badges) {
          setBadges(res.data.badges);
        }
      } else {
        showErrorAlert('Error', res?.message || 'Failed to load KYC cases.');
      }
    } catch (err: any) {
      showErrorAlert('Error', err?.message || 'Network error fetching KYC cases.');
    } finally {
      setIsLoading(false);
    }
  }, [token, fixedStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateStatus = async (
    targetCase: KycCase,
    newStatus: 'approved' | 'rejected' | 'escalated' | 'pending',
    riskLevel?: string,
    actionLabel?: string
  ) => {
    const confirmed = await showConfirmAlert(
      `${actionLabel || 'Update Status'}?`,
      `Are you sure you want to mark ${targetCase.case_number} (${targetCase.entity_name}) as ${newStatus.toUpperCase()}?`
    );
    if (!confirmed) return;

    setIsActionLoading(true);
    try {
      const res = await updateComplianceCaseStatus(token || undefined, targetCase.id, {
        status: newStatus,
        risk_level: riskLevel || targetCase.risk_level,
        notes: auditNote || `Status changed to ${newStatus} by compliance officer.`,
        officer: user?.name || 'Senior Compliance Officer',
      });

      if (res && res.success) {
        showSuccessAlert('Success', res.message || `KYC Case ${targetCase.case_number} updated.`);
        setSelectedCase(null);
        setAuditNote('');
        loadData();
      } else {
        showErrorAlert('Error', res?.message || 'Failed to update KYC case.');
      }
    } catch (err: any) {
      showErrorAlert('Error', err?.message || 'Network error updating case.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const navTabs = [
    { label: 'All Submissions', path: '/dashboard/admin/kyc', key: 'all', count: cases.length },
    { label: 'Pending Review', path: '/dashboard/admin/kyc/pending', key: 'pending', count: badges.kyc_pending },
    { label: 'Approved Tier 2', path: '/dashboard/admin/kyc/approved', key: 'approved', count: cases.filter(c => c.status === 'approved').length },
    { label: 'PEP / Flagged Matches', path: '/dashboard/admin/kyc/pep', key: 'pep', count: badges.kyc_pep },
    { label: 'Escalated (EDD)', path: '/dashboard/admin/kyc/escalated', key: 'escalated', count: badges.kyc_escalated },
  ];

  const columns: Column<KycCase>[] = [
    {
      header: 'Client & Identifier',
      accessorKey: 'case_number',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs shrink-0">
            {row.entity_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-xs truncate">{row.entity_name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {row.case_number}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="truncate">{row.email}</span>
              <span>•</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{row.country}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Jurisdiction & Tier',
      accessorKey: 'jurisdiction',
      cell: (row) => (
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            <Globe className="w-3 h-3 text-[#D4AF37]" />
            {row.jurisdiction}
          </span>
          <div className="text-[10px] font-medium text-amber-600 dark:text-amber-400/90 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            {row.vault_tier}
          </div>
        </div>
      ),
    },
    {
      header: 'Biometric & Liveness',
      accessorKey: 'liveness_score',
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${
                row.liveness_score >= 99
                  ? 'bg-emerald-500'
                  : row.liveness_score >= 98
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
              {Number(row.liveness_score).toFixed(1)}%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            {row.liveness_status}
          </span>
        </div>
      ),
    },
    {
      header: 'PEP / Sanctions',
      accessorKey: 'pep_sanctions_status',
      cell: (row) => {
        const isMatch =
          row.pep_sanctions_status.includes('PEP') || row.pep_sanctions_status.includes('Sanctions');
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
              isMatch
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {isMatch ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            {row.pep_sanctions_status}
          </span>
        );
      },
    },
    {
      header: 'Risk Score',
      accessorKey: 'risk_score',
      cell: (row) => {
        const isHigh = row.risk_score >= 50 || row.risk_level === 'high' || row.risk_level === 'critical';
        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black font-mono uppercase tracking-wider ${
                isHigh
                  ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
              }`}
            >
              {row.risk_level} ({row.risk_score}/100)
            </span>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => {
        const config = {
          approved: { bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', label: 'Approved' },
          pending: { bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30', label: 'Pending Review' },
          escalated: { bg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30', label: 'Escalated (EDD)' },
          rejected: { bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30', label: 'Rejected' },
        }[row.status] || { bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30', label: row.status };

        return (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${config.bg}`}>
            {config.label}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedCase(row)}
            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] transition-colors"
            title="Inspect Dossier"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status !== 'approved' && (
            <button
              onClick={() => handleUpdateStatus(row, 'approved', 'low', 'Approve Tier 2')}
              disabled={isActionLoading}
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
              title="Approve Client"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {row.status !== 'escalated' && (
            <button
              onClick={() => handleUpdateStatus(row, 'escalated', 'high', 'Escalate EDD')}
              disabled={isActionLoading}
              className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors"
              title="Escalate to Enhanced Due Diligence"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{pageTitle}</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{pageSubtitle}</p>
        </div>
        <button
          onClick={loadData}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Filtered Cases</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">{cases.length}</div>
          <span className="text-[11px] text-slate-500">Live MySQL records</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Review</span>
          <div className="text-2xl font-bold font-mono text-amber-500 mt-1">{badges.kyc_pending}</div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400">Awaiting compliance sign-off</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">PEP / Flagged Matches</span>
          <div className="text-2xl font-bold font-mono text-rose-500 mt-1">{badges.kyc_pep}</div>
          <span className="text-[11px] text-rose-600 dark:text-rose-400">Screening alert active</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Escalated (EDD)</span>
          <div className="text-2xl font-bold font-mono text-purple-500 mt-1">{badges.kyc_escalated}</div>
          <span className="text-[11px] text-purple-600 dark:text-purple-400">Senior audit required</span>
        </div>
      </div>

      {/* Dedicated Status Sub-Menu Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {navTabs.map((tab) => {
          const isActive = fixedStatus === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.path}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-[#D4AF37] text-black font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Main Data Table */}
      <DataTable
        data={cases}
        columns={columns}
        searchPlaceholder="Search by client name, case ID, email, ID number, country..."
        exportFilename={`kyc_compliance_${fixedStatus}_export`}
        tableTitle={`${pageTitle} (${cases.length} Dossiers)`}
      />

      {/* Dossier Detail Inspection Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="luxury-glass border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl bg-white dark:bg-[#0B0F17] my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-[#D4AF37] font-bold">
                    {selectedCase.case_number}
                  </span>
                  <span className="text-xs text-slate-500">
                    Jurisdiction: <strong className="text-slate-900 dark:text-white">{selectedCase.jurisdiction}</strong>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedCase.entity_name}</h2>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 block">Email & Phone:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{selectedCase.email}</span>
                  <span className="text-slate-500 block text-[11px]">{selectedCase.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Country & Nationality:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {selectedCase.country} ({selectedCase.nationality})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Identity Document:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {selectedCase.id_type}: {selectedCase.id_number}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Expires: {selectedCase.id_expiration ? new Date(selectedCase.id_expiration).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Biometric Liveness:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {Number(selectedCase.liveness_score).toFixed(1)}% ({selectedCase.liveness_status})
                  </span>
                </div>
              </div>

              {/* PEP / Sanctions Alert Box */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 block font-semibold">PEP / Sanctions Screening Status:</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{selectedCase.pep_sanctions_status}</p>
                {selectedCase.notes && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 p-2 rounded-lg mt-1.5 border border-slate-200 dark:border-slate-800">
                    <strong>Case Notes:</strong> {selectedCase.notes}
                  </p>
                )}
              </div>

              {/* Verified Documents */}
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-2">Verified Documents Dossier:</span>
                <div className="space-y-2">
                  {selectedCase.documents && selectedCase.documents.length > 0 ? (
                    selectedCase.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#D4AF37]" />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-200 block">{doc.name}</span>
                            <span className="text-slate-500 text-[10px]">
                              {doc.type} • {doc.size} • Uploaded {doc.uploadedAt}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {doc.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs">No documents uploaded.</span>
                  )}
                </div>
              </div>

              {/* Audit Trail */}
              {selectedCase.audit_trail && selectedCase.audit_trail.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-1.5">Compliance Audit Trail:</span>
                  <div className="space-y-1.5">
                    {selectedCase.audit_trail.map((t, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 text-[11px] border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between font-mono text-[10px] text-slate-500">
                          <span>{t.officer}</span>
                          <span>{t.timestamp}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{t.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audit Note Input */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Compliance Officer Decision Note:
                </label>
                <textarea
                  value={auditNote}
                  onChange={(e) => setAuditNote(e.target.value)}
                  placeholder="Enter audit rationale, verification checks conducted, or EDD conditions..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  rows={2}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Close Dossier
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedCase, 'rejected', 'high', 'Reject Dossier')}
                  disabled={isActionLoading}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedCase, 'escalated', 'high', 'Escalate EDD')}
                  disabled={isActionLoading}
                  className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs"
                >
                  Escalate (EDD)
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedCase, 'approved', 'low', 'Approve Tier 2')}
                  disabled={isActionLoading}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Tier 2 Client</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
