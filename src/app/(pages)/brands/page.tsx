import { BrandI } from '@/interfaces/brand'
import Image from 'next/image'
import Link from 'next/link'

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', { next: { revalidate: 300 } })
  const { data: brands }: { data: BrandI[] } = await response.json()

  return (
    <div className="container mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 text-center">
        Our Brands
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 md:gap-8">
        {brands?.map((brand) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div className="flex flex-col items-center rounded-2xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              
              {/* Circular background for brand image */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-50 flex items-center justify-center p-4 mb-4 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Brand Name */}
              <h2 className="text-gray-900 font-semibold text-lg md:text-xl text-center transition-colors duration-300 group-hover:text-gray-700">
                {brand.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
