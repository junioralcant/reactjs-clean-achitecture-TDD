import {LocalUpdateCurrentAccountUseCase} from '../../../../data/useCases/update-current-account/local-update-current-account.usecase';
import {IUpdateCurrentAccount} from '../../../../domain/useCases';
import {makeLocalStorageAdapterFactory} from '../../cache/local-storage-adapter-factory';

export function makeLocalUpdateCurrentAccountFactory(): IUpdateCurrentAccount {
  return new LocalUpdateCurrentAccountUseCase(
    makeLocalStorageAdapterFactory()
  );
}
