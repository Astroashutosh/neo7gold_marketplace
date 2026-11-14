"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type WishlistProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  goldWeight?: string;
  availability?: string;
};

type WishlistContextType = {
  wishlistItems: WishlistProduct[];
  wishlistCount: number;

  addToWishlist: (product: WishlistProduct) => void;

  removeFromWishlist: (id: string) => void;

  isInWishlist: (id: string) => boolean;

  clearWishlist: () => void;
};

const WishlistContext =
  createContext<WishlistContextType | undefined>(
    undefined
  );


export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [wishlistItems, setWishlistItems] =
    useState<WishlistProduct[]>([]);

  const [loaded, setLoaded] =
    useState(false);


  /* =========================================
     LOAD WISHLIST
  ========================================= */

  useEffect(() => {

    try {

      const savedWishlist =
        localStorage.getItem("neos7_wishlist");

      if (savedWishlist) {

        setWishlistItems(
          JSON.parse(savedWishlist)
        );

      }

    } catch (error) {

      console.error(
        "Error loading wishlist:",
        error
      );

    }

    setLoaded(true);

  }, []);


  /* =========================================
     SAVE WISHLIST
  ========================================= */

  useEffect(() => {

    if (loaded) {

      localStorage.setItem(
        "neos7_wishlist",
        JSON.stringify(wishlistItems)
      );

    }

  }, [wishlistItems, loaded]);


  /* =========================================
     ADD WISHLIST
  ========================================= */

  const addToWishlist = (
    product: WishlistProduct
  ) => {

    setWishlistItems((previousItems) => {

      const exists =
        previousItems.some(
          (item) =>
            item.id === product.id
        );


      if (exists) {

        return previousItems;

      }


      return [
        ...previousItems,
        product,
      ];

    });

  };


  /* =========================================
     REMOVE
  ========================================= */

  const removeFromWishlist = (
    id: string
  ) => {

    setWishlistItems((previousItems) =>
      previousItems.filter(
        (item) =>
          item.id !== id
      )
    );

  };


  /* =========================================
     CHECK WISHLIST
  ========================================= */

  const isInWishlist = (
    id: string
  ) => {

    return wishlistItems.some(
      (item) =>
        item.id === id
    );

  };


  /* =========================================
     CLEAR
  ========================================= */

  const clearWishlist = () => {

    setWishlistItems([]);

    localStorage.removeItem(
      "neos7_wishlist"
    );

  };


  const wishlistCount =
    wishlistItems.length;


  return (

    <WishlistContext.Provider
      value={{

        wishlistItems,
        wishlistCount,

        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,

      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}


/* =========================================
   USE WISHLIST
========================================= */

export function useWishlist() {

  const context =
    useContext(WishlistContext);


  if (context === undefined) {

    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );

  }


  return context;

}