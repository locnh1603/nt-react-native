import Realm from 'realm';

export class ProductHistoryEntry extends Realm.Object<ProductHistoryEntry> {
  public id!: string;
  public productId!: number;
  public productName!: string;
  public productPrice!: number;
  public productImage?: string;
  public clickedAt!: number;

  public static schema: Realm.ObjectSchema = {
    name: 'ProductHistory',
    primaryKey: 'id',
    properties: {
      id: 'string',
      productId: {type: 'int', indexed: true},
      productName: 'string',
      productPrice: 'double',
      productImage: 'string?',
      clickedAt: {type: 'int', indexed: true},
    },
  };
}
