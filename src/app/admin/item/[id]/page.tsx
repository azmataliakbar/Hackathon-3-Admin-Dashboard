"use client"

import Header1 from '../../../components/Header1';
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  slug: string
  description: string
  discountPercentage: number
  stockLevel: number
  isFeaturedProduct: boolean
  colors?: string[]
}

export default function ItemDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const query = `*[_type == "product" && id == $id][0] {
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
          colors
        }`

        const result = await client.fetch(query, { id: params.id })

        if (!result) {
          throw new Error("Item not found")
        }

        setProduct(result)
      } catch (error) {
        console.error("Error fetching item:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch item")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Item</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error || "Item not found"}</p>
            <Button onClick={() => router.back()} variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price

  return (
    <>
            <Header1 />
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.back()} variant="outline" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Items
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Item Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
          <Image src={product.image || "/placeholder.jpg"} alt={product.name} fill className="object-cover" priority />
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
                {product.category || "Uncategorized"}
              </span>
              {product.isFeaturedProduct && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-600">$ {discountedPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500 line-through">$ {product.price.toFixed(2)}</span>
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Item Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Stock Level</p>
                <p className="font-semibold">{product.stockLevel}</p>
              </div>
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-gray-500">Available Colors</p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


