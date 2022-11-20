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

  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }

  getCallsCount(): number {
    return this.callsCount;
  }
}
