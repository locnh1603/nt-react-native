import Realm from 'realm';

export class UserProfileEntity extends Realm.Object<UserProfileEntity> {
  public id!: number;
  public username!: string;
  public email!: string;
  public age!: number;
  public role!: string;
  public firstName!: string;
  public lastName!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'UserProfile',
    primaryKey: 'id',
    properties: {
      id: 'int',
      username: {type: 'string', indexed: true},
      email: 'string',
      age: 'int',
      role: 'string',
      firstName: 'string',
      lastName: 'string',
    },
  };
}
