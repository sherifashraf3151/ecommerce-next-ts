import Image from "next/image"
import Link from "next/link"
import AddToCart from "@/components/addToCart/AddToCart"
import { HeartIcon } from "lucide-react"
import MyStar from "@/components/myStarIcon/page"

// Interfaces
interface ProductI {
  _id: string
  imageCover: string
  title: string
  category: { name: string }
  brand: { name: string }
  price: number
  ratingsAverage: number
}

interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}

// Main Home Page
export default async function Home() {
  // Fetch Products
  const productsRes = await fetch("https://ecommerce.routemisr.com/api/v1/products", { next: { revalidate: 120 } })
  const productsData = await productsRes.json()
  const products: ProductI[] = productsData.data

  // Fetch Categories
  const categoriesRes = await fetch("https://ecommerce.routemisr.com/api/v1/categories", { next: { revalidate: 300 } })
  const categoriesData = await categoriesRes.json()
  const categories: CategoryI[] = categoriesData.data

  return (
    <main className="w-full min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4 h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="w-full md:w-[70%] h-full relative overflow-hidden rounded-xl">
            <Image
              src="/images/slider-image-1.jpeg"
              alt="Hero Slide"
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-[30%] h-full hidden md:flex flex-col gap-4">
            <Image
              src="/images/slider-image-2.jpeg"
              alt="Featured 1"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <Image
              src="/images/slider-image-3.jpeg"
              alt="Featured 2"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-10 tracking-tight">
          Shop by Categories
        </h2>
        <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link key={category._id} href={`/categories/${category.slug}`}>
              <div className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-50 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-gray-900 font-semibold text-center">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-10 tracking-tight">
          Our Products
        </h2>
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer flex flex-col"
            >
              <Link href={`/products/${product._id}`} className="flex flex-col flex-1">
                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-blue-600 font-semibold">{product.brand.name}</p>
                    <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
                    <p className="text-gray-500">{product.category.name}</p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="font-bold text-gray-900">{product.price} EGP</p>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-700">{product.ratingsAverage}</span>
                      <MyStar/>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4 flex gap-3">
                <AddToCart productId={product._id} className="flex-1" />
                <HeartIcon className="w-6 h-6 text-gray-900 cursor-pointer hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
