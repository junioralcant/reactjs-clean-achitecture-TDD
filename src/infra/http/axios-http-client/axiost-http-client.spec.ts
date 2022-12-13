import axios from 'axios';
import {AxiosHttpClient} from './axiost-http-client';
import {mockAxios, mockHttpResponse} from '../test';
import {mockGetRequest, mockPostReqest} from '../../../data/test';

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
  describe('post', () => {
    it('Should call axios.post with correct URL verb', async () => {
      const request = mockPostReqest();
      const {sut, mockedAxios} = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        request.url,
        request.body
      );
    });

    it('Should return correct response on axios.post', () => {
      const request = mockPostReqest();
      const {sut, mockedAxios} = makeSut();
      const response = sut.post(request);
      expect(response).toEqual(
        mockedAxios.post.mock.results[0].value
      );
    });

    it('Should return correct error on axios.post', () => {
      const request = mockPostReqest();
      const {sut, mockedAxios} = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const response = sut.post(request);
      expect(response).toEqual(
        mockedAxios.post.mock.results[0].value
      );
    });
  });

  describe('get', () => {
    it('Should call axios.get with correct URL verb', async () => {
      const request = mockGetRequest();
      const {sut, mockedAxios} = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });
  });
});
