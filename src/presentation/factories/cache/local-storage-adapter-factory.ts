import {ISetStorage} from '../../../data/protocols/cache/set-storage';
import {LocalStorageAdapter} from '../../../infra/cache/local-storage-adapter';

export function makeLocalStorageAdapterFactory(): ISetStorage {
  return new LocalStorageAdapter();
}
