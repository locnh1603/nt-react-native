import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL } from '@env';
import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  ApiErrorResponse,
} from '../models/auth';
import { UserProfile, UserProfileResponse } from '../models/user';
import { ProductListResponse, ProductResponse } from '../models/product';

class ApiService {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          this.clearToken();
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public clearToken(): void {
    this.token = null;
  }

  public getToken(): string | null {
    return this.token;
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
        credentials
      );

      if (response.data.data.token) {
        this.setToken(response.data.data.token);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>(
        '/signup',
        userData
      );

      if (response.data.data.token) {
        this.setToken(response.data.data.token);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.client.post('/logout');
      this.clearToken();
    } catch (error) {
      this.clearToken();
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.client.get<UserProfileResponse>('/user');

      if (!response.data.status) {
        throw new Error('Failed to fetch user profile');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getProducts(): Promise<ProductListResponse['data']> {
    try {
      const response = await this.client.get<ProductListResponse>('/product');

      if (!response.data.status) {
        throw new Error('Failed to fetch products');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error as AxiosError<ApiErrorResponse>);
    }
  }

  public async getProductById(productId: number): Promise<ProductResponse['data']> {
    try {
      const response = await this.client.get<ProductResponse>(
        `/product/${productId}`
      );

      if (!response.data.status) {
        throw new Error('Failed to fetch product');
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
