/**
 * Represents a product from the Fake Store API.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
};

