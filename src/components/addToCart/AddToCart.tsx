"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { CartContext } from '../context/cartContext';
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action';

interface AddToCartProps {
  productId: string;
  className?: string; // <-- هنا ضفنا className اختياري
}

export default function AddToCart({ productId, className }: AddToCartProps) {

  const { getCart, setCartData } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart() {
    setIsLoading(true);

    const data = await addToCartAction(productId)
    data.status === 'success' && toast.success('Product Added To Cart');
    setCartData(data)
    setIsLoading(false);
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
