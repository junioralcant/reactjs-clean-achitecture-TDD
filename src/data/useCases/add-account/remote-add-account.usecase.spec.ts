import {faker} from '@faker-js/faker';
import {RemoteAddAccount} from './remote-add-account.usecase';
import {HttpClientSpy} from '../../test/mock-http/mock-http-client';
import {mockAddAccountParams} from '../../../domain/test/mock-add-account';
import {HttpStatusCode} from '../../protocols/http';
import {
  EmailInUseError,
  UnexpectedError,
} from '../../../domain/errors';
import {mockAuthenticationModel} from '../../../domain/test';

type SutType = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>;
};

function makeSut(url: string = faker.internet.url()): SutType {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
}
describe('RemoteAddAccount', () => {
  it('Should call HttpPosClient with correct URL and Method', async () => {
    const url = faker.internet.domainName();
    const {sut, httpClientSpy} = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  it('Should call HttpPosClient with correct body', async () => {
    const {sut, httpClientSpy} = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  it('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an AddAccount.Model if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());

    expect(account).toEqual(httpResult);
  });
});
