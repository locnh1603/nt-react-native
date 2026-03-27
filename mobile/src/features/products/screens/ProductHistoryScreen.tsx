import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import Background from '../../../shared/components/Background';
import {Header} from '../../../shared/components/Header';
import type {ProductHistoryScreenProps} from '../../../types/navigation';
import {
  clearProductHistory,
  getProductHistory,
  type ProductHistoryItem,
} from '../../../services/storage/realm/product-history-service';
import {styles} from './ProductHistoryScreen.styles';
import Button from '../../../shared/components/Button';

const LOAD_HISTORY_FALLBACK_ERROR = '__productHistoryLoadFailed__';

const formatClickedTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

const ProductHistoryScreen: FC<ProductHistoryScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [history, setHistory] = useState<ProductHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const entries = await getProductHistory();
      setHistory(entries);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : LOAD_HISTORY_FALLBACK_ERROR,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  const handleGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const handleClearHistory = useCallback(async (): Promise<void> => {
    try {
      await clearProductHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear product history:', error);
    }
  }, []);

  const renderItem: ListRenderItem<ProductHistoryItem> = useCallback(({item}) => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeaderRow}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.productName}
          </Text>
          <Text style={styles.clickedAt}>{formatClickedTime(item.clickedAt)}</Text>
        </View>
        <Text style={styles.productPrice}>${item.productPrice.toFixed(2)}</Text>
      </View>
    );
  }, []);

  return (
    <Background>
      <View style={styles.page}>
        <Header title={t('productHistory.title')} onBack={handleGoBack} />

        <View style={styles.content}>
          <Button style={styles.clearButton} onPress={handleClearHistory}>
            <Text style={styles.clearButtonText}>{t('productHistory.clearHistory')}</Text>
          </Button>
          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#0DF2F2" />
              <Text style={styles.statusText}>
                {t('productHistory.loading')}
              </Text>
            </View>
          ) : null}

          {!loading && error ? (
            <View style={styles.centered}>
              <Text style={styles.statusText}>
                {error === LOAD_HISTORY_FALLBACK_ERROR
                  ? t('productHistory.loadFailed')
                  : error}
              </Text>
            </View>
          ) : null}

          {!loading && !error ? (
            <FlatList
              data={history}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <View style={styles.centered}>
                  <Text style={styles.statusText}>
                    {t('productHistory.empty')}
                  </Text>
                </View>
              }
            />
          ) : null}
        </View>
      </View>
    </Background>
  );
};

export {ProductHistoryScreen};
