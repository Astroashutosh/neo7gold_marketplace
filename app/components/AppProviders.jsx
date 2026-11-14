"use client";

import { CartProvider, useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

function CartUI() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <CartDrawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      cart={cart}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeFromCart}
    />
  );
}

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      {children}
      <CartUI />
    </CartProvider>
  );
}
