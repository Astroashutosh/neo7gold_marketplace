import Link from "next/link";
import About from "./components/About";
import TimelessElegance from "./components/TimelessElegance";
import Craftsmanship from "./components/Craftsmanship";

// Signature Pieces — static showcase cards linking to the shop
const signaturePieces = [
  {
    num: "01",
    type: "ETERNITY",
    name: "Eternal Gold",
    price: "$2,850",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    alt: "Eternal Gold Ring",
  },
  {
    num: "02",
    type: "NOIR",
    name: "Noir Diamond",
    price: "$3,420",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
    alt: "Noir Diamond Ring",
  },
  {
    num: "03",
    type: "SIGNATURE",
    name: "Rose Signature",
    price: "$2,990",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
    alt: "Rose Signature Ring",
  },
  {
    num: "04",
    type: "OBSIDIAN",
    name: "Diamond Gold Cuff Bracelet",
    price: "$3,750",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    alt: "Black Diamond Bracelet",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="about-section">
        <About />
      </section>

      <section>
        <TimelessElegance />
      </section>

      <section>
        <Craftsmanship />
      </section>

      <section className="products-section">
        <div className="products-gold-particles" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="products-header">
          <div>
            <span className="products-eyebrow">THE COLLECTION</span>
            <h2>Signature Pieces</h2>
          </div>

          <div className="story-text">
            <span className="story-star star-1">✦</span>
            <span className="story-star star-2">✧</span>
            <span className="story-star star-3">✦</span>
            <span className="story-star star-4">✦</span>
            <span className="story-star star-5">✧</span>
            <span className="story-star star-6">✦</span>

            <p>
              Designed to become part of your story.
              Discover our collection of timeless pieces.
            </p>
          </div>
        </div>

        <div className="products-grid">
          {signaturePieces.map((piece) => (
            <article className="product-card" key={piece.num}>
              <div className="product-visual">
                <span className="product-number">{piece.num}</span>
                <div className="product-shine"></div>
                <img src={piece.img} alt={piece.alt} />
                {/* Link to the full shop collection */}
                <Link href="/shop" className="product-view">
                  View
                  <span>↗</span>
                </Link>
              </div>

              <div className="product-details">
                <div>
                  <span className="product-type">{piece.type}</span>
                  <h3>{piece.name}</h3>
                </div>
                <span className="product-price">{piece.price}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to full shop */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/shop"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              border: "1px solid rgba(212,175,55,0.7)",
              color: "#d4af37",
              textDecoration: "none",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
          >
            View Full Collection →
          </Link>
        </div>
      </section>
    </main>
  );
}
