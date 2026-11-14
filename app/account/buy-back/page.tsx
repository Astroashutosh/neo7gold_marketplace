"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "../../context/CustomerAuthContext";

export default function CustomerBuyBackPage() {
  const router = useRouter();
  const { user } = useCustomerAuth();
  const [metal, setMetal] = useState("gold");
  const [karat, setKarat] = useState("24k");
  const [weight, setWeight] = useState("10");
  const [hasCertificate, setHasCertificate] = useState(true);
  const [calculatedQuote, setCalculatedQuote] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    router.replace("/dashboard/customer/buyback/");
  }, [router]);

  // Spot calculation simulation: Gold spot base around ~€78/g for 24K
  const spotRatePerGram = 78.5;
  const purityMultiplier: Record<string, number> = {
    "24k": 0.999,
    "22k": 0.916,
    "18k": 0.75,
    "14k": 0.585,
  };

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const grams = parseFloat(weight) || 0;
    const mult = purityMultiplier[karat] || 0.999;
    const rawVal = grams * spotRatePerGram * mult;
    // 97% buyback liquidation guarantee
    setCalculatedQuote(Math.round(rawVal * 0.97 * 100) / 100);
  }

  return (
    <div className="buyback-page">
      <div className="content-header">
        <div>
          <span className="content-eyebrow">PRECIOUS METALS LIQUIDATION</span>
          <h2 className="content-title">Jewelry &amp; Bullion Buy-Back</h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {/* Valuation Calculator Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: 600, margin: "0 0 4px" }}>
            Instant Valuation Estimator
          </h3>
          <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "12px", margin: "0 0 20px" }}>
            Submit your fine jewelry, scrap gold, or bars for guaranteed refinery buy-back based on live Zurich spot rates.
          </p>

          <form onSubmit={handleCalculate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>METAL TYPE</label>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
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
                <option value="gold">Gold (Au 999.9)</option>
                <option value="platinum">Platinum (Pt 950)</option>
                <option value="silver">Fine Silver (Ag 999)</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>PURITY / KARAT</label>
                <select
                  value={karat}
                  onChange={(e) => setKarat(e.target.value)}
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
                  <option value="24k">24K (99.9%)</option>
                  <option value="22k">22K (91.6%)</option>
                  <option value="18k">18K (75.0%)</option>
                  <option value="14k">14K (58.5%)</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "rgba(245,241,232,0.7)" }}>WEIGHT (GRAMS)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  style={{
                    height: "44px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    borderRadius: "8px",
                    padding: "0 14px",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="certCheck"
                checked={hasCertificate}
                onChange={(e) => setHasCertificate(e.target.checked)}
                style={{ width: "16px", height: "16px", accentColor: "#d4af37" }}
              />
              <label htmlFor="certCheck" style={{ fontSize: "12px", color: "rgba(245,241,232,0.75)", cursor: "pointer" }}>
                Item includes assay certificate or GIA report
              </label>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "6px",
                height: "44px",
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
              Calculate Preliminary Offer
            </button>
          </form>
        </div>

        {/* Preliminary Quote & Submission */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "14px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "0.18em", fontWeight: 700 }}>
              ESTIMATED LIQUIDATION QUOTE
            </span>
            <div style={{ margin: "16px 0 20px" }}>
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#fff", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {calculatedQuote ? `€${calculatedQuote.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "€761.45"}
              </span>
              <span style={{ display: "block", color: "rgba(245,241,232,0.5)", fontSize: "11px", marginTop: "4px" }}>
                Based on Zurich live spot price of €78.50/g (97% guaranteed floor)
              </span>
            </div>

            <div style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px", padding: "14px", fontSize: "12px", color: "rgba(245,241,232,0.7)" }}>
              <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#d4af37" }}>
                How the Process Works:
              </p>
              <ol style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
                <li>Submit online request and receive insured courier kit.</li>
                <li>XRF Spectrometry assay verification at Zurich refiner.</li>
                <li>Funds wired via SEPA/SWIFT or credited directly to your bullion vault.</li>
              </ol>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(true)}
            style={{
              marginTop: "24px",
              height: "46px",
              background: submitted ? "rgba(46,204,113,0.2)" : "rgba(212,175,55,0.15)",
              border: submitted ? "1px solid #2ecc71" : "1px solid rgba(212,175,55,0.4)",
              borderRadius: "8px",
              color: submitted ? "#2ecc71" : "#d4af37",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {submitted ? "✓ REQUEST SUBMITTED — CHECK EMAIL" : "Request Insured Shipping Kit"}
          </button>
        </div>
      </div>
    </div>
  );
}

