import Link from "next/link";
import { siteAsset } from "../site";
import "./About.scss";

export default function About() {
  return (
    <section className="about-section">
      {/* =========================
          BACKGROUND
      ========================= */}
      

      <div className="about-overlay" />
       

      {/* =========================
          CONTENT
      ========================= */}
      <div className="about-content">

        {/* LEFT */}
        <div className="about-text">

          <div className="about-eyebrow">
            <span className="eyebrow-line" />
            <span>THE NEOS7 SIGNATURE</span>
          </div>

          <h2>
            ABOUT
            <span>NEOS7 GOLD</span>
             <div className="story-text">
                <span className="story-star star-1">✦</span>
                <span className="story-star star-2">✧</span>
                <span className="story-star star-3">✦</span>
              </div>
          </h2>

          <div className="about-divider" />

          <p className="about-description">
            At NEOS7 GOLD, we believe jewellery is not simply worn — it is experienced. Each piece is a reflection of individuality, refined craftsmanship, and enduring elegance.

          </p>

          <p className="about-description secondary">
            Inspired by the timeless allure of gold, every creation is thoughtfully designed with precision and purpose. From subtle everyday pieces to distinctive statements, NEOS7 GOLD transforms precious metal into jewellery that feels personal, timeless, and uniquely yours.

          </p>

          <div className="about-actions">
            <Link href="/about" className="about-button">
              <span>Our Story</span>
              <span className="button-arrow">→</span>
            </Link>

            <div className="about-caption">
              <span className="caption-dot" />
              Crafted with intention
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="about-visual">

          <div className="visual-aura" />

          <div className="visual-frame">

            <div className="visual-corner corner-tl" />
            <div className="visual-corner corner-tr" />
            <div className="visual-corner corner-bl" />
            <div className="visual-corner corner-br" />

            {/* Replace this path with your actual jewelry image */}
            <img
              src={siteAsset("photo1.avif")}
              alt="NEOS7 Gold jewellery"
              className="about-image"
            />

            <div className="image-shine" />

            <div className="visual-label">
              <span>NEOS7 GOLD</span>
              <small>TIMELESS CRAFTSMANSHIP</small>
            </div>

          </div>

          {/*<div className="floating-badge">
            <span className="badge-number">01</span>
            <span className="badge-line" />
            <span className="badge-text">
              TIMELESS
              <br />
              ELEGANCE
            </span>
          </div>*/}

        </div>

      </div>

      {/* =========================
          BOTTOM DETAILS
      ========================= */}
     {/* <div className="about-bottom">

        <div className="bottom-item">
          <strong>01</strong>
          <span>Exceptional Craftsmanship</span>
        </div>

        <div className="bottom-item">
          <strong>02</strong>
          <span>Pure Gold Philosophy</span>
        </div>

        <div className="bottom-item">
          <strong>03</strong>
          <span>Designed to Last</span>
        </div>

        <div className="bottom-scroll">
          <span>SCROLL TO DISCOVER</span>
          <i />
        </div>

      </div>*/}
    </section>
  );
}