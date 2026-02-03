'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'

export default function Cart() {

  const { cartData, isLoading, getCart } = useContext(CartContext)

  // This line To fix API issue product string
  typeof cartData?.data.products[0].product == 'string' && getCart()

  return (
    <>
      {isLoading || typeof cartData?.data.products[0].product == 'string' ? <Loading /> :
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
                        <button aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent'>
                          -
                        </button>
                        <span className='w-6 text-center font-medium'>
                          {item.count}
                        </span>
                        <button aria-label='increace' className='size-8 rounded-lg border hover:bg-accent'>
                          +
                        </button>
                      </div>
                      <button aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>
                        Remove
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

                  <Button className='w-full text-lg mt-4'> Proceed To Checkout </Button>
                  <Button className='w-full text-lg mt-2'> Continue Shopping </Button>
                </div>

                <Button variant={'outline'} className='mt-2 ms-auto text-destructive hover:text-destructive flex'> <Trash /> Clear Cart </Button>
              </div>

            </div>

          </div>
        </div>
      }
    </>
  )
}
