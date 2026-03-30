import {Order} from '../../models/order';

export const sampleOrdersData: Order[] = [
  {
    id: 92034,
    userId: 1,
    items: [
      {
        productId: 101,
        quantity: 1,
        price: 128.5,
        productName: 'Running Shoes Pro',
        productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      },
    ],
    totalAmount: 128.5,
    shippingAddress: '123 Market Street, District 1',
    paymentMethod: 'credit_card',
    status: 'delivered',
    createdAt: '2023-10-24T09:30:00.000Z',
  },
  {
    id: 88120,
    userId: 1,
    items: [
      {
        productId: 205,
        quantity: 1,
        price: 45,
        productName: 'Minimal Watch',
        productImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
      },
    ],
    totalAmount: 45,
    shippingAddress: '88 Nguyen Hue, District 1',
    paymentMethod: 'paypal',
    status: 'shipped',
    createdAt: '2023-10-23T15:00:00.000Z',
  },
  {
    id: 77541,
    userId: 1,
    items: [
      {
        productId: 319,
        quantity: 1,
        price: 210,
        productName: 'Wireless Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      },
    ],
    totalAmount: 210,
    shippingAddress: '45 Le Loi, District 3',
    paymentMethod: 'debit_card',
    status: 'delivered',
    createdAt: '2023-09-15T11:45:00.000Z',
  },
  {
    id: 66392,
    userId: 1,
    items: [
      {
        productId: 477,
        quantity: 1,
        price: 79.99,
        productName: 'Classic Backpack',
        productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      },
    ],
    totalAmount: 79.99,
    shippingAddress: '12 Vo Van Tan, District 10',
    paymentMethod: 'cash_on_delivery',
    status: 'processing',
    createdAt: '2023-10-27T08:20:00.000Z',
  },
  {
    id: 55410,
    userId: 1,
    items: [
      {
        productId: 588,
        quantity: 1,
        price: 99,
        productName: 'Fitness Tracker',
        productImage: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
      },
    ],
    totalAmount: 99,
    shippingAddress: '90 Tran Hung Dao, District 5',
    paymentMethod: 'credit_card',
    status: 'cancelled',
    createdAt: '2023-10-19T13:10:00.000Z',
  },
];
