import {AccountModel} from '../../domain/models';
import {mockAccountModel} from '../../domain/test';
import {AddAccountParams, IAddAccount} from '../../domain/useCases';

export class AddAccountSpy implements IAddAccount {
  account = mockAccountModel();
  params: AddAccountParams = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
