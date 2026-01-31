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
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default async function Products() {

  // Get The Data From The API in Variable (response)
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')

  // Parse The Response To JSON Format in Variable {data} To destructure it
  // {data: ProductI[]} it`s a Ts interFace From interfaces File
  // {data:products } To use data as products Variable
  const { data: products }: { data: ProductI[] } = await response.json()

  console.log(products);


  return (
    <>
      {/* Responsive Div From Tailwind */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4">

        {/* Products Loop From API */}
        {products.map((product) => <div key={product.id}>

          <Card className="">
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
                  <div className="flex">
                    <MyStar />
                    <MyStar />
                    <MyStar />
                    <MyStar />
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
              <Button className="grow"> <ShoppingCartIcon /> Add To Cart</Button>
              <HeartIcon />
            </CardFooter>

          </Card>
        </div>
        )}
      </div>

    </>
  )
}
