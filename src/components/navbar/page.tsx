'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShoppingCartIcon, UserIcon, MenuIcon, Loader } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export default function Navbar() {

  // Data Coming From Context in cartContext File
  const { cartData, isLoading } = useContext(CartContext)

  return (
    <nav className="bg-gray-200 text-xl font-semibold py-3 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* Brand */}
          <h1 className="text-2xl">
            <Link href="/">ShopMart</Link>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="flex gap-6">
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MenuIcon className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href="/products">
                    <DropdownMenuItem>Products</DropdownMenuItem>
                  </Link>
                  <Link href="/brands">
                    <DropdownMenuItem>Brands</DropdownMenuItem>
                  </Link>
                  <Link href="/categories">
                    <DropdownMenuItem>Categories</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserIcon className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href="/register">
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <div className="relative">
              <Link href="/cart">
                <ShoppingCartIcon className="h-6 w-6" />
                <Badge className="absolute -top-3 -end-3 h-5 min-w-5 rounded-full px-1 text-xs">
                  { isLoading ? <Loader className='animate-spin'/> : cartData?.numOfCartItems }
                </Badge>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}
