import { BrandI } from '@/interfaces/brand'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { next: { revalidate: 300 } }
  )
  const { data: categories }: { data: CategoryI[] } = await response.json()

  return (
    <div className="container mx-auto px-6 md:px-10 py-12">
      
      {/* عنوان الصفحة */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center tracking-tight">
        Shop by Category
      </h1>

      {/* Grid Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories?.map((category) => (
          <Link key={category._id} href={`/categories/${category.slug}`}>
            <div className="flex flex-col items-center rounded-2xl border border-gray-200 p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              
              {/* صورة دائرية */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-50 flex items-center justify-center p-3 mb-4 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* اسم الكاتيجوري */}
              <h2 className="text-gray-900 font-semibold text-lg md:text-xl text-center transition-colors duration-300 group-hover:text-gray-700">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
