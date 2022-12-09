import {faker} from '@faker-js/faker';
import {UnexpectedError} from '../../../domain/errors';
import {SetStorageMock} from '../../test';
import {LocalSaveAccessTokenUseCase} from './local-save-access-token.usecase';

type SutTypes = {
  sut: LocalSaveAccessTokenUseCase;
  setStorageMock: SetStorageMock;
};

function makeSut(): SutTypes {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessTokenUseCase(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
}

describe('LocalSaveAccessTokenUseCase', () => {
  it('Should call SetStorage with correct value', async () => {
    const {sut, setStorageMock} = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  it('Should throw if accessToken is falsy', () => {
    const {sut} = makeSut();
    const response = sut.save('');
    expect(response).rejects.toThrow(new UnexpectedError());
  });
});
