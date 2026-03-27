import type {IDataService} from './contracts';
import {HttpDataProvider} from './providers/http-provider';

export const dataService: IDataService = new HttpDataProvider();
