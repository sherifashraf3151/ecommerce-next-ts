import { BrandI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';

export default async function page({ params }: { params: Params }) {


  // استخراج productId من params
  // مثال: /products/123 => productId = "123"
  const { brandId } = await params;

  // Get The Data From The API in Variable (response)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands/' + brandId)

  // Parse The Response To JSON Format in Variable {data} To destructure it
  // { data: Product } Use data as Product
  // {data} type is ProductI
  const { data: brand }: { data: BrandI } = await response.json();

  return (
    <div>{brand.name}</div>
  )
}
