/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { safeParse } from "../utils/format";
import products from "../data/products";

const CART_KEY = "enu_cart";
const CartContext = createContext(null);

function readCart() {
  try {
    const stored = safeParse(localStorage.getItem(CART_KEY), []);
    if (!Array.isArray(stored)) return [];
    return stored
      .map(({ id, quantity }) => {
        const product = products.find((p) => p.id === id);
        return product && quantity > 0 ? { ...product, quantity: Math.floor(quantity) } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readCart);

  useEffect(() => {
    try {
      // Images are bundled assets, so only store what we need to rebuild the item.
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems.map(({ id, quantity }) => ({ id, quantity }))));
    } catch {
      /* storage unavailable — cart still works for this session */
    }
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = useMemo(() => cartItems.reduce((n, i) => n + i.quantity, 0), [cartItems]);

  const value = useMemo(
    () => ({ cartItems, cartCount, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }),
    [cartItems, cartCount, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
