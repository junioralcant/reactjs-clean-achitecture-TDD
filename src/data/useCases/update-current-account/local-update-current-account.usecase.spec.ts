import {faker} from '@faker-js/faker';
import {UnexpectedError} from '../../../domain/errors';
import {mockAccountModel} from '../../../domain/test';
import {SetStorageMock} from '../../test';
import {LocalUpdateCurrentAccountUseCase} from './local-update-current-account.usecase';

type SutTypes = {
  sut: LocalUpdateCurrentAccountUseCase;
  setStorageMock: SetStorageMock;
};

function makeSut(): SutTypes {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccountUseCase(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
}

describe('LocalUpdateCurrentAccountUseCase', () => {
  it('Should call SetStorage with correct value', async () => {
    const {sut, setStorageMock} = makeSut();
    const account = mockAccountModel();
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  it('Should throw if accessToken is falsy', () => {
    const {sut} = makeSut();
    const response = sut.save(undefined);
    expect(response).rejects.toThrow(new UnexpectedError());
  });
});
