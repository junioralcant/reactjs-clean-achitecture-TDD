import {faker} from '@faker-js/faker';
import {AuthorizeHttpGetClientDecorator} from './authorize-http-get-client-decorator';
import {
  HttpGetClientSpy,
  mockGetRequest,
} from '../../../data/test/mock-http/mock-http-get';
import {GetStorageSpy} from '../../../data/test';
import {HttpGetParams} from '../../../data/protocols/http';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpGetClientDecorator;
  httpGetClientSpy: HttpGetClientSpy;
};

function makeSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();

  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  );

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  };
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const {sut, getStorageSpy} = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });

  it('should not add headers if GetStorage if invalid', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    const httpRequest = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word(),
      },
    };

    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });
});
