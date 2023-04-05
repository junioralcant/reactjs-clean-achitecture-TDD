import {faker} from '@faker-js/faker';
import {RemoteLoadSurveyResult} from './load-survey-result';
import {HttpGetClientSpy} from '../../test';
import {HttpStatusCode} from '../../protocols/http';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

function makeSut(url: string): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
}

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const {sut, httpGetClientSpy} = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw AccessDeniedError if HttpGetClient return 403', async () => {
    const url = faker.internet.url();
    const {sut, httpGetClientSpy} = makeSut(url);

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });
});
