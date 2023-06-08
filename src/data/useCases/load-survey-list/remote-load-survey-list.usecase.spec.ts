import {faker} from '@faker-js/faker';
import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {mockSurveyListModel} from '../../../domain/test';
import {HttpStatusCode} from '../../protocols/http';
import {HttpClientSpy} from '../../test';
import {RemoteLoadSurveyList} from './remote-load-survey-list.usecase';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpClientSpy = new HttpClientSpy<
    RemoteLoadSurveyList.Model[]
  >();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);

  return {
    sut: sut,
    httpClientSpy,
  };
}

describe('RemoteLoadSurveyListUseCase', () => {
  it('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a list of RemoteLoadSurveyList.Model if HttpClient returns 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const response = await sut.loadAll();

    expect(response).toEqual(httpResult);
  });

  it('Should return an empty list  if HttpClient returns 204', async () => {
    const {sut, httpClientSpy} = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const response = await sut.loadAll();

    expect(response).toEqual([]);
  });
});
