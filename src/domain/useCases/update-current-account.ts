import {AccountModel} from '../models';

export interface IUpdateCurrentAccount {
  save(account?: AccountModel): Promise<void>;
}
