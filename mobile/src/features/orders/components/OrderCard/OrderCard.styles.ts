import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type OrderCardStyles = {
  card: ViewStyle;
  row: ViewStyle;
  leftSection: ViewStyle;
  orderIdRow: ViewStyle;
  orderId: TextStyle;
  price: TextStyle;
  date: TextStyle;
  productName: TextStyle;
  image: ImageStyle;
  actionsRow: ViewStyle;
  actionButton: ViewStyle;
  actionButtonText: TextStyle;
  actionButtonTeal: ViewStyle;
  actionButtonTrack: ViewStyle;
  actionButtonTextTeal: TextStyle;
  moreButton: ViewStyle;
  moreButtonText: TextStyle;
};

export const styles = StyleSheet.create<OrderCardStyles>({
  card: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#d8e1ea',
    borderRadius: 18,
    padding: 18,
    gap: 18,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    gap: 6,
    paddingRight: 12,
  },
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  orderId: {
    fontSize: 12,
    color: '#64748b',
    letterSpacing: 0.6,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 14,
    backgroundColor: '#0f172a',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'nowrap',
  },
  actionButton: {
    flex: 1,
    minHeight: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  actionButtonTeal: {
    flex: 1,
    minHeight: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#0DF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonTrack: {
    flex: 1,
    minHeight: 56,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#0DF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  actionButtonTextTeal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  moreButton: {
    width: 74,
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#475569',
    marginTop: -6,
  },
});
