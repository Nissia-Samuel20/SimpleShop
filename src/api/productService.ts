export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[];
  category?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_URL = 'https://dummyjson.com/products';


const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "Volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting formula.",
    category: "beauty",
    price: 9.99,
    rating: 4.56,
    stock: 99,
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.webp",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "Versatile range of eyeshadow shades for creating stunning eye looks.",
    category: "beauty",
    price: 19.99,
    rating: 3.86,
    stock: 34,
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.webp",
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "Finely milled setting powder designed to set makeup and control shine.",
    category: "beauty",
    price: 14.99,
    rating: 4.64,
    stock: 89,
    thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.webp",
  },
  {
    id: 4,
    title: "Red Lipstick",
    description: "Classic and bold choice for adding a pop of color. Creamy and pigmented formula.",
    category: "beauty",
    price: 12.99,
    rating: 4.36,
    stock: 91,
    thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.webp",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    description: "Rich and glossy red hue for vibrant and polished nails with quick-drying formula.",
    category: "beauty",
    price: 8.99,
    rating: 4.32,
    stock: 79,
    thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.webp",
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    description: "Classic unisex fragrance, known for its fresh and clean scent. Versatile for everyday wear.",
    category: "fragrances",
    price: 49.99,
    rating: 4.37,
    stock: 29,
    thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.webp",
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    description: "Elegant and mysterious fragrance with grapefruit, rose, and sandalwood notes.",
    category: "fragrances",
    price: 129.99,
    rating: 4.26,
    stock: 58,
    thumbnail: "https://cdn.dummyjson.com/product-images/7/thumbnail.webp",
  },
  {
    id: 8,
    title: "Dior J'adore",
    description: "Luxurious floral fragrance blending ylang-ylang, rose, and jasmine.",
    category: "fragrances",
    price: 89.99,
    rating: 3.8,
    stock: 98,
    thumbnail: "https://cdn.dummyjson.com/product-images/8/thumbnail.webp",
  },
  {
    id: 9,
    title: "Samsung 49-Inch CHG90",
    description: "Super ultrawide gaming monitor with 144Hz refresh rate.",
    category: "electronics",
    price: 999.99,
    rating: 4.5,
    stock: 15,
    thumbnail: "https://cdn.dummyjson.com/product-images/9/thumbnail.webp",
  },
  {
    id: 10,
    title: "Apple AirPods Pro",
    description: "Wireless earbuds with active noise cancellation and spatial audio.",
    category: "electronics",
    price: 199.99,
    rating: 4.7,
    stock: 45,
    thumbnail: "https://cdn.dummyjson.com/product-images/10/thumbnail.webp",
  },
];

const FALLBACK_API_URL = 'https://api.example.com/products'; 

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const url = `${API_URL}?limit=100`;
      console.log('📡 Fetching products from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'SimpleShop/1.0',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: ProductResponse = await response.json();
      console.log('Fetched', data.products?.length || 0, 'products from API');
      return data.products || [];
    } catch (error) {
      console.warn('Network error, using mock data:', error);
      
      return MOCK_PRODUCTS;
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const url = `${API_URL}/search?q=${query}`;
      console.log(' Searching:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data: ProductResponse = await response.json();
      return data.products || [];
    } catch (error) {
      console.warn('Search error, searching mock data:', error);
      
      return MOCK_PRODUCTS.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  async getProductById(id: number): Promise<Product> {
    try {
      const url = `${API_URL}/${id}`;
      console.log('Fetching product:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn('Product fetch error, using mock data:', error);
      
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      if (product) return product;
      throw new Error('Product not found');
    }
  },
};
