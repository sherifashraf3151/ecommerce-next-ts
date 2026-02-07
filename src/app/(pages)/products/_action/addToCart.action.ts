'use server'

export async function addToCartAction(productId : string) {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'POST',
    body: JSON.stringify({ productId }),
    headers: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2RjNGI5MzI2MzUwYmE3NTcyN2NiNCIsIm5hbWUiOiJTaGVyaWYgYXNocmFmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzAwNjE1MjAsImV4cCI6MTc3NzgzNzUyMH0.uxLQdBVV3_uuh9cTUxbH2tRtG6FSVgSNSiUJyCC0G0w',
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  return data
}