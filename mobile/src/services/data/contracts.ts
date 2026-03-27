import type {AuthResponse, LoginRequest, SignupRequest} from '../../models/auth';
import type {
  AddReviewRequest,
  CreateProductRequest,
  Product,
  Review,
  UpdateProductRequest,
} from '../../models/product';
import type {
  CreateOrderPayload,
  Order,
  PaymentMethod,
  UpdateOrderStatusPayload,
} from '../../models/order';
import type {
  ChangeRolePayload,
  UpdateUserPayload,
  UserProfile,
} from '../../models/user';

export interface IDataService {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  signup(userData: SignupRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  getUserProfile(): Promise<UserProfile>;
  updateUserProfile(data: UpdateUserPayload): Promise<UserProfile>;
  getAllUsers(): Promise<UserProfile[]>;
  changeUserRole(userId: number, data: ChangeRolePayload): Promise<UserProfile>;
  deleteUser(userId: number): Promise<void>;
  getProducts(params?: {name?: string; priceUnit?: string}): Promise<Product[]>;
  getProductById(productId: number): Promise<Product>;
  createProduct(data: CreateProductRequest): Promise<Product>;
  updateProduct(productId: number, data: UpdateProductRequest): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
  getProductReviews(productId: number): Promise<Review[]>;
  addProductReview(productId: number, data: AddReviewRequest): Promise<Review>;
  getPaymentMethods(): Promise<PaymentMethod[]>;
  createOrder(data: CreateOrderPayload): Promise<Order>;
  getOrders(): Promise<Order[]>;
  updateOrderStatus(orderId: number, data: UpdateOrderStatusPayload): Promise<Order>;
  healthCheck(): Promise<boolean>;
}
