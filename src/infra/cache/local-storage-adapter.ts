import {ISetStorage} from '../../data/protocols/cache/set-storage';

export class LocalStorageAdapter implements ISetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
  }
}
