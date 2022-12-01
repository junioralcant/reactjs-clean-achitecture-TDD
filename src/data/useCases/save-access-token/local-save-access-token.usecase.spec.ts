import {faker} from '@faker-js/faker';
import {SetStorageSpy} from '../../test';
import {LocalSaveAccessTokenUseCase} from './local-save-access-token.usecase';

describe('LocalSaveAccessTokenUseCase', () => {
  it('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessTokenUseCase(setStorageSpy);
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
