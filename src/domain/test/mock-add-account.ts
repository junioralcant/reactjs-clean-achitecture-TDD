import {IAddAccount} from '../useCases';
import {faker} from '@faker-js/faker';
import {mockAccountModel} from './mock-account';

export function mockAddAccountParams(): IAddAccount.Params {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: password,
  };
}

export function mockAddAccountModel(): IAddAccount.Model {
  return mockAccountModel();
}

export class AddAccountSpy implements IAddAccount {
  account = mockAddAccountModel();
  params: IAddAccount.Params = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  callsCount = 0;

  async add(params: IAddAccount.Params): Promise<IAddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
