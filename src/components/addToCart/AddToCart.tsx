"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Loader, ShoppingCartIcon } from "lucide-react"
import toast from "react-hot-toast"

const TEMP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w"

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function addProductToCart() {
    try {
      setIsLoading(true)

      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: TEMP_TOKEN,
          },
          body: JSON.stringify({ productId }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product")
      }

      toast.success("Product Added To Cart Successfully 🛒")
      console.log(data)
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={addProductToCart}
      className="grow"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <ShoppingCartIcon />
      )}
      Add To Cart
    </Button>
  )
}
