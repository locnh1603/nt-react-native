export type PaymentMethod =
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'cash_on_delivery';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

export interface OrderResponse {
  status: boolean;
  data: Order;
}

export interface OrderListResponse {
  status: boolean;
  data: Order[];
}

export interface PaymentMethodsResponse {
  status: boolean;
  data: PaymentMethod[];
}
