'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
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
  Factory,
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { DataTable, Column } from '@/components/DataTable';
import { useAuth } from '@/context/AuthContext';
import {
  fetchKybCases,
  updateComplianceCaseStatus,
  KybCase,
  ComplianceBadges
} from '@/lib/complianceService';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/lib/sweetalert';
import DocumentPreviewModal, { PreviewableDocument } from './DocumentPreviewModal';

interface KybCasesViewProps {
  fixedCategory?: 'all' | 'pending' | 'refiners' | 'ateliers' | 'approved' | 'rejected';
  pageTitle?: string;
  pageSubtitle?: string;
}

export default function KybCasesView({
  fixedCategory = 'all',
  pageTitle = 'KYB Corporate Verification & Institutional Audits',
  pageSubtitle = 'LBMA smelters, precious metal refiners, jewelry ateliers, and B2B wholesale bullion traders'
}: KybCasesViewProps) {
  const { token, user } = useAuth();

  const [cases, setCases] = useState<KybCase[]>([]);
  const [badges, setBadges] = useState<ComplianceBadges>({
    kyc_pending: 0,
    kyb_pending: 0,
    kyc_pep: 0,
    kyc_escalated: 0,
  });
  const [selectedCase, setSelectedCase] = useState<KybCase | null>(null);
  const [previewDoc, setPreviewDoc] = useState<PreviewableDocument | null>(null);
  const [rejectingCase, setRejectingCase] = useState<KybCase | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [auditNote, setAuditNote] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchKybCases(token || undefined, fixedCategory);
      if (res && res.success && res.data) {
        setCases(res.data.cases || []);
        if (res.data.badges) {
          setBadges(res.data.badges);
        }
      } else {
        showErrorAlert('Error', res?.message || 'Failed to load KYB cases.');
      }
    } catch (err: any) {
      showErrorAlert('Error', err?.message || 'Network error fetching KYB cases.');
    } finally {
      setIsLoading(false);
    }
  }, [token, fixedCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleConfirmRejection = async () => {
    if (!rejectingCase) return;
    if (!rejectReason.trim()) {
      showErrorAlert('Reason Required', 'Please enter the specific compliance reason for rejection.');
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await updateComplianceCaseStatus(token || undefined, rejectingCase.id, {
        status: 'rejected',
        risk_level: 'high',
        notes: rejectReason.trim(),
        officer: user?.name || 'Chief Corporate Compliance Auditor',
      });

      if (res && res.success) {
        showSuccessAlert(
          'Dossier Rejected',
          `KYB Entity ${rejectingCase.case_number} (${rejectingCase.entity_name}) marked as rejected. Observations recorded for seller revision.`
        );
        setRejectingCase(null);
        setRejectReason('');
        setSelectedCase(null);
        loadData();
      } else {
        showErrorAlert('Error', res?.message || 'Failed to reject KYB case.');
      }
    } catch (err: any) {
      showErrorAlert('Error', err?.message || 'Network error rejecting case.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateStatus = async (
    targetCase: KybCase,
    newStatus: 'approved' | 'rejected' | 'escalated' | 'pending',
    riskLevel?: string,
    actionLabel?: string
  ) => {
    if (newStatus === 'rejected') {
      setRejectReason('');
      setRejectingCase(targetCase);
      return;
    }

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
        notes: auditNote || `Status changed to ${newStatus} by corporate compliance auditor.`,
        officer: user?.name || 'Chief Corporate Compliance Auditor',
      });

      if (res && res.success) {
        showSuccessAlert('Success', res.message || `KYB Entity ${targetCase.case_number} updated.`);
        setSelectedCase(null);
        setAuditNote('');
        loadData();
      } else {
        showErrorAlert('Error', res?.message || 'Failed to update KYB case.');
      }
    } catch (err: any) {
      showErrorAlert('Error', err?.message || 'Network error updating case.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const navTabs = [
    { label: 'All Corporate Entities', path: '/dashboard/admin/kyb', key: 'all', count: cases.length },
    { label: 'Pending KYB Audits', path: '/dashboard/admin/kyb/pending', key: 'pending', count: badges.kyb_pending },
    { label: 'Refiners & Smelters', path: '/dashboard/admin/kyb/refiners', key: 'refiners', count: cases.filter(c => c.business_type.includes('Refiner')).length },
    { label: 'Jewelry Ateliers & Guilds', path: '/dashboard/admin/kyb/ateliers', key: 'ateliers', count: cases.filter(c => c.business_type.includes('Jewelry') || c.business_type.includes('Atelier')).length },
    { label: 'Approved Wholesale KYB', path: '/dashboard/admin/kyb/approved', key: 'approved', count: cases.filter(c => c.status === 'approved').length },
    { label: 'Rejected KYB Audits', path: '/dashboard/admin/kyb/rejected', key: 'rejected', count: badges.kyb_rejected !== undefined ? badges.kyb_rejected : cases.filter(c => c.status === 'rejected').length },
  ];

  const columns: Column<KybCase>[] = [
    {
      header: 'Corporate Entity & Reg',
      accessorKey: 'case_number',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-xs truncate">{row.entity_name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {row.case_number}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <span>{row.legal_entity_number}</span>
              <span>•</span>
              <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">{row.country}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Business Sector',
      accessorKey: 'business_type',
      cell: (row) => (
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            {row.business_type.includes('Refiner') ? (
              <Factory className="w-3.5 h-3.5 text-amber-500" />
            ) : row.business_type.includes('Jewelry') ? (
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            ) : (
              <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
            {row.business_type}
          </span>
          <span className="text-[10px] text-slate-500 block truncate">
            {row.registration_jurisdiction}
          </span>
        </div>
      ),
    },
    {
      header: 'Authorized Representative',
      accessorKey: 'representative_name',
      cell: (row) => (
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 block truncate">
            {row.representative_name}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            {row.representative_role}
          </span>
        </div>
      ),
    },
    {
      header: 'Assay Smelting License',
      accessorKey: 'assay_license_number',
      cell: (row) => (
        <div className="space-y-0.5">
          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 block">
            {row.assay_license_number}
          </span>
          <span className="text-[10px] text-slate-500 block">
            Valid until {row.assay_license_expiry ? new Date(row.assay_license_expiry).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      header: 'Risk Profile',
      accessorKey: 'risk_score',
      cell: (row) => {
        const isHigh = row.risk_score >= 50 || row.risk_level === 'high' || row.risk_level === 'critical';
        return (
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-black font-mono uppercase tracking-wider ${
              isHigh
                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
            }`}
          >
            {row.risk_level} ({row.risk_score}/100)
          </span>
        );
      },
    },
    {
      header: 'KYB Status',
      accessorKey: 'status',
      cell: (row) => {
        const config = {
          approved: { bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', label: 'Approved Wholesale' },
          pending: { bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30', label: 'Pending Audit' },
          escalated: { bg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30', label: 'Escalated' },
          rejected: { bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30', label: 'Rejected' },
        }[row.status] || { bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30', label: row.status };

        return (
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${config.bg}`}>
              {config.label}
            </span>
            {row.status === 'rejected' && row.notes && (
              <span className="text-[10px] text-rose-400 block truncate max-w-[200px]" title={row.notes}>
                Reason: {row.notes}
              </span>
            )}
            {row.last_audited_by && (
              <span className="text-[9px] text-slate-400 block truncate font-mono">
                Auditor: {row.last_audited_by}
              </span>
            )}
          </div>
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
            title="Inspect KYB Dossier & Files"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status !== 'approved' && (
            <button
              onClick={() => handleUpdateStatus(row, 'approved', 'low', 'Approve KYB Entity')}
              disabled={isActionLoading}
              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
              title="Approve Wholesale Entity"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {row.status !== 'rejected' && (
            <button
              onClick={() => {
                setRejectReason('');
                setRejectingCase(row);
              }}
              disabled={isActionLoading}
              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
              title="Reject Entity with Observation Note"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
          {row.status !== 'escalated' && (
            <button
              onClick={() => handleUpdateStatus(row, 'escalated', 'high', 'Escalate KYB Audit')}
              disabled={isActionLoading}
              className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition-colors"
              title="Escalate Audit"
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
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
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
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Entities</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">{cases.length}</div>
          <span className="text-[11px] text-slate-500">Active corporate registries</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending KYB Audits</span>
          <div className="text-2xl font-bold font-mono text-amber-500 mt-1">{badges.kyb_pending}</div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400">Awaiting annual trade audit</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Licensed Refiners</span>
          <div className="text-2xl font-bold font-mono text-cyan-500 mt-1">
            {cases.filter(c => c.business_type.includes('Refiner')).length}
          </div>
          <span className="text-[11px] text-cyan-600 dark:text-cyan-400">LBMA & Swiss compliant</span>
        </div>
        <div className="luxury-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Approved Wholesale</span>
          <div className="text-2xl font-bold font-mono text-emerald-500 mt-1">
            {cases.filter(c => c.status === 'approved').length}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Full platform trading access</span>
        </div>
      </div>

      {/* Dedicated Status Sub-Menu Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        {navTabs.map((tab) => {
          const isActive = fixedCategory === tab.key;
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
        searchPlaceholder="Search by company name, registration number, country, representative..."
        exportFilename={`kyb_corporate_${fixedCategory}_export`}
        tableTitle={`${pageTitle} (${cases.length} Entities)`}
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
                    Jurisdiction: <strong className="text-slate-900 dark:text-white">{selectedCase.registration_jurisdiction}</strong>
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
                  <span className="text-slate-500 block">Registration & VAT:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-200 block">
                    UID: {selectedCase.legal_entity_number}
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">VAT: {selectedCase.vat_number}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Sector & Country:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200 block">
                    {selectedCase.business_type}
                  </span>
                  <span className="text-slate-500 text-[11px]">{selectedCase.country}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Representative & Role:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200 block">
                    {selectedCase.representative_name}
                  </span>
                  <span className="text-slate-500 text-[11px]">{selectedCase.representative_role}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Assay Smelting License:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block">
                    {selectedCase.assay_license_number}
                  </span>
                  <span className="text-slate-500 text-[10px]">
                    Expiry: {selectedCase.assay_license_expiry ? new Date(selectedCase.assay_license_expiry).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>

              {/* UBO Ownership Structure */}
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  Ultimate Beneficial Owners (UBOs) - 25%+ Ownership:
                </span>
                <div className="space-y-2">
                  {selectedCase.ubos && selectedCase.ubos.length > 0 ? (
                    selectedCase.ubos.map((ubo, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-[11px]"
                      >
                        <div>
                          <span className="font-bold text-slate-900 dark:text-slate-200 block">{ubo.name}</span>
                          <span className="text-slate-500 text-[10px]">
                            Nationality: {ubo.nationality} • Passport / Reg: {ubo.passportNumber}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-amber-500 text-xs block">
                            {ubo.shareholdingPercent}% Shareholding
                          </span>
                          <span className="text-[10px] text-emerald-500 font-semibold">{ubo.pepStatus}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-500 text-xs">No UBO records attached.</span>
                  )}
                </div>
              </div>

              {/* Verified Documents */}
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-2 flex items-center justify-between">
                  <span>Corporate Documentation Dossier ({selectedCase.documents?.length || 0} files):</span>
                  <span className="text-[10px] font-normal text-slate-500 font-mono">Click 'View File' to preview photos or PDFs</span>
                </span>
                <div className="space-y-2">
                  {selectedCase.documents && selectedCase.documents.length > 0 ? (
                    selectedCase.documents.map((doc, idx) => {
                      const title = doc.label || doc.type || doc.name || 'Verification Document';
                      const fileName = doc.file_name || doc.name || 'document.pdf';
                      const dateStr = doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : (doc.uploadedAt || 'Uploaded');
                      const docUrl = doc.stream_url || doc.url || (doc.path ? `/storage/${doc.path}` : null);

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-[11px]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 dark:text-slate-200 block truncate">{title}</span>
                              <span className="text-slate-500 text-[10px] block truncate font-mono">
                                {fileName} {doc.size ? `• ${doc.size}` : ''} • {dateStr}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-amber-500/30 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                              title="Preview uploaded document or photo"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View File</span>
                            </button>

                            {docUrl && (
                              <a
                                href={docUrl}
                                download={fileName}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                                title="Download raw file"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-slate-500 text-xs">No corporate documents uploaded.</span>
                  )}
                </div>
              </div>

              {/* Audit Trail */}
              {selectedCase.audit_trail && selectedCase.audit_trail.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-1.5">Compliance Audit History:</span>
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
                  Auditor Audit Decision Note:
                </label>
                <textarea
                  value={auditNote}
                  onChange={(e) => setAuditNote(e.target.value)}
                  placeholder="Enter assay certificate validation, UID registry extract review, or wholesale conditions..."
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
                  onClick={() => {
                    setRejectReason('');
                    setRejectingCase(selectedCase);
                  }}
                  disabled={isActionLoading}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs"
                >
                  Reject with Reason
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedCase, 'escalated', 'high', 'Escalate Audit')}
                  disabled={isActionLoading}
                  className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs"
                >
                  Escalate Audit
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedCase, 'approved', 'low', 'Approve Wholesale KYB')}
                  disabled={isActionLoading}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Wholesale KYB</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Rejection Reason Modal */}
      {rejectingCase && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="luxury-glass border border-rose-500/40 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl bg-white dark:bg-[#0B0F17] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>Reject KYB Verification Dossier</span>
              </div>
              <button
                onClick={() => setRejectingCase(null)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                You are rejecting Case <strong className="text-slate-900 dark:text-white font-mono">{rejectingCase.case_number}</strong> for <strong className="text-slate-900 dark:text-white">{rejectingCase.entity_name}</strong>.
              </p>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-[11px] leading-relaxed">
                <strong>Compliance Protocol:</strong> A rejection reason is mandatory. The seller will see this exact message so they know what documents to fix before resubmitting.
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-300 block">
                  Mandatory Compliance Rejection Reason: <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., State Assay Office accreditation certificate expired Dec 2025; UBO passport photograph was blurred; or legal entity name mismatch..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 block w-full">Quick observation suggestions:</span>
                {[
                  'Assay license expired',
                  'Passport copy blurred/unreadable',
                  'Commercial registry extract outdated (>90d)',
                  'Hallmark stamp impression unclear',
                  'VAT / UID registration mismatch',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setRejectReason((prev) => (prev ? `${prev}; ${tag}` : tag))}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setRejectingCase(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRejection}
                disabled={isActionLoading || !rejectReason.trim()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-rose-900/20"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Confirm & Send Rejection to Seller</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real In-Modal File Previewer (PDF & Photos) */}
      <DocumentPreviewModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
}
