import {AccountModel} from '../../domain/models';
import {makeLocalStorageAdapterFactory} from '../factories/cache/local-storage-adapter-factory';

export function setCurrentAccountAdapter(
  account: AccountModel
): void {
  makeLocalStorageAdapterFactory().set('account', account);
}

export function getCurrentAccountAdapter(): AccountModel {
  return makeLocalStorageAdapterFactory().get('account');
}
