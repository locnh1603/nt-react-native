export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  status: boolean;
  data: Product[];
}

export interface ProductResponse {
  status: boolean;
  data: Product;
}

export interface ProductErrorResponse {
  status: boolean;
  error: {
    message?: string;
    [key: string]: any;
  };
}
