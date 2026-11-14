const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export interface ShippingCarrierItem {
  id: number;
  carrier_code: string;
  name: string;
  type: string;
  coverage_limit: number;
  underwriter: string;
  speed: string;
  base_fee: number;
  insurance_surcharge_percentage: number;
  contract_ref?: string | null;
  api_endpoint?: string | null;
  tracking_prefix?: string | null;
  api_connected: boolean;
  status: 'Active' | 'Inactive';
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ShippingMetrics {
  total_carriers: number;
  active_carriers: number;
  total_capacity_insured: number;
  active_shipments: number;
  loss_ratio_percentage: number;
}

export interface CarrierFormData {
  carrier_code?: string;
  name: string;
  type?: string;
  coverage_limit?: number;
  underwriter?: string;
  speed?: string;
  base_fee?: number;
  insurance_surcharge_percentage?: number;
  contract_ref?: string;
  api_endpoint?: string;
  tracking_prefix?: string;
  api_connected?: boolean;
  status?: 'Active' | 'Inactive';
  notes?: string;
}

function getHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchShippingCarriers(token?: string): Promise<{
  success: boolean;
  data?: {
    carriers: ShippingCarrierItem[];
    metrics: ShippingMetrics;
  };
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping`, {
      headers: getHeaders(token),
    });
    return await res.json();
  } catch (err: any) {
    console.error('fetchShippingCarriers error:', err);
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function fetchShippingCarrier(
  token: string | undefined,
  id: string | number
): Promise<{
  success: boolean;
  data?: {
    carrier: ShippingCarrierItem;
  };
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping/${id}`, {
      headers: getHeaders(token),
    });
    return await res.json();
  } catch (err: any) {
    console.error(`fetchShippingCarrier error for ID ${id}:`, err);
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function createShippingCarrier(
  token: string,
  data: CarrierFormData
): Promise<{
  success: boolean;
  data?: {
    carrier: ShippingCarrierItem;
  };
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    console.error('createShippingCarrier error:', err);
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function updateShippingCarrier(
  token: string,
  id: string | number,
  data: Partial<CarrierFormData>
): Promise<{
  success: boolean;
  data?: {
    carrier: ShippingCarrierItem;
  };
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping/${id}`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    console.error(`updateShippingCarrier error for ID ${id}:`, err);
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function toggleCarrierStatus(
  token: string,
  id: string | number
): Promise<{
  success: boolean;
  data?: {
    carrier: ShippingCarrierItem;
  };
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(token),
    });
    return await res.json();
  } catch (err: any) {
    console.error(`toggleCarrierStatus error for ID ${id}:`, err);
    return { success: false, message: err.message || 'Network error' };
  }
}

export async function deleteShippingCarrier(
  token: string,
  id: string | number
): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/shipping/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return await res.json();
  } catch (err: any) {
    console.error(`deleteShippingCarrier error for ID ${id}:`, err);
    return { success: false, message: err.message || 'Network error' };
  }
}
