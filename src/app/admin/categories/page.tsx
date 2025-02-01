"use client";
import Header1 from "../../components/Header1";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description: string;
  discountPercentage: number;
  stockLevel: number;
  isFeaturedProduct: boolean;
  colors?: string[];
}

const Category = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryWiseProducts, setCategoryWiseProducts] = useState<{
    [key: string]: Product[];
  }>({});

  const categories = useMemo(
    () => ["bed", "chair", "sofa", "table", "uncategorized"],
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

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
          colors
        }`;

        const result = await client.fetch(query);

        if (!result || !Array.isArray(result)) {
          throw new Error("Invalid response format from Sanity");
        }

        const normalizedProducts = result.map((product) => ({
          ...product,
          category: (product.category || "uncategorized").toLowerCase(),
          price: Number(product.price) || 0,
        }));

        setProducts(normalizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch products"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryProducts: { [key: string]: Product[] } = {};
    categories.forEach((category) => {
      categoryProducts[category] = [];
    });

    products.forEach((product) => {
      const productCategory = (product.category || "uncategorized").toLowerCase();
      const matchingCategory = categories.find(
        (cat) => cat.toLowerCase() === productCategory
      );

      if (matchingCategory) {
        categoryProducts[matchingCategory].push(product);
      } else {
        categoryProducts["uncategorized"].push(product);
      }
    });

    setCategoryWiseProducts(categoryProducts);
  }, [products, categories]);

  const handleProductClick = (productId: string) => {
    router.push(`/admin/item/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-red-600 text-xl font-bold">Error Loading Products</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header1 />
      <div className="w-full min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="w-full p-4 md:p-8">
          <div className="max-w-full mx-auto space-y-8">
            <div className="flex flex-col justify-between items-start">
              <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-blue-500 mb-4 hover:text-green-500">
                Categories
              </h1>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-lg p-4 md:p-6"
                >
                  <h2 className="text-xl md:text-3xl font-extrabold text-gray-700 mb-4 capitalize">
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {categoryWiseProducts[category]?.length > 0 ? (
                      categoryWiseProducts[category].map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow"
                        >
                          <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border border-gray-200 relative flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-base md:text-lg font-semibold text-gray-700">
                              {product.name}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                            <span className="text-base md:text-lg font-bold text-indigo-600">
                              $ {product.price.toLocaleString()}
                            </span>
                            <Button
                              onClick={() => handleProductClick(product.id)}
                              variant="outline"
                              className="text-green-500 font-bold hover:bg-green-50 min-w-[120px]"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No products available in this category.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h6 className="text-gray-300 text-center">Author: Azmat Ali</h6>
    </>
  );
};

export default Category;
