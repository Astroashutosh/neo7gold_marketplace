"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
export default function ShopHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    itemCount,
    setCartOpen,
  } = useCart();

  function goHome() {
    router.push("/");
    setMenuOpen(false);
  }

  function goToShop() {
    router.push("/shop");
    setMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">

        <button
          onClick={goHome}
          className="group flex items-center gap-3"
        >
          <span className="flex h-8 w-8 rounded-full border border-amber-400/50 transition duration-500 group-hover:rotate-45" />

          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg uppercase tracking-[0.22em] text-white group-hover:text-amber-400">
              Neos7
            </span>

            <span className="mt-1 text-[8px] uppercase tracking-[0.45em] text-amber-400/80">
              Gold
            </span>
          </div>
        </button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">

          <button
            onClick={goHome}
            className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 hover:text-white"
          >
            Home
          </button>

          <button
            onClick={goToShop}
            className="text-[10px] uppercase tracking-[0.35em] text-white"
          >
            Shop
          </button>

        </nav>

        <button
          onClick={() => setCartOpen(true)}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-300 hover:text-amber-400"
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
              />

              <path
                d="M9 8V6a3 3 0 0 1 6 0v2"
                stroke="currentColor"
                strokeWidth="1.3"
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

      </div>
    </header>
  );
}
