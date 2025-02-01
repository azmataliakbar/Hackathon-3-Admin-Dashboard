import Image from "next/image";
import {client} from "../../sanity/lib/client"; // Import the Sanity client

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
}

const TestPage = async () => {
  try {
    // GROQ query to fetch product data from Sanity
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

    // Fetch data from Sanity
    const products: Product[] = await client.fetch(query);

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Test API Fetching</h1>
        <p>Below are the products fetched from Sanity:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", justifyContent: "center" }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <Image
                src={product.image} // Using the correct field for the image URL
                alt={product.name}
                width={200}
                height={150}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." // Optional: Add a small blur image
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <p>Discount: {product.discountPercentage}%</p>
              <p>Stock: {product.stockLevel}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <h2 style={{ color: "red", textAlign: "center" }}>Failed to fetch products.</h2>;
  }
};

export default TestPage;
