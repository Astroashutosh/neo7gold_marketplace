import { getApi, postApi, putApi } from './api';

export interface KycDocument {
  name: string;
  type: 'Passport / National ID' | 'Driver License' | 'Proof of Address (<90d)' | 'Selfie Liveness Scan';
  size: string;
  uploadedAt: string;
  expiresAt: string;
  status: 'Verified (Valid)' | 'Expiring Soon' | 'Under Review' | 'Tamper-Check Passed';
  mrzValid: boolean;
}

export interface KycCase {
  id: number;
  case_number: string;
  case_type: 'kyc';
  entity_name: string;
  email: string;
  phone: string;
  country: string;
  nationality: string;
  id_type: 'Passport' | 'National Identity Card' | 'EU Driving Permit';
  id_number: string;
  id_expiration: string;
  liveness_score: number;
  liveness_status: 'Passed (99.8%)' | 'Passed (99.5%)' | 'Passed (99.2%)' | 'Passed (98.4%)' | 'Manual Review Required' | string;
  address_status: 'Verified (<90 Days)' | 'Awaiting Proof' | 'Rejected (Outdated)';
  pep_sanctions_status: 'Clean (Passed)' | 'PEP Match' | 'Sanctions Match' | 'False Positive Cleared';
  jurisdiction: 'Swiss FINMA GwG' | 'EU 5AMLD / 6AMLD' | 'German GwG' | 'UK MLR' | 'UK MLR / FATF' | 'UAE CBUAE / FATF' | string;
  vault_tier: 'Tier 1 (€10k Cap)' | 'Tier 2 (Unlimited Vault)';
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  last_audited_by?: string;
  notes?: string;
  documents?: KycDocument[];
  audit_trail?: { timestamp: string; officer: string; action: string; note: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface UboEntity {
  name: string;
  nationality: string;
  shareholdingPercent: number;
  passportNumber: string;
  pepStatus: 'Clean' | 'PEP Check Passed' | 'Flagged PEP';
}

export interface KybDocument {
  name: string;
  file_name?: string;
  label?: string;
  type: string;
  size: string;
  uploadedAt?: string;
  uploaded_at?: string;
  expiresAt?: string;
  status: string;
  path?: string;
  url?: string;
  stream_url?: string;
  mrzValid?: boolean;
}

export interface KybCase {
  id: number;
  case_number: string;
  case_type: 'kyb';
  entity_name: string;
  email: string;
  phone: string;
  country: string;
  registration_jurisdiction: 'Swiss Commercial Register (UID)' | 'German Handelsregister (HRB)' | 'France RCS' | 'UK Companies House' | string;
  legal_entity_number: string;
  business_type: 'Precious Metals Refiner' | 'Jewelry Manufacturer / Atelier' | 'B2B Bullion Wholesaler' | 'Gemological Lab' | string;
  representative_name: string;
  representative_role: string;
  vat_number: string;
  assay_license_number: string;
  assay_license_expiry: string;
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  last_audited_by?: string;
  notes?: string;
  ubos?: UboEntity[];
  documents?: KybDocument[];
  audit_trail?: { timestamp: string; officer: string; action: string; note: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface ComplianceBadges {
  kyc_pending: number;
  kyb_pending: number;
  kyb_rejected?: number;
  kyc_pep: number;
  kyc_escalated: number;
}

export async function rekybSeller(
  token: string | undefined,
  sellerId: number | string,
  reason?: string
): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    return await postApi<{ success: boolean; message?: string; data?: any }>(
      `/admin/sellers/${sellerId}/rekyb`,
      { reason },
      token
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to trigger Re-KYB.' };
  }
}

export async function fetchComplianceBadges(token?: string): Promise<{ success: boolean; data?: ComplianceBadges; message?: string }> {
  try {
    return await getApi<{ success: boolean; data?: ComplianceBadges; message?: string }>('/admin/compliance/badges', token);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch compliance badges.' };
  }
}

export async function fetchKycCases(
  token?: string,
  filter?: string
): Promise<{ success: boolean; data?: { cases: KycCase[]; badges: ComplianceBadges }; message?: string }> {
  try {
    const query = filter && filter !== 'all' ? `?filter=${encodeURIComponent(filter)}` : '';
    return await getApi<{ success: boolean; data?: { cases: KycCase[]; badges: ComplianceBadges }; message?: string }>(
      `/admin/compliance/kyc${query}`,
      token
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch KYC cases.' };
  }
}

export async function fetchKybCases(
  token?: string,
  filter?: string
): Promise<{ success: boolean; data?: { cases: KybCase[]; badges: ComplianceBadges }; message?: string }> {
  try {
    const query = filter && filter !== 'all' ? `?filter=${encodeURIComponent(filter)}` : '';
    return await getApi<{ success: boolean; data?: { cases: KybCase[]; badges: ComplianceBadges }; message?: string }>(
      `/admin/compliance/kyb${query}`,
      token
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch KYB cases.' };
  }
}

export async function fetchComplianceCase(
  token?: string,
  id?: number | string
): Promise<{ success: boolean; data?: { case: KycCase | KybCase }; message?: string }> {
  try {
    return await getApi<{ success: boolean; data?: { case: KycCase | KybCase }; message?: string }>(
      `/admin/compliance/cases/${id}`,
      token
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch compliance case.' };
  }
}

export async function updateComplianceCaseStatus(
  token: string | undefined,
  id: number | string,
  data: { status: 'pending' | 'approved' | 'rejected' | 'escalated'; risk_level?: string; notes?: string; officer?: string }
): Promise<{ success: boolean; message?: string; data?: { case: KycCase | KybCase } }> {
  try {
    return await putApi<{ success: boolean; message?: string; data?: { case: KycCase | KybCase } }>(
      `/admin/compliance/cases/${id}/status`,
      data,
      token
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update compliance case status.' };
  }
}
