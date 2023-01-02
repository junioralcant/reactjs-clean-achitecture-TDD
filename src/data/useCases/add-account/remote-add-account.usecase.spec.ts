import {faker} from '@faker-js/faker';
import {RemoteAddAccount} from './remote-add-account.usecase';
import {HttpPosClientSpy} from '../../test/mock-http/mock-http-client';
import {mockAddAccountParams} from '../../../domain/test/mock-add-account';
import {HttpStatusCode} from '../../protocols/http';
import {
  EmailInUseError,
  UnexpectedError,
} from '../../../domain/errors';
import {mockAuthenticationModel} from '../../../domain/test';

type SutType = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPosClientSpy<RemoteAddAccount.Model>;
};

function makeSut(url: string = faker.internet.url()): SutType {
  const httpPostClientSpy =
    new HttpPosClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
}
describe('RemoteAddAccount', () => {
  it('Should call HttpPosClient with correct URL', async () => {
    const url = faker.internet.domainName();
    const {sut, httpPostClientSpy} = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpPosClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  it('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an AddAccount.Model if HttpPostClient returns 200', async () => {
    const {sut, httpPostClientSpy} = makeSut();
    const httpResult = mockAuthenticationModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());

    expect(account).toEqual(httpResult);
  });
});
