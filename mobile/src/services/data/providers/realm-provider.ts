import Realm from 'realm';
import type {IDataService} from '../contracts';
import type {AuthResponse, LoginRequest, SignupRequest} from '../../../models/auth';
import type {
  AddReviewRequest,
  CreateProductRequest,
  Product,
  Review,
  UpdateProductRequest,
} from '../../../models/product';
import type {UserProfile} from '../../../models/user';
import type {UserRole} from '../../../models/user';
import type {
  ChangeRolePayload,
  UpdateUserPayload,
} from '../../../models/user';
import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
  PaymentMethod,
  UpdateOrderStatusPayload,
} from '../../../models/order';
import {getUserSession} from '../../user-session';
import {initializeRealm} from '../../storage/realm/realm-client';
import {
  mapOrderEntity,
  mapPaymentMethodEntity,
  mapProductEntity,
  mapReviewEntity,
  mapUserProfileEntity,
} from '../../storage/realm/mappers';
import {OrderEntity} from '../../storage/realm/schemas/Order.schema';
import {PaymentMethodEntity} from '../../storage/realm/schemas/PaymentMethod.schema';
import {ProductEntity} from '../../storage/realm/schemas/Product.schema';
import {ReviewEntity} from '../../storage/realm/schemas/Review.schema';
import {UserProfileEntity} from '../../storage/realm/schemas/UserProfile.schema';
import {
  getNextUserProfileId,
  getUserByUsername,
  isUsernameTaken,
  upsertUserProfile,
} from '../../storage/realm/seed';

const LOCAL_TOKEN_PREFIX = 'realm-local-token';
const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  'credit_card',
  'debit_card',
  'paypal',
  'cash_on_delivery',
];

const normalizeRole = (role?: string): UserRole => {
  return role === 'admin' ? 'admin' : 'user';
};

const getUserIdFromLocalToken = (token?: string): number | null => {
  if (!token || !token.startsWith(`${LOCAL_TOKEN_PREFIX}-`)) {
    return null;
  }

  const idSegment = token.slice(`${LOCAL_TOKEN_PREFIX}-`.length);
  const parsedId = Number.parseInt(idSegment, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
};

const getNextId = (
  values: {max: (field: string) => unknown},
  field: string,
): number => {
  const max = values.max(field);
  return max === null ? 1 : (max as number) + 1;
};

const ensurePaymentMethods = (realm: Realm): void => {
  const existing = realm.objects<PaymentMethodEntity>('PaymentMethod');
  if (existing.length > 0) {
    return;
  }

  realm.write(() => {
    DEFAULT_PAYMENT_METHODS.forEach(method => {
      realm.create(
        'PaymentMethod',
        {key: method},
        Realm.UpdateMode.Modified,
      );
    });
  });
};

const getCurrentUserId = async (realm: Realm): Promise<number> => {
  const session = await getUserSession();
  if (session?.user?.id) {
    return session.user.id;
  }

  const userIdFromToken = getUserIdFromLocalToken(session?.token);
  if (userIdFromToken !== null) {
    const tokenUser = realm.objectForPrimaryKey<UserProfileEntity>(
      'UserProfile',
      userIdFromToken,
    );

    if (tokenUser) {
      return tokenUser.id;
    }
  }

  const firstUser = realm.objects<UserProfileEntity>('UserProfile')[0];
  if (!firstUser) {
    throw new Error('User profile not found');
  }

  return firstUser.id;
};

export class RealmDataProvider implements IDataService {
  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const realm = await initializeRealm();
    const user = getUserByUsername(realm, credentials.username);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    return {
      status: true,
      data: {
        token: `${LOCAL_TOKEN_PREFIX}-${user.id}`,
      },
    };
  }

  public async signup(userData: SignupRequest): Promise<AuthResponse> {
    const realm = await initializeRealm();
    if (isUsernameTaken(realm, userData.username)) {
      throw new Error('Username already exists');
    }

    const nextId = getNextUserProfileId(realm);
    upsertUserProfile(realm, {
      id: nextId,
      username: userData.username,
      email: userData.email,
      age: userData.age,
      role: normalizeRole(userData.role),
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    return {
      status: true,
      data: {
        token: `${LOCAL_TOKEN_PREFIX}-${nextId}`,
      },
    };
  }

  public async logout(): Promise<void> {
    return;
  }

  public async getUserProfile(): Promise<UserProfile> {
    const realm = await initializeRealm();
    const userId = await getCurrentUserId(realm);
    const profile = realm.objectForPrimaryKey<UserProfileEntity>('UserProfile', userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    return mapUserProfileEntity(profile);
  }

  public async updateUserProfile(data: UpdateUserPayload): Promise<UserProfile> {
    const realm = await initializeRealm();
    const userId = await getCurrentUserId(realm);
    const existing = realm.objectForPrimaryKey<UserProfileEntity>('UserProfile', userId);

    if (!existing) {
      throw new Error('User profile not found');
    }

    realm.write(() => {
      if (typeof data.age === 'number') {
        existing.age = data.age;
      }
      if (typeof data.firstName === 'string') {
        existing.firstName = data.firstName;
      }
      if (typeof data.lastName === 'string') {
        existing.lastName = data.lastName;
      }
    });

    return mapUserProfileEntity(existing);
  }

  public async getAllUsers(): Promise<UserProfile[]> {
    const realm = await initializeRealm();
    const users = realm.objects<UserProfileEntity>('UserProfile').sorted('id');
    return users.map(mapUserProfileEntity);
  }

  public async changeUserRole(
    userId: number,
    data: ChangeRolePayload,
  ): Promise<UserProfile> {
    const realm = await initializeRealm();
    const user = realm.objectForPrimaryKey<UserProfileEntity>('UserProfile', userId);

    if (!user) {
      throw new Error('User not found');
    }

    realm.write(() => {
      user.role = normalizeRole(data.role);
    });

    return mapUserProfileEntity(user);
  }

  public async deleteUser(userId: number): Promise<void> {
    const realm = await initializeRealm();
    const user = realm.objectForPrimaryKey<UserProfileEntity>('UserProfile', userId);
    if (!user) {
      return;
    }

    realm.write(() => {
      realm.delete(user);
    });
  }

  public async getProducts(
    params?: {name?: string; priceUnit?: string},
  ): Promise<Product[]> {
    const realm = await initializeRealm();
    let products = realm.objects<ProductEntity>('Product').sorted('name');

    if (params?.name) {
      products = products.filtered('name CONTAINS[c] $0', params.name);
    }

    if (params?.priceUnit) {
      products = products.filtered('priceUnit == $0', params.priceUnit);
    }

    return products.map(mapProductEntity);
  }

  public async getProductById(productId: number): Promise<Product> {
    const realm = await initializeRealm();
    const product = realm.objectForPrimaryKey<ProductEntity>('Product', productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return mapProductEntity(product);
  }

  public async createProduct(data: CreateProductRequest): Promise<Product> {
    const realm = await initializeRealm();
    const nextId = getNextId(realm.objects<ProductEntity>('Product'), 'id');

    realm.write(() => {
      realm.create(
        'Product',
        {
          id: nextId,
          name: data.name,
          description: data.description,
          price: data.price,
          priceUnit: data.priceUnit,
          image: data.image,
        },
        Realm.UpdateMode.Modified,
      );
    });

    const created = realm.objectForPrimaryKey<ProductEntity>('Product', nextId);
    if (!created) {
      throw new Error('Failed to create product');
    }

    return mapProductEntity(created);
  }

  public async updateProduct(
    productId: number,
    data: UpdateProductRequest,
  ): Promise<Product> {
    const realm = await initializeRealm();
    const product = realm.objectForPrimaryKey<ProductEntity>('Product', productId);
    if (!product) {
      throw new Error('Product not found');
    }

    realm.write(() => {
      if (typeof data.name === 'string') {
        product.name = data.name;
      }
      if (typeof data.description === 'string') {
        product.description = data.description;
      }
      if (typeof data.price === 'number') {
        product.price = data.price;
      }
      if (typeof data.priceUnit === 'string') {
        product.priceUnit = data.priceUnit;
      }
      if (typeof data.image === 'string') {
        product.image = data.image;
      }
    });

    return mapProductEntity(product);
  }

  public async deleteProduct(productId: number): Promise<void> {
    const realm = await initializeRealm();
    const product = realm.objectForPrimaryKey<ProductEntity>('Product', productId);
    if (!product) {
      return;
    }

    realm.write(() => {
      realm.delete(product);
    });
  }

  public async getProductReviews(productId: number): Promise<Review[]> {
    const realm = await initializeRealm();
    const reviews = realm
      .objects<ReviewEntity>('Review')
      .filtered('productId == $0', productId)
      .sorted('id');
    return reviews.map(mapReviewEntity);
  }

  public async addProductReview(
    productId: number,
    data: AddReviewRequest,
  ): Promise<Review> {
    const realm = await initializeRealm();
    const userId = await getCurrentUserId(realm);
    const nextId = getNextId(realm.objects<ReviewEntity>('Review'), 'id');

    realm.write(() => {
      realm.create(
        'Review',
        {
          id: nextId,
          productId,
          userId,
          rating: data.rating,
          message: data.message,
        },
        Realm.UpdateMode.Modified,
      );
    });

    const created = realm.objectForPrimaryKey<ReviewEntity>('Review', nextId);
    if (!created) {
      throw new Error('Failed to create review');
    }

    return mapReviewEntity(created);
  }

  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    const realm = await initializeRealm();
    ensurePaymentMethods(realm);
    return realm
      .objects<PaymentMethodEntity>('PaymentMethod')
      .sorted('key')
      .map(mapPaymentMethodEntity);
  }

  public async createOrder(data: CreateOrderPayload): Promise<Order> {
    const realm = await initializeRealm();
    const userId = await getCurrentUserId(realm);
    const nextId = getNextId(realm.objects<OrderEntity>('Order'), 'id');

    realm.write(() => {
      realm.create(
        'Order',
        {
          id: nextId,
          userId,
          items: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: data.totalAmount,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod,
          status: 'pending' as OrderStatus,
        },
        Realm.UpdateMode.Modified,
      );
    });

    const created = realm.objectForPrimaryKey<OrderEntity>('Order', nextId);
    if (!created) {
      throw new Error('Failed to create order');
    }

    return mapOrderEntity(created);
  }

  public async getOrders(): Promise<Order[]> {
    const realm = await initializeRealm();
    const userId = await getCurrentUserId(realm);
    const orders = realm
      .objects<OrderEntity>('Order')
      .filtered('userId == $0', userId)
      .sorted('id', true);
    return orders.map(mapOrderEntity);
  }

  public async updateOrderStatus(
    orderId: number,
    data: UpdateOrderStatusPayload,
  ): Promise<Order> {
    const realm = await initializeRealm();
    const order = realm.objectForPrimaryKey<OrderEntity>('Order', orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    realm.write(() => {
      order.status = data.status;
    });

    return mapOrderEntity(order);
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await initializeRealm();
      return true;
    } catch {
      return false;
    }
  }
}
