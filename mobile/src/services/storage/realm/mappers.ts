import type {Order, OrderItem, PaymentMethod} from '../../../models/order';
import type {PriceUnit, Product, Review} from '../../../models/product';
import type {UserProfile, UserRole} from '../../../models/user';
import type {OrderEntity, OrderItemEmbedded} from './schemas/Order.schema';
import type {PaymentMethodEntity} from './schemas/PaymentMethod.schema';
import type {ProductEntity} from './schemas/Product.schema';
import type {ReviewEntity} from './schemas/Review.schema';
import type {UserProfileEntity} from './schemas/UserProfile.schema';

export const mapUserProfileEntity = (entity: UserProfileEntity): UserProfile => {
  return {
    id: entity.id,
    username: entity.username,
    email: entity.email,
    age: entity.age,
    role: entity.role as UserRole,
    firstName: entity.firstName,
    lastName: entity.lastName,
  };
};

export const mapProductEntity = (entity: ProductEntity): Product => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    price: entity.price,
    priceUnit: entity.priceUnit as PriceUnit | undefined,
    image: entity.image,
  };
};

export const mapReviewEntity = (entity: ReviewEntity): Review => {
  return {
    id: entity.id,
    productId: entity.productId,
    userId: entity.userId,
    rating: entity.rating,
    message: entity.message,
  };
};

const mapOrderItem = (item: OrderItemEmbedded): OrderItem => {
  return {
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  };
};

export const mapOrderEntity = (entity: OrderEntity): Order => {
  return {
    id: entity.id,
    userId: entity.userId,
    items: entity.items.map(mapOrderItem),
    totalAmount: entity.totalAmount,
    shippingAddress: entity.shippingAddress,
    paymentMethod: entity.paymentMethod as PaymentMethod,
    status: entity.status as Order['status'],
  };
};

export const mapPaymentMethodEntity = (
  entity: PaymentMethodEntity,
): PaymentMethod => {
  return entity.key as PaymentMethod;
};
