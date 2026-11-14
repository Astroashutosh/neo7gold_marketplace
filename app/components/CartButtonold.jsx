"use client";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const {
    itemCount,
    setCartOpen,
  } = useCart();

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-300 transition hover:text-amber-400"
    >
      <span className="relative">

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 8h12l1 13H5L6 8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          <path
            d="M9 8V6a3 3 0 0 1 6 0v2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[8px] font-bold text-black">
          {itemCount}
        </span>

      </span>

      <span className="hidden sm:block">
        Bag
      </span>
    </button>
  );
}
