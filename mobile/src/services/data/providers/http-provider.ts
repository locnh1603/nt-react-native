import {apiService} from '../../api-service';
import type {IDataService} from '../contracts';
import type {AuthResponse, LoginRequest, SignupRequest} from '../../../models/auth';
import type {
  AddReviewRequest,
  CreateProductRequest,
  Product,
  Review,
  UpdateProductRequest,
} from '../../../models/product';
import type {
  CreateOrderPayload,
  Order,
  PaymentMethod,
  UpdateOrderStatusPayload,
} from '../../../models/order';
import type {
  ChangeRolePayload,
  UpdateUserPayload,
  UserProfile,
} from '../../../models/user';

export class HttpDataProvider implements IDataService {
  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiService.login(credentials);
  }

  public async signup(userData: SignupRequest): Promise<AuthResponse> {
    return apiService.signup(userData);
  }

  public async logout(): Promise<void> {
    return apiService.logout();
  }

  public async getUserProfile(): Promise<UserProfile> {
    return apiService.getUserProfile();
  }

  public async updateUserProfile(data: UpdateUserPayload): Promise<UserProfile> {
    return apiService.updateUserProfile(data);
  }

  public async getAllUsers(): Promise<UserProfile[]> {
    return apiService.getAllUsers();
  }

  public async changeUserRole(
    userId: number,
    data: ChangeRolePayload,
  ): Promise<UserProfile> {
    return apiService.changeUserRole(userId, data);
  }

  public async deleteUser(userId: number): Promise<void> {
    return apiService.deleteUser(userId);
  }

  public async getProducts(
    params?: {name?: string; priceUnit?: string},
  ): Promise<Product[]> {
    return apiService.getProducts(params);
  }

  public async getProductById(productId: number): Promise<Product> {
    return apiService.getProductById(productId);
  }

  public async createProduct(data: CreateProductRequest): Promise<Product> {
    return apiService.createProduct(data);
  }

  public async updateProduct(
    productId: number,
    data: UpdateProductRequest,
  ): Promise<Product> {
    return apiService.updateProduct(productId, data);
  }

  public async deleteProduct(productId: number): Promise<void> {
    return apiService.deleteProduct(productId);
  }

  public async getProductReviews(productId: number): Promise<Review[]> {
    return apiService.getProductReviews(productId);
  }

  public async addProductReview(
    productId: number,
    data: AddReviewRequest,
  ): Promise<Review> {
    return apiService.addProductReview(productId, data);
  }

  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    return apiService.getPaymentMethods();
  }

  public async createOrder(data: CreateOrderPayload): Promise<Order> {
    return apiService.createOrder(data);
  }

  public async getOrders(): Promise<Order[]> {
    return apiService.getOrders();
  }

  public async updateOrderStatus(
    orderId: number,
    data: UpdateOrderStatusPayload,
  ): Promise<Order> {
    return apiService.updateOrderStatus(orderId, data);
  }

  public async healthCheck(): Promise<boolean> {
    return apiService.healthCheck();
  }
}
