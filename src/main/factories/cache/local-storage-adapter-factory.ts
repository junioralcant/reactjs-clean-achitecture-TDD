import {LocalStorageAdapter} from '../../../infra/cache/local-storage-adapter';

export function makeLocalStorageAdapterFactory(): LocalStorageAdapter {
  return new LocalStorageAdapter();
}
