
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

// استقبال params من Next.js
// params فيها القيم الديناميك اللي جاية من الـ URL
export default async function ProductDetails({ params }: { params: Params }) {

  // استخراج productId من params
  // مثال: /products/123 => productId = "123"
  const { productId } = await params;

  // Get The Data From The API in Variable (response)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)

  // Parse The Response To JSON Format in Variable {data} To destructure it
  // { data: Product } Use data as Product
  // {data} type is ProductI
  const { data: product }: { data: ProductI } = await response.json();

  return (
    <>
      <Card className="grid md:grid-cols-2 items-center w-3/4 lg:w-1/2 my-8 mx-auto">

        <div>
          <ProductSlider images={product.images} altContent={product.title} />
        </div>

        <div>
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription>{product.category.name}</CardDescription>
            <div className="flex gap-1">
              <MyStar />
              <MyStar />
              <MyStar />
              <MyStar />
              <MyStar />
              <p> ( {product.ratingsQuantity} ) </p>
            </div>
            <div className="mt-3 flex justify-between">
              <p className="font-bold">{product.price} EGP</p>
              <p className="font-bold">Quantity: {product.quantity}</p>
            </div>
          </CardContent>

          <CardFooter className="gap-2 mt-3">
            {/* Send Product id To Choose him And Send it To backend */}
            <AddToCart productId={product.id} />
            <HeartIcon />
          </CardFooter>
        </div>

      </Card>
    </>
  )
}
