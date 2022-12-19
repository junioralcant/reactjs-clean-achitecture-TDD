import {UnexpectedError} from '../../domain/errors';
import {AccountModel} from '../../domain/models';
import {mockAccountModel} from '../../domain/test';
import {LocalStorageAdapter} from '../../infra/cache/local-storage-adapter';
import {setCurrentAccountAdapter} from './current-account-adapter';

describe('CurrentAccountAdapter', () => {
  it('Should call LocalSotorage with correct values', () => {
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
});
