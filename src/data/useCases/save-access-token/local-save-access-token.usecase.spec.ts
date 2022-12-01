import {faker} from '@faker-js/faker';
import {SetStorageSpy} from '../../test';
import {LocalSaveAccessTokenUseCase} from './local-save-access-token.usecase';

type SutTypes = {
  sut: LocalSaveAccessTokenUseCase;
  setStorageSpy: SetStorageSpy;
};

function makeSut(): SutTypes {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessTokenUseCase(setStorageSpy);

  return {
    sut,
    setStorageSpy,
  };
}

describe('LocalSaveAccessTokenUseCase', () => {
  it('Should call SetStorage with correct value', async () => {
    const {sut, setStorageSpy} = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
