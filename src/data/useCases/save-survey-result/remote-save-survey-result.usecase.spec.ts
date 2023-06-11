import {faker} from '@faker-js/faker';
import {HttpClientSpy} from '../../test';
import {RemoteSaveSurveyResult} from './remote-save-survey-result.usecase';
import {mockSaveResultParams} from '../../../domain/test';
import {HttpStatusCode} from '../../protocols/http';
import {
  AccessDeniedError,
  UnexpectedError,
} from '../../../domain/errors';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpClientSpy =
    new HttpClientSpy<RemoteSaveSurveyResult.Model>();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
}

describe('RemoteSaveSurveyResult', () => {
  it('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const {sut, httpClientSpy} = makeSut(url);
    const saveSurveyResultParams = mockSaveResultParams();
    await sut.save(saveSurveyResultParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toBe(saveSurveyResultParams);
  });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    const {sut, httpClientSpy} = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.save(mockSaveResultParams());
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectError if HttpClient return 404', async () => {
    const {sut, httpClientSpy} = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.save(mockSaveResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
