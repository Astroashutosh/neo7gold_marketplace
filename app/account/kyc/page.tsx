"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function CustomerKycPage() {
  const router = useRouter();
  const { user } = useCustomerAuth();
  const [docType, setDocType] = useState("passport");
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    router.replace("/dashboard/customer/kyc/");
  }, [router]);

  const kycStatus = user?.kyc_status || "unverified";

  return (
    <div className="kyc-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">REGULATORY COMPLIANCE &amp; AML</span>
          <h2 className="content-title">Identity &amp; Bullion Clearance</h2>
        </div>

        <span
          className={`kyc-badge kyc-${kycStatus}`}
          style={{ padding: "6px 14px", fontSize: "10px" }}
        >
          {kycStatus === "verified"
            ? "✓ KYC VERIFIED"
            : kycStatus === "pending"
            ? "⏳ UNDER COMPLIANCE REVIEW"
            : "⚠ ACTION REQUIRED"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        {/* Tier 1 Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <span style={{ fontSize: "9px", color: "#d4af37", letterSpacing: "0.15em", fontWeight: 700 }}>
            TIER 1 RETAIL CLEARANCE
          </span>
          <h4 style={{ color: "#fff", fontSize: "16px", margin: "6px 0 4px" }}>Up to €15,000 / Year</h4>
          <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 12px", lineHeight: 1.5 }}>
            Allows purchases of high-jewelry pieces and standard allocated bullion orders.
          </p>
          <span style={{ fontSize: "11px", color: "#2ecc71" }}>✓ Standard Client Requirement</span>
        </div>

        {/* Tier 2 Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <span style={{ fontSize: "9px", color: "#d4af37", letterSpacing: "0.15em", fontWeight: 700 }}>
            TIER 2 INSTITUTIONAL / WHOLESALE
          </span>
          <h4 style={{ color: "#fff", fontSize: "16px", margin: "6px 0 4px" }}>Unlimited Capital Flow</h4>
          <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 12px", lineHeight: 1.5 }}>
            Required for multi-kilobar bullion acquisitions, physical vault withdrawals, and B2B wire clearing.
          </p>
          <span style={{ fontSize: "11px", color: "rgba(245,241,232,0.5)" }}>Requires Source of Wealth Verification</span>
        </div>
      </div>

      {/* Document Upload Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "14px",
          padding: "28px",
        }}
      >
        <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", margin: "0 0 8px" }}>
          Upload Identity Verification Documents
        </h3>
        <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "13px", margin: "0 0 24px", maxWidth: "600px" }}>
          In accordance with Swiss FINMA &amp; European Anti-Money Laundering regulations, please submit a clear scan of your government-issued passport or national ID.
        </p>

        {submitted ? (
          <div
            style={{
              padding: "20px",
              background: "rgba(46, 204, 113, 0.1)",
              border: "1px solid rgba(46, 204, 113, 0.3)",
              borderRadius: "10px",
              color: "#2ecc71",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            ✓ Documents successfully submitted. Our compliance team will review your clearance within 24 hours.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (fileSelected) setSubmitted(true);
            }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { id: "passport", label: "International Passport" },
                { id: "national_id", label: "National ID Card" },
                { id: "driving_license", label: "Driver's License" },
              ].map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setDocType(doc.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: docType === doc.id ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)",
                    border: docType === doc.id ? "1px solid #d4af37" : "1px solid rgba(212,175,55,0.2)",
                    color: docType === doc.id ? "#d4af37" : "rgba(245,241,232,0.7)",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {doc.label}
                </button>
              ))}
            </div>

            <div
              style={{
                border: "2px dashed rgba(212,175,55,0.3)",
                borderRadius: "12px",
                padding: "40px 20px",
                textAlign: "center",
                background: "rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                const input = document.getElementById("kyc-file-input");
                input?.click();
              }}
            >
              <input
                id="kyc-file-input"
                type="file"
                accept="image/*,.pdf"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileSelected(file.name);
                }}
              />
              <span style={{ fontSize: "32px", display: "block", marginBottom: "10px" }}>📄</span>
              <p style={{ color: "#fff", fontSize: "14px", margin: "0 0 6px" }}>
                {fileSelected ? `Selected: ${fileSelected}` : "Click to select or drag & drop document file"}
              </p>
              <span style={{ color: "rgba(245,241,232,0.45)", fontSize: "11px" }}>
                Supports PDF, JPG, PNG up to 10MB (Encrypted AES-256 Storage)
              </span>
            </div>

            <button
              type="submit"
              disabled={!fileSelected}
              style={{
                alignSelf: "flex-start",
                padding: "12px 28px",
                background: fileSelected ? "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)" : "rgba(255,255,255,0.05)",
                border: fileSelected ? "1px solid #ffd700" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: fileSelected ? "#08060a" : "rgba(255,255,255,0.3)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: fileSelected ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
              }}
            >
              Submit Verification Documents
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

