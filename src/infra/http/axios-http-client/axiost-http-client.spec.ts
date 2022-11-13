import { AxiosHttpClient } from './axiost-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct URL verb', async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
