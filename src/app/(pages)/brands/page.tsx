import MyStar from '@/components/myStarIcon/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandI } from '@/interfaces/brand'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Brands() {

  // Get The Data From The API in Variable (response)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands',
    { next: { revalidate: 300 } })

  // Parse The Response To JSON Format in Variable {data} To destructure it
  // {data: BrandI[]} it`s a Ts interFace From interfaces File
  // {data:brands } To use data as brands Variable
  const { data: brands }: { data: BrandI[] } = await response.json()

  console.log(brands);

  return (
    <div className="container mx-auto px-10">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 my-10">
        {brands?.map((brand) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div className=" flex flex-col shadow-lg items-center rounded-2xl border border-[#e0e0e0] p-5 cursor-pointer">
              <div className="group w-25 h-25 bg-[#f9fafb] rounded-full p-4">
                <Image src={brand.image} alt="Brand Image" className="w-full h-full object-contain group-hover:scale-[1.1] transition-all duration-300" width={300} height={300} />
              </div>
              <h2 className="text-[#212121] font-semibold text-[18px] mt-5">{brand.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
