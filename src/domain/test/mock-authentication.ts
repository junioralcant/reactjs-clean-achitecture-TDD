import {IAuthentication} from '../useCases';
import {faker} from '@faker-js/faker';
import {mockAccountModel} from './mock-account';

export function mockAuthentication(): IAuthentication.Params {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function mockAuthenticationModel(): IAuthentication.Model {
  return mockAccountModel();
}

export class AuthenticationSpy implements IAuthentication {
  account = mockAuthenticationModel();
  params: IAuthentication.Params = {
    email: '',
    password: '',
  };

  callsCount = 0;

  async auth(
    params: IAuthentication.Params
  ): Promise<IAuthentication.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }

  getCallsCount(): number {
    return this.callsCount;
  }
}
