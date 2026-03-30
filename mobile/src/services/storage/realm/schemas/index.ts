import type Realm from 'realm';
import {ProductHistoryEntry} from './ProductHistory.schema';

export const realmSchemas: Realm.ObjectSchema[] = [
	ProductHistoryEntry.schema,
];
