import {faker} from '@faker-js/faker';
import {AuthorizeHttpClientDecorator} from './authorize-http-client-decorator';

import {
  GetStorageSpy,
  HttpClientSpy,
  mockHttpRequest,
} from '../../../data/test';
import {mockAccountModel} from '../../../domain/test';
import {HttpClientRequest} from '../../../data/protocols/http';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpClientDecorator;
  httpClientSpy: HttpClientSpy<any>;
};

function makeSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();

  const sut = new AuthorizeHttpClientDecorator(
    getStorageSpy,
    httpClientSpy
  );

  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  };
}

describe('AuthorizeHttpClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const {sut, getStorageSpy} = makeSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  it('should not add headers if GetStorage if invalid', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpRequest: HttpClientRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement([
        'get',
        'post',
        'put',
        'delete',
      ]),
      headers: {
        field: faker.random.word(),
      },
    };

    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  it('should  add headers to HttpClient', async () => {
    const {sut, getStorageSpy, httpClientSpy} = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpClientRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement([
        'get',
        'post',
        'put',
        'delete',
      ]),
    };

    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('should merge headers to HttpClient', async () => {
    const {sut, getStorageSpy, httpClientSpy} = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.word();
    const httpRequest: HttpClientRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement([
        'get',
        'post',
        'put',
        'delete',
      ]),
      headers: {
        field,
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('should return the same result as HttpClient', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
