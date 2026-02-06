import { ProductI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import MyStar from "@/components/myStarIcon/page";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/addToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { next: { revalidate: 120 } }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const json = await response.json()
  const products: ProductI[] = json.data

  return (
    <div className="container mx-auto px-4 md:px-10 py-12">
      
      {/* الصفحة الرئيسية Our Products */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center tracking-tight">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(products) && products.slice().reverse().map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-lg bg-white flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300">

            {/* Link حول الصورة والعنوان */}
            <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
              {/* صورة المنتج */}
              <div className="w-full aspect-square relative overflow-hidden rounded-t-2xl">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* تفاصيل المنتج */}
              <CardHeader className="space-y-1 p-4 pt-3">
                <CardDescription className="text-blue-600 font-semibold text-sm">{product.brand.name}</CardDescription>
                <CardTitle className="text-lg font-bold text-gray-800">{product.title.split(" ", 2).join(" ")}</CardTitle>
                <CardDescription className="text-gray-500 text-sm">{product.category.name}</CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-1">
                <div className="flex justify-between items-center">
                  {/* التقييم */}
                  <div className="flex items-center gap-1">
                    <MyStar />
                    <p className="text-gray-700 font-medium text-sm">{product.ratingsAverage}</p>
                  </div>
                  {/* السعر */}
                  <p className="font-bold text-gray-900 text-sm md:text-base">{product.price} EGP</p>
                </div>
              </CardContent>
            </Link>

            {/* AddToCart + Heart */}
            <CardFooter className="flex gap-4 p-4 pt-2">
              <AddToCart productId={product.id} className="flex-1" />
              <HeartIcon className="w-6 h-6 text-gray-800 cursor-pointer transition-transform hover:scale-110 hover:text-red-500" />
            </CardFooter>

          </Card>
        ))}
      </div>
    </div>
  )
}
