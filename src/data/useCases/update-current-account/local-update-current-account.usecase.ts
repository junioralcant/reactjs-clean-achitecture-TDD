import {UnexpectedError} from '../../../domain/errors';
import {AccountModel} from '../../../domain/models';
import {IUpdateCurrentAccount} from '../../../domain/useCases';
import {ISetStorage} from '../../protocols/cache/set-storage';

export class LocalUpdateCurrentAccountUseCase
  implements IUpdateCurrentAccount
{
  constructor(private readonly setStorage: ISetStorage) {}

  async save(account?: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError();
    }
    this.setStorage.set('account', JSON.stringify(account));
  }
}
