export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export function buildQueryString(params?: Record<string, any>): string {
  if (!params) return '';
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '' && v !== 'undefined' && v !== 'null') {
      clean[k] = String(v);
    }
  }
  const qs = new URLSearchParams(clean).toString();
  return qs ? `?${qs}` : '';
}

export function getStoredAuthToken(explicitToken?: string | null): string | null {
  if (explicitToken && explicitToken !== 'undefined' && explicitToken !== 'null' && explicitToken.trim() !== '') {
    return explicitToken.trim();
  }
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('gold_token') ||
      localStorage.getItem('neos7_customer_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('auth_token') ||
      null
    );
  }
  return null;
}


export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  role: 'super_admin' | 'admin' | 'seller' | 'supplier' | 'b2b' | 'b2b_customer' | 'affiliate' | 'customer';
  company_name?: string;
  contact_person?: string;
  referral_code?: string;
  rank_id?: number;
  rank_tier?: string;
  rank_details?: any;
  kyc_status?: string;
  membership_tier_id?: number;
  membership_tier?: string;
  membership_tier_details?: any;
  loyalty_points?: number;
  department?: string;
  seller_profile?: any;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  demo_otp?: string;
  expires_in_seconds?: number;
}

export interface DashboardResponse {
  success: boolean;
  data: any;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  revoked_sessions_count?: number;
}

/**
 * Global unauthorized (401) handler:
 * Clears local credentials and broadcasts an auth:unauthorized event
 * so that any open browser/tab redirects cleanly to login.
 */
export function handleUnauthorized(endpoint?: string, wasTokenProvided: boolean = true) {
  if (typeof window === 'undefined') return;

  // Never wipe credentials if no token was sent (e.g. unauthenticated guest call)
  if (!wasTokenProvided) {
    return;
  }

  // Do not wipe credentials or redirect during login/recovery forms or background polling
  if (
    endpoint &&
    (endpoint.includes('/login') ||
      endpoint.includes('/forgot-password') ||
      endpoint.includes('/verify-otp') ||
      endpoint.includes('/reset-password') ||
      endpoint.includes('/badges') ||
      endpoint.includes('/notifications') ||
      endpoint.includes('/metals-spot') ||
      endpoint.includes('/rates'))
  ) {
    return;
  }

  try {
    localStorage.removeItem('gold_token');
    localStorage.removeItem('gold_user');
    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
  } catch (e) {
    // Ignore storage issues in restricted browsers
  }

  window.dispatchEvent(
    new CustomEvent('auth:unauthorized', {
      detail: { reason: 'session_expired', endpoint },
    })
  );
}

/**
 * Validates active session token against GET /api/auth/me
 */
export async function verifySessionToken(
  token: string
): Promise<{ success: boolean; user?: User; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (res.status === 401) {
      handleUnauthorized('/auth/me', true);
      return { success: false, message: 'Unauthenticated or revoked session.' };
    }

    if (!res.ok) {
      // Don't wipe session on temporary server or network issues
      return { success: true };
    }

    const data = await res.json();
    return { success: true, user: data.user };
  } catch (err: any) {
    // Allow graceful offline/network blip tolerance
    return { success: true };
  }
}

/**
 * Universal helper for POST requests to the Laravel API
 */
export async function postApi<T>(endpoint: string, payload: any, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

/**
 * Universal helper for PUT requests to the Laravel API
 */
export async function putApi<T>(endpoint: string, payload: any, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

/**
 * Universal helper for PATCH requests to the Laravel API
 */
export async function patchApi<T>(endpoint: string, payload: any, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

/**
 * Universal helper for POST requests with multipart/form-data to the Laravel API
 */
export async function postFormDataApi<T>(endpoint: string, formData: FormData, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

/**
 * Universal helper for GET requests to the Laravel API with Bearer Token
 */
export async function getApi<T>(endpoint: string, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

/**
 * Universal helper for DELETE requests to the Laravel API with Bearer Token
 */
export async function deleteApi<T>(endpoint: string, token?: string | null): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const effectiveToken = getStoredAuthToken(token);
  if (effectiveToken) {
    headers['Authorization'] = `Bearer ${effectiveToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });
  } catch (networkError: any) {
    throw new Error(
      `Cannot reach backend API at ${API_BASE_URL}. Ensure Laravel server is running ("php artisan serve").`
    );
  }

  if (response.status === 401 && effectiveToken) {
    handleUnauthorized(endpoint, true);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'API request failed with status ' + response.status);
  }

  return data;
}

// ==========================================================
// 1. DEDICATED AUTHENTICATION LOGINS (EMAIL OR USERNAME)
// ==========================================================

export async function loginCustomer(login: string, password: string): Promise<AuthResponse> {
  return postApi<AuthResponse>('/auth/login', { login, password });
}

export async function loginSeller(login: string, password: string): Promise<AuthResponse> {
  return postApi<AuthResponse>('/seller/login', { login, password });
}

export async function loginB2B(login: string, password: string): Promise<AuthResponse> {
  return postApi<AuthResponse>('/b2b/login', { login, password });
}

export async function loginAffiliate(login: string, password: string): Promise<AuthResponse> {
  return postApi<AuthResponse>('/affiliate/login', { login, password });
}

export async function loginAdmin(login: string, password: string): Promise<AuthResponse> {
  return postApi<AuthResponse>('/admin/login', { login, password });
}

export async function loginWithApi(login: string, password: string): Promise<AuthResponse> {
  try {
    return await loginCustomer(login, password);
  } catch {
    try {
      return await loginAdmin(login, password);
    } catch {
      try {
        return await loginSeller(login, password);
      } catch {
        try {
          return await loginB2B(login, password);
        } catch {
          return await loginAffiliate(login, password);
        }
      }
    }
  }
}

// ==========================================================
// 2. FORGOT PASSWORD & 10-MINUTE OTP RECOVERY
// ==========================================================

export async function requestPasswordResetOtp(email: string, role = 'customer'): Promise<OtpResponse> {
  return postApi<OtpResponse>('/auth/forgot-password', { email, role });
}

export const requestForgotPasswordOtp = requestPasswordResetOtp;

export async function verifyOtp(email: string, otp: string): Promise<{ success: boolean; message: string }> {
  return postApi('/auth/verify-otp', { email, otp });
}

export async function resetPasswordWithOtp(
  email: string,
  otp: string,
  password: string,
  password_confirmation: string,
  role = 'customer'
): Promise<{ success: boolean; message: string }> {
  return postApi('/auth/reset-password', {
    email,
    otp,
    password,
    password_confirmation,
    role,
  });
}

// ==========================================================
// 3. DASHBOARD METRICS
// ==========================================================

export async function fetchCustomerDashboard(token: string): Promise<DashboardResponse> {
  return getApi<DashboardResponse>('/dashboard/customer', token);
}

export async function fetchSellerDashboard(token?: string): Promise<SellerDashboardResponse> {
  const authToken = getStoredAuthToken(token);
  if (!authToken) {
    return { success: false, message: 'Unauthenticated' };
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/dashboard`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 401) {
        handleUnauthorized('/seller/dashboard');
      }
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.message || 'Failed to fetch seller dashboard data' };
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching seller dashboard:', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function fetchB2bDashboard(token: string): Promise<DashboardResponse> {
  return getApi<DashboardResponse>('/dashboard/b2b', token);
}

export async function fetchAffiliateDashboard(token: string): Promise<DashboardResponse> {
  return getApi<DashboardResponse>('/dashboard/affiliate', token);
}

export async function fetchAdminDashboard(token: string): Promise<DashboardResponse> {
  return getApi<DashboardResponse>('/dashboard/admin', token);
}

// ==========================================================
// 4. SUPER ADMIN GOVERNANCE APIS
// ==========================================================

export async function fetchAdminUsers(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/users${query}`, token);
}

export async function fetchAdminUserDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/users/${id}`, token);
}

export async function updateAdminUser(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/users/${id}`, data, token);
}

export async function fetchAdminSellers(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/sellers${query}`, token);
}

export async function fetchAdminSellerDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/sellers/${id}`, token);
}

export async function updateAdminSeller(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/sellers/${id}`, data, token);
}

export async function fetchAdminSuppliers(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/suppliers${query}`, token);
}

export async function fetchAdminSupplierDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/suppliers/${id}`, token);
}

export async function updateAdminSupplier(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/suppliers/${id}`, data, token);
}

export async function fetchAdminAffiliates(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/affiliates${query}`, token);
}

export async function updateAdminAffiliate(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/affiliates/${id}`, data, token);
}

export async function fetchAdminStaff(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/staff', token);
}

export async function updateAdminStaff(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/staff/${id}`, data, token);
}

export async function fetchAdminProfile(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/profile', token);
}

export async function updateAdminProfile(token: string, data: Record<string, any>): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/profile', data, token);
}

export async function changeAdminPassword(token: string, data: Record<string, any>): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/password', data, token);
}


export async function fetchAdminProducts(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/products${query}`, token);
}

export async function fetchAdminProductDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/products/${id}`, token);
}

export async function saveAdminProduct(token: string, data: any, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/products/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/products', data, token);
}

export async function deleteAdminProduct(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/products/${id}`, token);
}

export async function updateAdminProductStatus(token: string, id: number | string, status: string, is_featured?: boolean): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/products/${id}/status`, { status, is_featured }, token);
}

export async function fetchAdminOrders(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/orders${query}`, token);
}

export async function fetchAdminBuyBack(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/buyback${query}`, token);
}

export async function updateAdminBuyBack(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/buyback/${id}`, data, token);
}

export async function fetchAdminCompliance(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/compliance${query}`, token);
}

export async function updateAdminCompliance(token: string, id: number | string, data: any): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/admin/compliance/${id}`, data, token);
}

export async function fetchAdminMetals(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/metals', token);
}

export async function saveAdminMetalsSpreads(token: string, data: Record<string, any>): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/metals/spreads', data, token);
}

export async function syncAdminMetalsPrices(token?: string): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/metals/sync', {}, token);
}

// 💼 Commission Rules Engine
export interface CommissionRuleItem {
  id: number;
  category: string;
  base_rate: number;
  min_fee: number;
  volume_threshold: string;
  volume_rate: number;
  applies_to: string;
  status: 'Active' | 'Paused' | 'Inactive';
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function fetchAdminCommissionRules(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/commissions', token);
}

export async function fetchAdminCommissionRuleDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/commissions/${id}`, token);
}

export async function saveAdminCommissionRule(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/commissions/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/commissions', data, token);
}

export async function deleteAdminCommissionRule(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/commissions/${id}`, token);
}

// 📖 CMS & Educational Content Suite
export interface CmsArticleItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt?: string | null;
  content?: string | null;
  author: string;
  views_count: number;
  featured_image?: string | null;
  status: 'Published' | 'Draft' | 'Under Review';
  seo_title?: string | null;
  seo_description?: string | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CmsBannerItem {
  id: number;
  banner_code: string;
  title: string;
  section: string;
  image_url?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  impressions: number;
  clicks: number;
  sort_order: number;
  status: 'Live on Homepage' | 'Draft' | 'Scheduled';
  starts_at?: string | null;
  ends_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CmsFaqItem {
  id: number;
  faq_code: string;
  question: string;
  answer: string;
  category: string;
  helpful_votes: number;
  sort_order: number;
  status: 'Published' | 'Draft';
  created_at?: string;
  updated_at?: string;
}

export interface CmsLegalDocItem {
  id: number;
  doc_code: string;
  title: string;
  slug: string;
  jurisdiction: string;
  version: string;
  compliance_body: string;
  content?: string | null;
  effective_date?: string | null;
  status: 'Legally Binding' | 'Under Legal Review' | 'Draft';
  created_at?: string;
  updated_at?: string;
}

export async function fetchAdminCmsArticles(token?: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/cms/articles${query}`, token);
}

export async function fetchAdminCmsArticleDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/cms/articles/${id}`, token);
}

export async function saveAdminCmsArticle(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/cms/articles/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/cms/articles', data, token);
}

export async function deleteAdminCmsArticle(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/cms/articles/${id}`, token);
}

export async function fetchAdminCmsBanners(token?: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/cms/banners${query}`, token);
}

export async function saveAdminCmsBanner(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/cms/banners/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/cms/banners', data, token);
}

export async function deleteAdminCmsBanner(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/cms/banners/${id}`, token);
}

export async function fetchAdminCmsFaqs(token?: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/cms/faqs${query}`, token);
}

export async function saveAdminCmsFaq(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/cms/faqs/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/cms/faqs', data, token);
}

export async function deleteAdminCmsFaq(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/cms/faqs/${id}`, token);
}

export async function fetchAdminCmsLegalDocs(token?: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/cms/legal${query}`, token);
}

export async function saveAdminCmsLegalDoc(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/cms/legal/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/cms/legal', data, token);
}

export async function deleteAdminCmsLegalDoc(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/cms/legal/${id}`, token);
}

// 🛡️ RBAC Administrative Roles & Permissions API
export interface RoleItem {
  id: string;
  db_id?: number;
  code?: string;
  name: string;
  slug?: string;
  department: string;
  description?: string;
  assignedStaffCount: number;
  isSystemRole: boolean;
  permissions: string[];
  status: 'Active' | 'Inactive';
  created_at?: string;
  updated_at?: string;
}

export interface PermissionCatalogItem {
  id: number;
  key: string;
  label: string;
  description: string;
  category: string;
}

export interface StaffMemberItem {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  role_id?: number | null;
  role_name: string;
  role_code: string;
  department: string;
  phone?: string | null;
  office_location?: string | null;
  timezone?: string | null;
  is_active: boolean;
  created_at?: string;
}

export async function fetchAdminRoles(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/roles', token);
}

export async function fetchAdminRoleDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/roles/${id}`, token);
}

export async function saveAdminRole(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/roles/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/roles', data, token);
}

export async function deleteAdminRole(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/roles/${id}`, token);
}

export async function fetchAdminPermissions(token?: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/permissions', token);
}

// 🔐 Two-Factor Authentication (2FA) API
export interface TwoFactorStatusResponse {
  is_enabled: boolean;
  secret_key: string;
  formatted_secret: string;
  otpauth_url: string;
  qr_code_url: string;
  backup_codes: string[];
  confirmed_at?: string | null;
  policies: {
    treasury_disbursements_enforced: boolean;
    staff_role_elevation_enforced: boolean;
    smart_contract_rules_enforced: boolean;
  };
}

export async function fetchAdminTwoFactorSetup(token?: string): Promise<ApiResponse<TwoFactorStatusResponse>> {
  return getApi<ApiResponse<TwoFactorStatusResponse>>('/admin/2fa/setup', token);
}

export async function enableAdminTwoFactor(token: string, code: string): Promise<ApiResponse<TwoFactorStatusResponse>> {
  return postApi<ApiResponse<TwoFactorStatusResponse>>('/admin/2fa/enable', { code }, token);
}

export async function disableAdminTwoFactor(token: string, code: string): Promise<ApiResponse<TwoFactorStatusResponse>> {
  return postApi<ApiResponse<TwoFactorStatusResponse>>('/admin/2fa/disable', { code }, token);
}

export async function regenerateAdminTwoFactorRecoveryCodes(token: string): Promise<ApiResponse<{ backup_codes: string[] }>> {
  return postApi<ApiResponse<{ backup_codes: string[] }>>('/admin/2fa/recovery-codes', {}, token);
}

export async function updateAdminTwoFactorPolicies(token: string, policies: Record<string, boolean>): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/2fa/policies', policies, token);
}

export async function fetchAdminAuditLogs(token: string, params?: Record<string, string>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/audit-logs${query}`, token);
}

// 🏷️ Category Management
export function getCategoryImageUrl(url?: string | null): string {
  if (!url) return 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=300&auto=format&fit=crop&q=80';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
  const backendBase = apiBase.replace(/\/api\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${backendBase}${cleanPath}`;
}

export async function fetchAdminCategories(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/categories${query}`, token);
}

export async function fetchAdminCategoryDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/categories/${id}`, token);
}

export async function saveAdminCategory(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/categories/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/categories', data, token);
}

export async function deleteAdminCategory(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/categories/${id}`, token);
}

export async function fetchAdminBrands(token: string): Promise<ApiResponse> {
  return getApi<ApiResponse>('/admin/brands', token);
}

export async function fetchAdminBrandDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/brands/${id}`, token);
}

export async function saveAdminBrand(token: string, data: any, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/brands/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/brands', data, token);
}

export async function deleteAdminBrand(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/brands/${id}`, token);
}

// 🎁 Promotions & Marketing Campaigns
export interface PromotionItem {
  id: number;
  title: string;
  promo_type: string;
  code: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number | null;
  max_discount_amount: number | null;
  applicable_category_id: number | null;
  seller_id: number | null;
  target_scope: string | null;
  funded_by: string;
  starts_at: string | null;
  expires_at: string | null;
  usage_limit: number | null;
  times_used: number;
  is_active: boolean;
  status: 'Active' | 'Scheduled' | 'Expired' | 'Paused';
  description: string | null;
  bundle_products: any;
  quantity_tier_min: number | null;
  badge_text: string | null;
  banner_image: string | null;
  terms_conditions: string | null;
  seller?: {
    id: number;
    company_name: string;
  } | null;
  category?: {
    id: number;
    name: string;
  } | null;
  created_at?: string;
  updated_at?: string;
}

export async function fetchAdminPromotions(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/promotions${query}`, token);
}

export async function fetchAdminPromotionDetail(token: string, id: number | string): Promise<ApiResponse> {
  const cleanId = String(id).replace(/^(PRM-|FLS-|BND-|TGT-)/, '');
  try {
    const res = await getApi<ApiResponse>(`/admin/promotions/${cleanId}`, token);
    if (res && res.success && res.data && (res.data.promotion || res.data.id)) {
      return {
        success: true,
        data: {
          promotion: res.data.promotion || res.data,
        },
      };
    }
  } catch (err) {
    // If the endpoint does not support GET directly on staging or threw 405, fallback smoothly
    console.warn(`Direct promo detail route /admin/promotions/${cleanId} failed, resolving via promotions list:`, err);
  }

  try {
    const listRes = await fetchAdminPromotions(token);
    if (listRes && listRes.success && listRes.data) {
      const promos: any[] = listRes.data.promotions || listRes.data || [];
      const numericId = parseInt(cleanId, 10);
      const found = promos.find((p) => p.id === numericId || String(p.id) === cleanId);
      if (found) {
        return {
          success: true,
          data: {
            promotion: found,
          },
        };
      }
    }
  } catch (fallbackErr) {
    console.error('Promotion detail fallback failed:', fallbackErr);
  }

  return {
    success: false,
    message: 'Promotion campaign not found.',
    data: null,
  };
}

export async function saveAdminPromotion(token: string, data: any, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return putApi<ApiResponse>(`/admin/promotions/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/promotions', data, token);
}

export async function updateAdminPromotionStatus(token: string, id: number | string, status: string): Promise<ApiResponse> {
  return patchApi<ApiResponse>(`/admin/promotions/${id}/status`, { status }, token);
}

export async function deleteAdminPromotion(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/promotions/${id}`, token);
}

// 👑 Subscription & Membership Tiers
export * from './subscriptionService';

export async function fetchAdminSettings(token: string, group?: string): Promise<ApiResponse> {
  const query = group ? `?group=${encodeURIComponent(group)}` : '';
  return getApi<ApiResponse>(`/admin/settings${query}`, token);
}

export async function saveAdminSettings(token: string, data: Record<string, any>, group?: string): Promise<ApiResponse> {
  const payload = group ? { ...data, group } : data;
  return postApi<ApiResponse>('/admin/settings', payload, token);
}

export async function fetchPublicSettings(): Promise<ApiResponse> {
  return getApi<ApiResponse>('/settings/public');
}

// 💳 Payment Options & Gateways
export interface PaymentOptionItem {
  id: number;
  name: string;
  code: string;
  type: string;
  description: string | null;
  icon: string | null;
  fee_percentage: number;
  fixed_fee: number;
  min_amount: number | null;
  max_amount: number | null;
  instructions: string | null;
  config: Record<string, any> | null;
  status: number; // 1 = Active, 0 = Inactive
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export async function fetchAdminPaymentOptions(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/payment-options${query}`, token);
}

export async function fetchAdminPaymentOptionDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/payment-options/${id}`, token);
}

export async function saveAdminPaymentOption(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/payment-options/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/payment-options', data, token);
}

export async function toggleAdminPaymentOptionStatus(token: string, id: number | string, status: number): Promise<ApiResponse> {
  return patchApi<ApiResponse>(`/admin/payment-options/${id}/status`, { status }, token);
}

export async function deleteAdminPaymentOption(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/payment-options/${id}`, token);
}

export async function fetchPublicPaymentOptions(): Promise<ApiResponse> {
  return getApi<ApiResponse>('/payment-options');
}

// ==========================================================
// 📦 5. STOCK & INVENTORY GOVERNANCE APIS
// ==========================================================

export interface AdminInventoryItem {
  id: number;
  sku: string;
  productName: string;
  category: string;
  vaultLocation: string;
  vaultWarehouseId: number | null;
  unitWeight: string;
  purity: string;
  physicalStock: number;
  availableStock: number;
  reservedStock: number;
  quarantineStock: number;
  damagedStock: number;
  returnedStock: number;
  unitPrice: number;
  totalValuation: string;
  totalValuationNum: number;
  lowStockThreshold: number;
  supplierSyncStatus: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Allocation' | 'Quarantined';
  brandName?: string;
  imageUrl?: string | null;
}

export interface VaultWarehouseItem {
  id: string; // code e.g. VLT-ZRH-01
  dbId: number;
  code: string;
  name: string;
  country: string;
  city: string;
  address?: string | null;
  securityTier: string;
  currentOccupancyUnits: number;
  maxCapacityUnits: number;
  storedValuation: string;
  storedValuationNum: number;
  insuranceUnderwriter: string;
  contactPerson?: string | null;
  contactEmail?: string | null;
  status: 'Operational' | 'Audit in Progress' | 'Maintenance' | 'Inactive';
  isActive: boolean;
}

export interface StockMovementItem {
  id: string; // movement_code e.g. STK-2026-981
  dbId: number;
  timestamp: string;
  sku: string;
  productName: string;
  movementType: 'Mint Inbound' | 'Escrow Dispatch' | 'Vault Transfer' | 'Assay Return' | 'Manual Adjustment' | 'Quarantine Transfer' | 'Customer Buyback';
  quantityDelta: string;
  quantityDeltaNum: number;
  previousStock: number;
  newStock: number;
  sourceVault: string;
  destinationVault: string;
  referenceOrder: string;
  authorizedOfficer: string;
  notes?: string | null;
}

export interface StockAdjustmentItem {
  id: string; // adjustment_code e.g. ADJ-2026-001
  dbId: number;
  sku: string;
  productName: string;
  category: string;
  vaultLocation: string;
  unitWeight: string;
  purity: string;
  physicalStock: number;
  availableStock: number;
  reservedStock: number;
  damagedStock: number;
  returnedStock: number;
  totalValuation: string;
  lowStockThreshold: number;
  supplierSyncStatus: string;
  status: 'Quarantined' | 'Approved' | 'Resolved' | 'Scrapped' | 'ReturnedToStock';
  adjustmentType: string;
  reason?: string | null;
  authorizedBy?: string | null;
  resolutionNotes?: string | null;
  resolvedAt?: string | null;
  createdAt?: string | null;
}

export async function fetchAdminInventory(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/inventory${query}`, token);
}

export async function adjustAdminStock(token: string, data: Record<string, any>): Promise<ApiResponse> {
  return postApi<ApiResponse>('/admin/inventory/adjust', data, token);
}

export async function fetchAdminVaultWarehouses(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/inventory/warehouses${query}`, token);
}

export async function fetchAdminVaultWarehouseDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/inventory/warehouses/${id}`, token);
}

export async function saveAdminVaultWarehouse(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/inventory/warehouses/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/inventory/warehouses', data, token);
}

export async function deleteAdminVaultWarehouse(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/inventory/warehouses/${id}`, token);
}

export async function fetchAdminStockMovements(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/inventory/history${query}`, token);
}

export async function fetchAdminStockAdjustments(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/inventory/adjustments${query}`, token);
}

export async function resolveAdminStockAdjustment(token: string, id: number | string, data: Record<string, any>): Promise<ApiResponse> {
  return postApi<ApiResponse>(`/admin/inventory/adjustments/${id}/resolve`, data, token);
}

// ==========================================
// 💬 Social & Community Governance
// ==========================================

export interface CommunityPostItem {
  id: number;
  post_code: string;
  user_id?: number | null;
  seller_id?: number | null;
  author_name: string;
  author_role: string;
  author_avatar?: string | null;
  item_title: string;
  content: string;
  media_type: 'image' | 'video' | 'gallery' | 'none';
  media_url?: string | null;
  media_caption?: string | null;
  is_verified_purchase: boolean;
  order_code?: string | null;
  likes_count: number;
  comments_count: number;
  tags?: string[] | null;
  is_pinned: boolean;
  status: 'Approved & Live' | 'Pending Review' | 'Flagged' | 'Hidden';
  created_at?: string;
  updated_at?: string;
  user?: any;
  seller?: any;
}

export interface MerchantGuildItem {
  id: number;
  guild_code: string;
  seller_id?: number | null;
  name: string;
  slug: string;
  location: string;
  specialty: string;
  description?: string | null;
  logo?: string | null;
  followers_count: number;
  active_stories_count: number;
  trust_score: number;
  nft_tier: string;
  commission_discount: string;
  status: 'Verified Guild' | 'Master Atelier' | 'Under Review' | 'Suspended';
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
  seller?: any;
}

export interface ProductReviewItem {
  id: number;
  review_code: string;
  user_id?: number | null;
  product_id?: number | null;
  seller_id?: number | null;
  customer_name: string;
  customer_avatar?: string | null;
  item_title: string;
  merchant_name: string;
  rating: number;
  review_text: string;
  assay_photo_attached: boolean;
  assay_certificate_ref?: string | null;
  assay_photo_url?: string | null;
  gold_weight?: string | null;
  gold_purity?: string | null;
  helpful_votes: number;
  status: 'Approved & Live' | 'Pending Review' | 'Flagged' | 'Hidden';
  created_at?: string;
  updated_at?: string;
  user?: any;
  product?: any;
  seller?: any;
}

export interface SocialCampaignItem {
  id: number;
  campaign_code: string;
  title: string;
  influencer_or_guild: string;
  channel: string;
  target_url?: string | null;
  clicks_count: number;
  conversions_count: number;
  realized_gmv: number;
  commission_paid: number;
  roi_multiplier: string;
  status: 'Active Live' | 'Scheduled' | 'Paused' | 'Completed';
  starts_at?: string | null;
  expires_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Community Feed Posts API
export async function fetchAdminCommunityPosts(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/posts${query}`, token);
}

export async function saveAdminCommunityPost(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/community/posts/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/community/posts', data, token);
}

export async function toggleAdminCommunityPostPin(token: string, id: number | string): Promise<ApiResponse> {
  return patchApi<ApiResponse>(`/admin/community/posts/${id}/pin`, {}, token);
}

export async function deleteAdminCommunityPost(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/community/posts/${id}`, token);
}

// Merchant Guilds API
export async function fetchAdminMerchantGuilds(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/guilds${query}`, token);
}

export async function saveAdminMerchantGuild(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/community/guilds/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/community/guilds', data, token);
}

export async function deleteAdminMerchantGuild(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/community/guilds/${id}`, token);
}

// Product Reviews & Assay API
export async function fetchAdminProductReviews(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/reviews${query}`, token);
}

export async function updateAdminProductReviewStatus(token: string, id: number | string, status: string): Promise<ApiResponse> {
  return patchApi<ApiResponse>(`/admin/community/reviews/${id}/status`, { status }, token);
}

export async function deleteAdminProductReview(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/community/reviews/${id}`, token);
}

// Social Campaigns API
export async function fetchAdminSocialCampaigns(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/campaigns${query}`, token);
}

export async function saveAdminSocialCampaign(token: string, data: Record<string, any>, id?: number | string): Promise<ApiResponse> {
  if (id) {
    return postApi<ApiResponse>(`/admin/community/campaigns/${id}`, data, token);
  }
  return postApi<ApiResponse>('/admin/community/campaigns', data, token);
}

export async function deleteAdminSocialCampaign(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/community/campaigns/${id}`, token);
}

// Re-export dedicated community service
export * from './communityService';

// Re-export dedicated NB7 Token & NFT service
export * from './nb7Service';

// ==========================================
// 🔔 Admin System & Governance Notifications
// ==========================================

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  category: 'Security & AML' | 'Orders & Escrow' | 'KYC / KYB' | 'Market & Pricing' | 'System' | string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  type: string;
  actionUrl: string;
  isRead: boolean;
  readAt?: string | null;
  timestamp: string;
  rawCreatedAt?: string | null;
}

export interface NotificationsSummary {
  total: number;
  unread: number;
  high_priority: number;
  system_health: string;
}

export interface AdminNotificationsResponse {
  notifications: AdminNotification[];
  summary: NotificationsSummary;
}

export async function fetchAdminNotifications(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<AdminNotificationsResponse>> {
  const authToken = getStoredAuthToken(token);
  if (!authToken) {
    return {
      success: false,
      message: 'Authentication token not available.',
      data: {
        notifications: [],
        summary: { total: 0, unread: 0, high_priority: 0, system_health: '100% Operational' },
      },
    };
  }

  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<AdminNotificationsResponse>>(`/admin/notifications${query}`, authToken);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to fetch notifications',
      data: {
        notifications: [],
        summary: { total: 0, unread: 0, high_priority: 0, system_health: '100% Operational' },
      },
    };
  }
}

export async function markAdminNotificationRead(
  token: string,
  id: string | number
): Promise<ApiResponse> {
  try {
    return await patchApi<ApiResponse>(`/admin/notifications/${id}/read`, {}, token);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark notification as read.' };
  }
}

export async function markAllAdminNotificationsRead(token: string): Promise<ApiResponse> {
  try {
    return await postApi<ApiResponse>('/admin/notifications/mark-all-read', {}, token);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark all notifications as read.' };
  }
}

export async function deleteAdminNotification(
  token: string,
  id: string | number
): Promise<ApiResponse> {
  try {
    return await deleteApi<ApiResponse>(`/admin/notifications/${id}`, token);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete notification.' };
  }
}

export async function clearAllAdminNotifications(
  token: string,
  onlyRead: boolean = true
): Promise<ApiResponse> {
  try {
    return await postApi<ApiResponse>('/admin/notifications/clear-all', { only_read: onlyRead }, token);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to clear notifications.' };
  }
}

// ==========================================
// 🔔 Seller Atelier Notifications
// ==========================================

export interface SellerNotification {
  id: string;
  title: string;
  message: string;
  category: 'Orders & Escrow' | 'KYC / KYB' | 'Inventory & Stock' | 'Reviews & Reputation' | 'Digital Passports' | 'System' | string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  type: string;
  actionUrl: string;
  isRead: boolean;
  readAt?: string | null;
  timestamp: string;
  rawCreatedAt?: string | null;
}

export interface SellerNotificationsResponse {
  notifications: SellerNotification[];
  summary: NotificationsSummary;
}

export async function fetchSellerNotifications(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<SellerNotificationsResponse>> {
  const authToken = getStoredAuthToken(token);
  if (!authToken) {
    return {
      success: false,
      message: 'Authentication token not available.',
      data: {
        notifications: [],
        summary: { total: 0, unread: 0, high_priority: 0, system_health: '100% Operational' },
      },
    };
  }

  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<SellerNotificationsResponse>>(`/seller/notifications${query}`, authToken);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to fetch seller notifications',
      data: {
        notifications: [],
        summary: { total: 0, unread: 0, high_priority: 0, system_health: '100% Operational' },
      },
    };
  }
}

export async function markSellerNotificationRead(
  id: string | number,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse>(`/seller/notifications/${id}/read`, {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark notification as read.' };
  }
}

export async function markAllSellerNotificationsRead(token?: string | null): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse>('/seller/notifications/mark-all-read', {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark all notifications as read.' };
  }
}

export async function deleteSellerNotification(
  id: string | number,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await deleteApi<ApiResponse>(`/seller/notifications/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete notification.' };
  }
}

export async function clearAllSellerNotifications(
  token?: string | null,
  onlyRead: boolean = true
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse>('/seller/notifications/clear-all', { only_read: onlyRead }, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to clear notifications.' };
  }
}

// ==========================================
// 🔔 B2B Wholesale & Corporate Notifications Suite
// ==========================================

export interface B2bNotification {
  id: string;
  title: string;
  message: string;
  category: 'Purchase Orders' | 'Invoices & Credit' | 'Wholesale Catalog' | 'Contracts' | 'KYC / KYB' | 'System' | string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  type: string;
  actionUrl: string;
  isRead: boolean;
  readAt?: string | null;
  timestamp: string;
  rawCreatedAt?: string | null;
}

export interface B2bNotificationsResponse {
  notifications: B2bNotification[];
  summary: NotificationsSummary;
}

export async function fetchB2bNotifications(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<B2bNotificationsResponse>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<B2bNotificationsResponse>>(`/b2b/notifications${query}`, authToken || undefined);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to fetch B2B notifications',
      data: {
        notifications: [],
        summary: { total: 0, unread: 0, high_priority: 0, system_health: '100% Operational' },
      },
    };
  }
}

export async function markB2bNotificationRead(
  id: string | number,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse>(`/b2b/notifications/${id}/read`, {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark B2B notification as read.' };
  }
}

export async function markAllB2bNotificationsRead(token?: string | null): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse>('/b2b/notifications/mark-all-read', {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark all B2B notifications as read.' };
  }
}

export async function deleteB2bNotification(
  id: string | number,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await deleteApi<ApiResponse>(`/b2b/notifications/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete B2B notification.' };
  }
}

export async function clearAllB2bNotifications(
  token?: string | null,
  onlyRead: boolean = true
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse>('/b2b/notifications/clear-all', { only_read: onlyRead }, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to clear B2B notifications.' };
  }
}

// ==========================================
// 🏢 B2B Institutional Wholesale & Corporate Suite
// ==========================================

export interface B2bOverviewSupplier {
  id: number;
  company_name: string;
  contact_person: string;
  username: string;
  email: string;
  phone: string;
  lei_code: string;
  lbma_license_number: string;
  refinery_location: string;
  verification_status: string;
  credit_line_eur: number;
  payment_terms: string;
}

export interface B2bOverviewMetrics {
  total_gmv_eur: number;
  open_orders_count: number;
  unpaid_invoices_eur: number;
  available_credit_eur: number;
  credit_utilization_percent: number;
  active_contracts_count: number;
  employees_count: number;
  products_count: number;
  unallocated_pool_kg: number;
  unallocated_pool_ag_kg?: number;
}

export interface B2bOverviewData {
  supplier: B2bOverviewSupplier;
  metrics: B2bOverviewMetrics;
  recent_orders: B2bPurchaseOrder[];
  recent_invoices: B2bInvoice[];
  catalog_items: B2bProductItem[];
  contracts: B2bContractItem[];
  employees?: B2bEmployeeItem[];
  live_metals: MetalSpotRate[];
}

export interface B2bSearchResultData {
  orders: B2bPurchaseOrder[];
  catalog: B2bProductItem[];
  invoices: B2bInvoice[];
  contracts: B2bContractItem[];
}

export interface B2bProductItem {
  id: number;
  supplier_id: number;
  sku: string;
  name: string;
  metal_type: string;
  purity: string;
  form: string;
  unit_weight_grams: number;
  moq_grams: number;
  pricing_type: string;
  spot_spread_percent: number;
  fixed_price_per_gram_eur: number | null;
  tier_pricing?: Array<{ min_kg: number; spread_pct: number }>;
  stock_grams: number;
  origin_refinery: string;
  assay_certificate_included: boolean;
  status: string;
  image_url?: string;
  description?: string;
  created_at?: string;
}

export interface B2bPurchaseOrderItem {
  id: number;
  purchase_order_id: number;
  product_id: number | null;
  product_sku: string;
  product_name: string;
  metal_type: string;
  quantity: number;
  weight_grams: number;
  price_per_gram_eur: number;
  total_item_eur: number;
  product?: B2bProductItem;
}

export interface B2bPurchaseOrder {
  id: number;
  supplier_id: number;
  po_number: string;
  buyer_company_name: string;
  buyer_contact_name: string;
  buyer_email: string;
  buyer_vat_id?: string;
  buyer_country: string;
  total_weight_grams: number;
  total_amount_eur: number;
  payment_terms: string;
  status: string;
  payment_status: string;
  settlement_currency: string;
  destination_vault_or_address: string;
  notes?: string;
  placed_at: string;
  settled_at?: string;
  items?: B2bPurchaseOrderItem[];
  invoices?: B2bInvoice[];
}

export interface B2bInvoice {
  id: number;
  supplier_id: number;
  purchase_order_id: number | null;
  invoice_number: string;
  buyer_company_name: string;
  buyer_tax_number?: string;
  subtotal_eur: number;
  tax_rate_percent: number;
  tax_amount_eur: number;
  total_amount_eur: number;
  amount_paid_eur: number;
  payment_terms: string;
  issue_date: string;
  due_date: string;
  status: string;
  payment_method: string;
  pdf_url?: string;
  purchase_order?: B2bPurchaseOrder;
}

export interface B2bEmployeeItem {
  id: number;
  supplier_id: number;
  name: string;
  email: string;
  phone?: string;
  job_title: string;
  role: string;
  order_approval_limit_eur: number;
  can_approve_orders: boolean;
  can_manage_invoices: boolean;
  can_manage_team: boolean;
  status: string;
  last_active_at?: string;
}

export interface B2bContractItem {
  id: number;
  supplier_id: number;
  contract_code: string;
  client_company_name: string;
  metal_type: string;
  contract_type: string;
  fixed_spread_percent: number;
  annual_quota_kg: number;
  fulfilled_quota_kg: number;
  delivery_cadence: string;
  start_date: string;
  end_date: string;
  status: string;
  document_url?: string;
}

export async function fetchB2bOverview(token?: string | null): Promise<ApiResponse<B2bOverviewData>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bOverviewData>>('/b2b/overview', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch B2B overview' };
  }
}

export async function searchB2b(
  query: string,
  token?: string | null
): Promise<ApiResponse<B2bSearchResultData>> {
  const authToken = getStoredAuthToken(token);
  try {
    const qs = buildQueryString({ q: query });
    return await getApi<ApiResponse<B2bSearchResultData>>(`/b2b/search${qs}`, authToken || undefined);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to search B2B portal',
      data: { orders: [], catalog: [], invoices: [], contracts: [] },
    };
  }
}

export async function fetchB2bCatalog(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ items: B2bProductItem[]; total_count: number; summary: any }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<any>>(`/b2b/catalog${query}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch B2B catalog' };
  }
}

export async function fetchB2bProduct(
  id: number | string,
  token?: string | null
): Promise<ApiResponse<B2bProductItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bProductItem>>(`/b2b/catalog/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch B2B product' };
  }
}

export async function createB2bProduct(
  data: Partial<B2bProductItem>,
  token?: string | null
): Promise<ApiResponse<B2bProductItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<B2bProductItem>>('/b2b/catalog', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to create wholesale SKU' };
  }
}

export async function updateB2bProduct(
  id: number | string,
  data: Partial<B2bProductItem>,
  token?: string | null
): Promise<ApiResponse<B2bProductItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await putApi<ApiResponse<B2bProductItem>>(`/b2b/catalog/${id}`, data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update wholesale SKU' };
  }
}

export async function deleteB2bProduct(
  id: number | string,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await deleteApi<ApiResponse>(`/b2b/catalog/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete wholesale SKU' };
  }
}

export async function fetchB2bOrders(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ orders: B2bPurchaseOrder[]; total_count: number; summary: any }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<any>>(`/b2b/orders${query}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch purchase orders' };
  }
}

export async function fetchB2bOrder(
  id: number | string,
  token?: string | null
): Promise<ApiResponse<B2bPurchaseOrder>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bPurchaseOrder>>(`/b2b/orders/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch purchase order detail' };
  }
}

export async function updateB2bOrderStatus(
  id: number | string,
  data: { status?: string; payment_status?: string; notes?: string },
  token?: string | null
): Promise<ApiResponse<B2bPurchaseOrder>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse<B2bPurchaseOrder>>(`/b2b/orders/${id}/status`, data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update order status' };
  }
}

export async function fetchB2bInvoices(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ invoices: B2bInvoice[]; total_count: number; summary: any }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<any>>(`/b2b/invoices${query}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch invoices' };
  }
}

export async function fetchB2bCreditStatus(
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<any>>('/b2b/credit-status', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch credit status' };
  }
}

export async function recordB2bInvoicePayment(
  id: number | string,
  data: { amount_paid?: number; payment_method?: string },
  token?: string | null
): Promise<ApiResponse<B2bInvoice>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<B2bInvoice>>(`/b2b/invoices/${id}/pay`, data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to record invoice payment' };
  }
}

export async function fetchB2bEmployees(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ employees: B2bEmployeeItem[]; total_count: number; summary: any }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const qs = buildQueryString(params);
    return await getApi<ApiResponse<any>>(`/b2b/employees${qs}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch corporate employees' };
  }
}

export async function createB2bEmployee(
  data: Partial<B2bEmployeeItem>,
  token?: string | null
): Promise<ApiResponse<B2bEmployeeItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<B2bEmployeeItem>>('/b2b/employees', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to create corporate employee' };
  }
}

export async function updateB2bEmployee(
  id: number | string,
  data: Partial<B2bEmployeeItem>,
  token?: string | null
): Promise<ApiResponse<B2bEmployeeItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await putApi<ApiResponse<B2bEmployeeItem>>(`/b2b/employees/${id}`, data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update corporate employee' };
  }
}

export async function deleteB2bEmployee(
  id: number | string,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await deleteApi<ApiResponse>(`/b2b/employees/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete corporate employee' };
  }
}

export async function fetchB2bContracts(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ contracts: B2bContractItem[]; total_count: number; summary: any }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const qs = buildQueryString(params);
    return await getApi<ApiResponse<any>>(`/b2b/contracts${qs}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch contracts' };
  }
}

export async function fetchB2bContractDetail(
  id: number | string,
  token?: string | null
): Promise<ApiResponse<B2bContractItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bContractItem>>(`/b2b/contracts/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch contract details' };
  }
}

export async function createB2bContract(
  data: Partial<B2bContractItem>,
  token?: string | null
): Promise<ApiResponse<B2bContractItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<B2bContractItem>>('/b2b/contracts', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to register contract' };
  }
}

export async function updateB2bContract(
  id: number | string,
  data: Partial<B2bContractItem>,
  token?: string | null
): Promise<ApiResponse<B2bContractItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await putApi<ApiResponse<B2bContractItem>>(`/b2b/contracts/${id}`, data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update contract' };
  }
}

export async function deleteB2bContract(
  id: number | string,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await deleteApi<ApiResponse>(`/b2b/contracts/${id}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to terminate contract' };
  }
}

export interface B2bKybData {
  supplier: {
    id: number;
    company_name: string;
    contact_person?: string;
    email: string;
    phone?: string;
    lei_code?: string;
    lbma_license_number?: string;
    refinery_location?: string;
    annual_refining_capacity_kg?: number;
    verification_status: string;
  };
  status: string;
  accreditations: Array<{
    id: string;
    title: string;
    authority: string;
    standard: string;
    status: string;
    expiryDate: string;
    badge: string;
    verified: boolean;
  }>;
  certified_assayers: Array<{
    name: string;
    title: string;
    licenseId: string;
    jurisdiction: string;
    activeSince: string;
  }>;
  latest_case?: any;
}

export async function fetchB2bKybCompliance(
  token?: string | null
): Promise<ApiResponse<B2bKybData>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bKybData>>('/b2b/kyb', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch B2B KYB status' };
  }
}

export async function submitB2bKybRequest(
  formData: FormData,
  token?: string | null
): Promise<ApiResponse<{ case: any; verification_status: string }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const res = await fetch(`${API_BASE_URL}/b2b/kyb/request`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: formData,
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to submit KYB request' };
  }
}

// 💬 B2B Institutional Direct Trade Messages & Concierge
export interface B2bMessageAttachment {
  filename: string;
  name?: string;
  url?: string;
  file_path?: string;
  size: string;
  type: 'document' | 'image' | string;
}

export interface B2bMessageItem {
  id: string;
  sender: 'supplier' | 'counterparty';
  senderName: string;
  text: string;
  timestamp: string;
  date?: string;
  rawCreatedAt?: string;
  isMe: boolean;
  attachment?: B2bMessageAttachment | null;
  attachments?: B2bMessageAttachment[];
  orderReference?: B2bOrderReference | null;
}

export interface B2bOrderReference {
  id: string;
  amount: string;
  item: string;
  status?: string;
}

export interface B2bMessageThread {
  id: string;
  participantName: string;
  participantRole: string;
  guildLocation: string;
  avatar: string;
  channel: string;
  fixSpread: string;
  online: boolean;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageTimestamp?: number;
  unreadCount: number;
  orderReference?: B2bOrderReference | null;
  messages: B2bMessageItem[];
}

export interface B2bMessagesData {
  threads: B2bMessageThread[];
  unread_total: number;
}

export async function fetchB2bMessages(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<B2bMessagesData>> {
  const authToken = getStoredAuthToken(token);
  const query = buildQueryString(params);
  try {
    return await getApi<ApiResponse<B2bMessagesData>>(`/b2b/messages${query}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch B2B trade messages' };
  }
}

export async function fetchB2bMessageCounts(
  token?: string | null
): Promise<ApiResponse<{ unread_count: number }>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<{ unread_count: number }>>('/b2b/messages/counts', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch unread count' };
  }
}

export async function fetchB2bThreadMessages(
  conversationId: string,
  token?: string | null
): Promise<ApiResponse<{ conversation_id: string; messages: B2bMessageItem[] }>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<{ conversation_id: string; messages: B2bMessageItem[] }>>(
      `/b2b/messages/${conversationId}`,
      authToken || undefined
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch thread messages' };
  }
}

export async function uploadB2bMessageAttachment(
  file: File,
  token?: string | null
): Promise<ApiResponse<B2bMessageAttachment>> {
  const authToken = getStoredAuthToken(token);
  const formData = new FormData();
  formData.append('file', file);
  try {
    return await postFormDataApi<ApiResponse<B2bMessageAttachment>>('/b2b/messages/upload', formData, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to upload attachment.' };
  }
}

export async function sendB2bMessage(
  payload: FormData | { conversation_id: string; message: string; attachments?: any[] },
  token?: string | null
): Promise<ApiResponse<B2bMessageItem>> {
  const authToken = getStoredAuthToken(token);
  try {
    if (payload instanceof FormData) {
      const res = await fetch(`${API_BASE_URL}/b2b/messages/send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: payload,
      });
      return await res.json();
    } else {
      return await postApi<ApiResponse<B2bMessageItem>>('/b2b/messages/send', payload, authToken || undefined);
    }
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to transmit message' };
  }
}

export async function markB2bThreadRead(
  conversationId: string,
  token?: string | null
): Promise<ApiResponse<{ updated_count: number }>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse<{ updated_count: number }>>(
      `/b2b/messages/${conversationId}/read`,
      {},
      authToken || undefined
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark thread as read' };
  }
}

// ⚙️ Refinery ERP Webhooks & Settlement Settings API
export interface B2bSettingsData {
  webhook_url: string;
  api_protocol: string;
  sync_interval: string;
  api_key: string;
  settlement_bank: string;
  iban: string;
  swift_bic: string;
  dual_signatory_limit: string;
  company_name?: string;
  lei_code?: string;
  lbma_license_number?: string;
}

export async function fetchB2bSettings(
  token?: string | null
): Promise<ApiResponse<B2bSettingsData>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bSettingsData>>('/b2b/settings', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch refinery settings' };
  }
}

export async function updateB2bSettings(
  data: Record<string, any>,
  token?: string | null
): Promise<ApiResponse<B2bSettingsData>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<B2bSettingsData>>('/b2b/settings', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update refinery settings' };
  }
}

export async function regenerateB2bApiKey(
  token?: string | null
): Promise<ApiResponse<{ api_key: string }>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<{ api_key: string }>>('/b2b/settings/regenerate-key', {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to regenerate API key' };
  }
}

export async function testB2bWebhook(
  webhookUrl: string,
  token?: string | null
): Promise<ApiResponse<{ endpoint: string; handshake: string; latency_ms: number }>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<{ endpoint: string; handshake: string; latency_ms: number }>>(
      '/b2b/settings/test-webhook',
      { webhook_url: webhookUrl },
      authToken || undefined
    );
  } catch (err: any) {
    return { success: false, message: err?.message || 'Webhook ping failed' };
  }
}

// 🏢 Refinery Corporate Profile API
export interface B2bProfileData {
  legal_name: string;
  trade_name?: string;
  reg_number?: string;
  vat_number?: string;
  contact_person: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  avatar_url?: string | null;
  lei_code?: string;
  lbma_license_number?: string;
  verification_status?: string;
}

export async function fetchB2bProfile(
  token?: string | null
): Promise<ApiResponse<B2bProfileData>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await getApi<ApiResponse<B2bProfileData>>('/b2b/profile', authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch refinery profile' };
  }
}

export async function updateB2bProfile(
  formData: FormData,
  token?: string | null
): Promise<ApiResponse<B2bProfileData>> {
  const authToken = getStoredAuthToken(token);
  try {
    const res = await fetch(`${API_BASE_URL}/b2b/profile`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: formData,
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update refinery profile' };
  }
}

export async function changeB2bPassword(
  data: Record<string, any>,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse>('/b2b/change-password', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update password' };
  }
}

// 🔐 B2B Two-Factor Authentication (2FA) API
export interface B2b2FASetupData {
  is_enabled: boolean;
  secret_key: string;
  formatted_secret: string;
  otpauth_url: string;
  qr_code_url: string;
  backup_codes: string[];
  confirmed_at?: string | null;
  policies?: {
    vault_releases_enforced?: boolean;
    hedging_enforced?: boolean;
    settlement_bank_enforced?: boolean;
  };
}

export async function fetchB2b2FASetup(token?: string | null): Promise<ApiResponse<B2b2FASetupData>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/b2b/2fa/setup', authToken ?? undefined);
}

export async function enableB2b2FA(
  code: string,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/b2b/2fa/enable', { code }, authToken ?? undefined);
}

export async function disableB2b2FA(
  code: string,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/b2b/2fa/disable', { code }, authToken ?? undefined);
}

export async function regenerateB2b2FARecoveryCodes(
  token?: string | null
): Promise<ApiResponse<{ backup_codes: string[] }>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/b2b/2fa/recovery-codes', {}, authToken ?? undefined);
}

export async function saveB2b2FAPolicies(
  policies: Record<string, boolean>,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/b2b/2fa/policies', policies, authToken ?? undefined);
}

// ==========================================
// 👑 Affiliate Partner & MLM Network API Suite
// ==========================================

export interface AffiliateOverviewData {
  partner: {
    id: number;
    name: string;
    company_name?: string;
    email: string;
    phone?: string;
    referral_code: string;
    commission_rate: number;
    rank?: {
      name: string;
      slug: string;
      badge_color: string;
      direct_rate: number;
    };
  };
  kpis: {
    wallet_balance_eur: number;
    total_commissions_earned_eur: number;
    pending_payout_eur: number;
    total_clicks: number;
    total_conversions: number;
    conversion_rate_percent: number;
    total_leads_count: number;
    active_clients_count: number;
  };
  referral_link: string;
  qr_code_url: string;
  performance_timeline: Array<{
    month: string;
    sales_volume: number;
    commissions: number;
  }>;
  recent_commissions: any[];
  top_campaigns: any[];
}

export interface AffiliateCommissionItem {
  id: number;
  order_id?: number | null;
  from_user_id?: number | null;
  order_amount: number;
  commission_rate_percent: number;
  commission_amount: number;
  tier_level: number;
  bonus_type: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  paid_at?: string | null;
  created_at: string;
  order?: {
    order_number?: string;
    total_amount?: number;
  } | null;
}

export interface AffiliateCommissionsResponse {
  commissions: AffiliateCommissionItem[];
  total_count: number;
  summary: {
    total_earned_eur: number;
    paid_amount_eur: number;
    approved_amount_eur: number;
    pending_amount_eur: number;
    all_count: number;
    paid_count: number;
    approved_count: number;
    pending_count: number;
  };
}

export interface AffiliateLinkItem {
  id: number;
  campaign_name: string;
  slug: string;
  target_page: string;
  clicks_count: number;
  conversions_count: number;
  total_revenue_generated: number;
  is_active: boolean;
  created_at: string;
}

export interface AffiliateLinksResponse {
  referral_code: string;
  primary_link: string;
  qr_code_url: string;
  campaigns: AffiliateLinkItem[];
  landing_pages: Array<{ name: string; path: string }>;
}

export interface AffiliatePayoutItem {
  id: number;
  payout_reference: string;
  amount_eur: number;
  fee_eur: number;
  net_amount_eur: number;
  payout_method: string;
  payout_details: any;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  tax_invoice_number?: string | null;
  notes?: string | null;
  processed_at?: string | null;
  created_at: string;
}

export interface AffiliatePayoutsResponse {
  wallet_balance_eur: number;
  pending_payout_eur: number;
  lifetime_paid_eur: number;
  min_payout_threshold_eur: number;
  payout_details: any;
  payouts: AffiliatePayoutItem[];
}

export async function fetchAffiliateOverview(
  token?: string | null
): Promise<ApiResponse<AffiliateOverviewData>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/overview', authToken ?? undefined);
}

export async function fetchAffiliateLinks(
  token?: string | null
): Promise<ApiResponse<AffiliateLinksResponse>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/links', authToken ?? undefined);
}

export async function createAffiliateLink(
  data: { campaign_name: string; target_page?: string },
  token?: string | null
): Promise<ApiResponse<AffiliateLinkItem>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/links', data, authToken ?? undefined);
}

export async function fetchAffiliateCommissions(
  token?: string | null,
  params: Record<string, any> = {}
): Promise<ApiResponse<AffiliateCommissionsResponse>> {
  const authToken = getStoredAuthToken(token);
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
  });
  const qs = query.toString();
  return getApi(`/affiliate/commissions${qs ? `?${qs}` : ''}`, authToken ?? undefined);
}

export async function fetchAffiliateLeads(
  token?: string | null
): Promise<ApiResponse<{
  total_leads: number;
  vault_depositors_count: number;
  total_lead_volume_eur: number;
  leads: any[];
}>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/leads', authToken ?? undefined);
}

export async function fetchAffiliateRanks(
  token?: string | null
): Promise<ApiResponse<{
  current_rank: any;
  current_volume_eur: number;
  next_rank_target_eur: number;
  ranks: any[];
}>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/ranks', authToken ?? undefined);
}

export async function fetchAffiliatePayouts(
  token?: string | null
): Promise<ApiResponse<AffiliatePayoutsResponse>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/payouts', authToken ?? undefined);
}

export async function requestAffiliatePayout(
  data: { amount: number; payout_method?: string; payout_details?: any },
  token?: string | null
): Promise<ApiResponse<AffiliatePayoutItem>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/payouts/request', data, authToken ?? undefined);
}

export async function fetchAffiliateProfile(
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/profile', authToken ?? undefined);
}

export async function updateAffiliateProfile(
  data: Record<string, any>,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/profile', data, authToken ?? undefined);
}

export async function fetchAffiliateBankInfo(
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/bank-info', authToken ?? undefined);
}

export async function updateAffiliateBankInfo(
  data: Record<string, any>,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/bank-info', data, authToken ?? undefined);
}

export async function changeAffiliatePassword(
  data: Record<string, any>,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/change-password', data, authToken ?? undefined);
}

export async function fetchAffiliate2FASetup(
  token?: string | null
): Promise<ApiResponse<{
  is_enabled: boolean;
  secret_key: string;
  formatted_secret: string;
  otpauth_url: string;
  qr_code_url: string;
  backup_codes: string[];
}>> {
  const authToken = getStoredAuthToken(token);
  return getApi('/affiliate/2fa/setup', authToken ?? undefined);
}

export async function enableAffiliate2FA(
  code: string,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/2fa/enable', { code }, authToken ?? undefined);
}

export async function disableAffiliate2FA(
  code: string,
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/2fa/disable', { code }, authToken ?? undefined);
}

export async function regenerateAffiliate2FARecoveryCodes(
  token?: string | null
): Promise<ApiResponse<{ backup_codes: string[] }>> {
  const authToken = getStoredAuthToken(token);
  return postApi('/affiliate/2fa/recovery-codes', {}, authToken ?? undefined);
}

export interface AffiliateSearchResultData {
  campaigns: Array<{
    id: number;
    campaign_name: string;
    slug: string;
    target_page?: string;
    clicks_count: number;
    conversions_count: number;
  }>;
  leads: Array<{
    id: number;
    name: string;
    email: string;
    location?: string;
    stage: string;
    total_spent_eur: number;
    is_vault_depositor: boolean;
  }>;
  commissions: Array<{
    id: number;
    order_id?: number;
    commission_amount: number;
    bonus_type: string;
    status: string;
  }>;
  payouts: Array<{
    id: number;
    payout_reference: string;
    tax_invoice_number?: string;
    amount_eur: number;
    payout_method: string;
    status: string;
  }>;
}

export async function searchAffiliate(
  query: string,
  token?: string | null
): Promise<ApiResponse<AffiliateSearchResultData>> {
  const authToken = getStoredAuthToken(token);
  return getApi(`/affiliate/search?q=${encodeURIComponent(query)}`, authToken ?? undefined);
}

// ==========================================
// 💬 Atelier Seller & Admin Messaging Suite
// ==========================================

export interface MessageAttachmentInfo {
  filename: string;
  url?: string;
  type: 'image' | 'document' | string;
  size: string;
}

export interface OrderReferenceInfo {
  id: string;
  amount: string;
  item: string;
}

export interface SellerChatMessage {
  id: string;
  sender: 'user' | 'seller' | 'support';
  senderName: string;
  text: string;
  timestamp: string;
  rawCreatedAt?: string | null;
  attachment?: MessageAttachmentInfo | null;
  orderReference?: OrderReferenceInfo | null;
}

export interface SellerConversationThread {
  id: string;
  participantName: string;
  participantRole: 'VIP Jewelry Collector' | 'B2B Refiner Supplier' | 'Escrow Support Lead' | 'Private Client' | string;
  participantEmail: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageTimestamp?: number;
  unreadCount: number;
  channel: 'Buyer Inquiries' | 'B2B Refiners' | 'Platform & Escrow' | string;
  status: 'Active' | 'Pending Response' | 'Resolved' | string;
  orderReference?: OrderReferenceInfo | null;
  messages: SellerChatMessage[];
}

export interface SellerMessagesResponse {
  threads: SellerConversationThread[];
  unread_total: number;
}

export async function fetchSellerConversations(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<SellerMessagesResponse>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<SellerMessagesResponse>>(`/seller/messages${query}`, authToken || undefined);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Failed to fetch messages.',
      data: { threads: [], unread_total: 0 },
    };
  }
}

export async function fetchSellerUnreadMessageCount(
  token?: string | null
): Promise<number> {
  const authToken = getStoredAuthToken(token);
  try {
    const res = await getApi<ApiResponse<{ unread_count: number }>>('/seller/messages/counts', authToken || undefined);
    return res?.data?.unread_count ?? 0;
  } catch {
    return 0;
  }
}

export async function sendSellerMessage(
  data: { conversation_id: string; message: string; attachments?: any[] },
  token?: string | null
): Promise<ApiResponse<SellerChatMessage>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<SellerChatMessage>>('/seller/messages/send', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to send message.' };
  }
}

export async function uploadSellerMessageAttachment(
  file: File,
  token?: string | null
): Promise<ApiResponse<MessageAttachmentInfo>> {
  const authToken = getStoredAuthToken(token);
  const formData = new FormData();
  formData.append('file', file);
  try {
    return await postFormDataApi<ApiResponse<MessageAttachmentInfo>>('/seller/messages/upload', formData, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to upload attachment.' };
  }
}

export async function markSellerThreadRead(
  conversationId: string,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse>(`/seller/messages/${conversationId}/read`, {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark thread as read.' };
  }
}

export async function fetchAdminSupportMessages(
  token?: string | null,
  params?: Record<string, any>
): Promise<ApiResponse<{ threads: any[] }>> {
  const authToken = getStoredAuthToken(token);
  try {
    const query = buildQueryString(params);
    return await getApi<ApiResponse<{ threads: any[] }>>(`/admin/messages${query}`, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch support messages.', data: { threads: [] } };
  }
}

export async function sendAdminSupportMessage(
  data: { conversation_id: string; message: string; attachments?: any[] },
  token?: string | null
): Promise<ApiResponse<any>> {
  const authToken = getStoredAuthToken(token);
  try {
    return await postApi<ApiResponse<any>>('/admin/messages/send', data, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to send support response.' };
  }
}

export async function uploadAdminMessageAttachment(
  file: File,
  token?: string | null
): Promise<ApiResponse<MessageAttachmentInfo>> {
  const authToken = getStoredAuthToken(token);
  const formData = new FormData();
  formData.append('file', file);
  try {
    return await postFormDataApi<ApiResponse<MessageAttachmentInfo>>('/admin/messages/upload', formData, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to upload attachment.' };
  }
}

export async function markAdminThreadRead(
  conversationId: string,
  token?: string | null
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  try {
    return await patchApi<ApiResponse>(`/admin/messages/${conversationId}/read`, {}, authToken || undefined);
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to mark thread as read.' };
  }
}

// ==========================================
// 🔨 SELLER ATELIER & MERCHANT SUITE
// ==========================================

export interface SellerDashboardData {
  seller: {
    id: number;
    company_name: string;
    username: string;
    email: string;
    location: string;
    verification_status: string;
    trust_score: number;
    rating: number;
    commission_rate: number;
    assay_office_id?: string;
  };
  metrics: {
    total_sales: number;
    net_payout: number;
    settled_payouts: number;
    available_escrow: number;
    commission_deducted: number;
    total_orders: number;
    pending_orders: number;
    total_products: number;
    active_passports: number;
    pending_payouts: number;
    trust_score: number;
    rating: number;
    commission_rate: number;
    aov: number;
    repeat_collector_rate: number;
  };
  recent_order_items: Array<{
    id: number;
    order_id: number;
    title: string;
    sku?: string;
    quantity: number;
    total_price: number | string;
    seller_payout_amount: number | string;
    status: string;
    carrier?: string;
    tracking_number?: string;
    created_at?: string;
    order?: {
      id: number;
      order_number?: string;
      user?: {
        name: string;
        email: string;
      };
    };
    product?: {
      id: number;
      title: string;
      category?: {
        name: string;
      };
    };
  }>;
  top_products: Array<{
    id: number;
    title: string;
    sku: string;
    price: number;
    category_name: string;
    metal_type: string;
    units_sold: number;
    revenue: number;
  }>;
  live_metals: Array<{
    id: number;
    symbol: string;
    name: string;
    spot_price_usd: number | string;
    spot_price_eur: number | string;
    spot_price_gbp: number | string;
    change_percent_24h: number | string;
    retail_spread_percent: number | string;
  }>;
}

export interface SellerDashboardResponse {
  success: boolean;
  data?: SellerDashboardData;
  message?: string;
}

export interface SellerProductItem {
  id: number;
  sku: string;
  title: string;
  category: string;
  category_id?: number;
  price: number;
  stock_quantity: number;
  status: string;
  is_active?: boolean;
  metal_type?: string;
  metal_purity?: string;
  gross_weight?: number;
  gemstone_spec?: string;
  passport_code?: string;
  images?: string[];
  image_url?: string | null;
  created_at?: string;
}

export interface SellerProductsListResponse {
  success: boolean;
  data?: {
    products: SellerProductItem[];
    total: number;
    counts: {
      all: number;
      in_stock: number;
      low_stock: number;
      sold_out: number;
    };
  };
  message?: string;
}

export interface SellerProductDetailData {
  id: number;
  title: string;
  sku: string;
  category_id: number;
  category_name?: string;
  price: number;
  stock_quantity: number;
  description?: string;
  status?: string;
  images?: string[];
  metal_type?: string;
  purity?: string;
  gross_weight?: number;
  stone_type?: string;
  carat?: string;
  diamond_cut?: string;
  diamond_color?: string;
  diamond_clarity?: string;
  certification?: string;
  certificate_number?: string;
  appraisal_value?: number;
  passport_code?: string;
  qr_verification_hash?: string;
}

export interface SellerProductDetailResponse {
  success: boolean;
  data?: SellerProductDetailData;
  message?: string;
}

export interface SellerPassportItem {
  id: number;
  passport_code: string;
  serial_number: string;
  product_id: number;
  item_title: string;
  metal_purity: string;
  net_weight_grams: number;
  gemstone_summary: string;
  assay_office: string;
  mint_date: string;
  blockchain_tx: string;
  qr_verification_hash: string;
  status: string;
  owner_name: string;
}

export interface SellerPassportsListResponse {
  success: boolean;
  data?: {
    passports: SellerPassportItem[];
    total: number;
  };
  message?: string;
}

export interface SellerCategoryItem {
  id: number;
  name: string;
  slug: string;
}

export async function fetchSellerProducts(
  token?: string,
  params?: Record<string, any>
): Promise<SellerProductsListResponse> {
  const authToken = getStoredAuthToken(token);
  const query = buildQueryString(params);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/products${query}`, {
      headers,
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 401) {
        handleUnauthorized('/seller/products');
      }
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.message || 'Failed to fetch seller products' };
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching seller products:', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function fetchSellerProductDetail(
  token: string | undefined,
  id: number | string
): Promise<SellerProductDetailResponse> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/products/${id}`, {
      headers,
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 401) {
        handleUnauthorized('/seller/products');
      }
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.message || 'Failed to fetch product details' };
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching product details:', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function createSellerProduct(
  token: string | undefined,
  payload: any
): Promise<ApiResponse> {
  return postApi<ApiResponse>('/seller/products', payload, token);
}

export async function updateSellerProduct(
  token: string | undefined,
  id: number | string,
  payload: any
): Promise<ApiResponse> {
  return putApi<ApiResponse>(`/seller/products/${id}`, payload, token);
}

export async function deleteSellerProduct(
  token: string | undefined,
  id: number | string
): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/seller/products/${id}`, token);
}

export async function fetchSellerPassports(
  token?: string,
  params?: Record<string, any>
): Promise<SellerPassportsListResponse> {
  const authToken = getStoredAuthToken(token);
  const query = buildQueryString(params);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/passports${query}`, {
      headers,
      cache: 'no-store',
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.message || 'Failed to fetch digital passports' };
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching seller passports:', err);
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function fetchSellerCategories(
  token?: string
): Promise<{ success: boolean; data?: SellerCategoryItem[] }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/categories`, {
      headers,
      cache: 'no-store',
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching seller categories:', err);
    return { success: false, data: [] };
  }
}

export async function fetchSellerSpotRates(
  token?: string
): Promise<{ success: boolean; data?: any[] }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/metals-spot`, {
      headers,
      cache: 'no-store',
    });
    if (!res.ok) return { success: false, data: [] };
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching seller spot rates:', err);
    return { success: false, data: [] };
  }
}

export async function fetchPublicPassportVerify(code: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/passports/verify/${encodeURIComponent(code)}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error verifying passport' };
  }
}

export async function fetchRecentPassports(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/passports/recent`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, data: [] };
  }
}

// ==========================================
// 📦 SELLER WORKSHOP STOCK & VAULT INVENTORY
// ==========================================

export interface SellerInventoryItem {
  id: number;
  sku: string;
  material_name: string;
  is_jewelry: boolean;
  category: string;
  metal_type: string;
  metal_purity: string;
  weight_grams: number;
  stock_quantity: number;
  reserved_stock: number;
  low_stock_threshold: number;
  location_id: number | null;
  location: string;
  location_city: string;
  valuation_eur: number;
  unit_price: number;
  status: 'Adequate' | 'Low Stock Warning' | 'Sold Out';
  image_url: string | null;
}

export interface SellerInventorySummary {
  total_valuation_eur: number;
  total_units: number;
  total_products: number;
  low_stock_alerts: number;
  out_of_stock: number;
}

export interface SellerInventoryResponse {
  success: boolean;
  data?: {
    items: SellerInventoryItem[];
    summary: SellerInventorySummary;
  };
  message?: string;
}

export interface SellerLowStockAlertItem {
  product_id: number;
  sku: string;
  title: string;
  category: string;
  metal_type: string;
  current_stock: number;
  min_threshold: number;
  severity: string;
  location: string;
  unit_price: number;
  image_url: string | null;
  recommended_reorder_qty: number;
}

export interface SellerVaultItem {
  id: number;
  code: string;
  name: string;
  country: string;
  city: string;
  address: string;
  security_tier: string;
  insurance_underwriter: string;
  max_capacity_units: number;
  current_occupancy_units: number;
  seller_allocated_units: number;
  seller_allocated_valuation_eur: number;
  status: string;
}

export async function fetchSellerInventory(
  token?: string,
  params?: Record<string, any>
): Promise<SellerInventoryResponse> {
  const authToken = getStoredAuthToken(token);
  const query = buildQueryString(params);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory${query}`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch inventory' };
  }
}

export interface SellerStockMovementItem {
  id: number;
  movement_code: string;
  batch_number: string;
  product_id: number;
  product_title: string;
  sku: string;
  image_url: string | null;
  source_location: string;
  destination_location: string;
  movement_type: string;
  quantity_delta: number;
  previous_stock: number;
  new_stock: number;
  authorized_by: string;
  notes: string | null;
  created_at: string | null;
}

export async function adjustSellerStock(
  token: string | undefined,
  data: {
    product_id: number;
    quantity_delta: number;
    batch_number?: string;
    movement_type?: string;
    reason?: string;
    notes?: string;
    warehouse_id?: number;
    authorized_by?: string;
  }
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/adjust`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to adjust stock' };
  }
}

export async function fetchSellerStockMovements(
  token?: string,
  params?: { product_id?: number; batch_number?: string; search?: string }
): Promise<{ success: boolean; data?: { movements: SellerStockMovementItem[]; total: number }; message?: string }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  const query = new URLSearchParams();
  if (params?.product_id) query.append('product_id', String(params.product_id));
  if (params?.batch_number) query.append('batch_number', params.batch_number);
  if (params?.search) query.append('search', params.search);

  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/movements?${query.toString()}`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch inventory movements' };
  }
}

export async function fetchSellerLowStockAlerts(
  token?: string
): Promise<{ success: boolean; data?: { alerts: SellerLowStockAlertItem[]; total_alerts: number; critical_count: number }; message?: string }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/alerts`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch stock alerts' };
  }
}

export async function fetchSellerVaults(
  token?: string
): Promise<{ success: boolean; data?: { vaults: SellerVaultItem[]; total_vaults: number; total_seller_custody_eur: number }; message?: string }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/vaults`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch vaults' };
  }
}

export async function fetchSellerSuppliers(
  token?: string
): Promise<{ success: boolean; data?: { suppliers: any[] }; message?: string }> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/suppliers`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch suppliers' };
  }
}

export async function createSellerReorderPO(
  token: string | undefined,
  data: {
    supplier_id: number;
    material_type: string;
    quantity_grams: number;
    delivery_vault?: string;
  }
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/seller/inventory/reorder`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to submit reorder PO' };
  }
}

// 🛒 Atelier Goldsmith & Merchant Orders & Armored Fulfillment Suite
export interface SellerOrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerLocation: string;
  customerEmail?: string;
  customerPhone?: string;
  itemTitle: string;
  itemPurity: string;
  itemQty: number;
  totalAmountEUR: number;
  commissionAmountEUR?: number;
  sellerPayoutAmountEUR?: number;
  escrowStatus: 'Held in Escrow' | 'Settled' | 'Refunded';
  fulfillmentStatus: 'Awaiting Sizing' | 'Ready to Ship' | 'Dispatched' | 'Delivered' | 'Return Requested' | 'Returned';
  rawStatus?: string;
  carrier: string;
  trackingNumber?: string | null;
  securitySealId: string;
  itemCount?: number;
}

export interface SellerOrderDetailRecord {
  order: {
    id: string;
    orderNumber: string;
    date: string;
    escrowId: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerMembership?: string;
    shippingAddress: {
      street?: string;
      city?: string;
      zip?: string;
      country?: string;
    };
    billingAddress: {
      street?: string;
      city?: string;
      zip?: string;
      country?: string;
    };
    subtotalEUR: number;
    commissionEUR: number;
    netPayoutEUR: number;
    escrowStatus: 'Held in Escrow' | 'Settled' | 'Refunded';
    fulfillmentStatus: 'Awaiting Sizing' | 'Ready to Ship' | 'Dispatched' | 'Delivered' | 'Return Requested' | 'Returned';
    rawStatus: string;
    carrier: string;
    trackingNumber?: string | null;
    securitySealId: string;
    highValueVerified: boolean;
    paymentMethod?: string;
    currency?: string;
  };
  items: Array<{
    id: number;
    product_id: number;
    title: string;
    sku: string;
    unit_price: number;
    quantity: number;
    total_price: number;
    status: string;
    carrier?: string;
    tracking_number?: string;
    metal_type?: string;
    purity?: string;
    weight_grams?: number;
    stone_type?: string;
    carat?: string;
    diamond_cut?: string;
    diamond_color?: string;
    diamond_clarity?: string;
    hallmark?: string;
    certificate?: string;
    certificate_number?: string;
    ring_size?: string;
    passport_code?: string;
  }>;
  carriers: Array<{
    id: number;
    carrier_code: string;
    name: string;
    type: string;
    speed: string;
  }>;
}

export async function fetchSellerOrders(
  token?: string | null,
  params?: { status?: string; search?: string }
): Promise<{
  success: boolean;
  data?: {
    orders: SellerOrderRecord[];
    status_counts: Record<string, number>;
    total: number;
  };
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const queryParams = new URLSearchParams();
  if (params?.status && params.status !== 'all') {
    queryParams.set('status', params.status);
  }
  if (params?.search) {
    queryParams.set('search', params.search);
  }

  const url = `${API_BASE_URL}/seller/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  try {
    const res = await fetch(url, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch seller orders' };
  }
}

export async function fetchSellerOrderDetail(
  token: string | null | undefined,
  id: string
): Promise<{
  success: boolean;
  data?: SellerOrderDetailRecord;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/orders/${encodeURIComponent(id)}`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch order detail' };
  }
}

export async function updateSellerOrderFulfillment(
  token: string | null | undefined,
  id: string,
  data: {
    status: string;
    carrier?: string;
    tracking_number?: string;
    security_seal_id?: string;
    sizing_confirmed?: boolean;
    hallmark_verified?: boolean;
    seal_applied?: boolean;
  }
): Promise<ApiResponse> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/orders/${encodeURIComponent(id)}/fulfillment`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update order fulfillment' };
  }
}

export async function fetchSellerShippingCarriers(
  token?: string | null
): Promise<{
  success: boolean;
  data?: Array<{ id: number; carrier_code: string; name: string; type: string; speed: string }>;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/shipping/carriers`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch shipping carriers' };
  }
}

export interface SellerReturnCase {
  id: string;
  orderNumber: string;
  customerName: string;
  itemTitle: string;
  returnReason: string;
  grossWeightOriginal: number;
  grossWeightReceived: number;
  reAssayStatus: string;
  refundStatus: string;
  dateReceived: string;
}

export async function fetchSellerReturns(
  token?: string | null
): Promise<{
  success: boolean;
  data?: {
    returns: SellerReturnCase[];
    total: number;
  };
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/returns`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch seller returns' };
  }
}

export interface SellerRefundCase {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  itemTitle: string;
  originalAmount: number;
  restockingFee: number;
  netRefundAmount: number;
  currency: string;
  payoutDestination: string;
  status: 'Pending Approval' | 'Processing SEPA' | 'Settled' | 'Declined' | string;
  requestedDate: string;
  settledDate?: string | null;
  reason: string;
}

export async function fetchSellerRefunds(
  token?: string | null
): Promise<{
  success: boolean;
  data?: {
    refunds: SellerRefundCase[];
    total: number;
    total_amount: number;
    pending_count: number;
  };
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/refunds`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch seller refunds' };
  }
}

export async function approveSellerRefund(
  token: string | null | undefined,
  orderNumber: string
): Promise<{
  success: boolean;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/refunds/${orderNumber}/approve`, {
      method: 'POST',
      headers,
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to approve refund' };
  }
}

// -------------------------------------------------------------
// 🏷️ Seller Promotions & Campaigns Suite
// -------------------------------------------------------------

export interface SellerPromotionItem {
  id: number | string;
  code: string;
  title: string;
  discount_type: string;
  discount_value: number;
  min_order_amount: number;
  valid_until: string;
  times_used: number;
  status: string;
  is_active: boolean;
}

export async function fetchSellerPromotions(token?: string | null): Promise<{
  success: boolean;
  data?: {
    promotions: SellerPromotionItem[];
    total: number;
  };
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/promotions`, {
      headers,
      cache: 'no-store',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch seller promotions' };
  }
}

export async function createSellerPromotion(
  token: string | null | undefined,
  payload: {
    code: string;
    title: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_amount?: number;
    valid_until?: string;
  }
): Promise<{
  success: boolean;
  message?: string;
  data?: any;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/promotions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to create promotion' };
  }
}

export async function deleteSellerPromotion(
  token: string | null | undefined,
  id: number | string
): Promise<{
  success: boolean;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/promotions/${id}`, {
      method: 'DELETE',
      headers,
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete promotion' };
  }
}

// -------------------------------------------------------------
// 🏪 Boutique Storefront & Image Settings Suite
// -------------------------------------------------------------

export interface SellerStorefrontData {
  id: number | string;
  company_name: string;
  tagline: string;
  description: string;
  slug: string;
  location: string;
  logo?: string | null;
  banner?: string | null;
  gallery?: string[];
  trust_score?: number;
  rating?: number;
  review_count?: number;
}

/**
 * Resolves full URL for backend media and uploaded storage assets.
 * Handles relative paths like "/storage/...", "storage/...", "uploads/...", or full URLs.
 */
export function getMediaUrl(url?: string | null, fallback: string = ''): string {
  if (!url || typeof url !== 'string' || !url.trim()) return fallback;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
  const backendBase = apiBase.replace(/\/api\/?$/, '');
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${backendBase}${cleanPath}`;
}

export async function fetchSellerStorefront(token?: string | null): Promise<{
  success: boolean;
  data?: SellerStorefrontData;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/storefront`, {
      headers,
      cache: 'no-store',
    });
    const json = await res.json();
    if (json?.data) {
      if (json.data.logo) json.data.logo = getMediaUrl(json.data.logo);
      if (json.data.banner) json.data.banner = getMediaUrl(json.data.banner);
      if (Array.isArray(json.data.gallery)) {
        json.data.gallery = json.data.gallery.map((g: string) => getMediaUrl(g));
      }
    }
    return json;
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to fetch storefront settings' };
  }
}

export async function updateSellerStorefront(
  token: string | null | undefined,
  payload: Partial<SellerStorefrontData>
): Promise<{
  success: boolean;
  data?: SellerStorefrontData;
  message?: string;
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/seller/storefront`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json?.data) {
      if (json.data.logo) json.data.logo = getMediaUrl(json.data.logo);
      if (json.data.banner) json.data.banner = getMediaUrl(json.data.banner);
      if (Array.isArray(json.data.gallery)) {
        json.data.gallery = json.data.gallery.map((g: string) => getMediaUrl(g));
      }
    }
    return json;
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update storefront settings' };
  }
}

// ==========================================
// 💰 Seller Financials & Escrow Ledger Suite
// ==========================================

export interface SellerFinancialMetrics {
  gross_revenue: number;
  net_earnings: number;
  commission_deducted: number;
  commission_rate: number;
  available_escrow: number;
  locked_escrow: number;
  settled_payouts: number;
  pending_payouts: number;
}

export interface SellerMonthlyTrend {
  month: string;
  gross: number;
  commission: number;
  net: number;
}

export interface SellerEscrowRecord {
  id: string;
  order_number: string;
  date: string;
  item_title: string;
  sku: string;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  net_amount: number;
  escrow_status: 'Locked' | 'Released' | 'Settled' | 'Refunded';
  fulfillment_status: string;
  carrier: string;
  tracking_number: string;
  customer_name: string;
}

export interface SellerInvoiceRecord {
  id: string;
  invoice_number: string;
  period: string;
  issued_date: string;
  gross_sales: number;
  commission_amount: number;
  net_payout: number;
  vat_status: string;
  status: string;
  download_url: string;
}

export interface SellerFinancialReportData {
  period_label: string;
  currency: string;
  summary: {
    gross_sales: number;
    marketplace_fees: number;
    net_settlement: number;
    armored_shipping_absorbed: number;
    refunds_total: number;
    total_orders: number;
    average_order_value: number;
  };
  category_breakdown: Array<{ category: string; gross: number; share: number; units: number }>;
  monthly_breakdown: Array<{ month: string; orders: number; gross: number; fees: number; net: number }>;
  settlement_routes: Array<{ method: string; volume: number; share: number }>;
}

export async function fetchSellerFinancialOverview(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: {
    metrics: SellerFinancialMetrics;
    monthly_trends: SellerMonthlyTrend[];
    seller: {
      id: number;
      company_name: string;
      tax_vat_number: string;
      currency: string;
    };
  };
}> {
  return getApi('/seller/financials', token);
}

export async function fetchSellerEscrowLedger(
  token?: string | null,
  params?: { status?: string; search?: string }
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    records: SellerEscrowRecord[];
    counts: {
      all: number;
      locked: number;
      released: number;
      settled: number;
      refunded: number;
    };
  };
}> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : '';
  return getApi(`/seller/financials/escrow${query}`, token);
}

export async function fetchSellerInvoices(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: {
    invoices: SellerInvoiceRecord[];
  };
}> {
  return getApi('/seller/financials/invoices', token);
}

export async function fetchSellerFinancialReports(
  token?: string | null,
  period?: string
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    report: SellerFinancialReportData;
  };
}> {
  const query = period ? `?period=${encodeURIComponent(period)}` : '';
  return getApi(`/seller/financials/reports${query}`, token);
}

// ==========================================
// 💳 Seller Payouts & Settlement Suite
// ==========================================

export interface SellerPayoutSummary {
  balances: {
    available_for_payout: number;
    pending_in_escrow: number;
    total_settled: number;
    pending_withdrawal_requests: number;
    currency: string;
  };
  primary_bank: {
    bank_name: string;
    account_holder: string;
    iban: string;
    bic: string;
    currency: string;
    verified: boolean;
  };
}

export interface SellerPayoutHistoryRecord {
  id: string;
  transaction_ref: string;
  date: string;
  amount: number;
  commission_deducted: number;
  method: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  processed_at: string | null;
  destination: string;
}

export async function fetchSellerPayoutSummary(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: SellerPayoutSummary;
}> {
  return getApi('/seller/payouts', token);
}

export async function fetchSellerPayoutHistory(
  token?: string | null,
  params?: { status?: string; search?: string }
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    records: SellerPayoutHistoryRecord[];
    counts: {
      all: number;
      pending: number;
      processing: number;
      completed: number;
      failed: number;
    };
  };
}> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : '';
  return getApi(`/seller/payouts/history${query}`, token);
}

export async function submitSellerPayoutRequest(
  token: string | null | undefined,
  payload: {
    amount: number;
    payout_method: string;
    destination_account?: string;
    note?: string;
  }
): Promise<ApiResponse> {
  return postApi('/seller/payouts/request', payload, token);
}

export async function fetchSellerPayoutAccounts(token?: string | null): Promise<ApiResponse> {
  return getApi('/seller/payouts/accounts', token);
}

// ==========================================
// ⭐ Seller Reviews & Reputation Suite
// ==========================================

export interface SellerReviewItem {
  id: string;
  review_code: string;
  customer_name: string;
  rating: number;
  item_title: string;
  review_text: string;
  assay_photo_attached: boolean;
  assay_photo_url: string | null;
  assay_photo_caption: string | null;
  helpful_count: number;
  status: string;
  verified_purchase: boolean;
  seller_reply: string | null;
  seller_reply_at: string | null;
  created_at: string;
}

export interface SellerReviewsMetrics {
  average_rating: number;
  total_reviews: number;
  verified_buyers_percent: number;
  response_rate_percent: number;
  rating_breakdown: Record<number, number>;
}

export interface SellerReputationDimension {
  name: string;
  score: number;
  status: string;
  detail: string;
  weight: string;
}

export interface SellerReputationBadge {
  title: string;
  issuer: string;
  verified: boolean;
  date: string;
}

export interface SellerReputationData {
  overall_trust_score: number;
  tier_status: string;
  tier_badge: string;
  member_since: string;
  total_verified_orders: number;
  dimensions: SellerReputationDimension[];
  badges: SellerReputationBadge[];
}

export async function fetchSellerReviews(
  token?: string | null,
  params?: { rating?: string | number; search?: string }
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    reviews: SellerReviewItem[];
    metrics: SellerReviewsMetrics;
  };
}> {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : '';
  return getApi(`/seller/reviews${query}`, token);
}

export async function submitSellerReviewReply(
  token: string | null | undefined,
  reviewId: string | number,
  reply: string
): Promise<ApiResponse> {
  return postApi(`/seller/reviews/${reviewId}/reply`, { reply }, token);
}

export async function fetchSellerReputation(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: {
    reputation: SellerReputationData;
  };
}> {
  return getApi('/seller/reviews/reputation', token);
}

// ==========================================
// ⚙️ Seller Policies & Atelier Settings Suite
// ==========================================

export interface SellerShippingPolicy {
  preferred_carriers: string[];
  standard_dispatch_sla: string;
  bespoke_dispatch_sla: string;
  depository_vault_handover: boolean;
  tamper_seal_enforced: boolean;
  video_packaging_protocol: boolean;
  signature_id_required: boolean;
  insurance_coverage_rate: string;
  packaging_standard: string;
  shipping_notes: string;
}

export interface SellerReturnPolicy {
  statutory_window_days: number;
  inspection_lead_hours: number;
  assay_verification_required: boolean;
  assay_method: string;
  bullion_blister_unbroken_required: boolean;
  restocking_fee_percent: number;
  reassay_laboratory_fee: number;
  return_shipping_payer: string;
  conditions: string[];
  return_notes: string;
}

export interface SellerPoliciesData {
  shipping_policy: SellerShippingPolicy;
  return_policy: SellerReturnPolicy;
  company_name?: string;
  location?: string;
  verification_status?: string;
}

export async function fetchSellerPolicies(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: SellerPoliciesData;
}> {
  return getApi('/seller/policies', token ?? undefined);
}

export async function updateSellerPolicies(
  token: string | null | undefined,
  payload: {
    shipping_policy?: Partial<SellerShippingPolicy>;
    return_policy?: Partial<SellerReturnPolicy>;
  }
): Promise<ApiResponse> {
  return postApi('/seller/policies', payload, token ?? undefined);
}

export interface SellerWorkshopProfileData {
  id: number;
  company_name: string;
  legal_name?: string;
  legal_entity_name: string;
  tagline: string;
  description: string;
  location: string;
  vat_number: string;
  tax_number: string;
  guild_license_no: string;
  head_master: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  verification_status: string;
  trust_score: number;
  rating: number;
  review_count: number;
  discovery_settings: {
    storefront_active: boolean;
    lbma_badge_visible: boolean;
    direct_inquiries_enabled: boolean;
    showcase_in_marketplace: boolean;
  };
}

export async function fetchSellerWorkshopProfile(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: SellerWorkshopProfileData;
}> {
  return getApi('/seller/profile', token ?? undefined);
}

export async function updateSellerWorkshopProfile(
  token: string | null | undefined,
  payload: Partial<SellerWorkshopProfileData>
): Promise<ApiResponse> {
  return postApi('/seller/profile', payload, token ?? undefined);
}

export interface Seller2FASetupData {
  is_enabled: boolean;
  secret_key: string;
  formatted_secret: string;
  otpauth_url: string;
  qr_code_url: string;
  backup_codes: string[];
  confirmed_at?: string | null;
  policies?: {
    treasury_disbursements_enforced?: boolean;
    staff_role_elevation_enforced?: boolean;
    smart_contract_rules_enforced?: boolean;
    escrow_payouts_enforced?: boolean;
    bank_changes_enforced?: boolean;
    reorders_enforced?: boolean;
  };
}

export async function fetchSeller2FASetup(token?: string | null): Promise<{
  success: boolean;
  message?: string;
  data?: Seller2FASetupData;
}> {
  return getApi('/seller/2fa/setup', token ?? undefined);
}

export async function enableSeller2FA(
  token: string | null | undefined,
  code: string
): Promise<ApiResponse> {
  return postApi('/seller/2fa/enable', { code }, token ?? undefined);
}

export async function disableSeller2FA(
  token: string | null | undefined,
  code: string
): Promise<ApiResponse> {
  return postApi('/seller/2fa/disable', { code }, token ?? undefined);
}

export async function regenerateSeller2FARecoveryCodes(
  token: string | null | undefined
): Promise<{
  success: boolean;
  message?: string;
  data?: { backup_codes: string[] };
}> {
  return postApi('/seller/2fa/recovery-codes', {}, token ?? undefined);
}

export async function saveSeller2FAPolicies(
  token: string | null | undefined,
  policies: Record<string, boolean>
): Promise<ApiResponse> {
  return postApi('/seller/2fa/policies', policies, token ?? undefined);
}

export async function updateSellerAccountPassword(
  token: string | null | undefined,
  payload: {
    current_password: string;
    new_password: string;
    confirm_password?: string;
    two_factor_code?: string;
    logout_all_devices?: boolean;
  }
): Promise<ApiResponse> {
  return postApi('/seller/change-password', payload, token ?? undefined);
}

// ==========================================
// 🛡️ Goldsmith KYB & Compliance Suite
// ==========================================

export interface SellerComplianceAccreditation {
  id: string;
  name: string;
  authority: string;
  license_id: string;
  valid_until: string;
  status: string;
  is_verified: boolean;
}

export interface SellerComplianceCaseInfo {
  id: number;
  case_number: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  risk_level: string;
  risk_score: number;
  submitted_at: string;
  last_audited_by?: string;
  assay_license_number?: string | null;
  legal_entity_number?: string | null;
  notes?: string;
  documents?: Array<{
    label?: string;
    name?: string;
    file_name: string;
    type?: string;
    size?: string;
    path?: string;
    url?: string;
    stream_url?: string;
    uploaded_at?: string;
    uploadedAt?: string;
    status?: string;
  }>;
  audit_trail?: Array<{
    timestamp: string;
    officer: string;
    action: string;
    note: string;
  }>;
}

export interface SellerComplianceData {
  seller_id: number;
  company_name: string;
  legal_name: string;
  vat_number: string;
  guild_license_no: string;
  verification_status: 'pending' | 'verified' | 'rejected' | 'unverified';
  is_verified: boolean;
  can_resubmit?: boolean;
  rejection_reason?: string | null;
  trust_level: string;
  accreditations: SellerComplianceAccreditation[];
  latest_case: SellerComplianceCaseInfo | null;
}

export async function fetchSellerCompliance(
  token?: string | null
): Promise<{
  success: boolean;
  message?: string;
  data?: SellerComplianceData;
}> {
  return getApi('/seller/compliance', token ?? undefined);
}

export async function submitSellerKYBRequest(
  token: string | null | undefined,
  data: FormData | Record<string, any>
): Promise<{
  success: boolean;
  message?: string;
  data?: {
    case_id: number;
    case_number: string;
    status: string;
    verification_status: string;
  };
}> {
  const authToken = getStoredAuthToken(token);
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}/seller/compliance/request`, {
    method: 'POST',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });

  if (res.status === 401) {
    handleUnauthorized('/seller/compliance/request');
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Submission failed with status ${res.status}`);
  }

  return json;
}

export async function requireSellerReKyb(
  token: string | null | undefined,
  sellerId: number | string,
  reason?: string
): Promise<{ success: boolean; message?: string; data?: any }> {
  return postApi(`/admin/sellers/${sellerId}/rekyb`, { reason }, token ?? undefined);
}

export interface MetalSpotRate {
  id?: number;
  symbol: string; // 'XAU', 'XAG', 'XPT', 'XPD'
  name: string;
  spot_price_eur: number;
  spot_price_usd: number;
  spot_price_gbp: number;
  change_24h: number;
  change_percent_24h: number;
  last_updated_at?: string;
}

export interface GlobalSearchResultItem {
  id: number | string;
  title?: string;
  order_number?: string;
  customer_name?: string;
  total_amount?: number;
  price?: number;
  sku?: string;
  image?: string | null;
  status?: string;
  type: string;
  url: string;
  currency?: string;
  date?: string;
  metal_type?: string;
  purity?: string;
  hallmark?: string;
  serial_number?: string;
  company_name?: string;
  trust_score?: number;
  location?: string;
  seller?: string;
  case_number?: string;
  entity_name?: string;
  case_type?: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface SellerGlobalSearchResponse {
  success: boolean;
  query: string;
  total_count: number;
  data: {
    products: GlobalSearchResultItem[];
    orders: GlobalSearchResultItem[];
    passports: GlobalSearchResultItem[];
  };
}

export interface AdminGlobalSearchResponse {
  success: boolean;
  query: string;
  total_count: number;
  data: {
    orders: GlobalSearchResultItem[];
    sellers: GlobalSearchResultItem[];
    products: GlobalSearchResultItem[];
    compliance: GlobalSearchResultItem[];
    users: GlobalSearchResultItem[];
  };
}

export async function fetchLiveMetalRates(): Promise<{ success: boolean; data: MetalSpotRate[]; timestamp?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/metals/live`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return { success: false, data: [] };
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching live metal rates:', err);
    return { success: false, data: [] };
  }
}

export async function searchSellerGlobal(
  query: string,
  token?: string | null
): Promise<SellerGlobalSearchResponse> {
  try {
    return await getApi<SellerGlobalSearchResponse>(
      `/seller/global-search?q=${encodeURIComponent(query)}`,
      token
    );
  } catch (err: any) {
    console.error('Error searching seller global:', err);
    return {
      success: false,
      query,
      total_count: 0,
      data: { products: [], orders: [], passports: [] },
    };
  }
}

export async function searchAdminGlobal(
  query: string,
  token?: string | null
): Promise<AdminGlobalSearchResponse> {
  try {
    return await getApi<AdminGlobalSearchResponse>(
      `/admin/global-search?q=${encodeURIComponent(query)}`,
      token
    );
  } catch (err: any) {
    console.error('Error searching admin global:', err);
    return {
      success: false,
      query,
      total_count: 0,
      data: { orders: [], sellers: [], products: [], compliance: [], users: [] },
    };
  }
}






// Auction code start


export function resolveAuctionImage(images: any): string {
  const fallback = getCategoryImageUrl(null);

  if (!images) return fallback;

  let image = images;

  
  if (typeof image === 'string') {
    try {
      image = JSON.parse(image);
    } catch {
      
    }
  }


  if (Array.isArray(image)) {
    image = image[0];
  }

  if (typeof image !== 'string' || !image.trim()) {
    return fallback;
  }


  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }


  return getCategoryImageUrl(image.trim());
}
export interface AuctionProduct {
  id: number;
  title?: string;
  slug?: string;
  price?: string | number;
  images?: string[] | string | null;
}

export interface AuctionSeller {
  id: number;
  company_name?: string;
  slug?: string;
  logo?: string | null;
  verification_status?: string;
}



export interface Auction {
  id: number;
  product_id: number;
  seller_id: number;
  starting_price: string | number;
  minimum_bid_increment: string | number;
  reserve_price?: string | number | null;
  current_bid?: string | number | null;
  winner_user_id?: number | null;
  starts_at: string;
  ends_at: string;
  ended_at?: string | null;
  status: 'draft' | 'scheduled' | 'active' | 'ended' | string;
  product?: AuctionProduct;
  seller?: AuctionSeller;
}

export interface AuctionBid {
  bid_id: number;
  bidder?: string;
  bid_amount: string | number;
  bid_type?: 'manual' | 'automatic' | string;
  status?: string;
  bid_time?: string;
}

export interface AuctionApiResult<T> {
  success?: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export async function fetchAuctions(params?: Record<string, any>): Promise<AuctionApiResult<any>> {
  return getApi<AuctionApiResult<any>>(`/auctions${buildQueryString(params)}`);
}

export async function fetchAuctionDetail(id: number | string): Promise<AuctionApiResult<Auction>> {
  return getApi<AuctionApiResult<Auction>>(`/auctions/${id}`);
}

export async function fetchAuctionBids(
  id: number | string,
  page = 1
): Promise<AuctionApiResult<any>> {
  return getApi<AuctionApiResult<any>>(`/auctions/${id}/bids${buildQueryString({ page })}`);
}




export async function submitAuctionBid(
  id: number | string,
  bidAmount: number | string,
  token?: string | null
): Promise<AuctionApiResult<any>> {
  return postApi<AuctionApiResult<any>>(`/auctions/${id}/bid`, { bid_amount: bidAmount }, token);
}

export async function submitAuctionAutoBid(
  id: number | string,
  maximumBid: number | string,
  token?: string | null
): Promise<AuctionApiResult<any>> {
  return postApi<AuctionApiResult<any>>(`/auctions/${id}/auto-bid`, { maximum_bid: maximumBid }, token);
}









// profile setting api code 



// ==========================================
// CUSTOMER PROFILE API
// ==========================================

export interface CustomerProfileData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  nationality?: string;
  tax_residency?: string;
  primary_address?: string;
  avatar_url?: string | null;
}

export async function fetchCustomerProfile(token?: string | null) {
  return getApi<ApiResponse<CustomerProfileData>>(
    '/customer/profile',
    getStoredAuthToken(token) ?? undefined
  );
}

export async function updateCustomerProfile(
  formData: FormData,
  token?: string | null
): Promise<ApiResponse<CustomerProfileData>> {
  const authToken = getStoredAuthToken(token);

  const response = await fetch(`${API_BASE_URL}/customer/profile`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: formData,
  });

  if (response.status === 401 && authToken) {
    handleUnauthorized('/customer/profile', true);
  }

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Profile update failed');
  }

  return result;
}

// ==========================================
// CUSTOMER BANK ACCOUNTS API
// ==========================================

export interface CustomerBankAccount {
  id: string;
  bank_name: string;
  account_holder: string;
  iban: string;
  bic_swift: string;
  currency: string;
  country: string;
  is_primary: boolean;
  status: string;
}

export async function fetchCustomerBankAccounts(token?: string | null) {
  return getApi<ApiResponse<CustomerBankAccount[]>>(
    '/customer/bank-accounts',
    getStoredAuthToken(token) ?? undefined
  );
}

export async function addCustomerBankAccount(
  data: Record<string, any>,
  token?: string | null
) {
  return postApi<ApiResponse<CustomerBankAccount>>(
    '/customer/bank-accounts',
    data,
    getStoredAuthToken(token)
  );
}

export async function setPrimaryCustomerBankAccount(
  id: string,
  token?: string | null
) {
  return putApi<ApiResponse>(
    `/customer/bank-accounts/${encodeURIComponent(id)}/primary`,
    {},
    getStoredAuthToken(token)
  );
}

export async function deleteCustomerBankAccount(
  id: string,
  token?: string | null
) {
  return deleteApi<ApiResponse>(
    `/customer/bank-accounts/${encodeURIComponent(id)}`,
    getStoredAuthToken(token)
  );
}

// ==========================================
// CUSTOMER SETTINGS API
// ==========================================

export interface CustomerSettingsData {
  addresses: Array<{
    id: string;
    label: string;
    recipient_name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
  }>;
  preferences: {
    preferred_currency: string;
    email_digest: boolean;
    spot_price_alerts: boolean;
  };
}

export async function fetchCustomerSettings(token?: string | null) {
  return getApi<ApiResponse<CustomerSettingsData>>(
    '/customer/settings',
    getStoredAuthToken(token) ?? undefined
  );
}

export async function updateCustomerSettings(
  data: Partial<CustomerSettingsData>,
  token?: string | null
) {
  return postApi<ApiResponse<CustomerSettingsData>>(
    '/customer/settings',
    data,
    getStoredAuthToken(token)
  );
}

// ==========================================
// CUSTOMER PASSWORD API
// ==========================================


export async function changeCustomerPassword(
  data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
    two_factor_code?: string;
    logout_other_sessions: boolean;
  },
  token?: string | null
) {
  return postApi<ApiResponse<{
    logged_out_other_sessions: boolean;
  }>>(
    '/customer/change-password',
    data,
    getStoredAuthToken(token)
  );
}

// ==========================================
// CUSTOMER TWO-FACTOR AUTHENTICATION API
// ==========================================

export interface Customer2FASetupData {
  is_enabled: boolean;
  secret_key: string;
  formatted_secret: string;
  otpauth_url: string;
  qr_code_url: string;
  backup_codes: string[];
  confirmed_at?: string | null;
}


// export interface Customer2FASetupData2 {
//   is_enabled: boolean;
//   secret_key: string;
//   formatted_secret: string;
//   otpauth_url: string;
//   backup_codes?: string[];
//   confirmed_at?: string | null;
//   policies?: {
//     vault_withdrawals_enforced: boolean;
//     cash_withdrawals_enforced: boolean;
//     bank_changes_enforced: boolean;
//   };
// }

export async function fetchCustomer2FASetup(token?: string | null) {
  return getApi<ApiResponse<Customer2FASetupData>>(
    '/customer/2fa/setup',
    getStoredAuthToken(token) ?? undefined
  );
}

export async function enableCustomer2FA(
  code: string,
  token?: string | null
) {
  return postApi<ApiResponse>(
    '/customer/2fa/enable',
    { code },
    getStoredAuthToken(token)
  );
}

export async function disableCustomer2FA(
  code: string,
  token?: string | null
) {
  return postApi<ApiResponse>(
    '/customer/2fa/disable',
    { code },
    getStoredAuthToken(token)
  );
}

export async function regenerateCustomer2FARecoveryCodes(
  token?: string | null
) {
  return postApi<ApiResponse<{ backup_codes: string[] }>>(
    '/customer/2fa/recovery-codes',
    {},
    getStoredAuthToken(token)
  );
}

// export async function regenerateCustomer2FARecoveryCodes2(
//   current_password: string,
//   code: string,
//   token?: string | null
// ) {
//   return postApi<ApiResponse<{ backup_codes: string[] }>>(
//     '/customer/2fa/recovery-codes',
//     { current_password, code },
//     getStoredAuthToken(token)
//   );
// }



export async function updateCustomer2FAPolicies(
  policies: {
    vault_withdrawals_enforced: boolean;
    cash_withdrawals_enforced: boolean;
    bank_changes_enforced: boolean;
  },
  token?: string | null
) {
  return postApi<ApiResponse>(
    '/customer/2fa/policies',
    policies,
    getStoredAuthToken(token)
  );
}




// message code 
// ==========================================================
// CUSTOMER SUPPORT MESSAGES API
// ==========================================================

// export interface CustomerMessageItem {
//   id: string;
//   sender: 'client' | 'concierge';
//   senderName: string;
//   avatarText: string;
//   text: string;
//   timestamp: string;
//   attachment?: {
//     name: string;
//     size: string;
//     url: string;
//   } | null;
// }

// export async function fetchCustomerMessages(
//   token?: string
// ): Promise<ApiResponse<CustomerMessageItem[]>> {
//   return getApi<ApiResponse<CustomerMessageItem[]>>(
//     '/customer/messages',
//     token
//   );
// }

// export async function sendCustomerMessage(
//   message: string,
//   file?: File | null,
//   token?: string
// ): Promise<ApiResponse<CustomerMessageItem>> {
//   const formData = new FormData();

//   formData.append('message', message);

//   if (file) {
//     formData.append('attachment', file);
//   }

//   return postFormDataApi<ApiResponse<CustomerMessageItem>>(
//     '/customer/messages',
//     formData,
//     token
//   );
// }


// ==========================================
// CUSTOMER SUPPORT MESSAGES
// ==========================================

export interface CustomerMessageItem {
  id: string;
  sender: 'client' | 'concierge';
  senderName: string;
  avatarText: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    url: string;
    type?: string;
  } | null;
}

// export interface CustomerContact {
//   id: string;
//   type: 'admin' | 'seller' | 'user' | 'supplier';
//   name: string;
//   email: string | null;
//   role: string;
//   avatarText: string;
//   conversation_id: string;
//   lastMessage: string;
//   lastMessageTime: string | null;
//   unreadCount: number;
// }


export interface CustomerContact {
  id: string;
  type: string;
  name: string;
  email: string;
  role: string;
  avatarText: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageAt?: string | null; // NEW
  unreadCount: number;
}


export interface CustomerContactMessages {
  conversation_id: string;
  contact: CustomerContact;
  messages: CustomerMessageItem[];
}
export async function fetchCustomerContacts(
  token?: string | null
): Promise<ApiResponse<CustomerContact[]>> {
  return getApi<ApiResponse<CustomerContact[]>>(
    '/customer/messages/contacts',
    token
  );
}

export async function fetchCustomerMessages(
  type: CustomerContact['type'],
  id: string,
  token?: string | null
): Promise<ApiResponse<CustomerContactMessages>> {
  return getApi<ApiResponse<CustomerContactMessages>>(
    `/customer/messages/${type}/${id}`,
    token
  );
}

export async function sendCustomerMessage(
  type: CustomerContact['type'],
  id: string,
  message: string,
  file?: File | null,
  token?: string | null
): Promise<ApiResponse<CustomerMessageItem>> {
  const formData = new FormData();

  formData.append('message', message || '');

  if (file) {
    formData.append('attachment', file);
  }

  return postFormDataApi<ApiResponse<CustomerMessageItem>>(
    `/customer/messages/${type}/${id}/send`,
    formData,
    token
  );
}