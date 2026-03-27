import Realm from 'realm';

export class AppMetadata extends Realm.Object<AppMetadata> {
  public key!: string;
  public value!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'AppMetadata',
    primaryKey: 'key',
    properties: {
      key: 'string',
      value: 'string',
    },
  };
}
