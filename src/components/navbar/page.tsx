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
import { ShoppingCartIcon, UserIcon, MenuIcon, Loader2 } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export default function Navbar() {
  const { cartData, isLoading } = useContext(CartContext)

  return (
    <nav className="bg-white shadow-md font-sans fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">

          {/* Brand */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-serif tracking-tight hover:text-gray-600 transition-colors">
              <Link href="/">NextBuy</Link>
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 text-gray-700">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-6">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">

            {/* Search Bar (Optional, Elegant) */}
            <div className="hidden md:flex">
              <input
                type="text"
                placeholder="Search products..."
                className="border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition"
              />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MenuIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-gray-800 shadow-lg rounded-md">
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
                <UserIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition-colors" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-gray-800 shadow-lg rounded-md w-44">
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
                <DropdownMenuItem className="text-red-500 hover:bg-red-50">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <div className="relative group">
              <Link
                href="/cart"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 transition-colors relative"
              >
                <ShoppingCartIcon className="h-5 w-5 text-gray-700 hover:text-gray-900 transition-colors" />
                <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 text-xs bg-gray-800 text-white flex items-center justify-center">
                  { isLoading ? <Loader2 className='animate-spin h-4 w-4'/> : cartData?.numOfCartItems }
                </Badge>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}
