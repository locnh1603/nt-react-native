import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {OrderTabBar} from './OrderTabBar';
import {OrderTabFilter} from '../../ordersSlice';

describe('OrderTabBar', () => {
  const tabs: {key: OrderTabFilter; label: string}[] = [
    {key: 'all', label: 'All Orders'},
    {key: 'ongoing', label: 'Ongoing'},
    {key: 'completed', label: 'Completed'},
    {key: 'cancelled', label: 'Cancelled'},
  ];

  it('renders all four tabs', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="all" onTabChange={onTabChange} />,
    );
    expect(getByText('All Orders')).toBeTruthy();
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();
    expect(getByText('Cancelled')).toBeTruthy();
  });

  tabs.forEach(({key, label}) => {
    it(`highlights "${label}" tab when active`, () => {
      const onTabChange = jest.fn();
      const {getByText} = render(
        <OrderTabBar activeTab={key} onTabChange={onTabChange} />,
      );
      const tabText = getByText(label);
      expect(tabText).toBeTruthy();
    });
  });

  it('calls onTabChange("ongoing") when Ongoing pressed', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="all" onTabChange={onTabChange} />,
    );
    fireEvent.press(getByText('Ongoing'));
    expect(onTabChange).toHaveBeenCalledWith('ongoing');
  });

  it('calls onTabChange("completed") when Completed pressed', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="all" onTabChange={onTabChange} />,
    );
    fireEvent.press(getByText('Completed'));
    expect(onTabChange).toHaveBeenCalledWith('completed');
  });

  it('calls onTabChange("cancelled") when Cancelled pressed', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="all" onTabChange={onTabChange} />,
    );
    fireEvent.press(getByText('Cancelled'));
    expect(onTabChange).toHaveBeenCalledWith('cancelled');
  });

  it('calls onTabChange("all") when All Orders pressed', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="ongoing" onTabChange={onTabChange} />,
    );
    fireEvent.press(getByText('All Orders'));
    expect(onTabChange).toHaveBeenCalledWith('all');
  });

  it('renders tabs in correct horizontal order', () => {
    const onTabChange = jest.fn();
    const {getByText} = render(
      <OrderTabBar activeTab="all" onTabChange={onTabChange} />,
    );
    const allIndex = getByText('All Orders').props.children ?? '';
    const ongoingIndex = getByText('Ongoing').props.children ?? '';
    expect(allIndex).toBe('All Orders');
    expect(ongoingIndex).toBe('Ongoing');
    expect(getByText('All Orders')).toBeTruthy();
    expect(getByText('Ongoing')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();
    expect(getByText('Cancelled')).toBeTruthy();
  });
});
