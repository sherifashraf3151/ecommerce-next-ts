"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { CartContext } from '../context/cartContext';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w

// productId is Props Coming From ProductId and Proucts Page To Know Which Product to Add to Cart
export default function AddToCart({ productId }: { productId: string }) {

  const { getCart, setCartData } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart() {
    setIsLoading(true);
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
      method: 'POST',
      // JSON Because The API Accept JSON Format
      body: JSON.stringify({ productId }),
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w',
        // Make Sure The Body Is JSON Format
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    data.status == 'success' && toast.success('Product Added To Cart');
    // await getCart()
    setCartData(data)
    setIsLoading(false);
  }


  return (
    <Button onClick={addProductToCart} className="grow"> {isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />} Add To Cart</Button>
  )
}
