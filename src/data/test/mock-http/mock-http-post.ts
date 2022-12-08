import {faker} from '@faker-js/faker';
import {HttpPostParams} from '../../protocols/http';

export function mockPostReqest(): HttpPostParams<any> {
  return {
    url: faker.internet.url(),
    body: faker.datatype.json(),
  };
}
