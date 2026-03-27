import Realm from 'realm';
import {realmSchemas} from './schemas';

let realmInstance: Realm | null = null;

export const initializeRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open({
    schema: realmSchemas,
    schemaVersion: 1,
  });

  return realmInstance;
};

export const getRealm = (): Realm => {
  if (!realmInstance || realmInstance.isClosed) {
    throw new Error('Realm is not initialized. Call initializeRealm() first.');
  }

  return realmInstance;
};

export const closeRealm = (): void => {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
  }

  realmInstance = null;
};
