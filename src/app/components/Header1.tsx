"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    // Perform sign-out logic here (e.g., clear local storage, redirect to login page)
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <div className="mb-4">
      <header className="bg-gray-200 relative rounded-lg">
        <div className="container mx-auto py-4 flex justify-between items-center">
          {/* Header Title */}
          <div className="flex gap-8 lg:gap-4 items-center">
            <Link href="/admin/dashboard">
              <div>
                <Image
                  src="/hhf1.png"
                  alt="Logo Shopping"
                  width={100}
                  height={100}
                  className="hover:scale-110 ml-6 rounded-full"
                />
              </div>
            </Link>

            <Link href="/admin/dashboard">
              <div>
                <h2 className="text-sm lg:text-2xl mt-1 lg:mt-2 text-yellow-600 hover:text-yellow-800 font-bold text-bg-yellow-100 hover:scale-y-150">
                  Heaven Hills Furniture
                </h2>
              </div>
            </Link>
          </div>

          {/* Hamburger Button for Mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
            title="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navigation for large screens */}
          <nav className="hidden lg:flex gap-6 pr-8">
            <Link
              href="/admin/dashboard"
              className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline hover:scale-125"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline hover:scale-125"
            >
              Product
            </Link>
            <Link
              href="/admin/categories"
              className="text-green-600 hover:text-orange-500 font-bold text-xl hover:underline hover:scale-125"
            >
              Catogory
            </Link>
            <Link
              href="/admin/customers"
              className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline hover:scale-125"
            >
              Customer
            </Link>
            <Link
              href="/admin/orders"
              className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline hover:scale-125"
            >
              Order
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-200 rounded-b-lg">
            <nav className="flex flex-col gap-4 p-4">
              <Link
                href="/admin/dashboard"
                className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline"
              >
                Product
              </Link>
              <Link
                href="/admin/categories"
                className="text-green-600 hover:text-orange-500 font-bold text-xl hover:underline"
              >
                Catogory
              </Link>
              <Link
                href="/admin/customers"
                className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline"
              >
                Customer
              </Link>
              <Link
                href="/admin/orders"
                className="text-green-600 hover:text-orange-500 text-xl font-bold hover:underline"
              >
                Order
              </Link>
              {/* Sign Out Button for Mobile */}
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-800 text-xl font-bold hover:underline text-left"
              >
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}