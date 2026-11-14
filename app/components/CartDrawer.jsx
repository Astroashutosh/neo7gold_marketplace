"use client";

import { useRouter } from "next/navigation";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col border-l border-neutral-800 bg-black text-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-6">

          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Neos7 Gold
            </p>

            <h2 className="mt-1 font-serif text-2xl">
              Your Bag
            </h2>

            <p className="mt-1 text-[10px] text-neutral-600">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-xl text-neutral-400 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            aria-label="Close cart"
          >
            ×
          </button>

        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {cart.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">

                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 8h12l1 13H5L6 8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />

                  <path
                    d="M9 8V6a3 3 0 0 1 6 0v2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>

              </div>

              <h3 className="font-serif text-xl">
                Your bag is empty
              </h3>

              <p className="mt-3 text-sm text-neutral-500">
                Discover our gold collection.
              </p>

              <button
                onClick={() => {
                  onClose();
                  router.push("/shop");
                }}
                className="mt-7 rounded-xl bg-[#D4AF37] px-7 py-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#F6D77A]"
              >
                Explore Collection
              </button>

            </div>

          ) : (

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 border-b border-neutral-900 pb-5"
                >

                  {/* Product image */}
                  <button
                    onClick={() => {
                      onClose();
                      router.push(`/shop/${item.id}`);
                    }}
                    className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-900"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-110"
                    />
                  </button>

                  {/* Product info */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex justify-between gap-3">

                      <button
                        onClick={() => {
                          onClose();
                          router.push(`/shop/${item.id}`);
                        }}
                        className="truncate text-left font-serif text-sm transition hover:text-[#D4AF37]"
                      >
                        {item.name}
                      </button>

                      <span className="whitespace-nowrap text-sm text-[#D4AF37]">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>

                    </div>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-neutral-600">
                      Neos7 Gold
                    </p>

                    {/* Quantity */}
                    <div className="mt-auto flex items-center justify-between pt-4">

                      <div className="flex items-center rounded-lg border border-neutral-800">

                        <button
                          onClick={() =>
                            onDecrease(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-neutral-400 transition hover:text-[#D4AF37]"
                        >
                          −
                        </button>

                        <span className="w-8 text-center text-xs">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            onIncrease(item.id)
                          }
                          className="flex h-8 w-8 items-center justify-center text-neutral-400 transition hover:text-[#D4AF37]"
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          onRemove(item.id)
                        }
                        className="text-[9px] uppercase tracking-[0.25em] text-neutral-600 transition hover:text-red-400"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Bottom */}
        {cart.length > 0 && (

          <div className="border-t border-neutral-800 bg-black p-6">

            <div className="mb-6 flex items-center justify-between">

              <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                Total
              </span>

              <span className="text-2xl font-light text-[#D4AF37]">
                ${total.toLocaleString()}
              </span>

            </div>

            {/* View Cart */}
            <button
              onClick={() => {
                onClose();
                router.push("/shop/cart");
              }}
              className="w-full rounded-xl border border-[#D4AF37]/40 py-4 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              View Full Cart
            </button>

            {/* Checkout */}
            <button
              onClick={() => {
                onClose();
                router.push("/shop/checkout");
              }}
              className="mt-3 w-full rounded-xl bg-[#D4AF37] py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#F6D77A]"
            >
              Checkout
            </button>

            {/* Continue shopping */}
            <button
              onClick={() => {
                onClose();
                router.push("/shop");
              }}
              className="mt-3 w-full py-2 text-[9px] uppercase tracking-[0.3em] text-neutral-600 transition hover:text-[#D4AF37]"
            >
              Continue Shopping
            </button>

          </div>

        )}

      </aside>
    </>
  );
}
