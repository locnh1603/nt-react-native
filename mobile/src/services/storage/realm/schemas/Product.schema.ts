import Realm from 'realm';

export class ProductEntity extends Realm.Object<ProductEntity> {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public priceUnit?: string;
  public image?: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: {type: 'string', indexed: true},
      description: 'string',
      price: 'double',
      priceUnit: 'string?',
      image: 'string?',
    },
  };
}
