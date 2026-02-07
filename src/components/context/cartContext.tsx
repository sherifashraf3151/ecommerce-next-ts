'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

// Create a context for the cart
export const CartContext = createContext<{
  cartData: CartResponse | null,
  setCartData: (value: CartResponse | null) => void,
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
  getCart: () => void
}>({
  cartData: null,
  setCartData: () => { },
  isLoading: false,
  setIsLoading: () => { },
  getCart: () => { }
});

// Create a provider component
export default function CartContextProvider({ children }: { children: ReactNode }) {

  const [cartData, setCartData] = useState<CartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getCart() {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/get-cart');
      const data: CartResponse = await response.json();
      setCartData(data)
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
