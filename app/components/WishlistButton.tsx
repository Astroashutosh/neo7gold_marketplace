"use client";

import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

type WishlistButtonProps = {
  floating?: boolean;
};

export default function WishlistButton({
  floating = false,
}: WishlistButtonProps) {

  const { wishlistCount } = useWishlist();

  return (
    <Link
      href="/shop/wishlist"
      className={
        floating
          ? "wishlist-floating-button"
          : "luxury-action-button"
      }
      aria-label="Wishlist"
    >

      <svg
        className="action-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>

      {wishlistCount > 0 && (
        <span className="action-count">
          {wishlistCount}
        </span>
      )}

    </Link>
  );
}