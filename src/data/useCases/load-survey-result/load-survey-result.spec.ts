import {faker} from '@faker-js/faker';
import {RemoteLoadSurveyResult} from './load-survey-result';
import {HttpClientSpy} from '../../test';
import {HttpStatusCode} from '../../protocols/http';
import {
  UnexpectedError,
  AccessDeniedError,
} from '../../../domain/errors';

import {mockSurveyResultModel} from '../../../domain/test';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpClientSpy =
    new HttpClientSpy<RemoteLoadSurveyResult.Model>();
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
}

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    const {sut, httpClientSpy} = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectError if HttpClient return 404', async () => {
    const {sut, httpClientSpy} = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectError if HttpClient return 500', async () => {
    const {sut, httpClientSpy} = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a SurveyResult on status 200', async () => {
    const {sut, httpClientSpy} = makeSut();
    const httpResult = mockSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const response = await sut.load();
    expect(response).toEqual(httpResult);
  });
});
