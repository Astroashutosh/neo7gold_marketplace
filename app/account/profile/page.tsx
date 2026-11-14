"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function CustomerProfilePage() {
  const router = useRouter();
  const { user } = useCustomerAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+41 44 215 11 11");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    router.replace("/dashboard/customer/profile/");
  }, [router]);

  return (
    <div className="profile-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">CLIENT REGISTRATION DETAILS</span>
          <h2 className="content-title">Profile &amp; Preferences</h2>
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(212,175,55,0.22)",
          borderRadius: "14px",
          padding: "28px",
        }}
      >
        {saved && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(46,204,113,0.1)",
              border: "1px solid rgba(46,204,113,0.3)",
              borderRadius: "8px",
              color: "#2ecc71",
              fontSize: "12px",
              marginBottom: "20px",
            }}
          >
            ✓ Profile details updated.
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
              FULL LEGAL NAME
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                height: "44px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.22)",
                borderRadius: "8px",
                padding: "0 14px",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
              PRIMARY EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: "44px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.22)",
                borderRadius: "8px",
                padding: "0 14px",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
              TELEPHONE CONTACT
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                height: "44px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.22)",
                borderRadius: "8px",
                padding: "0 14px",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
              PREFERRED CURRENCY
            </label>
            <select
              defaultValue="EUR"
              style={{
                height: "44px",
                background: "#121016",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: "8px",
                padding: "0 12px",
                color: "#fff",
                outline: "none",
              }}
            >
              <option value="EUR">EUR (€) - Eurozone</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="CHF">CHF (Fr.) - Swiss Franc</option>
              <option value="GBP">GBP (£) - British Pound</option>
            </select>
          </div>

          <div style={{ gridColumn: "1 / -1", marginTop: "8px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)",
                border: "1px solid #ffd700",
                borderRadius: "8px",
                color: "#08060a",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

