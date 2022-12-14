import axios from 'axios';
import {AxiosHttpClient} from './axiost-http-client';
import {mockAxios, mockHttpResponse} from '../test';
import {mockPostReqest} from '../../../data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct URL verb', async () => {
    const request = mockPostReqest();
    const {sut, mockedAxios} = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      request.url,
      request.body
    );
  });

  it('Should return the correct statusCode and body', () => {
    const request = mockPostReqest();
    const {sut, mockedAxios} = makeSut();
    const response = sut.post(request);
    expect(response).toEqual(mockedAxios.post.mock.results[0].value);
  });

  it('Should return the correct statusCode and body on failure', () => {
    const request = mockPostReqest();
    const {sut, mockedAxios} = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const response = sut.post(request);
    expect(response).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
