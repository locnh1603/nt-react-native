import Realm from 'realm';

export class OrderItemEmbedded extends Realm.Object<OrderItemEmbedded> {
  public productId!: number;
  public quantity!: number;
  public price!: number;

  public static schema: Realm.ObjectSchema = {
    name: 'OrderItemEmbedded',
    embedded: true,
    properties: {
      productId: 'int',
      quantity: 'int',
      price: 'double',
    },
  };
}

export class OrderEntity extends Realm.Object<OrderEntity> {
  public id!: number;
  public userId!: number;
  public items!: Realm.List<OrderItemEmbedded>;
  public totalAmount!: number;
  public shippingAddress!: string;
  public paymentMethod!: string;
  public status!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
      id: 'int',
      userId: {type: 'int', indexed: true},
      items: 'OrderItemEmbedded[]',
      totalAmount: 'double',
      shippingAddress: 'string',
      paymentMethod: 'string',
      status: {type: 'string', indexed: true},
    },
  };
}
