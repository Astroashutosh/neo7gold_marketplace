"use client";

import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

export default function CartUI() {
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
