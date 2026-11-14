"use client";

import Link from "next/link";
import { siteAsset } from "../site";

export default function TimelessElegance() {
  return (
    <section className="timeless-section">
      {/* Background */}

      <div className="timeless-bg">
        <div className="timeless-glow" />
        <div className="timeless-grain" />
      </div>

      <div className="timeless-container">
        {/* ================= HERO ================= */}
        <div className="timeless-hero">

          {/* LEFT CONTENT */}
          <div className="timeless-copy">
            <div className="timeless-eyebrow">
              Crafted to Perfection
            </div>

            <h2 style={{width:"650px"}}>
              Timeless Elegance
              <span>Diamond Collection</span>
            </h2>

            <p className="timeless-intro">
              Experience the brilliance that lasts forever.
              Discover exquisite diamonds crafted for life's
              most unforgettable moments.
            </p>

            <div className="timeless-actions">
              <Link href="/shop" className="timeless-primary">
                Explore Collection
                <span>→</span>
              </Link>

              <button className="timeless-story">
                <span className="story-icon">▶</span>
                Watch Story
              </button>
            </div>

            {/* STATS */}
            <div className="timeless-stats">
              <div>
                <strong>10K+</strong>
                <span>Happy Customers</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Certified Diamonds</span>
              </div>

              <div>
                <strong>30 Days</strong>
                <span>Easy Returns</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Customer Support</span>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="timeless-hero-image">
            <div className="image-glow" />

            <img
              src={siteAsset("photo3.png")}
              alt="Luxury diamond necklace"
            />

            <div className="image-shadow" />
          </div>

          {/* FEATURE CARD */}
          {/*<div className="timeless-feature-card">
            <div className="feature-label">
              Premium Collection
            </div>

            <h3>
              Luxury Diamond
              <br />
              Pendant
            </h3>

            <p>
              18K White Gold
              <br />
              with Natural Diamonds
            </p>

            <div className="feature-price">
              $2,450
            </div>

            <button>
              Shop Now
              <span>→</span>
            </button>

            <div className="feature-dots">
              <i className="active" />
              <i />
              <i />
            </div>
          </div>*/}
        </div>

        {/* ================= COLLECTION CARDS ================= */}
        <div className="timeless-grid">

          {/* CARD 1 */}
          <article className="collection-card signature-card">
            <div className="collection-overlay" />

            <div className="collection-content">
              <span>Signature Collection</span>

              <h3>
                Discover Our
                <br />
                Signature
                <br />
                Diamond Pieces
              </h3>

              <p>
                Elegant handcrafted designs
                <br />
                for every occasion.
              </p>

              <Link href="/shop">
                Learn More <span>→</span>
              </Link>
            </div>

            <div className="signature-model">
              {/*<img
                src="/assets/images/signature-jewelry.png"
                alt=""
              />*/}
            </div>
          </article>

          {/* CARD 2 */}
          <article className="collection-card tennis-card">
            <div className="tennis-image">
              <img
                src={siteAsset("img3.png")}
                alt="Diamond tennis bracelet"
              />
            </div>

            <div className="tennis-content">
              <span className="arrival-label">
                New Arrival
              </span>

              <h3>
                Radiant
                <br />
                Tennis Bracelet
              </h3>

              <p>
                Classic Brilliance
                <br />
                Modern Sophistication
              </p>

              <strong>$3,180</strong>

              <Link href="/shop">
                Discover More <span>→</span>
              </Link>
            </div>
          </article>

          {/* CARD 3 */}
          <article className="collection-card bridal-card">
            <div className="bridal-image">
              <img
                src={siteAsset("img3.png")}
                alt="Bridal diamond rings"
              />
            </div>

            <div className="bridal-content">
              <span>Bridal Edition</span>

              <h3>
                Exclusive
                <br />
                Bridal Jewelry
              </h3>

              <p>
                Celebrate Your Forever
                <br />
                Moment
              </p>

              <Link href="/shop">
                View Collection <span>→</span>
              </Link>
            </div>
          </article>
        </div>

        {/* ================= BENEFITS ================= */}
        <div className="timeless-benefits">

          <div className="benefit">
            <div className="benefit-icon">◇</div>

            <div>
              <strong>Certified Diamonds</strong>
              <span>Ethically Sourced</span>
            </div>
          </div>

          <div className="benefit">
            <div className="benefit-icon">♢</div>

            <div>
              <strong>Lifetime Warranty</strong>
              <span>Crafted to Last</span>
            </div>
          </div>

          <div className="benefit">
            <div className="benefit-icon">□</div>

            <div>
              <strong>Easy Returns</strong>
              <span>30-Day Policy</span>
            </div>
          </div>

          <div className="benefit">
            <div className="benefit-icon">▣</div>

            <div>
              <strong>Secure Payment</strong>
              <span>Encrypted Checkout</span>
            </div>
          </div>

          <div className="benefit">
            <div className="benefit-icon">◇</div>

            <div>
              <strong>Free Shipping</strong>
              <span>On Orders Over $399</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}