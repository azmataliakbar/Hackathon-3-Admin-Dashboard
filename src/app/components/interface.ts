
export interface Product {
  id:string,
  name: string;
  slug: string;
  image: string;
  description: string;
  price: number | string;
  discountPercentage: number | string;
  category: string;
  stockLevel: number;
  isFeaturedProduct: boolean;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  
}
