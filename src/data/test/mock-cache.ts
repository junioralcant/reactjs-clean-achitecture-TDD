import {ISetStorage} from '../protocols/cache/set-storage';

export class SetStorageMock implements ISetStorage {
  key: string = '';
  value: any;

  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}
