import axios, {AxiosInstance, AxiosError} from 'axios';
import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  ApiErrorResponse,
} from '../models/auth';
import {UserProfile, UserProfileResponse, UpdateUserPayload, ChangeRolePayload, UserListResponse} from '../models/user';
import {
  ProductListResponse,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
  ReviewListResponse,
  ReviewResponse,
  AddReviewRequest,
  Review,
  Product,
} from '../models/product';
import {
  Order,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  OrderResponse,
  OrderListResponse,
  PaymentMethodsResponse,
  PaymentMethod,
} from '../models/order';
import {getUserSession, refreshUserSessionExpiry} from './user-session';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://10.0.2.2:3000', // Replace with your actual API base URL
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.client.interceptors.request.use(
      async config => {
        const session = await getUserSession();
        if (session?.token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${session.token}`;
          await refreshUserSessionExpiry();
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      response => response,
      (error: AxiosError<ApiErrorResponse>) => {
        return Promise.reject(this.handleError(error));
      },
    );
  }

  private handleError(error: AxiosError<ApiErrorResponse>): Error {
    if (error.response) {
      const apiError = error.response.data.error;
      const errorMessage =
        typeof apiError === 'string'
          ? apiError
          : apiError?.message || 'An error occurred';
      return new Error(errorMessage);
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>(
        '/login',
        credentials,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>(
        '/signup',
        userData,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.client.post('/logout');
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.client.get<UserProfileResponse>('/user/');

      if (!response.data.status) {
        throw new Error('Failed to fetch user profile');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async updateUserProfile(data: UpdateUserPayload): Promise<UserProfile> {
    try {
      const response = await this.client.patch<UserProfileResponse>(
        '/user/',
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to update user profile');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getAllUsers(): Promise<UserProfile[]> {
    try {
      const response = await this.client.get<UserListResponse>('/user/all');

      if (!response.data.status) {
        throw new Error('Failed to fetch users');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async changeUserRole(
    userId: number,
    data: ChangeRolePayload,
  ): Promise<UserProfile> {
    try {
      const response = await this.client.patch<UserProfileResponse>(
        `/user/change-role/${userId}`,
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to change user role');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await this.client.delete(`/user/${userId}`);
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getProducts(
    params?: {name?: string; priceUnit?: string},
  ): Promise<ProductListResponse['data']> {
    try {
      const response = await this.client.get<ProductListResponse>(
        '/product/',
        {params},
      );

      if (!response.data.status) {
        throw new Error('Failed to fetch products');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getProductById(
    productId: number,
  ): Promise<ProductResponse['data']> {
    try {
      const response = await this.client.get<ProductResponse>(
        `/product/${productId}`,
      );

      if (!response.data.status) {
        throw new Error('Failed to fetch product');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async createProduct(
    data: CreateProductRequest,
  ): Promise<Product> {
    try {
      const response = await this.client.post<ProductResponse>(
        '/product/',
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to create product');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async updateProduct(
    productId: number,
    data: UpdateProductRequest,
  ): Promise<Product> {
    try {
      const response = await this.client.patch<ProductResponse>(
        `/product/${productId}`,
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to update product');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async deleteProduct(productId: number): Promise<void> {
    try {
      await this.client.delete(`/product/${productId}`);
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getProductReviews(productId: number): Promise<Review[]> {
    try {
      const response = await this.client.get<ReviewListResponse>(
        `/product/${productId}/review`,
      );

      if (!response.data.status) {
        throw new Error('Failed to fetch reviews');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async addProductReview(
    productId: number,
    data: AddReviewRequest,
  ): Promise<Review> {
    try {
      const response = await this.client.post<ReviewResponse>(
        `/product/${productId}/review`,
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to add review');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response =
        await this.client.get<PaymentMethodsResponse>('/order/payment-methods');

      if (!response.data.status) {
        throw new Error('Failed to fetch payment methods');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async createOrder(data: CreateOrderPayload): Promise<Order> {
    try {
      const response = await this.client.post<OrderResponse>('/order/', data);

      if (!response.data.status) {
        throw new Error('Failed to create order');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getOrders(): Promise<Order[]> {
    try {
      const response = await this.client.get<OrderListResponse>('/order/');

      if (!response.data.status) {
        throw new Error('Failed to fetch orders');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async updateOrderStatus(
    orderId: number,
    data: UpdateOrderStatusPayload,
  ): Promise<Order> {
    try {
      const response = await this.client.patch<OrderResponse>(
        `/order/${orderId}/status`,
        data,
      );

      if (!response.data.status) {
        throw new Error('Failed to update order status');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/');
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class type for testing
export type ApiServiceType = ApiService;
