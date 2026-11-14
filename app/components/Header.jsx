"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { CATEGORIES_API_URL } from "../shop/data/api";
import { siteAsset } from "../site";
import "./Header.css";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isExperiencePage = pathname?.includes("/experience");
  const isDashboardPage = pathname?.includes("/dashboard");
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useCustomerAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [categories, setCategories] = useState([
    "All Pieces",
    "Bullion",
    "Fine Jewelry",
    "Gold Necklace",
    "Rings & Solitaires",
  ]);
  const [activeCategory, setActiveCategory] = useState("All Pieces");

  useEffect(() => {
    let active = true;

    fetch(CATEGORIES_API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        const list = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];
        const names = Array.from(
          new Set(
            list
              .map((item) => item?.name)
              .filter((name) => typeof name === "string" && name.trim())
          )
        );

        if (active && names.length) {
          setCategories(["All Pieces", ...names]);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("category");
    if (selected) setActiveCategory(selected);
    else if (!pathname?.replace(/\/+$/, "").endsWith("/shop")) {
      setActiveCategory("");
    } else {
      setActiveCategory("All Pieces");
    }
  }, [pathname]);

  function selectCategory(category) {
    setActiveCategory(category);
    const isShopPage = pathname?.replace(/\/+$/, "").endsWith("/shop");

    if (isShopPage) {
      window.dispatchEvent(
        new CustomEvent("neos:shop-category", { detail: category })
      );
      const url = new URL(window.location.href);
      if (category === "All Pieces") url.searchParams.delete("category");
      else url.searchParams.set("category", category);
      window.history.replaceState(null, "", `${url.pathname}${url.search}`);
      document.getElementById("products-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    const query =
      category === "All Pieces"
        ? ""
        : `?category=${encodeURIComponent(category)}`;
    router.push(`/shop/${query}`);
  }

  if (isExperiencePage || isDashboardPage) return null;

  return (
    <header className="neos-header">
      <div className="neos-header-inner">
        <Link href="/" className="neos-header-logo" aria-label="NEOS7 Gold home">
          <img src={siteAsset("logo1.png")} alt="NEOS7 Gold" />
        </Link>

        <nav className="neos-header-categories" aria-label="Product categories">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => selectCategory(category)}
            >
              <span>{String(index).padStart(2, "0")}</span>
              {category}
            </button>
          ))}
        </nav>

        <div className="neos-header-actions">
          <Link
            href="/experience/"
            className="neos-header-3d-btn"
            title="Experience Neos7 3D Virtual Salon"
          >
            <span className="sparkle">✦</span> 3D EXPERIENCE
          </Link>
          <Link
            href="/shop/wishlist/"
            aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
            title="Wishlist"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </Link>
          <Link
            href="/shop/checkout/"
            aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
            title="Shopping bag"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 8h12l1 13H5L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && <span>{cartCount}</span>}
          </Link>

          {/* Customer Account Entry */}
          <div className="neos-header-account-wrap" ref={accountRef}>
            {isAuthenticated ? (
              <button
                type="button"
                className={`neos-header-account-btn ${accountMenuOpen ? "active" : ""}`}
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                aria-label="Customer Account Menu"
                title={`Logged in as ${user?.name}`}
              >
                <div className="account-avatar-dot"></div>
                <span className="account-name">{user?.name?.split(" ")[0] || "Account"}</span>
                <svg viewBox="0 0 24 24" className="chevron-icon" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ) : (
              <Link
                href="/login/"
                className="neos-header-account-link"
                title="Customer Sign In / Register"
                aria-label="Customer Sign In"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* Account Dropdown for Logged In Customer */}
            {isAuthenticated && accountMenuOpen && (
              <div className="neos-account-dropdown">
                <div className="dropdown-user-info">
                  <p className="dropdown-user-name">{user?.name}</p>
                  <p className="dropdown-user-email">{user?.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <Link
                  href="/dashboard/customer/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">👑</span> Customer Dashboard
                </Link>
                <Link
                  href="/dashboard/customer/vault/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">🏦</span> My Stored Metals
                </Link>
                <Link
                  href="/dashboard/customer/orders/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">📦</span> Jewelry Orders
                </Link>
                <Link
                  href="/dashboard/customer/wishlist/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">❤️</span> Wishlist & Alerts
                </Link>
                <Link
                  href="/dashboard/customer/buyback/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">🔄</span> Sell My Gold & Scrap
                </Link>
                <Link
                  href="/dashboard/customer/passports/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">📜</span> Digital Passports (DPP)
                </Link>
                <Link
                  href="/dashboard/customer/kyc/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">🛡️</span> ID Verification & Limits
                </Link>
                <Link
                  href="/dashboard/customer/settings/"
                  className="dropdown-item"
                  onClick={() => setAccountMenuOpen(false)}
                >
                  <span className="dropdown-icon">⚙️</span> Account Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button
                  type="button"
                  className="dropdown-logout-btn"
                  onClick={() => {
                    setAccountMenuOpen(false);
                    logout();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
