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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4">
      {Array.isArray(products) && products.map((product) => (
        <Card className="" key={product.id}>
          {/* Link Around The Product Card With Out Footer To Navigate The User Product Details Page */}
          <Link href={`/products/${product.id}`}>

            {/* Product Image */}
            <Image src={product.imageCover} className="w-full object-cover" alt={product.title} height={300} width={300} />

            {/* Card Heading */}
            <CardHeader>
              <CardDescription>{product.brand.name}</CardDescription>
              {/* split(" ", 2).join(" ") To Make All Names Two Words Only */}
              <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
              <CardDescription>{product.category.name}</CardDescription>
            </CardHeader>

            <CardContent>

              <div className="flex justify-between">
                {/* Rating Part */}
                <div className="flex  gap-2 items-center justifty-center">
                  <MyStar />
                  <p>{product.ratingsAverage}</p>
                </div>

                {/* Price Part */}
                <p className="font-bold"> {product.price} EGP </p>
              </div>

            </CardContent>

          </Link>
          {/* Add To Cart & Fav */}
          <CardFooter className="gap-2 mt-3">
            <AddToCart productId={product.id} />
            <HeartIcon />
          </CardFooter>

        </Card>
      ))}
    </div>
  )
}




