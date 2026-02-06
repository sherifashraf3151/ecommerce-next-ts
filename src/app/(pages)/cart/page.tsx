'use client'
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/CheckOut'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import { Loader, ShoppingCartIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Cart() {

  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext)
  const [removingId, setRemovingId] = useState<null | string>(null)
  const [updatingingId, setUpdatingingId] = useState<null | string>(null)
  const [isClearing, setIsClearing] = useState<boolean>(false)

  // This line To fix API issue product string
  useEffect(() => {
    if (
      cartData == null ||
      typeof cartData?.data?.products?.[0]?.product === "string"
    ) {
      getCart()
    }
  }, [cartData])



  // Remove Specific item from Cart Function
  async function removeCartItem(productId: string) {
    setRemovingId(productId)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'DELETE',
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w'
      }
    })
    const data: CartResponse = await response.json()
    console.log(data);

    if (data.status == 'success') {
      toast.success('Product Deleted')
      setCartData(data)
    }
    setRemovingId(null)
  }

  // Update Count Of items from The Same Product Function
  async function updateCartItem(productId: string, count: number) {

    // Remove The item if Equal Zero 
    if (count <= 0) {
      removeCartItem(productId)
    }

    setUpdatingingId(productId)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'PUT',
      body: JSON.stringify({ count }),
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w',
        'content-type': 'application/json'
      }
    })
    const data: CartResponse = await response.json()
    console.log(data);

    if (data.status == 'success') {
      toast.success('Product Quantity Updated')
      setCartData(data)
    }
    setUpdatingingId(null)
  }

  // Clear All Cart Function
  async function clearCart() {
    setIsClearing(true)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
      method: 'DELETE',
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w',
      }
    })
    const data: CartResponse = await response.json()
    console.log(data);

    if (data.message == 'success') {
      toast.success('Cart is Clear')
      setCartData(null)

    }
    setIsClearing(false)
  }



  return (

    <>
      {isLoading || typeof cartData?.data?.products?.[0]?.product === "string" ? <Loading /> : cartData?.numOfCartItems! > 0 ?
        // In Case Cart is Not Empaty
        <div className="container mx-auto py-6 px-4">

          <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">{cartData?.numOfCartItems} items in your cart</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">

            {/* Items Details */}
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data.products.map((item) =>
                <div key={item._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                  <Image src={item.product.imageCover} alt={item.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28 ' width={300} height={300} />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className='font-semibold text-base md:text-lg line-clamp-2'>{item.product.title}</h3>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {item.product.brand.name} - {item.product.category.name}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          {item.price} EGP
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button disabled={item.count == 1 || updatingingId == item.product.id || removingId == item.product.id} onClick={() => { updateCartItem(item.product.id, (item.count - 1)) }} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
                          -
                        </button>
                        <span className='w-6 text-center font-medium'>
                          {updatingingId == item.product.id ? <Loader className='animate-spin duration-200' /> : item.count}
                        </span>
                        <button disabled={updatingingId == item.product.id || removingId == item.product.id} onClick={() => { updateCartItem(item.product.id, (item.count + 1)) }} aria-label='increace' className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
                          +
                        </button>
                      </div>
                      <button disabled={removingId == item.product.id} onClick={() => removeCartItem(item.product.id)} aria-label='remove' className='text-sm cursor-pointer flex text-white items-center bg-red-500 p-2 rounded-xl gap-2 hover:scale-105 duration-200 disabled:opacity-60 disabled:hover:scale-100'>
                        {/* add Loader only when removingId == item.product.id Not in all items  */}
                        {removingId == item.product.id ? <Loader className='animate-spin duration-200' /> : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 sticky top-18">
              <div className="rounded-xl border p-5 shadow-sm">
                <h2 className='text-lg font-semibold'> Order Summary </h2>
                <div className="mt-4 space-y-2">

                  <div className="flex items-center justify-between">
                    <span className='text-sm text-muted-foreground'> Subtotal : {cartData?.numOfCartItems} items </span>
                    <span className='font-semibold'> {cartData?.data.totalCartPrice} EGP </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className='text-sm text-muted-foreground'>Shipping</span>
                    <span className='text-emerald-600 font-medium'>Free</span>
                  </div>
                </div>

                <div className="my-4 border-t pt-2">

                  <div className="flex items-center justify-between">
                    <span className='text-base font-semibold'>Total</span>
                    <span className='text-base font-bold'>{cartData?.data.totalCartPrice} EGP</span>
                  </div>
                  <CheckOut cartId={cartData?.cartId!} />
                  <Button className='w-full text-lg mt-2 cursor-pointer'> Continue Shopping </Button>
                </div>

                <Button onClick={() => { clearCart() }} variant={'outline'} className='mt-2 ms-auto text-destructive hover:text-destructive flex'> {isClearing ? <Loader className='animate-spin' /> : <Trash />} Clear Cart </Button>
              </div>

            </div>

          </div>
        </div>
        :
        // In Case Cart Is Empaty
        <div className="flex min-h-[75vh] items-center justify-center px-4">
          <div className="max-w-md text-center rounded-2xl border bg-card p-8 shadow-sm">

            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
              <ShoppingCartIcon className="size-10 text-muted-foreground" />
            </div>

            <h2 className="text-3xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 text-muted-foreground">
              You haven’t added any products yet.
              Start exploring and discover something you’ll love.
            </p>

            <Link href="/products" className="mt-6 inline-block w-full">
              <Button size="lg" className="w-full cursor-pointer">
                Browse Products
              </Button>
            </Link>

          </div>
        </div>


      }
    </>
  )
}
