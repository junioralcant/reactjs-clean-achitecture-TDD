import {AccountModel} from '../../domain/models';
import {IUpdateCurrentAccount} from '../../domain/useCases/';

export class UpdateCurrentAccountMock
  implements IUpdateCurrentAccount
{
  account?: AccountModel;

  async save(account?: AccountModel): Promise<void> {
    this.account = account;
  }
}
