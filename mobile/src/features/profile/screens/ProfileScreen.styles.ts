import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type ProfileScreenStyles = {
  page: ViewStyle;
  content: ViewStyle;
  card: ViewStyle;
  topCard: ViewStyle;
  avatarWrap: ViewStyle;
  avatar: ViewStyle;
  avatarText: TextStyle;
  avatarEditBadge: ViewStyle;
  name: TextStyle;
  handle: TextStyle;
  premiumBadge: ViewStyle;
  premiumBadgeText: TextStyle;
  detailsCard: ViewStyle;
  detailsHeaderRow: ViewStyle;
  detailsTitle: TextStyle;
  detailsAction: TextStyle;
  sectionLabel: TextStyle;
  emailBox: ViewStyle;
  emailText: TextStyle;
  valueText: TextStyle;
  languageSelector: ViewStyle;
  actionCard: ViewStyle;
  actionLeft: ViewStyle;
  actionIconWrap: ViewStyle;
  actionText: TextStyle;
  logoutCard: ViewStyle;
  logoutIconWrap: ViewStyle;
  logoutText: TextStyle;
  centerContainer: ViewStyle;
  loadingText: TextStyle;
};

export const styles = StyleSheet.create<ProfileScreenStyles>({
  page: {
    flex: 1,
    width: '100%',
  },
  content: {
    padding: 14,
    rowGap: 12,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
  },
  topCard: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 22,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: '#BFC7CC',
    backgroundColor: '#F2AE86',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#24364F',
  },
  avatarEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#12E7F0',
    borderWidth: 3,
    borderColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: '800',
  },
  handle: {
    marginTop: 2,
    color: '#6F7A8D',
    fontSize: 13,
  },
  premiumBadge: {
    marginTop: 10,
    backgroundColor: '#D9F9FB',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  premiumBadgeText: {
    color: '#00DCE7',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  detailsCard: {
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  detailsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailsTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
  },
  detailsAction: {
    color: '#09DFE9',
    fontSize: 13.5,
    fontWeight: '700',
  },
  sectionLabel: {
    marginTop: 2,
    color: '#98A1B0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.9,
    marginBottom: 6,
  },
  emailBox: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 11,
    height: 42,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  emailText: {
    color: '#6B7280',
    fontSize: 15,
  },
  valueText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 14,
  },
  languageSelector: {
    marginTop: 2,
  },
  actionCard: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionText: {
    color: '#303A4A',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutCard: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFEDEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutText: {
    color: '#F04438',
    fontSize: 15,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6F7A8D',
    fontWeight: '500',
  },
});
