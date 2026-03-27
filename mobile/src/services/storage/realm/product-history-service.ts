import Realm from 'realm';
import type {Product} from '../../../models/product';
import {initializeRealm} from './realm-client';
import {ProductHistoryEntry} from './schemas/ProductHistory.schema';

export interface ProductHistoryItem {
  id: string;
  productId: number;
  productName: string;
  productPrice: number;
  productImage?: string;
  clickedAt: number;
}

const mapHistoryEntry = (
  entry: ProductHistoryEntry,
): ProductHistoryItem => {
  return {
    id: entry.id,
    productId: entry.productId,
    productName: entry.productName,
    productPrice: entry.productPrice,
    productImage: entry.productImage,
    clickedAt: entry.clickedAt,
  };
};

export const recordProductHistory = async (product: Product): Promise<void> => {
  const realm = await initializeRealm();
  const clickedAt = Date.now();

  realm.write(() => {
    realm.create(
      'ProductHistory',
      {
        id: `${product.id}-${clickedAt}`,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        clickedAt,
      },
      Realm.UpdateMode.Modified,
    );
  });
};

export const getProductHistory = async (): Promise<ProductHistoryItem[]> => {
  const realm = await initializeRealm();

  const history = realm
    .objects<ProductHistoryEntry>('ProductHistory')
    .sorted('clickedAt', true);

  return history.map(mapHistoryEntry);
};


export const clearProductHistory = async (): Promise<void> => {
  const realm = await initializeRealm(); 
  realm.write(() => {
    const allHistory = realm.objects<ProductHistoryEntry>('ProductHistory');
    realm.delete(allHistory);
  });
};
