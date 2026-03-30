import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {OrderCard} from './OrderCard';
import {Order} from '../../../../models/order';

const baseOrder: Order = {
  id: 101,
  userId: 1,
  items: [
    {productId: 10, quantity: 2, price: 25, productName: 'Widget'},
    {productId: 11, quantity: 1, price: 50},
  ],
  totalAmount: 100,
  shippingAddress: '123 Main St',
  paymentMethod: 'credit_card',
  status: 'delivered',
  createdAt: '2025-01-15T10:30:00Z',
};

const allCallbacks = {
  onReorder: jest.fn(),
  onViewDetails: jest.fn(),
  onTrackOrder: jest.fn(),
  onLeaveReview: jest.fn(),
  onBuyAgain: jest.fn(),
};

describe('OrderCard', () => {
  it('renders order ID', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText(/#101/i)).toBeTruthy();
  });

  it('renders StatusBadge with correct status', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('renders total amount', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText('$100.00')).toBeTruthy();
  });

  it('renders order date when createdAt present', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText(/Jan/)).toBeTruthy();
  });

  it('renders first item productName when available', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText('Widget')).toBeTruthy();
  });

  it('renders item count fallback when no productName', () => {
    const order: Order = {
      ...baseOrder,
      items: [
        {productId: 10, quantity: 2, price: 25},
        {productId: 11, quantity: 1, price: 50},
      ],
    };
    const {getByText} = render(<OrderCard order={order} {...allCallbacks} />);
    expect(getByText('2 items')).toBeTruthy();
  });

  it('renders Reorder and View Details for delivered status', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText('Reorder')).toBeTruthy();
    expect(getByText('View Details')).toBeTruthy();
  });

  it('renders Track Order for shipped status', () => {
    const order: Order = {...baseOrder, status: 'shipped'};
    const {getByText} = render(<OrderCard order={order} {...allCallbacks} />);
    expect(getByText('Track Order')).toBeTruthy();
  });

  it('renders Leave Review and Buy Again for delivered status', () => {
    const {getByText} = render(<OrderCard order={baseOrder} {...allCallbacks} />);
    expect(getByText('Leave Review')).toBeTruthy();
    expect(getByText('Buy Again')).toBeTruthy();
  });

  it('calls onReorder when Reorder pressed', () => {
    const onReorder = jest.fn();
    const {getByText} = render(
      <OrderCard order={baseOrder} {...allCallbacks} onReorder={onReorder} />,
    );
    fireEvent.press(getByText('Reorder'));
    expect(onReorder).toHaveBeenCalledWith(baseOrder);
  });

  it('calls onViewDetails when View Details pressed', () => {
    const onViewDetails = jest.fn();
    const {getByText} = render(
      <OrderCard order={baseOrder} {...allCallbacks} onViewDetails={onViewDetails} />,
    );
    fireEvent.press(getByText('View Details'));
    expect(onViewDetails).toHaveBeenCalledWith(baseOrder);
  });

  it('calls onTrackOrder when Track Order pressed', () => {
    const order: Order = {...baseOrder, status: 'shipped'};
    const onTrackOrder = jest.fn();
    const {getByText} = render(
      <OrderCard order={order} onTrackOrder={onTrackOrder} />,
    );
    fireEvent.press(getByText('Track Order'));
    expect(onTrackOrder).toHaveBeenCalledWith(order);
  });

  it('calls onLeaveReview when Leave Review pressed', () => {
    const onLeaveReview = jest.fn();
    const {getByText} = render(
      <OrderCard order={baseOrder} {...allCallbacks} onLeaveReview={onLeaveReview} />,
    );
    fireEvent.press(getByText('Leave Review'));
    expect(onLeaveReview).toHaveBeenCalledWith(baseOrder);
  });

  it('calls onBuyAgain when Buy Again pressed', () => {
    const onBuyAgain = jest.fn();
    const {getByText} = render(
      <OrderCard order={baseOrder} {...allCallbacks} onBuyAgain={onBuyAgain} />,
    );
    fireEvent.press(getByText('Buy Again'));
    expect(onBuyAgain).toHaveBeenCalledWith(baseOrder);
  });

  it('renders product thumbnail Image', () => {
    const order: Order = {
      ...baseOrder,
      items: [{...baseOrder.items[0], productImage: 'https://example.com/img.png'}],
    };
    const {getByTestId} = render(<OrderCard order={order} {...allCallbacks} />);
    expect(getByTestId('order-card-image')).toBeTruthy();
  });
});
