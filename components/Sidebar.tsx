"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, ListTree, Users, ShoppingCart, LogOut } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ListTree, label: "Categories", href: "/admin/categories" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  return (
    <div className="w-64 h-screen bg-black text-white  fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-3xl text-white hover:text-yellow-300 font-bold">Heaven Hills Furniture</h1>
      </div>

      <nav className="mt-6 font-bold text-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-300 hover:text-green-500   ${
                pathname === item.href ? "bg-gray-800" : ""
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          )
        })}

        <button onClick={handleLogout} className="flex items-center px-6 py-3 text-fuchsia-400 hover:text-orange-400  w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  )
}

