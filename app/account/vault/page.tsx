"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function CustomerVaultPage() {
  const router = useRouter();
  const { user } = useCustomerAuth();
  const [activeTab, setActiveTab] = useState<"holdings" | "passports">("holdings");

  useEffect(() => {
    router.replace("/dashboard/customer/vault/");
  }, [router]);

  return (
    <div className="vault-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">SWISS DEPOSITORY &amp; AUTHENTICITY</span>
          <h2 className="content-title">Digital Vault &amp; Passports</h2>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("holdings")}
            style={{
              background: activeTab === "holdings" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)",
              border: activeTab === "holdings" ? "1px solid #d4af37" : "1px solid rgba(212,175,55,0.2)",
              color: activeTab === "holdings" ? "#d4af37" : "rgba(245,241,232,0.6)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Allocated Bullion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("passports")}
            style={{
              background: activeTab === "passports" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)",
              border: activeTab === "passports" ? "1px solid #d4af37" : "1px solid rgba(212,175,55,0.2)",
              color: activeTab === "passports" ? "#d4af37" : "rgba(245,241,232,0.6)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Digital Passports (QR)
          </button>
        </div>
      </div>

      {activeTab === "holdings" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Vault Security Summary Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(170,119,28,0.04) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
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
              <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "0.18em", fontWeight: 700 }}>
                ZURICH FREE ZONE ALLOCATED DEPOSITORY
              </span>
              <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", margin: "4px 0" }}>
                100% Segregated &amp; Insured by Lloyd&apos;s of London
              </h3>
              <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: 0, maxWidth: "540px" }}>
                Physical bars stored in bonded vaults under high-security custody. Every ounce is audited and redeemable for global armored delivery.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(212,175,55,0.2)" }}>
                <span style={{ fontSize: "9px", color: "rgba(245,241,232,0.5)", display: "block" }}>GOLD VALUE</span>
                <strong style={{ color: "#d4af37", fontSize: "16px" }}>€0.00</strong>
              </div>
              <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(212,175,55,0.2)" }}>
                <span style={{ fontSize: "9px", color: "rgba(245,241,232,0.5)", display: "block" }}>TOTAL WEIGHT</span>
                <strong style={{ color: "#fff", fontSize: "16px" }}>0.000 g</strong>
              </div>
            </div>
          </div>

          {/* Empty Vault State */}
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              background: "rgba(255,255,255,0.01)",
              borderRadius: "14px",
              border: "1px dashed rgba(212,175,55,0.25)",
            }}
          >
            <span style={{ fontSize: "36px", display: "block", marginBottom: "16px" }}>🏦</span>
            <h4 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", margin: "0 0 8px" }}>
              No Allocated Bars Currently in Custody
            </h4>
            <p style={{ color: "rgba(245,241,232,0.55)", fontSize: "13px", maxWidth: "440px", margin: "0 auto 20px" }}>
              Acquire LBMA-certified investment bars on the marketplace and choose &quot;Allocated Vault Storage&quot; at checkout to deposit them directly into your Swiss vault ledger.
            </p>
            <Link
              href="/shop/?category=Bullion"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 20px",
                background: "linear-gradient(135deg, #d4af37 0%, #aa771c 100%)",
                borderRadius: "8px",
                color: "#08060a",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Browse 999.9 Swiss Bullion →
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Digital Passport Info */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(212,175,55,0.22)",
              borderRadius: "14px",
              padding: "24px",
            }}
          >
            <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "0.18em", fontWeight: 700 }}>
              CRYPTOGRAPHIC PROVENANCE (DPP)
            </span>
            <h3 style={{ color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", margin: "4px 0 8px" }}>
              Immutable Product Passports
            </h3>
            <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 20px", maxWidth: "600px" }}>
              Every high-jewelry piece and investment bar minted on Neos7 carries a cryptographic certificate verifying carat weight, gemstone clarity (GIA), metal assay (LBMA), and serial authenticity.
            </p>

            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
                border: "1px dashed rgba(212,175,55,0.2)",
              }}
            >
              <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>📜</span>
              <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "13px", margin: 0 }}>
                No active digital passports found. Passports are generated automatically upon physical verification and shipment dispatch.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

