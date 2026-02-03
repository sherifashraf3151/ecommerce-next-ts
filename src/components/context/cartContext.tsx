'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

// Create a context for the cart
// We Make All This init Values And Types Because TS
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
// This component will wrap parts of the app that need access to the cart context
// ReactNode is used to type the children prop
export default function CartContextProvider({ children }: { children: ReactNode }) {

  const [cartData, setCartData] = useState<CartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getCart() {

    setIsLoading(true)

    // Logic to get the cart data
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w"
      }
    });
    const data: CartResponse = await response.json();
    setCartData(data)
    console.log(data);
    setIsLoading(false)
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

