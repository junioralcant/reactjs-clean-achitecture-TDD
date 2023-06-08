import axios from 'axios';
import {AxiosHttpClient} from './axiost-http-client';
import {mockAxios, mockHttpResponse} from '../test';
import {mockHttpRequest} from '../../../data/test';

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
  describe('request', () => {
    it('Should call axios.request with correct URL verb', async () => {
      const request = mockHttpRequest();
      const {sut, mockedAxios} = makeSut();
      await sut.request(request);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        data: request.body,
        headers: request.headers,
        method: request.method,
      });
    });

    it('Should return correct response on axios.request', async () => {
      const request = mockHttpRequest();
      const {sut, mockedAxios} = makeSut();
      const httpResponse = await sut.request(request);
      const axiosResponse = await mockedAxios.request.mock.results[0]
        .value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    it('Should return correct error on axios.request', () => {
      const request = mockHttpRequest();
      const {sut, mockedAxios} = makeSut();
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const response = sut.request(request);
      expect(response).toEqual(
        mockedAxios.request.mock.results[0].value
      );
    });
  });
});
