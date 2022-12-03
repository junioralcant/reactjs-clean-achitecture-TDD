import {AddAccountParams} from '../useCases';
import {faker} from '@faker-js/faker';

export function mockAddAccountParams(): AddAccountParams {
  const password = faker.internet.password();

  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    passwordConfirmation: password,
  };
}
