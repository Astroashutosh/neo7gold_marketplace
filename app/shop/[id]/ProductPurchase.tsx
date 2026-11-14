"use client";

import { useState } from "react";

import AddToCartButton from "./AddToCartButton";

type ProductPurchaseProps = {
  product: {
    id: string;
    name: string;
    sku: string;
    price: number;
    images: string[];
  };
};

export default function ProductPurchase({
  product,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] =
    useState(1);

  const increaseQuantity = () => {
    setQuantity(
      (previous) => previous + 1
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (previous) => previous - 1
      );
    }
  };

  return (
    <div className="luxury-purchase">

      <div className="purchase-top">

        <span>
          QUANTITY
        </span>

        <span className="purchase-note">
          Ships within 2–4 business days
        </span>

      </div>

      <div className="purchase-controls">

        {/* QUANTITY */}

        <div className="luxury-quantity">

          <button
            type="button"
            onClick={decreaseQuantity}
          >
            −
          </button>

          <span>
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
          >
            +
          </button>

        </div>

        {/* ADD TO CART */}

        <AddToCartButton
          product={product}
          quantity={quantity}
        />

      </div>

    </div>
  );
}