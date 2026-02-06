'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"

export default function CheckOut({ cartId }: { cartId: string }) {

  const detailsInput = useRef<HTMLInputElement>(null)
  const cityInput = useRef<HTMLInputElement>(null)
  const phoneInput = useRef<HTMLInputElement>(null)

  async function checkOutSession() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      city: cityInput.current?.value,
      phone: phoneInput.current?.value,
    }

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w",
          "content-type": "application/json",
        },
      }
    )

    const data = await response.json()

    if (data.status === "success") {
      window.location.href = data.session.url
    }
  }

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="w-full text-lg mt-4">
          Proceed To Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e) => e.preventDefault()}>

          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Enter your shipping information
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </Field>

            <Field>
              <Label htmlFor="details">Address</Label>
              <Input ref={detailsInput} id="details" />
            </Field>

            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="button" onClick={checkOutSession}>
              Visa
            </Button>

            <Button type="button">
              Cash
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>

    </Dialog>
  )
}
