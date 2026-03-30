import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type OrderTabBarStyles = {
  container: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  tabTextActive: TextStyle;
  indicator: ViewStyle;
  indicatorActive: ViewStyle;
};

export const styles = StyleSheet.create<OrderTabBarStyles>({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#dbe4ee',
  },
  tab: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '700',
  },
  tabTextActive: {
    fontSize: 15,
    color: '#0DF2F2',
    fontWeight: '800',
  },
  indicator: {
    marginTop: 10,
    width: '80%',
    height: 3,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    marginTop: 10,
    width: '80%',
    height: 3,
    borderRadius: 3,
    backgroundColor: '#0DF2F2',
  },
});
