import {UnexpectedError} from '../../domain/errors';
import {AccountModel} from '../../domain/models';
import {mockAccountModel} from '../../domain/test';
import {LocalStorageAdapter} from '../../infra/cache/local-storage-adapter';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapter';

describe('CurrentAccountAdapter', () => {
  it('Should call LocalSotorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  it('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined as unknown as AccountModel);
    }).toThrow(new UnexpectedError());
  });

  it('Should call LocalSotorageAdapter.get with correct value', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
