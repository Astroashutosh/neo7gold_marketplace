import { getApi, postApi, putApi, patchApi, deleteApi, buildQueryString, ApiResponse } from './api';

export interface Nb7OverviewToken {
  symbol: string;
  name: string;
  price_eur: number;
  price_formatted: string;
  circulating_supply: number;
  circulating_supply_formatted: string;
  max_supply: number;
  max_supply_formatted: string;
  market_cap_eur: number;
  market_cap_formatted: string;
  fee_discount_percent: string;
}

export interface StakingPoolItem {
  id: number;
  pool_code: string;
  name: string;
  underlying_asset: string;
  vault_location: string;
  tvl_eur: number;
  tvl_tokens: number;
  apr_percentage: number;
  lock_period_days: number;
  total_stakers: number;
  status: 'Active Earning' | 'Capacity Filled' | 'Maturity Reached' | 'Paused';
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BurnEventItem {
  id: number;
  burn_code: string;
  quarter: string;
  tokens_burned: number;
  realized_eur_value: number;
  tx_hash: string;
  burn_mechanism: string;
  burn_date: string;
  status: 'Verified on Blockchain' | 'Executed';
  explorer_url?: string;
  notes?: string;
  created_at?: string;
}

export interface NftTierItem {
  id: number;
  tier_code: string;
  name: string;
  badge_color: string;
  target_role: string;
  total_supply: number;
  active_holders: number;
  floor_price_eur: number;
  perks: string[];
  is_active: boolean;
  created_at?: string;
}

export interface SmartContractItem {
  id: number;
  contract_code: string;
  name: string;
  symbol: string;
  standard: 'ERC-721' | 'ERC-1155' | 'TRC-721';
  contract_address: string;
  minted_supply: number;
  max_supply: number;
  deployed_network: string;
  explorer_url?: string;
  status: 'Active Minting' | 'Verified Contract' | 'Paused';
  created_at?: string;
}

export interface Nb7UtilityRules {
  trading_fee_discount: string;
  staking_cashback: string;
  min_token_balance_for_vip: string;
  allow_token_as_direct_payment: boolean;
  auto_burn_from_fees: string;
}

export interface MerchantPrivileges {
  grand_atelier_take_rate: string;
  artisan_guild_take_rate: string;
  custom_landing_page_access: boolean;
  homepage_spotlight_rotation: boolean;
  bulk_grain_allocation_priority: boolean;
}

export interface CustomerPrivileges {
  sovereign_spread_discount: string;
  gold_collector_spread_discount: string;
  free_insured_shipping_threshold: string;
  vip_staking_multiplier: string;
  early_gala_access_hours: string;
}

export interface Nb7OverviewData {
  token: Nb7OverviewToken;
  staking: {
    total_tvl_eur: number;
    total_tvl_formatted: string;
    total_tvl_tokens: number;
    active_pools_count: number;
    pools: StakingPoolItem[];
  };
  burn: {
    total_burned_tokens: number;
    total_burned_formatted: string;
    total_burned_value_eur: number;
    total_burned_value_formatted: string;
    recent_burns: BurnEventItem[];
  };
  nft: {
    active_tiers_count: number;
    contracts_count: number;
  };
}

// 🪙 Token Center Overview
export async function fetchNb7Overview(token?: string): Promise<ApiResponse<Nb7OverviewData>> {
  return getApi<ApiResponse<Nb7OverviewData>>('/admin/nb7/overview', token);
}

// 🏊 Staking Pools API
export async function fetchNb7StakingPools(token?: string, params?: Record<string, any>): Promise<ApiResponse<{ pools: StakingPoolItem[] }>> {
  const query = buildQueryString(params);
  return getApi<ApiResponse<{ pools: StakingPoolItem[] }>>(`/admin/nb7/staking-pools${query}`, token);
}

export async function createNb7StakingPool(token: string, data: Partial<StakingPoolItem>): Promise<ApiResponse<{ pool: StakingPoolItem }>> {
  return postApi<ApiResponse<{ pool: StakingPoolItem }>>('/admin/nb7/staking-pools', data, token);
}

export async function fetchNb7StakingPool(token: string | undefined, id: number | string): Promise<ApiResponse<{ pool: StakingPoolItem }>> {
  return getApi<ApiResponse<{ pool: StakingPoolItem }>>(`/admin/nb7/staking-pools/${id}`, token);
}

export async function updateNb7StakingPool(token: string, id: number | string, data: Partial<StakingPoolItem>): Promise<ApiResponse<{ pool: StakingPoolItem }>> {
  return putApi<ApiResponse<{ pool: StakingPoolItem }>>(`/admin/nb7/staking-pools/${id}`, data, token);
}

export async function deleteNb7StakingPool(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/nb7/staking-pools/${id}`, token);
}

// ⚙️ Utility Rules & Fee Discounts
export async function fetchNb7UtilityRules(token?: string): Promise<ApiResponse<{ rules: Nb7UtilityRules }>> {
  return getApi<ApiResponse<{ rules: Nb7UtilityRules }>>('/admin/nb7/utility-rules', token);
}

export async function saveNb7UtilityRules(token: string, data: Partial<Nb7UtilityRules>): Promise<ApiResponse<{ rules: Nb7UtilityRules }>> {
  return postApi<ApiResponse<{ rules: Nb7UtilityRules }>>('/admin/nb7/utility-rules', data, token);
}

// 🔥 Token Burn Ledger
export async function fetchNb7BurnEvents(token?: string, params?: Record<string, any>): Promise<ApiResponse<{ events: BurnEventItem[] }>> {
  const query = buildQueryString(params);
  return getApi<ApiResponse<{ events: BurnEventItem[] }>>(`/admin/nb7/burn-events${query}`, token);
}

export async function recordNb7BurnEvent(token: string, data: Partial<BurnEventItem>): Promise<ApiResponse<{ event: BurnEventItem }>> {
  return postApi<ApiResponse<{ event: BurnEventItem }>>('/admin/nb7/burn-events', data, token);
}

// 👑 NFT Membership Tiers
export async function fetchNb7NftTiers(token?: string, params?: Record<string, any>): Promise<ApiResponse<{ tiers: NftTierItem[] }>> {
  const query = buildQueryString(params);
  return getApi<ApiResponse<{ tiers: NftTierItem[] }>>(`/admin/nb7/nft-tiers${query}`, token);
}

export async function fetchNb7NftTier(token: string | undefined, id: number | string): Promise<ApiResponse<{ tier: NftTierItem }>> {
  return getApi<ApiResponse<{ tier: NftTierItem }>>(`/admin/nb7/nft-tiers/${id}`, token);
}

export async function saveNb7NftTier(token: string, data: Partial<NftTierItem>, id?: number | string): Promise<ApiResponse<{ tier: NftTierItem }>> {
  if (id) {
    return putApi<ApiResponse<{ tier: NftTierItem }>>(`/admin/nb7/nft-tiers/${id}`, data, token);
  }
  return postApi<ApiResponse<{ tier: NftTierItem }>>('/admin/nb7/nft-tiers', data, token);
}

export async function deleteNb7NftTier(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/nb7/nft-tiers/${id}`, token);
}

// 🏬 Merchant Privileges
export async function fetchNb7MerchantPrivileges(token?: string): Promise<ApiResponse<{ privileges: MerchantPrivileges }>> {
  return getApi<ApiResponse<{ privileges: MerchantPrivileges }>>('/admin/nb7/merchant-privileges', token);
}

export async function saveNb7MerchantPrivileges(token: string, data: Partial<MerchantPrivileges>): Promise<ApiResponse<{ privileges: MerchantPrivileges }>> {
  return postApi<ApiResponse<{ privileges: MerchantPrivileges }>>('/admin/nb7/merchant-privileges', data, token);
}

// 👥 Customer Privileges
export async function fetchNb7CustomerPrivileges(token?: string): Promise<ApiResponse<{ privileges: CustomerPrivileges }>> {
  return getApi<ApiResponse<{ privileges: CustomerPrivileges }>>('/admin/nb7/customer-privileges', token);
}

export async function saveNb7CustomerPrivileges(token: string, data: Partial<CustomerPrivileges>): Promise<ApiResponse<{ privileges: CustomerPrivileges }>> {
  return postApi<ApiResponse<{ privileges: CustomerPrivileges }>>('/admin/nb7/customer-privileges', data, token);
}

// 📜 Smart Contracts
export async function fetchNb7SmartContracts(token?: string, params?: Record<string, any>): Promise<ApiResponse<{ contracts: SmartContractItem[] }>> {
  const query = buildQueryString(params);
  return getApi<ApiResponse<{ contracts: SmartContractItem[] }>>(`/admin/nb7/contracts${query}`, token);
}

export async function fetchNb7SmartContract(token: string | undefined, id: number | string): Promise<ApiResponse<{ contract: SmartContractItem }>> {
  return getApi<ApiResponse<{ contract: SmartContractItem }>>(`/admin/nb7/contracts/${id}`, token);
}

export async function saveNb7SmartContract(token: string, data: Partial<SmartContractItem>, id?: number | string): Promise<ApiResponse<{ contract: SmartContractItem }>> {
  if (id) {
    return putApi<ApiResponse<{ contract: SmartContractItem }>>(`/admin/nb7/contracts/${id}`, data, token);
  }
  return postApi<ApiResponse<{ contract: SmartContractItem }>>('/admin/nb7/contracts', data, token);
}

export async function deleteNb7SmartContract(token: string, id: number | string): Promise<ApiResponse> {
  return deleteApi<ApiResponse>(`/admin/nb7/contracts/${id}`, token);
}
