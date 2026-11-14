"use client";

import { useWishlist } from "../context/WishlistContext";


type ProductWishlistButtonProps = {

  product: {
    id: string;
    name: string;
    sku: string;
    price: number;
    images: string[];
    availability?: string;
  };

};


export default function ProductWishlistButton({
  product,
}: ProductWishlistButtonProps) {

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();


  const isWishlisted =
    isInWishlist(product.id);


  const handleWishlist = () => {

    if (isWishlisted) {

      removeFromWishlist(product.id);

    } else {

      addToWishlist({

        id: product.id,

        name: product.name,

        sku: product.sku,

        price: product.price,

        image: product.images?.[0] || "",

        availability:
          product.availability,

      });

    }

  };


  return (

    <button
      className={`premium-wishlist ${
        isWishlisted
          ? "active"
          : ""
      }`}
      aria-label="Add to wishlist"
      onClick={handleWishlist}
    >

      <span>
        {isWishlisted ? "♥" : "♡"}
      </span>

    </button>

  );

}