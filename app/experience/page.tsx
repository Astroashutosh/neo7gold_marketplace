"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { siteAsset } from "../site";

export default function Experience3DPage() {
  useEffect(() => {
    // Dynamically load the Three.js 3D engine
    const script = document.createElement("script");
    script.type = "module";
    script.src = siteAsset("assets/neos7-engine.js?v=36");
    script.async = true;
    document.body.appendChild(script);

    // Lock body overflow for full-screen immersive experience
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Stop background audio if playing
      const audioEl = document.querySelector("audio");
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  return (
    <div className="neos-experience-container">
      {/* Hide regular marketplace footer while in fullscreen 3D experience */}
      <style>{`
        .gold-footer, .scroll-to-top {
          display: none !important;
        }
      `}</style>

      {/* External luxury 3D styles */}
      <link
        rel="stylesheet"
        href={siteAsset("assets/neos7-styles.css?v=36")}
      />

      {/* Floating Top Bar for navigation back to marketplace */}
      <nav
        style={{
          position: "fixed",
          top: "20px",
          left: "24px",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            background: "rgba(8, 6, 10, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            borderRadius: "999px",
            color: "#D4AF37",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#D4AF37";
            e.currentTarget.style.boxShadow = "0 0 16px rgba(212,175,55,0.3)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.35)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.color = "#D4AF37";
          }}
        >
          ← Return to Store
        </Link>

        <Link
          href="/shop/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            background: "rgba(212, 175, 55, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 175, 55, 0.45)",
            borderRadius: "999px",
            color: "#F5E6C8",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212, 175, 55, 0.28)";
            e.currentTarget.style.boxShadow = "0 0 16px rgba(212,175,55,0.4)";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.color = "#F5E6C8";
          }}
        >
          Explore Collection ↗
        </Link>
      </nav>

      {/* Three.js Canvas with tabindex for keyboard capture */}
      <canvas className="webgl" tabIndex={0} aria-label="3D Interactive Jewelry Scene"></canvas>

      {/* CSS Corner Vignette (4 radial gradients, toggled with .active) */}
      <div id="css-vignette">
        <div className="vig-corner vig-tl"></div>
        <div className="vig-corner vig-tr"></div>
        <div className="vig-corner vig-bl"></div>
        <div className="vig-corner vig-br"></div>
      </div>

      {/* Loading Screen */}
      <div id="loading-screen">
        <div className="loader-content">
          {/* Central Logo with Drawing and Flowing Effects */}
          <div className="loader-brand-wrap">
            <svg
              className="loader-logo-svg"
              width="200"
              height="40"
              viewBox="0 0 200 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gold-flow-loader" x1="0%" y1="0%" x2="200%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#FFDF73" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="75%" stopColor="#F5E6C8" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="28"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="26"
                fontWeight="600"
                letterSpacing="0.25em"
                fill="url(#gold-flow-loader)"
              >
                NEOS7GOLD
              </text>
            </svg>
          </div>

          {/* Central Action Button */}
          <div className="loader-action-wrap">
            <button id="enter-btn" aria-label="Enter the NEOS7Gold experience">
              CLICK TO ENTER NEOS7GOLD
            </button>
          </div>

          {/* Bottom Description */}
          <p className="loader-desc">ENTER THE SOVEREIGN WORLD OF 24K PHYSICAL GOLD &amp; HIGH JEWELRY</p>
        </div>

        {/* Minimal progress track */}
        <div className="loader-progress-wrap">
          <div className="progress-bar" id="progress-bar"></div>
        </div>
      </div>

      {/* Hero UI Grid (5x5) */}
      <div id="hero-ui">
        {/* Header */}
        <header className="hero-header">
          <div className="header-item about-btn">About</div>
          <div className="header-item logo-wrap">
            <img
              src={siteAsset("NEOS7Gold_Logo.svg")}
              alt="NEOS7Gold Logo"
              className="hero-logo"
            />
          </div>
          <div className="header-item audio-wrap">
            <button id="audio-btn" className="audio-toggle" aria-label="Toggle cinematic audio">
              <canvas id="audio-wave"></canvas>
            </button>
          </div>
        </header>

        {/* Center Content (Titles) */}
        <main className="hero-main">
          <div className="title-container">
            <div className="hero-title" id="title-0">
              Sovereignty<br />in every <br className="mob-br" />ounce
            </div>
          </div>
        </main>

        {/* Section Overlays (Specific UI for sections 1, 2, 3) */}
        <div className="section-content" id="section-inter">
          <div className="content-wrap">
            <h2 className="section-title">THE PURITY <br />OF 24K GOLD.</h2>
            <p className="section-desc">
              Forged in Swiss refiners, minted to 999.9 fine investment-grade excellence. NEOS7Gold unites physical precious metal sovereignty with timeless artistic distinction.
            </p>
            <div className="section-highlight">
              <div className="highlight-blur"></div>
              <p className="highlight-text">999.9 LBMA CERTIFIED BULLION</p>
            </div>
          </div>
        </div>

        <div className="section-content" id="section-1">
          <div className="content-wrap">
            <h2 className="section-title">INSTINCT, <br />FORGED.</h2>
            <p className="section-desc">
              Every bar and bespoke casting reflects centuries of metallurgical heritage. Audited in Zurich vaults, authenticated with immutable digital provenance.
            </p>
            <div className="section-highlight">
              <div className="highlight-blur"></div>
              <p className="highlight-text">SWISS VAULTED &amp; FULLY ALLOCATED</p>
            </div>
          </div>
        </div>

        <div className="section-content" id="section-2">
          <div className="content-wrap">
            <h2 className="section-title">ATELIER <br />MASTERY.</h2>
            <p className="section-desc">
              Rare D-Flawless diamonds sculpted alongside recycled platinum and solid 24-karat gold. Where institutional security meets haute joaillerie desire.
            </p>
            <div className="section-highlight">
              <div className="highlight-blur"></div>
              <p className="highlight-text">GIA CERTIFIED &amp; BESPOKE CRAFTSMANSHIP</p>
            </div>
          </div>
        </div>

        <div className="section-content" id="section-3">
          <div className="content-wrap">
            <h2 className="section-title">WEALTH THAT <br />ENDURES.</h2>
            <p className="section-desc">
              Beyond currency fluctuations and market noise. NEOS7Gold is physical permanence, curated for generations of sovereign wealth.
            </p>
            <div className="section-highlight">
              <div className="highlight-blur"></div>
              <p className="highlight-text">DISCOVER THE NEOS7GOLD VAULT</p>
            </div>
          </div>
        </div>

        {/* About Overlay */}
        <div id="about-overlay">
          <div className="about-content-center">
            {/* Center Emblem with 24K Celestial Gold Aura */}
            <div className="about-vector-wrap">
              <div className="about-aura"></div>
              <img
                id="about-logo-icon"
                src={siteAsset("neos7gold_logo_icon_hires.png")}
                alt="NEOS7Gold Sovereign Crest"
                className="about-logo-img"
              />
            </div>

            {/* Bottom Centered Paragraph & Institutional Credentials */}
            <div className="about-narrative-center">
              <div className="about-narrative-inner">
                <span className="about-eyebrow">THE SOVEREIGN VAULT &amp; ATELIER</span>
                <p className="about-text">
                  NEOS7GOLD IS AN INSTITUTIONAL PRECIOUS METALS AND LUXURY JEWELRY ECOSYSTEM. WE BRIDGE PHYSICAL 999.9 SWISS GOLD BULLION VAULTING, HAUTE JOAILLERIE ATELIERS, AND FRACTIONAL RWA TECHNOLOGY INTO A SEAMLESS IMMERSIVE PLATFORM. EVERY ASSET IS FULLY ALLOCATED, INDEPENDENTLY AUDITED, AND SECURED BY GLOBAL ARMORED LOGISTICS.
                </p>
                <div className="about-credentials">
                  <span className="credential-tag">999.9 LBMA CERTIFIED</span>
                  <span className="credential-dot">✦</span>
                  <span className="credential-tag">ALLOCATED ZURICH VAULTS</span>
                  <span className="credential-dot">✦</span>
                  <span className="credential-tag">IMMUTABLE PROVENANCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Cursor Canvas */}
        <div id="cursor-canvas"></div>

        {/* Left Scroll Indicator */}
        <aside className="hero-scroll-indicator">
          <div className="scroll-track-container">
            <svg className="scroll-path-svg" viewBox="0 0 30 452" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                id="scroll-path"
                d="M10.1025 0.0507812L1.24079 87.6049C-1.15007 111.227 2.13855 135.078 10.8327 157.171L19.108 178.2C32.6214 212.54 32.9106 250.673 19.9195 285.214L11.7577 306.915C2.48674 331.565 -0.0852929 358.231 4.30354 384.198L15.6025 451.051"
                stroke="#D4AF37"
                strokeOpacity="0.4"
                strokeDasharray="2 10"
              />
            </svg>
            <div className="scroll-follower" id="scroll-pointer">
              <img src={siteAsset("Page_scroll_Follow.svg")} alt="Scroll Progress Indicator" />
            </div>
          </div>
        </aside>

        {/* Footer */}
        <footer className="hero-footer">
          <div className="footer-left hero-stack">
            <p className="hero-desc">
              NEOS7Gold <span className="secondary">is anchored in</span> physical permanence.<br />
              <span className="secondary">Crafted for those who command</span> generational wealth.
            </p>
            <Link
              href="/shop/"
              className="cta-btn"
              style={{ textDecoration: "none" }}
              aria-label="Enter the NEOS7Gold vault and explore collection"
            >
              <span className="btn-fill"></span>
              <span className="btn-content"><span className="plus">+</span> ENTER THE VAULT</span>
            </Link>
          </div>
          <div className="footer-center">
            <div className="scroll-more">
              <div className="mouse-icon">
                <div className="mouse-wheel"></div>
              </div>
              <span>SCROLL MORE</span>
            </div>
          </div>
          <div className="footer-right"></div>
        </footer>
      </div>
    </div>
  );
}
