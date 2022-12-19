import {UnexpectedError} from '../../domain/errors';
import {AccountModel} from '../../domain/models';
import {makeLocalStorageAdapterFactory} from '../factories/cache/local-storage-adapter-factory';

export function setCurrentAccountAdapter(
  account: AccountModel
): void {
  if (!account?.accessToken) {
    throw new UnexpectedError();
  }

  makeLocalStorageAdapterFactory().set('account', account);
}
