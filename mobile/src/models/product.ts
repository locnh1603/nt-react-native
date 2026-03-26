export type PriceUnit = 'dollar' | 'euro' | 'inr';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit?: PriceUnit;
  image?: string;
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

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  image?: string;
  priceUnit?: PriceUnit;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;

export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  message: string;
}

export interface AddReviewRequest {
  rating: number;
  message: string;
}

export interface ReviewListResponse {
  status: boolean;
  data: Review[];
}

export interface ReviewResponse {
  status: boolean;
  data: Review;
}
