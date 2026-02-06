import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MyStar from "@/components/myStarIcon/page";
import { HeartIcon } from "lucide-react";
import ProductSlider from "@/components/productSlider/ProductSlider";
import AddToCart from "@/components/addToCart/AddToCart";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function ProductDetails({ params }: { params: Params }) {

  const { productId } = await params;

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId, { next: { revalidate: 120 } })
  const { data: product }: { data: ProductI } = await response.json();

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12 px-4">
      <Card className="grid md:grid-cols-2 gap-8 items-start w-full max-w-5xl p-6 rounded-2xl shadow-2xl bg-white">

        {/* Slider للصور الرئيسية */}
        <div className="flex justify-center md:order-1">
          <ProductSlider
            images={product.images}
            altContent={product.title}
          />
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col justify-between md:order-2">
          <CardHeader className="space-y-2">
            <CardDescription className="text-blue-600 font-semibold">{product.brand.name}</CardDescription>
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-gray-800">{product.title}</CardTitle>
            <CardDescription className="text-gray-600">{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <CardDescription className="text-gray-500">{product.category.name}</CardDescription>

            <div className="flex items-center gap-2">
              <MyStar />
              <p className="font-medium text-gray-700">{product.ratingsAverage}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-xl text-gray-900">{product.price} EGP</p>
              <p className="font-semibold text-gray-700">Quantity: {product.quantity}</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col md:flex-col gap-4 mt-6">
            {/* AddToCart + Heart */}
            <div className="flex gap-4 items-center w-full">
              <AddToCart productId={product.id} className="flex-1" />
              <HeartIcon className="w-8 h-8 text-black cursor-pointer transition-transform hover:scale-110" />
            </div>


            {/* Gallery للصور الإضافية على الشاشات الكبيرة */}
            <div className="hidden md:grid md:grid-cols-4 gap-3 mt-4">
              {product.images.map((img, index) => (
                <Image
                  width={300}
                  height={300}
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-36 object-cover rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </CardFooter>
        </div>

      </Card>
    </div>
  )
}
