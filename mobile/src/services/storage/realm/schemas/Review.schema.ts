import Realm from 'realm';

export class ReviewEntity extends Realm.Object<ReviewEntity> {
  public id!: number;
  public productId!: number;
  public userId!: number;
  public rating!: number;
  public message!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Review',
    primaryKey: 'id',
    properties: {
      id: 'int',
      productId: {type: 'int', indexed: true},
      userId: {type: 'int', indexed: true},
      rating: 'int',
      message: 'string',
    },
  };
}
