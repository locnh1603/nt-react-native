import type Realm from 'realm';
import {AppMetadata} from './AppMetadata.schema';
import {OrderEntity, OrderItemEmbedded} from './Order.schema';
import {PaymentMethodEntity} from './PaymentMethod.schema';
import {ProductEntity} from './Product.schema';
import {ReviewEntity} from './Review.schema';
import {UserProfileEntity} from './UserProfile.schema';

export const realmSchemas: Realm.ObjectClass[] = [
	AppMetadata,
	UserProfileEntity,
	ProductEntity,
	ReviewEntity,
	OrderItemEmbedded,
	OrderEntity,
	PaymentMethodEntity,
];
