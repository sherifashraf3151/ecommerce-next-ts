"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { CartContext } from '../context/cartContext';

interface AddToCartProps {
  productId: string;
  className?: string; // <-- هنا ضفنا className اختياري
}

export default function AddToCart({ productId, className }: AddToCartProps) {

  const { getCart, setCartData } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart() {
    setIsLoading(true);
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      if (data.status === 'success') toast.success('Product Added To Cart');
      setCartData(data)
    } catch (error) {
      toast.error('Failed to add product')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={addProductToCart}
      className={`grow cursor-pointer ${className || ""}`} // <-- دمج className الممرر
    >
      {isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />}
      Add To Cart
    </Button>
  )
}
