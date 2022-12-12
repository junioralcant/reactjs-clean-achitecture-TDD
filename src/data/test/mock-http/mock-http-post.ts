import {faker} from '@faker-js/faker';
import {HttpPostParams} from '../../protocols/http';

export function mockPostReqest(): HttpPostParams {
  return {
    url: faker.internet.url(),
    body: faker.datatype.json(),
  };
}
