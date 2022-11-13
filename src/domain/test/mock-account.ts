import { AuthenticationParams } from '../useCases/authentication';
import { faker } from '@faker-js/faker';
import { AccountModel } from '../models/account.model';

export function mockAuthentication(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function mockAccountModel(): AccountModel {
  return {
    accessToken: faker.random.alphaNumeric(5),
  };
}
