import MyStar from '@/components/myStarIcon/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandI } from '@/interfaces/brand'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Brands() {

  // Get The Data From The API in Variable (response)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')

  // Parse The Response To JSON Format in Variable {data} To destructure it
  // {data: BrandI[]} it`s a Ts interFace From interfaces File
  // {data:brands } To use data as brands Variable
  const { data: brands }: { data: BrandI[] } = await response.json()

  console.log(brands);

  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4">

      {brands?.map((brand) => <div key={brand._id}>

        <Card className="">
          {/* Link Around The brand Card With Out Footer To Navigate The User brand Details Page */}
          <Link href={`/brands/${brand._id}`}>

            {/* brand Image */}
            <Image src={brand.image} className="w-full object-cover" alt={brand.name} height={300} width={300} />

          </Link>


        </Card>
      </div>
      )}

    </Card>
  )
}
