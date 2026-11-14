import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera } from "lucide-react";
import GoldWeightSelector from "./GoldWeightSelector";
import ProductGallery from "./ProductGallery";
import ProductPurchase from "./ProductPurchase";
import ProductWishlistButton from "../../components/ProductWishlistButton";
import { fetchApiProducts, getProductById } from "../data/api";
import { siteAsset } from "../../site";

export async function generateStaticParams() {
  const catalogue = await fetchApiProducts();
  return catalogue.map((product) => ({
    id: product.id,
  }));
}

type ProductPageProps = {

  params: Promise<{
    id: string;
  }>;

};

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const customerReviews = product.customerReviews ?? [];
  const ratingDistribution = product.ratingDistribution;

  return (
    <main className="luxury-product-page">

      {/* MAIN PRODUCT AREA */}
      <section className="luxury-product-layout">

        {/* =========================================
            LEFT - PRODUCT VIEWER
        ========================================= */}
        <div className="product-showcase">

 <ProductGallery
  images={product.images}
  productName={product.name}
  availability={product.availability}
/>

    {/* DESCRIPTION */}
    <div className="luxury-description">

      <span className="section-label">
        THE PIECE
      </span>

      <p>
        An expression of refined craftsmanship, this{" "}
        <strong>
          {product.name.toLowerCase()}
        </strong>{" "}
        is created for those who appreciate exceptional
        detail, timeless proportions and effortless elegance.
      </p>

    </div>
    
        {/* PRODUCT HIGHLIGHTS */}
    <div className="luxury-highlights">

      <div className="highlight">

        <div className="highlight-icon">
          ◇
        </div>

        <div>
          <strong>
            Premium Craftsmanship
          </strong>

          <span>
            Finished by skilled artisans
          </span>
        </div>

      </div>


      <div className="highlight">

        <div className="highlight-icon">
          ✦
        </div>

        <div>
          <strong>
            Certified Authentic
          </strong>

          <span>
            Guaranteed Neos7 jewellery
          </span>
        </div>

      </div>


      <div className="highlight">

        <div className="highlight-icon">
          ♢
        </div>

        <div>
          <strong>
            Insured Delivery
          </strong>

          <span>
            Secure worldwide shipping
          </span>
        </div>

      </div>

    </div>


    {/* ASSISTANCE */}
    <div className="jewellery-assistance">

      <div className="assistance-icon">
        ♡
      </div>

      <div className="assistance-content">

        <strong>
          Need assistance choosing your piece?
        </strong>

        <span>
          Speak privately with a Neos7 jewellery specialist.
        </span>

      </div>

      <button type="button">
        CONTACT
      </button>

    </div>


    {/* TRUST FOOTER */}
    <div className="luxury-trust">

      <div>
        <span>✓</span>
        Secure Checkout
      </div>

      <div>
        <span>✓</span>
        Authenticity Guaranteed
      </div>

      <div>
        <span>✓</span>
        Insured Shipping
      </div>

    </div>

        </div>


       {/* =========================================
    RIGHT - LUXURY PRODUCT INFORMATION
========================================= */}

<div className="product-information">

  <div className="information-inner">

    {/* BRAND */}
    <div className="luxury-brand-row">

      <span className="brand-line"></span>

      <span className="product-eyebrow">
        NEOS7 GOLD JOAILLERIE
      </span>

      <span className="brand-line"></span>

    </div>


    {/* PRODUCT TITLE */}
    <div className="luxury-title-area">

      <h1>
        {product.name}
      </h1>

      <ProductWishlistButton
  product={{
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: product.price,
    images: product.images,
    availability: product.availability,
  }}
/>

    </div>


    {/* SKU + RATING */}
    <div className="luxury-product-meta">

      <div className="luxury-sku">

        <span>REFERENCE</span>

        <strong>
          {product.sku}
        </strong>

      </div>


      <div className="meta-separator"></div>


      <div className="luxury-rating">

        {/* <div className="luxury-stars">
          ★★★★★
        </div> */}

        <strong>
          {product.rating}
        </strong>

        <span>
          {product.reviews} reviews
        </span>

      </div>

    </div>


    {/* PRICE */}
    <div className="luxury-price-section">

      <div className="price-heading">

        <span>
          EXCLUSIVE PRICE
        </span>

        <div className="price-status">
          <i></i>
          {product.availability}
        </div>

      </div>


      <div className="luxury-price">

        <span className="currency">
          $
        </span>

        <strong>
          {product.price.toLocaleString()}
        </strong>

        <small>
          USD
        </small>

      </div>


      <p className="price-note">
        Complimentary insured delivery included
      </p>

    </div>


    {/* GOLD DIVIDER */}
    <div className="luxury-gold-divider">
      <span></span>
      <i>✦</i>
      <span></span>
    </div>




{/* PRODUCT SPECIFICATIONS */}
<div className="luxury-specifications">

  <div className="spec-heading">
    <span>Product Details</span>
  </div>


  {/* GOLD WEIGHT */}
  <div className="spec-row gold-variation-row">
    <span>Gold Weight</span>
    <GoldWeightSelector />
  </div>


  {/* COMPACT DETAILS */}
  <div className="compact-spec-details">

    {/* Product */}
    <div className="compact-spec-group">
      <span className="compact-spec-title">PRODUCT</span>

      <div className="compact-spec-grid">
        <div>
          <span>Brand</span>
        <strong>
        {product.specifications?.brand || "Neos7 Gold"}
      </strong>
        </div>

        <div>
          <span>Category</span>
        <strong>
        {product.category}
      </strong>
        </div>

        <div>
          <span>Condition</span>
          <strong>New</strong>
        </div>
      </div>
    </div>


    {/* Gold */}
    <div className="compact-spec-group">
      <span className="compact-spec-title">GOLD</span>

      <div className="compact-spec-grid">
        <div>
          <span>Purity</span>
          <strong>750 Gold</strong>
        </div>

        <div>
          <span>Weight</span>
         <strong>
            {product.specifications?.weight || "N/A"}
          </strong>
        </div>

        <div>
          <span>Color</span>
          <strong>
            {product.specifications?.color || "N/A"}
          </strong>
        </div>
      </div>
    </div>


    {/* Diamond */}
    <div className="compact-spec-group">
      <span className="compact-spec-title">DIAMOND</span>

      <div className="compact-spec-grid">
        <div>
          <span>Gemstone</span>
          <strong>
  {product.specifications?.gemstone || "N/A"}
</strong>
        </div>

        <div>
          <span>Carat</span>
         <strong>
  {product.specifications?.carat || "N/A"}
</strong>
        </div>

        <div>
          <span>Size</span>
          <strong>
  {product.specifications?.size || "N/A"}
</strong>
        </div>
      </div>
    </div>

  </div>


  {/* SELLER */}
  <div className="spec-row">
    <span>Seller</span>
   <strong>
  {product.seller}
</strong>
  </div>


  {/* CERTIFICATION */}
  <div className="spec-row">
    <span>Certification</span>
    <strong>IGI Certified</strong>
  </div>


  {/* AVAILABILITY */}
  <div className="spec-row">
    <span>Availability</span>

    <strong className="spec-available">
    <i></i>
    {product.availability}
  </strong>
  </div>


  {/* LOCATION */}
  <div className="spec-row">
    <span>Location</span>
    <strong>Milan, Italy</strong>
  </div>

</div>

    {/* PREMIUM VIRTUAL TRY ON */}
    <Link
      href={`/shop/${product.id}/try-on/`}
      className="premium-tryon-card"
      aria-label={`Try ${product.name} virtually`}
    >

      <div className="tryon-card-icon">
        <Camera size={27} strokeWidth={1.5} />
      </div>

      <div className="tryon-card-content">

        <span className="tryon-eyebrow">
          EXPERIENCE BEFORE YOU BUY
        </span>

        <h3>
          Virtual Try-On
        </h3>

        <p>
          See how this beautiful piece looks on you.
          Experience your jewellery virtually.
        </p>

        <span className="tryon-card-action">
          TRY IT ON NOW <i>→</i>
        </span>

      </div>

      <div className="tryon-card-decoration">
        ✦
      </div>

    </Link>



    {/* PURCHASE */}
   <ProductPurchase
  product={{
    id: product.id,
    name: product.name,
    sku: product.sku,
    price: product.price,
    images: product.images,
  }}
/>


    {/* BUY NOW - FULL WIDTH */}
    <div className="product-buy-row">

      <button
        type="button"
        className="luxury-buy-button new-buy"
      >
        <span>BUY NOW</span>
        <i>→</i>
      </button>

    </div>




  </div>

</div>

      </section>

{/* =====================================================
    CUSTOMER REVIEWS
===================================================== */}

<section className="customer-reviews" id="customer-reviews">

  <div className="reviews-heading">
    <span className="reviews-eyebrow">CUSTOMER EXPERIENCES</span>
    <h2>
      Stories of elegance,
      <em> crafted to be remembered.</em>
    </h2>
    <p>
      Verified impressions from Neos7 collectors, shaped around
      craftsmanship, fit and lasting beauty.
    </p>
  </div>

  <div className="reviews-layout">

    <div className="reviews-summary">
      <div className="reviews-score">
        <strong>{product.rating.toFixed(1)}</strong>
        <span className="reviews-stars" aria-label={`${product.rating} out of 5 stars`}>
          ★★★★★
        </span>
        <small>{product.reviews} verified reviews</small>
      </div>

      <div className="reviews-product">
        <span>REVIEWED PIECE</span>
        <strong>{product.name}</strong>
      </div>
    </div>

    <div className="reviews-distribution">
      <span className="distribution-title">RATING DISTRIBUTION</span>

      {ratingDistribution ? (
        ([
          ["5 Stars", ratingDistribution.five],
          ["4 Stars", ratingDistribution.four],
          ["3 Stars", ratingDistribution.three],
          ["2 Stars", ratingDistribution.two],
          ["1 Star", ratingDistribution.one],
        ] as const).map(([label, count]) => {
          const pct = product.reviews > 0 ? Math.round((count / product.reviews) * 100) : 0;
          return (
            <div className="distribution-row" key={label}>
              <span>{label}</span>
              <div className="distribution-track">
                <i style={{ width: `${pct}%` }} />
              </div>
              <strong>{pct}%</strong>
            </div>
          );
        })
      ) : (
        <p className="distribution-empty">
          Detailed star distribution will appear once individual verified
          review records are synced.
        </p>
      )}
    </div>

  </div>

  {customerReviews.length > 0 ? (
    <div className="reviews-grid">
      {customerReviews.map((review) => {
        const filled = Math.max(0, Math.min(5, Math.round(review.rating)));
        return (
          <article className="review-card" key={review.id}>
            {review.image && (
              <div className="review-image">
                <img src={review.image} alt="" />
              </div>
            )}

            <div className="review-card-top">
              <div>
                <strong>{review.name}</strong>
                <span>{review.date}</span>
              </div>
              <span className="review-stars">
                {"★".repeat(filled)}
                {"☆".repeat(5 - filled)}
              </span>
            </div>

            <span className="review-product">{review.productName ?? product.name}</span>
            <p>{review.text}</p>

            {review.verifiedPurchase && (
              <span className="review-verified">✓ Verified Purchase</span>
            )}
          </article>
        );
      })}
    </div>
  ) : (
    <div className="reviews-empty">
      <span className="reviews-empty-icon">✦</span>
      <h3>Verified customer stories are being collected</h3>
      <p>
        Individual reviews for {product.name} will appear here once verified
        purchase feedback is added to the catalogue.
      </p>
      <span>{product.reviews} reviews on record</span>
    </div>
  )}

  <div className="reviews-actions">
    <button
      type="button"
      className="reviews-view-all"
      disabled={customerReviews.length === 0}
    >
      VIEW ALL REVIEWS
    </button>
  </div>

</section>


{/* =====================================================
    PREMIUM OFFER BANNER
===================================================== */}

<section className="luxury-offer-banner">

  {/* Animated gold glow */}
  <div className="offer-glow"></div>

  {/* Left content */}
  <div className="offer-content">

    <h3>
      Get up to <strong>75%</strong> of your 1st
      installment value paid by NeosGold!
    </h3>

    <span className="offer-terms">
      *T&amp;C Apply!
    </span>

  </div>

  {/* Center decorative jewellery */}
<div className="offer-jewel">
  <img  style={{height:"60px",width:"auto",objectFit:"contain"}}
    src={siteAsset("jew.png")}
    alt="Jewellery"
    className="offer-jewel-image"
  />
</div>


  {/* Brand / offer name */}
  <div className="offer-brand">

    <span className="offer-brand-title">
      GOLDEN HARVEST
    </span>

    <span className="offer-brand-subtitle">
      JEWELLERY PURCHASE PLAN
    </span>

  </div>


  {/* Button */}
  <button
    className="offer-button"
   
  >
    <span>Know More</span>
    <i>→</i>
  </button>

</section>




      {/* =========================================
    PRODUCT STORY
========================================= */}
<section className="product-story">

  {/* Ambient gold lights */}
  <div className="story-orb story-orb-1"></div>
  <div className="story-orb story-orb-2"></div>

  <div className="story-heading">

    <div className="story-eyebrow">
      <span></span>
      THE DETAILS
      <span></span>
    </div>

    <h2>
      Crafted to be
      <em> remembered.</em>
    </h2>

    <p>
      Every detail is thoughtfully considered —
      from the first sketch to the final polish.
    </p>

  </div>


  <div className="story-grid">

    {/* CARD 01 */}
    <div className="story-card">

      <div className="story-card-top">
        <span className="story-number">01</span>

        <span className="story-icon">
          ✦
        </span>
      </div>

      <div className="story-line"></div>

      <h3>
        Exceptional
        <strong>Craft</strong>
      </h3>

      <p>
        Every piece is carefully finished by skilled
        artisans with an uncompromising attention
        to detail.
      </p>

      <div className="story-card-footer">
        <span>MASTERFULLY MADE</span>
        <span>✦</span>
      </div>

    </div>


    {/* CARD 02 */}
    <div className="story-card featured-story">

      <div className="story-card-top">
        <span className="story-number">02</span>

        <span className="story-icon">
          ◇
        </span>
      </div>

      <div className="story-line"></div>

      <h3>
        Timeless
        <strong>Design</strong>
      </h3>

      <p>
        Designed beyond seasons, combining
        contemporary proportions with timeless
        jewellery aesthetics.
      </p>

      <div className="story-card-footer">
        <span>DESIGNED TO ENDURE</span>
        <span>✦</span>
      </div>

    </div>


    {/* CARD 03 */}
    <div className="story-card">

      <div className="story-card-top">
        <span className="story-number">03</span>

        <span className="story-icon">
          ♢
        </span>
      </div>

      <div className="story-line"></div>

      <h3>
        Made to
        <strong>Last</strong>
      </h3>

      <p>
        Created as an heirloom piece that can become
        part of your story for generations.
      </p>

      <div className="story-card-footer">
        <span>YOUR LEGACY</span>
        <span>✦</span>
      </div>

    </div>

  </div>

</section>


{/* =========================================
    BOTTOM CTA
========================================= */}
<section className="luxury-bottom">

  <div className="cta-glow"></div>

  <div className="cta-inner">

    <div className="cta-eyebrow">
      <span></span>
      NEOS7 GOLD JOAILLERIE
      <span></span>
    </div>

    <h2>
      Discover your
      <em> signature piece.</em>
    </h2>

    <p>
      Jewellery created to celebrate your moments,
      your style, and the stories that last forever.
    </p>

    <Link href="/shop/" className="luxury-cta-button">
      <span>←</span>
      Back to Collection
    </Link>

  </div>

  {/* Decorative gold ring */}
  <div className="cta-ring cta-ring-left"></div>
  <div className="cta-ring cta-ring-right"></div>

</section>



    </main>
  );
}
