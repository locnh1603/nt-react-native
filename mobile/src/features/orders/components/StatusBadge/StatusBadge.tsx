import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './StatusBadge.styles';
import { OrderStatus } from 'src/models/order';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusColorMap: Record<
  OrderStatus,
  {bg: string; text: string}
> = {
  delivered: {bg: '#E7FEFE', text: '#0DF2F2'},
  shipped: {bg: '#E7FEFE', text: '#0DF2F2'},
  pending: {bg: '#f1f5f9', text: '#64748b'},
  processing: {bg: '#fef3c7', text: '#92400e'},
  cancelled: {bg: '#fee2e2', text: '#991b1b'},
};

const statusTranslationKey: Record<OrderStatus, string> = {
  delivered: 'orders.statusDelivered',
  shipped: 'orders.statusShipped',
  pending: 'orders.statusPending',
  processing: 'orders.statusProcessing',
  cancelled: 'orders.statusCancelled',
};

export const StatusBadge: FC<StatusBadgeProps> = ({status}) => {
  const {t} = useTranslation();
  const colors = statusColorMap[status];

  return (
    <View
      testID="status-badge"
      style={[styles.badge, {backgroundColor: colors.bg}]}>
      <Text style={[styles.text, {color: colors.text}]}>
        {t(statusTranslationKey[status])}
      </Text>
    </View>
  );
};
