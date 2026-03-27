import type {IDataService} from './contracts';
import {HttpDataProvider} from './providers/http-provider';
import {RealmDataProvider} from './providers/realm-provider';

const STORAGE_PROVIDER = 'realm';

const createDataService = (): IDataService => {
  if (STORAGE_PROVIDER === 'realm') {
    return new RealmDataProvider();
  }

  return new HttpDataProvider();
};

export const dataService: IDataService = createDataService();
