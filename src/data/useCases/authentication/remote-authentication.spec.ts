import {faker} from '@faker-js/faker';
import {HttpClientSpy} from '../../test';
import {RemoteAuthentication} from './remote-authentication';
import {
  mockAuthenticationModel,
  mockAuthentication,
} from '../../../domain/test';
import {
  InvalidCredentilsError,
  UnexpectedError,
} from '../../../domain/errors';
import {HttpStatusCode} from '../../protocols/http';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>;
};

const makeSut = (
  url: string = faker.internet.domainName()
): SutTypes => {
  const httpClientSpy =
    new HttpClientSpy<RemoteAuthentication.Model>();

  const sut = new RemoteAuthentication(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL as method', async () => {
    const url = faker.internet.domainName();
    const {sut, httpClientSpy} = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  it('Should call HttpClient with correct body', async () => {
    const {sut, httpClientSpy} = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  it('Should throw InvalidCredentilsError if HttpClient returns 401', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(
      new InvalidCredentilsError()
    );
  });

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
