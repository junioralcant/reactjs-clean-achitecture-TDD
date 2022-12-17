import {ISetStorage} from '../../data/protocols/cache/set-storage';

export class LocalStorageAdapter implements ISetStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
