import {faker} from '@faker-js/faker';
import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {mockSurveyListModel} from '../../../domain/test';
import {HttpStatusCode} from '../../protocols/http';
import {HttpGetClientSpy} from '../../test';
import {RemoteLoadSurveyList} from './remote-load-survey-list.usecase';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy<
    RemoteLoadSurveyList.Model[]
  >();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);

  return {
    sut: sut,
    httpGetClientSpy,
  };
}

describe('RemoteLoadSurveyListUseCase', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const {sut, httpGetClientSpy} = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a list of RemoteLoadSurveyList.Model if HttpGetClient returns 200', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const response = await sut.loadAll();

    expect(response).toEqual(httpResult);
  });

  it('Should return an empty list  if HttpGetClient returns 204', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const response = await sut.loadAll();

    expect(response).toEqual([]);
  });
});
