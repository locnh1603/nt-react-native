import Realm from 'realm';

export class PaymentMethodEntity extends Realm.Object<PaymentMethodEntity> {
  public key!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'PaymentMethod',
    primaryKey: 'key',
    properties: {
      key: 'string',
    },
  };
}
