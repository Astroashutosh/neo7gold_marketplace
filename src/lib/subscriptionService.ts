import { getApi, postApi, putApi, patchApi, deleteApi, ApiResponse, buildQueryString } from './api';

export interface SubscriptionPlanItem {
  id: string; // e.g. PLAN-1
  numeric_id: number;
  name: string;
  slug: string;
  badge: string;
  price: string;
  price_formatted: string;
  billing_interval: string;
  min_points: number;
  discount_percentage: number;
  cashback_reward: string;
  vault_storage_discount_percent: number;
  vault_storage_included: string;
  badge_color: string;
  description: string | null;
  perks: string[];
  active_subscribers: number;
  monthly_revenue: string;
  status: 'Active' | 'Inactive';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SubscriptionMetrics {
  total_plans: number;
  active_plans: number;
  total_subscribers: number;
  monthly_recurring_revenue: string;
  monthly_recurring_revenue_raw: number;
  average_privilege_discount: string;
}

export async function fetchAdminSubscriptions(
  token: string,
  params?: Record<string, any>
): Promise<ApiResponse<{ plans: SubscriptionPlanItem[]; tiers: SubscriptionPlanItem[]; metrics: SubscriptionMetrics }>> {
  const query = buildQueryString(params);
  return getApi<ApiResponse<{ plans: SubscriptionPlanItem[]; tiers: SubscriptionPlanItem[]; metrics: SubscriptionMetrics }>>(
    `/admin/subscriptions${query}`,
    token
  );
}

export async function fetchAdminSubscriptionDetail(
  token: string,
  id: number | string
): Promise<ApiResponse<{ plan: SubscriptionPlanItem; tier: SubscriptionPlanItem }>> {
  const cleanId = String(id).replace(/^PLAN-/, '');
  return getApi<ApiResponse<{ plan: SubscriptionPlanItem; tier: SubscriptionPlanItem }>>(
    `/admin/subscriptions/${cleanId}`,
    token
  );
}

export async function saveAdminSubscription(
  token: string,
  data: Record<string, any>,
  id?: number | string
): Promise<ApiResponse<{ plan: SubscriptionPlanItem }>> {
  if (id) {
    const cleanId = String(id).replace(/^PLAN-/, '');
    return putApi<ApiResponse<{ plan: SubscriptionPlanItem }>>(`/admin/subscriptions/${cleanId}`, data, token);
  }
  return postApi<ApiResponse<{ plan: SubscriptionPlanItem }>>('/admin/subscriptions', data, token);
}

export async function toggleAdminSubscriptionStatus(
  token: string,
  id: number | string,
  status?: boolean
): Promise<ApiResponse<{ plan: SubscriptionPlanItem; is_active: boolean }>> {
  const cleanId = String(id).replace(/^PLAN-/, '');
  return patchApi<ApiResponse<{ plan: SubscriptionPlanItem; is_active: boolean }>>(
    `/admin/subscriptions/${cleanId}/status`,
    status !== undefined ? { status } : {},
    token
  );
}

export async function deleteAdminSubscription(
  token: string,
  id: number | string
): Promise<ApiResponse> {
  const cleanId = String(id).replace(/^PLAN-/, '');
  return deleteApi<ApiResponse>(`/admin/subscriptions/${cleanId}`, token);
}

// Legacy Tiers Wrappers
export async function fetchAdminTiers(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  return fetchAdminSubscriptions(token, params);
}

export async function saveAdminTier(token: string, data: any, id?: number | string): Promise<ApiResponse> {
  return saveAdminSubscription(token, data, id);
}

export async function deleteAdminTier(token: string, id: number | string): Promise<ApiResponse> {
  return deleteAdminSubscription(token, id);
}
