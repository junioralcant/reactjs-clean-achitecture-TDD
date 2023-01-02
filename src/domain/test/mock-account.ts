import {IAuthentication} from '../useCases';
import {faker} from '@faker-js/faker';

export function mockAccountModel(): IAuthentication.Model {
  return {
    accessToken: faker.random.alphaNumeric(5),
    name: faker.name.firstName(),
  };
}
