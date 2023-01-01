import {faker} from '@faker-js/faker';
import {IGetStorage} from '../../protocols/cache';

export class GetStorageSpy implements IGetStorage {
  key = '';
  value = faker.datatype.json();

  get(key: string) {
    this.key = key;
    return this.value;
  }
}
