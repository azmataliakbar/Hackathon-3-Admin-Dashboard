// src/app/admin/products/page.tsx

"use client";
import Header1 from "../../components/Header1";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/components/interface";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          id,
          name,
          "slug": slug.current,
          description,
          price,
          discountPercentage,
          "image": image.asset->url,
          category,
          stockLevel,
          isFeaturedProduct,
          colors,
        }`;
        const result = await client.fetch(query);
        console.log("Fetched products:", result); // Debugging log
        setProducts(result);
        setFilteredProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error); // Debugging log
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.colors?.join(", ") || "").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <>
      <Header1 />
      <div className="relative flex min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden rounded-lg">
        {/* Main Content */}
        <motion.main
          className="flex-1 p-4 z-10 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 py-2">
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold text-blue-500 mb-4 hover:text-green-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Products
            </motion.h1>
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Logout
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            className="mb-6 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products by bed / chair / sofa / table ..."
              className="w-full p-3 md:p-4 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>

          {/* Products Table */}
          <motion.div
            className="overflow-auto bg-white shadow-xl rounded-xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white">
                  <tr>
                    <th className="p-2 md:p-4 text-left">Image</th>
                    <th className="p-2 md:p-4 text-left">Name</th>
                    <th className="p-2 md:p-4 text-left hidden md:table-cell">Price</th>
                    <th className="p-2 md:p-4 text-left hidden md:table-cell">Category</th>
                    <th className="p-2 md:p-4 text-left hidden md:table-cell">Stock Level</th>
                    <th className="p-2 md:p-4 text-left hidden md:table-cell">Is Featured</th>
                    <th className="p-2 md:p-4 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        className="border-b hover:bg-gray-100 transition-all"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <td className="p-2 md:p-4">
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border border-gray-300 relative">
                            <Image
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td className="p-2 md:p-4 font-bold text-gray-700">
                          {product.name}
                        </td>
                        <td className="p-2 md:p-4 font-bold text-green-600 hidden md:table-cell">
                          ${product.price}
                        </td>
                        <td className="p-2 md:p-4 font-medium text-gray-700 hidden md:table-cell">
                          {product.category || "N/A"}
                        </td>
                        <td className="p-2 md:p-4 font-medium text-gray-700 hidden md:table-cell">
                          {product.stockLevel || "N/A"}
                        </td>
                        <td className="p-2 md:p-4 font-medium text-gray-700 hidden md:table-cell">
                          {product.isFeaturedProduct ? "Yes" : "No"}
                        </td>
                        <td className="p-2 md:p-4">
                          <Link href="/admin/categories">
                            <button
                              onClick={() => {
                                /* Add view details handler */
                              }}
                              className="text-blue-600 hover:text-blue-800 font-semibold transition-all"
                            >
                              View Details
                            </button>
                          </Link>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No products found.
                      </td>
                    </motion.tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.main>
      </div>
      <h6 className="text-gray-300 text-center">Author: Azmat Ali</h6>
    </>
  );
}