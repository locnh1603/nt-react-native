import React from 'react';
import {render} from '@testing-library/react-native';
import {StatusBadge} from './StatusBadge';
import {OrderStatus} from '../../../../models/order';
import {StyleSheet} from 'react-native';

const statusLabels: Record<OrderStatus, string> = {
  delivered: 'Delivered',
  shipped: 'Shipped',
  pending: 'Pending',
  processing: 'Processing',
  cancelled: 'Cancelled',
};

describe('StatusBadge', () => {
  const statuses: OrderStatus[] = [
    'delivered',
    'shipped',
    'pending',
    'processing',
    'cancelled',
  ];

  statuses.forEach(status => {
    it(`renders "${statusLabels[status]}" for status="${status}"`, () => {
      const {getByText} = render(<StatusBadge status={status} />);
      expect(getByText(statusLabels[status])).toBeTruthy();
    });
  });

  it('applies green style for delivered', () => {
    const {getByTestId} = render(<StatusBadge status="delivered" />);
    const badge = getByTestId('status-badge');
    const flatStyle = StyleSheet.flatten(badge.props.style);
    expect(flatStyle.backgroundColor).toBe('#E7FEFE');
  });

  it('applies teal style for shipped', () => {
    const {getByTestId} = render(<StatusBadge status="shipped" />);
    const badge = getByTestId('status-badge');
    const flatStyle = StyleSheet.flatten(badge.props.style);
    expect(flatStyle.backgroundColor).toBe('#E7FEFE');
  });

  it('applies grey style for pending', () => {
    const {getByTestId} = render(<StatusBadge status="pending" />);
    const badge = getByTestId('status-badge');
    const flatStyle = StyleSheet.flatten(badge.props.style);
    expect(flatStyle.backgroundColor).toBe('#f1f5f9');
  });

  it('applies red style for cancelled', () => {
    const {getByTestId} = render(<StatusBadge status="cancelled" />);
    const badge = getByTestId('status-badge');
    const flatStyle = StyleSheet.flatten(badge.props.style);
    expect(flatStyle.backgroundColor).toBe('#fee2e2');
  });
});
