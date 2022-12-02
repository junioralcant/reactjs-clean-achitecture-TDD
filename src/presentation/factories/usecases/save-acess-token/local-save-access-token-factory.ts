import {LocalSaveAccessTokenUseCase} from '../../../../data/useCases/save-access-token/local-save-access-token.usecase';
import {ISaveAccessToken} from '../../../../domain/useCases';
import {makeLocalStorageAdapterFactory} from '../../cache/local-storage-adapter-factory';

export function makeLocalSaveAccessTokenFactory(): ISaveAccessToken {
  return new LocalSaveAccessTokenUseCase(
    makeLocalStorageAdapterFactory()
  );
}
