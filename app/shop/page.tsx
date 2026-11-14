"use client";

import { useEffect, useState } from "react";
import Products from "../components/Products";
import { siteAsset } from "../site";
import "./shop.css";

export default function ShopPage() {

 const [activeCategory, setActiveCategory] =
  useState("All Pieces");

  useEffect(() => {
    const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
    if (categoryFromUrl) setActiveCategory(categoryFromUrl);

    const handleHeaderCategory = (event: Event) => {
      const category = (event as CustomEvent<string>).detail;
      if (category) setActiveCategory(category);
    };

    window.addEventListener("neos:shop-category", handleHeaderCategory);
    return () => window.removeEventListener("neos:shop-category", handleHeaderCategory);
  }, []);

  return (

    <main className="shop-page">

      <section className="shop-featured">


        {/* Ambient gold lights */}

        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="gold-dust"></div>

        <div className="space-particles">
          {Array.from({ length: 35 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <div className="hero-orbit orbit-one"></div>
        <div className="hero-orbit orbit-two"></div>
        <div className="hero-orbit orbit-three"></div>

        {/* =========================================
            PRODUCT INTRO
        ========================================= */}

        <div className="product-intro">

          <div className="product-intro-glow glow-one"></div>
          <div className="product-intro-glow glow-two"></div>

          <div className="product-orbit product-orbit-one"></div>
          <div className="product-orbit product-orbit-two"></div>
          <div className="product-orbit product-orbit-three"></div>


          <div className="featured-heading">

            <div>

              <span className="featured-eyebrow">
                SIGNATURE COLLECTION
              </span>

              <h2>
                Made to be
                <br />
                <em>remembered.</em>
              </h2>

            </div>

            <div className="featured-description">

              <span className="description-number">
                02
              </span>

              <p>
                Each creation is born from a balance
                of precious materials, refined geometry
                and timeless craftsmanship.
              </p>

            </div>

          </div>


          <div className="intro-jewel">

            <div className="jewel-core"></div>

            <div className="jewel-shine"></div>

          </div>


          <div className="intro-particles">

            {Array.from({ length: 28 }).map((_, i) => (

              <span key={i}></span>

            ))}

          </div>


          <div className="intro-light-sweep"></div>


          <div className="product-intro-content">

            <span>
              THE COLLECTION
            </span>

            <div className="intro-line"></div>

          </div>

        </div>


        {/* =========================================
            PRODUCTS
        ========================================= */}

    <div
  id="products-section"
  className="shop-products"
>
  <Products
    activeCategory={activeCategory}
  />
</div>


        {/* =========================================
            EDITORIAL COLLECTIONS
        ========================================= */}

        <section className="editorial-collections">

          <div className="editorial-heading">

            <div
              style={{
                fontSize: "48px",
                background:
                  "linear-gradient(120deg, #fff3bd 0%, #d9ae55 35%, #fff0ad 55%, #a96f1f 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >

              NeosGold Collections

            </div>

            <p>
              Explore our newly launched collection
            </p>

          </div>

<div className="editorial-grid">

  {/* LARGE CARD */}

  <div className="editorial-card editorial-card-large">

    <img
      src={siteAsset("te2.jpg")}
      alt="Necklace Collection"
      className="editorial-direct-image"
    />

    <div className="editorial-overlay"></div>

  </div>


  {/* EARRINGS */}

  <div className="editorial-card editorial-card-small">

    <img
      src={siteAsset("earing.jpg")}
      alt="Earrings Collection"
      className="editorial-direct-image"
    />

    <div className="editorial-overlay"></div>

  </div>


  {/* RINGS */}

  <div className="editorial-card editorial-card-small">

    <img
      src={siteAsset("ring23.jpg")}
      alt="Ring Collection"
      className="editorial-direct-image"
    />

    <div className="editorial-overlay"></div>

  </div>

</div>

        </section>


        <div className="hero-bottom-glow"></div>

      </section>

    </main>

  );
}
