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
import { ShoppingCartIcon, UserIcon } from "lucide-react"


export default function Navbar() {
  return (
    <>
      <nav className="bg-amber-100 text-2xl font-semibold py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">

            {/* Brand Name */}
            <h1><Link href="/"> ShopMart </Link></h1>

            {/* Navigation Links */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="flex gap-2">

                  <NavigationMenuLink asChild>
                    <Link href="/products"> Products </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/brands"> Brands </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/categories"> Categories </Link>
                  </NavigationMenuLink>



                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* User Account Dropdown */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger> <UserIcon /></DropdownMenuTrigger>
                <DropdownMenuContent>

                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile"> <DropdownMenuItem> Profile </DropdownMenuItem> </Link>
                  <Link href="/login"> <DropdownMenuItem> Login </DropdownMenuItem> </Link>
                  <Link href="/register"> <DropdownMenuItem> Register </DropdownMenuItem> </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500"> Logout </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>

              {/* Shopping Cart */}
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono tabular-nums">3</Badge>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </nav>
    </>
  )
}
