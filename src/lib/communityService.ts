import { getApi, postApi, patchApi, deleteApi, buildQueryString, ApiResponse } from './api';

export interface CommunityPostItem {
  id: number;
  post_code: string;
  author_name: string;
  author_role: string;
  author_avatar?: string;
  item_title?: string;
  content: string;
  media_type: 'image' | 'video' | '3d_model' | 'assay_cert';
  media_url?: string;
  media_caption?: string;
  is_verified_purchase: boolean;
  order_code?: string;
  tags?: string[];
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  status: 'Approved & Live' | 'Pending Review' | 'Flagged' | 'Archived';
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface MerchantGuildItem {
  id: number;
  guild_code: string;
  name: string;
  slug: string;
  location: string;
  specialty: string;
  description?: string;
  logo?: string;
  banner?: string;
  followers_count: number;
  active_stories_count: number;
  trust_score: number;
  nft_tier: string;
  commission_discount: string;
  status: 'Verified Guild' | 'Master Atelier' | 'Pending Audit' | 'Suspended';
  is_featured: boolean;
  seller_id?: number;
  created_at: string;
  updated_at: string;
  seller?: {
    id: number;
    shop_name: string;
    company_name: string;
  };
}

export interface ProductReviewItem {
  id: number;
  review_code: string;
  customer_name: string;
  customer_avatar?: string;
  item_title: string;
  merchant_name?: string;
  rating: number;
  review_text: string;
  assay_photo_attached: boolean;
  assay_photo_url?: string;
  assay_photo_caption?: string;
  assay_certificate_ref?: string;
  helpful_votes: number;
  merchant_response?: string;
  status: 'Approved & Live' | 'Pending Assay Audit' | 'Flagged Suspicious' | 'Hidden';
  created_at: string;
  updated_at: string;
}

export interface SocialCampaignItem {
  id: number;
  campaign_code: string;
  title: string;
  influencer_or_guild: string;
  channel: string;
  target_url?: string;
  clicks_count: number;
  conversions_count: number;
  realized_gmv: number;
  commission_paid: number;
  roi_multiplier: string;
  status: 'Active Live' | 'Scheduled' | 'Completed' | 'Paused';
  starts_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// 💬 Community Feed Posts API
export async function fetchAdminCommunityPosts(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/posts${query}`, token);
}

export async function fetchAdminCommunityPostDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/community/posts/${id}`, token);
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

// 🏛️ Merchant Guilds API
export async function fetchAdminMerchantGuilds(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/guilds${query}`, token);
}

export async function fetchAdminMerchantGuildDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/community/guilds/${id}`, token);
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

// ⭐ Product Reviews & Assay API
export async function fetchAdminProductReviews(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/reviews${query}`, token);
}

export async function fetchAdminProductReviewDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/community/reviews/${id}`, token);
}

export async function updateAdminProductReviewStatus(token: string, id: number | string, status: string): Promise<ApiResponse> {
  return patchApi<ApiResponse>(`/admin/community/reviews/${id}/status`, { status }, token);
}

export async function deleteAdminProductReview(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/community/reviews/${id}`, token);
}

// 🚀 Social Campaigns API
export async function fetchAdminSocialCampaigns(token: string, params?: Record<string, any>): Promise<ApiResponse> {
  const query = buildQueryString(params);
  return getApi<ApiResponse>(`/admin/community/campaigns${query}`, token);
}

export async function fetchAdminSocialCampaignDetail(token: string, id: number | string): Promise<ApiResponse> {
  return getApi<ApiResponse>(`/admin/community/campaigns/${id}`, token);
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
