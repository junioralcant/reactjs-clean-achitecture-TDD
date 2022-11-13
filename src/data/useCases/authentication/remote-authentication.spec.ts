import { faker } from '@faker-js/faker';
import { HttpPosClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { mockAuthentication } from '../../../domain/test/mock-authentication';
import { InvalidCredentilsError } from '../../../domain/errors/invalid-credentials-erros';
import { HttpStatusCode } from '../../protocols/http/http-response';
import { UnexpectedError } from '../../../domain/errors/unexpecterd-erros';
import { AuthenticationParams } from '../../../domain/useCases/authentication';
import { AccountModel } from '../../../domain/models/account.model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPosClientSpy<
    AuthenticationParams,
    AccountModel
  >;
};

const makeSut = (
  url: string = faker.internet.domainName()
): SutTypes => {
  const httpPostClientSpy = new HttpPosClientSpy<
    AuthenticationParams,
    AccountModel
  >();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpPosClient with correct URL', async () => {
    const url = faker.internet.domainName();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpPosClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it('Should throw InvalidCredentilsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(
      new InvalidCredentilsError()
    );
  });

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
