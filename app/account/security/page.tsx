"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function CustomerSecurityPage() {
  const router = useRouter();
  const { user } = useCustomerAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Address State
  const [street, setStreet] = useState("Bahnhofstrasse 45");
  const [city, setCity] = useState("Zurich");
  const [postal, setPostal] = useState("8001");
  const [country, setCountry] = useState("Switzerland");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    router.replace("/dashboard/customer/settings/");
  }, [router]);

  return (
    <div className="security-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">PROTECTION &amp; CREDENTIALS</span>
          <h2 className="content-title">Security &amp; Addresses</h2>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Two-Factor Authentication */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>🔒</span>
              <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: 0 }}>
                Two-Factor Authentication (2FA)
              </h3>
            </div>
            <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: 0, maxWidth: "540px" }}>
              Require a time-based one-time password (TOTP via Google Authenticator or hardware YubiKey) for high-value vault transfers and physical delivery requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: twoFactorEnabled ? "rgba(46,204,113,0.15)" : "rgba(212,175,55,0.15)",
              border: twoFactorEnabled ? "1px solid #2ecc71" : "1px solid rgba(212,175,55,0.35)",
              color: twoFactorEnabled ? "#2ecc71" : "#d4af37",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {twoFactorEnabled ? "✓ 2FA ENABLED" : "ENABLE 2FA"}
          </button>
        </div>

        {/* Change Password */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>
            Change Password
          </h3>
          <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 20px" }}>
            Ensure your account uses a strong, unique passphrase with at least 8 characters.
          </p>

          {passwordSaved && (
            <div
              style={{
                padding: "10px 14px",
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.3)",
                borderRadius: "8px",
                color: "#2ecc71",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              ✓ Password updated successfully.
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPasswordSaved(true);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
                CURRENT PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{
                  height: "44px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  borderRadius: "8px",
                  padding: "0 14px",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
                NEW PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  height: "44px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  borderRadius: "8px",
                  padding: "0 14px",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)", letterSpacing: "0.08em" }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  height: "44px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  borderRadius: "8px",
                  padding: "0 14px",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 22px",
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  borderRadius: "8px",
                  color: "#d4af37",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Primary Delivery Address */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>
            Armored Courier Delivery Address
          </h3>
          <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 20px" }}>
            The verified destination used for high-value insured physical deliveries.
          </p>

          {addressSaved && (
            <div
              style={{
                padding: "10px 14px",
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.3)",
                borderRadius: "8px",
                color: "#2ecc71",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              ✓ Destination address saved.
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAddressSaved(true);
            }}
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>STREET ADDRESS</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
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
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>CITY</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>POSTAL CODE</label>
              <input
                type="text"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
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
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>COUNTRY</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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

            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 22px",
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  borderRadius: "8px",
                  color: "#d4af37",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Save Shipping Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

