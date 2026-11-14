"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import "./account.css";

const NAV_ITEMS = [
  { href: "/dashboard/customer/", label: "Customer Dashboard", icon: "👑" },
  { href: "/dashboard/customer/vault/", label: "My Stored Metals", icon: "🏦" },
  { href: "/dashboard/customer/orders/", label: "Jewelry Orders", icon: "📦" },
  { href: "/dashboard/customer/wishlist/", label: "Wishlist & Price Alerts", icon: "❤️" },
  { href: "/dashboard/customer/buyback/", label: "Sell My Gold & Scrap", icon: "🔄" },
  { href: "/dashboard/customer/passports/", label: "Digital Certificates (DPP)", icon: "📜" },
  { href: "/dashboard/customer/kyc/", label: "ID Verification & Limits", icon: "🛡️" },
  { href: "/dashboard/customer/settings/", label: "Account Settings", icon: "⚙️" },
];

export default function CustomerAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useCustomerAuth();

  // Don't wrap login / register / forgot-password with the account dashboard shell
  const isAuthRoute =
    pathname?.includes("/account/login") ||
    pathname?.includes("/account/register") ||
    pathname?.includes("/account/forgot-password");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="account-loading-screen">
        <div className="account-loading-spinner"></div>
        <p>Accessing Private Client Vault...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="account-guest-screen">
        <div className="guest-card">
          <span className="guest-eyebrow">PRIVATE CLIENT AREA</span>
          <h1 className="guest-title">Authentication Required</h1>
          <p className="guest-desc">
            Please sign in to access your orders, vaulted physical bullion, digital product passports, and KYC profile.
          </p>
          <div className="guest-actions">
            <Link href="/login/" className="guest-login-btn">
              Sign In to Your Account
            </Link>
            <Link href="/account/register/" className="guest-register-btn">
              Create Private Account →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const kycStatus = user?.kyc_status || "unverified";

  return (
    <div className="customer-account-wrapper">
      {/* Client Header Banner */}
      <div className="account-hero-banner">
        <div className="account-hero-inner">
          <div className="client-identity">
            <div className="client-crest">
              <span>{user?.name?.charAt(0) || "N"}</span>
            </div>
            <div>
              <div className="client-badge-row">
                <span className="client-tier">SOVEREIGN PRIVATE CLIENT</span>
                <span className={`kyc-badge kyc-${kycStatus}`}>
                  {kycStatus === "verified"
                    ? "✓ KYC VERIFIED"
                    : kycStatus === "pending"
                    ? "⏳ KYC UNDER REVIEW"
                    : "⚠ KYC REQUIRED"}
                </span>
              </div>
              <h1 className="client-name">{user?.name}</h1>
              <p className="client-email">{user?.email}</p>
            </div>
          </div>

          <div className="client-stats-bar">
            <div className="stat-pill">
              <span className="stat-label">VAULT HOLDINGS</span>
              <span className="stat-val">
                {user?.vault_holdings_count || 0} Assets
              </span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">ORDERS PLACED</span>
              <span className="stat-val">{user?.orders_count || 0} Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="account-main-grid">
        {/* Navigation Sidebar */}
        <aside className="account-sidebar">
          <nav className="account-nav">
            {NAV_ITEMS.map((item) => {
              const active = pathname?.replace(/\/+$/, "") === item.href.replace(/\/+$/, "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`account-nav-link ${active ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="account-sidebar-footer">
            <button
              type="button"
              className="account-signout-btn"
              onClick={() => {
                logout();
                router.push("/login/");
              }}
            >
              Sign Out of Session
            </button>
          </div>
        </aside>

        {/* Dynamic Section Content */}
        <main className="account-content-area">{children}</main>
      </div>
    </div>
  );
}

