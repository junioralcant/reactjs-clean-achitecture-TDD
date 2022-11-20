import { AccountModel } from '../../domain/models';
import { mockAccountModel } from '../../domain/test';
import {
  AuthenticationParams,
  IAuthentication,
} from '../../domain/useCases';

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel();
  params: AuthenticationParams = {
    email: '',
    password: '',
  };

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return this.account;
  }
}
