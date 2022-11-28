import axios from 'axios';
import {faker} from '@faker-js/faker';

export function mockHttpResponse() {
  return {
    data: faker.datatype.json(),
    status: faker.datatype.number(),
  };
}

export function mockAxios(): jest.Mocked<typeof axios> {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue(mockHttpResponse());

  return mockedAxios;
}
