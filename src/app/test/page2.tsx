import Image from "next/image";
import axios from "axios";

interface Product {
  id: string; // id is a string, as per the data you're receiving
  name: string;
  price: string; // price is returned as a string, not number
  imagePath: string; // Correct field name from the API response
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
}

const TestPage = async () => {
  try {
    const response = await axios.get<Product[]>("https://template-0-beta.vercel.app/api/product");
    const products = response.data;

    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Test API Fetching</h1>
        <p>Below are the products fetched from the API:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", justifyContent: "center" }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <Image
                src={product.imagePath} // Using the correct field for the image URL
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





