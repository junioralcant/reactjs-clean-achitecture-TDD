import {faker} from '@faker-js/faker';
import 'jest-localstorage-mock';
import {LocalStorageAdapter} from './local-storage-adapter';

function makeSut(): LocalStorageAdapter {
  return new LocalStorageAdapter();
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Should call localStorage with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = {
      accessToken: faker.datatype.hexadecimal(),
      name: faker.database.column(),
    };
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });
});
