
'use client';

import { useEffect, useState } from 'react';
import {
  fetchCustomerSettings,
  updateCustomerSettings,
} from '@/lib/api';
import Link from 'next/link';
import {
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Globe,
  ShieldCheck,
  KeyRound,
  Landmark,
  X,
  Pencil,
  Star,
} from 'lucide-react';

interface DeliveryAddress {
  id: string;
  label: string;
  recipientName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const emptyAddress: DeliveryAddress = {
  id: '',
  label: '',
  recipientName: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  phone: '',
  isDefault: false,
};

export default function CustomerSettingsPage() {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  const [preferredCurrency, setPreferredCurrency] = useState('EUR (€)');
  const [emailDigest, setEmailDigest] = useState(true);
  const [spotPriceAlerts, setSpotPriceAlerts] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<DeliveryAddress>(emptyAddress);
  const [formError, setFormError] = useState('');

  // Load customer settings
  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetchCustomerSettings();

        if (!mounted) return;

        if (response.success && response.data) {
          const data = response.data;

          const loadedAddresses = (data.addresses || []).map((addr: any) => ({
            id: String(addr.id),
            label: addr.label || '',
            recipientName: addr.recipient_name || '',
            street: addr.street || '',
            city: addr.city || '',
            postalCode: addr.postal_code || '',
            country: addr.country || '',
            phone: addr.phone || '',
            isDefault: Boolean(addr.is_default),
          }));

          setAddresses(loadedAddresses);

          const preferences = data.preferences || {};

          setPreferredCurrency(
            preferences.preferred_currency || 'EUR (€)'
          );

          setEmailDigest(preferences.email_digest ?? true);
          setSpotPriceAlerts(preferences.spot_price_alerts ?? true);
        } else {
          setErrorMessage(response.message || 'Unable to load settings.');
        }
      } catch (error: any) {
        if (mounted) {
          setErrorMessage(error.message || 'Unable to load customer settings.');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  // Open add address modal
  const handleAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({ ...emptyAddress });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open edit address modal
  const handleEditAddress = (address: DeliveryAddress) => {
    setEditingAddressId(address.id);
    setAddressForm({ ...address });
    setFormError('');
    setIsModalOpen(true);
  };

  // Update address form
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or update address
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (
      !addressForm.label.trim() ||
      !addressForm.recipientName.trim() ||
      !addressForm.street.trim() ||
      !addressForm.city.trim() ||
      !addressForm.postalCode.trim() ||
      !addressForm.country.trim() ||
      !addressForm.phone.trim()
    ) {
      setFormError('Please fill in all address fields.');
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingAddressId
            ? { ...addressForm, id: editingAddressId }
            : address
        )
      );
    } else {
      const newAddress: DeliveryAddress = {
        ...addressForm,
        id: `ADDR-${Date.now()}`,
        isDefault: addresses.length === 0,
      };

      setAddresses((prev) => [...prev, newAddress]);
    }

    setIsModalOpen(false);
    setAddressForm({ ...emptyAddress });
    setEditingAddressId(null);
  };

  // Delete address
  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((address) => address.id === id);

    if (!addressToDelete) return;

    if (
      !window.confirm('Are you sure you want to delete this delivery address?')
    ) {
      return;
    }

    const remainingAddresses = addresses.filter(
      (address) => address.id !== id
    );

    if (addressToDelete.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true;
    }

    setAddresses(remainingAddresses);
  };

  // Set default address
  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  // Save all settings to backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);
    setErrorMessage('');
    setIsSaved(false);

    try {
      const response = await updateCustomerSettings({
        addresses: addresses.map((addr) => ({
          id: addr.id,
          label: addr.label,
          recipient_name: addr.recipientName,
          street: addr.street,
          city: addr.city,
          postal_code: addr.postalCode,
          country: addr.country,
          phone: addr.phone,
          is_default: addr.isDefault,
        })),

        preferences: {
          preferred_currency: preferredCurrency,
          email_digest: emailDigest,
          spot_price_alerts: spotPriceAlerts,
        },
      });

      if (response.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        setErrorMessage(response.message || 'Unable to save settings.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 w-full pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Preferences &amp; Logistics
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Vault Delivery Endpoints
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Vault Delivery Addresses &amp; Preferences
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Manage your verified destinations for armored bullion couriers,
            currency display, and market notifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/customer/settings/bank-accounts"
            className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md transition-all flex items-center gap-1.5"
          >
            <Landmark className="w-4 h-4" />
            <span>Payout Bank Accounts (IBAN)</span>
          </Link>

          <Link
            href="/dashboard/customer/settings/2fa"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>2FA Security</span>
          </Link>

          <Link
            href="/dashboard/customer/password"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0E1524] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <KeyRound className="w-4 h-4 text-[#D4AF37]" />
            <span>Password</span>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Delivery addresses and preferences saved successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-bold text-xs">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="luxury-glass p-10 rounded-2xl text-center text-sm text-slate-500">
          Loading customer settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">

          {/* Section 1: Delivery Addresses */}
          <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verified Armored Delivery Addresses</span>
                </h3>

                <p className="text-xs text-slate-500">
                  Addresses pre-screened for Brink&apos;s and Ferrari Group armored vehicle access.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddAddress}
                className="px-3 py-1.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                <MapPin className="w-8 h-8 mx-auto text-slate-400 mb-2" />

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No delivery addresses added
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Add your first delivery address to continue.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-200 dark:border-slate-800 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {addr.label}
                      </span>

                      {addr.isDefault && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                          Default Destination
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {addr.recipientName}
                      </p>

                      <p>{addr.street}</p>

                      <p>
                        {addr.postalCode} {addr.city}, {addr.country}
                      </p>

                      <p className="font-mono text-[11px] text-slate-500 pt-1">
                        Tel: {addr.phone}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 dark:border-slate-700 pt-3">
                      <button
                        type="button"
                        onClick={() => handleEditAddress(addr)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(addr.id)}
                          className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                        >
                          <Star className="w-3.5 h-3.5" />
                          Set Default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Currency & Notification Preferences */}
          <div className="luxury-glass p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0E17]/90 shadow-xl space-y-6">

            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>Valuation Currency &amp; Market Alerts</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Primary Vault Display Currency
                </label>

                <select
                  value={preferredCurrency}
                  onChange={(e) => setPreferredCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="CHF (Fr.)">CHF (Fr.) — Swiss Franc</option>
                  <option value="USD ($)">USD ($) — US Dollar</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37]"
                  />

                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    Receive Weekly Depository Valuation &amp; Audit Digest
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={spotPriceAlerts}
                    onChange={(e) => setSpotPriceAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37]"
                  />

                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    Receive Real-Time LBMA Gold Spot Price Drop Alerts
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Add/Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#0A0E17] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {editingAddressId ? 'Edit Delivery Address' : 'Add Delivery Address'}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Enter your delivery destination details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddressSubmit} className="p-5 space-y-4">

              {formError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {[
                  { name: 'label', label: 'Address Label', placeholder: 'Primary Residence' },
                  { name: 'recipientName', label: 'Recipient Name', placeholder: 'Full name' },
                  { name: 'street', label: 'Street Address', placeholder: 'Street and house number' },
                  { name: 'city', label: 'City', placeholder: 'City' },
                  { name: 'postalCode', label: 'Postal Code', placeholder: 'Postal code' },
                  { name: 'country', label: 'Country', placeholder: 'Country' },
                  { name: 'phone', label: 'Phone Number', placeholder: '+1 234 567 890' },
                ].map((field) => (
                  <div key={field.name} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {field.label}
                    </label>

                    <input
                      type="text"
                      name={field.name}
                      value={addressForm[field.name as keyof DeliveryAddress] as string}
                      onChange={handleAddressChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D15] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                ))}

              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingAddressId ? 'Update Address' : 'Add Address'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
