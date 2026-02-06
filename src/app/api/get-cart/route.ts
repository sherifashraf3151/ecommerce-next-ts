import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  // Logic to get the cart data
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w"
    }
  });
  const data: CartResponse = await response.json();
  return NextResponse.json(data)
}