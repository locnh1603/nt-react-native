import React, {FC, useCallback} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {Order, OrderStatus} from '../../../../models/order';
import {StatusBadge} from '../StatusBadge';
import {styles} from './OrderCard.styles';

interface OrderCardProps {
  order: Order;
  onReorder?: (order: Order) => void;
  onViewDetails?: (order: Order) => void;
  onTrackOrder?: (order: Order) => void;
  onLeaveReview?: (order: Order) => void;
  onBuyAgain?: (order: Order) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDateLabel(status: OrderStatus): string {
  if (status === 'shipped') {
    return 'Expected by';
  }
  if (status === 'delivered') {
    return 'Placed on';
  }
  return 'Updated on';
}

const ONGOING_STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped'];

export const OrderCard: FC<OrderCardProps> = ({
  order,
  onReorder,
  onViewDetails,
  onTrackOrder,
  onLeaveReview,
  onBuyAgain,
}) => {
  const {t} = useTranslation();

  const handleReorder = useCallback(
    () => onReorder?.(order),
    [onReorder, order],
  );
  const handleViewDetails = useCallback(
    () => onViewDetails?.(order),
    [onViewDetails, order],
  );
  const handleTrackOrder = useCallback(
    () => onTrackOrder?.(order),
    [onTrackOrder, order],
  );
  const handleLeaveReview = useCallback(
    () => onLeaveReview?.(order),
    [onLeaveReview, order],
  );
  const handleBuyAgain = useCallback(
    () => onBuyAgain?.(order),
    [onBuyAgain, order],
  );

  const firstItem = order.items[0];
  const productImage = firstItem?.productImage;
  const productName = firstItem?.productName;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <View style={styles.orderIdRow}>
            <Text style={styles.orderId}>ORDER #{order.id}</Text>
            <StatusBadge status={order.status} />
          </View>
          <Text style={styles.price}>
            ${order.totalAmount.toFixed(2)}
          </Text>
          {order.createdAt && (
            <Text style={styles.date}>
              {getDateLabel(order.status)} {formatDate(order.createdAt)}
            </Text>
          )}
          {productName ? (
            <Text style={styles.productName}>{productName}</Text>
          ) : (
            <Text style={styles.productName}>
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </Text>
          )}
        </View>
        {productImage ? (
          <Image
            testID="order-card-image"
            source={{uri: productImage}}
            style={styles.image}
          />
        ) : (
          <View testID="order-card-image" style={styles.image} />
        )}
      </View>
      <View style={styles.actionsRow}>
        {order.status === 'delivered' && (
          <>
            {onLeaveReview && (
              <Pressable onPress={handleLeaveReview} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{t('orders.leaveReview')}</Text>
              </Pressable>
            )}
            {onReorder && (
              <Pressable onPress={handleReorder} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>{t('orders.reorder')}</Text>
              </Pressable>
            )}
          </>
        )}
        {ONGOING_STATUSES.includes(order.status) && onTrackOrder && (
          <>
            <Pressable onPress={handleTrackOrder} style={styles.actionButtonTrack}>
              <FontAwesome name="truck" size={14} color="#ffffff" />
              <Text style={styles.actionButtonTextTeal}>{t('orders.trackOrder')}</Text>
            </Pressable>
            <Pressable style={styles.moreButton}>
              <Text style={styles.moreButtonText}>...</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
