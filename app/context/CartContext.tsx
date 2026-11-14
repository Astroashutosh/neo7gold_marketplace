"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartProduct = {
  id: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
  goldWeight?: string;
};

type CartContextType = {
  cartItems: CartProduct[];
  cartCount: number;
  cartTotal: number;

  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  // LOAD CART
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("neos7_cart");

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }

    setLoaded(true);
  }, []);

  // SAVE CART
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "neos7_cart",
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, loaded]);

  // ADD TO CART
  const addToCart = (product: CartProduct) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + product.quantity,
              }
            : item
        );
      }

      return [...previousItems, product];
    });
  };

  // REMOVE
  const removeFromCart = (id: string) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("neos7_cart");
  };

  // CART COUNT
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // CART TOTAL
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// USE CART
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}