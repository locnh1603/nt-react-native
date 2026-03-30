import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {OrderTabFilter} from '../../ordersSlice';
import {styles} from './OrderTabBar.styles';

interface OrderTabBarProps {
  activeTab: OrderTabFilter;
  onTabChange: (tab: OrderTabFilter) => void;
}

const tabs: {key: OrderTabFilter; translationKey: string}[] = [
  {key: 'all', translationKey: 'orders.tabAll'},
  {key: 'ongoing', translationKey: 'orders.tabOngoing'},
  {key: 'completed', translationKey: 'orders.tabCompleted'},
  {key: 'cancelled', translationKey: 'orders.tabCancelled'},
];

export const OrderTabBar: FC<OrderTabBarProps> = ({activeTab, onTabChange}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {tabs.map(({key, translationKey}) => {
        const isActive = activeTab === key;
        return (
          <Pressable
            key={key}
            style={styles.tab}
            onPress={() => onTabChange(key)}>
            <Text style={isActive ? styles.tabTextActive : styles.tabText}>
              {t(translationKey)}
            </Text>
            <View
              style={isActive ? styles.indicatorActive : styles.indicator}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
