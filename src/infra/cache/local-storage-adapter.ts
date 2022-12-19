import {ISetStorage} from '../../data/protocols/cache/set-storage';

export class LocalStorageAdapter implements ISetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
