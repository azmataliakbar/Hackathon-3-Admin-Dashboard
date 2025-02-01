import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import Header1 from "../../components/Header1"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  stockLevel: number
  isFeaturedProduct: boolean
}

export default async function ProductPage() {
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
    }`

    const products: Product[] = await client.fetch(query)

    return (
      <>
        <Header1 />
        <div className="relative flex min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden rounded-lg">
          <main className="flex-1 p-4 z-10 overflow-auto">
            <div className="flex flex-col md:flex-row items-start justify-between mb-8 py-2">
              <h1 className="text-3xl md:text-5xl font-extrabold text-blue-500 mb-4 hover:text-green-500">Products</h1>
            </div>

            <div className="overflow-auto bg-white shadow-xl rounded-xl w-full">
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
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-100 transition-all">
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
                        <td className="p-2 md:p-4 font-bold text-gray-700">{product.name}</td>
                        <td className="p-2 md:p-4 font-bold text-green-600 hidden md:table-cell">
                          ${product.price.toFixed(2)}
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
                          <Link href={`/admin/item/${product.id}`}>
                            <span className="text-blue-600 hover:text-blue-800 font-semibold transition-all cursor-pointer">
                              View Details
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
        <h6 className="text-gray-300 text-center">Author: Azmat Ali</h6>
      </>
    )
  } catch (error) {
    console.error("Error fetching products:", error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">We are sorry, but there was an error fetching the products.</p>
          <p className="text-sm text-gray-500">Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    )
  }
}



