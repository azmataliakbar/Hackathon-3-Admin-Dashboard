// src/app/admin/dashboard/page.tsx

"use client";
import Link from "next/link";
import Header1 from "../../components/Header1";

export default function DashboardPage() {
  return (
    <>
      {/* Navbar */}
      <Header1 />

      {/* Main Content */}
      <div className="space-y-4 md:space-y-8 p-4 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl md:text-5xl font-extrabold text-red-500 hover:text-blue-500">
            Dashboard
          </h1>
          <Link href="/admin/products">
            <button className="px-3 py-1 md:px-4 md:py-2 text-base md:text-lg font-bold bg-green-500 text-white rounded-md hover:bg-orange-500">
              View Products
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow hover:bg-gray-200">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Total Inventory Value
            </h2>
            <p className="text-2xl md:text-4xl font-bold text-green-500">
              $ 411,470
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow hover:bg-gray-200">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Total Stock Items
            </h2>
            <p className="text-2xl md:text-4xl font-bold text-blue-500">500</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-2xl md:text-4xl text-fuchsia-500 font-bold mb-4">
            Categories
          </h2>
          <div className="space-y-2 md:space-y-4">
            {[
              { name: "Bed", value: 36100 },
              { name: "Chair", value: 149260 },
              { name: "Sofa", value: 75960 },
              { name: "Table", value: 30150 },
              { name: "Uncategorized", value: 120000 },
            ].map((category) => (
              <div
                key={category.name}
                className="flex justify-between items-center p-2 md:p-3 bg-gray-100 rounded hover:bg-gray-200"
              >
                <span className="font-bold text-green-500 text-lg md:text-2xl">
                  {category.name}
                </span>
                <span className="text-red-500 text-lg md:text-2xl font-bold">
                  $ {category.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <h6 className="text-gray-300 text-center mt-4 md:mt-8">
        Author: Azmat Ali
      </h6>
    </>
  );
}
