"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "../../context/CartContext";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    sku: string;
    price: number;
    images: string[];
  };

  quantity: number;
};

export default function AddToCartButton({
  product,
  quantity,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });

    setAdded(true);

    // Brief feedback flash, then redirect to checkout
    setTimeout(() => {
      router.push("/shop/checkout");
    }, 800);
  };

  return (
    <button
      type="button"
      className={`luxury-add-button ${
        added ? "added-to-bag" : ""
      }`}
      onClick={handleAddToCart}
    >
      <span className="bag-icon">
        {added ? "✓" : "◇"}
      </span>

      <span className="bag-text">
        {added
          ? "ADDED TO BAG"
          : "ADD TO BAG"}
      </span>

      <span className="bag-price">
        ${product.price.toLocaleString()}
      </span>

      <span className="bag-arrow">
        →
      </span>
    </button>
  );
}