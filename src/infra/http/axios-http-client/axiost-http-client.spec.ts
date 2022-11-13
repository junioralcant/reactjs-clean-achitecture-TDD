import { AxiosHttpClient } from './axiost-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { HttpPostParams } from '../../../data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostReqest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
});

describe('AxiosHttpClient', () => {
  it('Should call axios with correct URL verb', async () => {
    const request = mockPostReqest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      request.url,
      request.body
    );
  });
});
