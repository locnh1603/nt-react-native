import Realm from 'realm';
import {ProductEntity} from './schemas/Product.schema';
import {UserProfileEntity} from './schemas/UserProfile.schema';
import type {PriceUnit} from '../../../models/product';

const SEED_VERSION_KEY = 'seed_version';
const CURRENT_SEED_VERSION = '1';

const DEFAULT_USER = {
  id: 1,
  username: 'demo',
  email: 'demo@example.com',
  age: 28,
  role: 'user',
  firstName: 'Demo',
  lastName: 'User',
};

type SeedProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit: PriceUnit;
  image: string;
};

const DEFAULT_PRODUCTS: SeedProduct[] = [
  {
    id: 1,
    name: 'Urban Chair',
    description: 'Compact chair for modern spaces.',
    price: 199,
    priceUnit: 'dollar',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
  },
  {
    id: 2,
    name: 'Linen Sofa',
    description: 'Comfortable two-seat sofa with linen finish.',
    price: 499,
    priceUnit: 'dollar',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  },
  {
    id: 3,
    name: 'Oak Desk',
    description: 'Solid oak desk for focused work sessions.',
    price: 329,
    priceUnit: 'dollar',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
  },
  {
    id: 4,
    name: 'Reading Lamp',
    description: 'Adjustable lamp with soft warm light.',
    price: 89,
    priceUnit: 'dollar',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800',
  },
];

export const ensureRealmSeedData = (realm: Realm): void => {
  const metadata = realm.objectForPrimaryKey<{key: string; value: string}>(
    'AppMetadata',
    SEED_VERSION_KEY,
  );

  if (metadata?.value === CURRENT_SEED_VERSION) {
    return;
  }

  realm.write(() => {
    realm.create('UserProfile', DEFAULT_USER, Realm.UpdateMode.Modified);

    DEFAULT_PRODUCTS.forEach(product => {
      realm.create('Product', product, Realm.UpdateMode.Modified);
    });

    realm.create(
      'AppMetadata',
      {
        key: SEED_VERSION_KEY,
        value: CURRENT_SEED_VERSION,
      },
      Realm.UpdateMode.Modified,
    );
  });
};

export const upsertUserProfile = (
  realm: Realm,
  user: {
    id: number;
    username: string;
    email: string;
    age: number;
    role: string;
    firstName: string;
    lastName: string;
  },
): void => {
  realm.write(() => {
    realm.create('UserProfile', user, Realm.UpdateMode.Modified);
  });
};

export const getNextUserProfileId = (realm: Realm): number => {
  const maxId = realm.objects<UserProfileEntity>('UserProfile').max('id');
  return maxId === null ? 1 : (maxId as number) + 1;
};

export const isUsernameTaken = (realm: Realm, username: string): boolean => {
  const user = realm
    .objects<UserProfileEntity>('UserProfile')
    .filtered('username == $0', username)[0];
  return Boolean(user);
};

export const getUserByUsername = (
  realm: Realm,
  username: string,
): UserProfileEntity | undefined => {
  return realm
    .objects<UserProfileEntity>('UserProfile')
    .filtered('username == $0', username)[0];
};
