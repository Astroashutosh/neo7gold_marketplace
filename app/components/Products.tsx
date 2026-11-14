"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import {
  products as fallbackProducts,
  type Product,
} from "../shop/data/products";
import { mapApiProduct, PRODUCTS_API_URL } from "../shop/data/api";
import { isTryOnSupported } from "../shop/data/tryon";

type ProductsProps = {
  activeCategory?: string;
};

function categoryKey(value?: string): string {
  const text = String(value || "").toLowerCase();

  if (text.includes("ring") || text.includes("solitaire")) return "rings";
  if (
    text.includes("necklace") ||
    text.includes("chain") ||
    text.includes("pendant") ||
    text.includes("choker")
  ) {
    return "necklaces";
  }
  if (
    text.includes("bracelet") ||
    text.includes("bangle") ||
    text.includes("tennis")
  ) {
    return "bracelets";
  }
  if (
    text.includes("earring") ||
    text.includes("jhumka") ||
    text.includes("stud")
  ) {
    return "earrings";
  }
  if (text.includes("bullion") || text.includes("gold bar") || text.includes("valcambi")) {
    return "bullion";
  }
  if (text.includes("fine jewelry") || text.includes("fine jewellery")) {
    return "fine-jewelry";
  }

  return text;
}

function matchesCategory(productCategory: string, activeCategory: string) {
  if (activeCategory === "All Pieces") return true;
  return (
    productCategory === activeCategory ||
    categoryKey(productCategory) === categoryKey(activeCategory)
  );
}

export default function Products({
  activeCategory = "All Pieces",
}: ProductsProps) {

  const router = useRouter();
  const [catalog, setCatalog] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    let active = true;

    fetch(PRODUCTS_API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        const list = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];
        if (active && list.length) {
          setCatalog(list.map(mapApiProduct));
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const openProduct = (id: string) => {
    router.push(`/shop/${encodeURIComponent(id)}/`);
  };

  // Filter products
  const filteredProducts =
    activeCategory === "All Pieces"
      ? catalog
      : catalog.filter((product) =>
          matchesCategory(product.category, activeCategory)
        );

  return (
    <div className="products-grid">

      {filteredProducts.length > 0 ? (

        filteredProducts.map((product, index) => (

          <article
            className="luxury-product-card"
            key={product.id}
            onClick={() => openProduct(product.id)}
          >

            <div className="luxury-product-image">

              <img
                src={product.images[0]}
                alt={product.name}
              />

              <div className="product-image-overlay" />

              <span className="product-availability">
                {product.availability}
              </span>

              <span className="product-number">
                {String(index + 1).padStart(2, "0")}
              </span>

            </div>


            <div className="luxury-product-info">

              <div className="product-info-top">

                <div>

                  <span className="product-category">
                    {product.category.toUpperCase()}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p className="product-sku">
                    SKU: {product.sku}
                  </p>

                </div>


                <strong className="product-price">
                  ${product.price.toLocaleString()}
                </strong>

              </div>


              <p className="product-description">

                {product.description ||
                  "Exceptional craftsmanship with a refined silhouette created for timeless elegance."}

              </p>


              <div className="product-meta">

                <div className="product-rating">

                  <span>★</span>

                  <strong>
                    {product.rating}
                  </strong>

                  <small>
                    ({product.reviews})
                  </small>

                </div>


                <span className="product-seller">
                  {product.seller}
                </span>

              </div>


              <div className="product-card-actions">

                <Link
                  href={`/shop/${encodeURIComponent(product.id)}/`}
                  className="view-product"
                  aria-label={`View ${product.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (event.detail > 1) event.preventDefault();
                  }}
                >
                  <span>View Piece</span>
                  <span className="view-arrow">→</span>
                </Link>

                {isTryOnSupported(product) && (
                  <button
                    className="tryon-card-btn"
                    title="Virtual Try-On"
                    aria-label={`Virtual Try-On for ${product.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/shop/${product.id}/try-on/`);
                    }}
                  >
                    <Camera size={15} strokeWidth={1.6} />
                    <span>Try On</span>
                  </button>
                )}

              </div>

            </div>

          </article>

        ))

      ) : (

        <div className="no-products">
          No products found in this collection.
        </div>

      )}

    </div>
  );
}
