import {faker} from '@faker-js/faker';
import {UnexpectedError} from '../../../domain/errors';
import {SurveyModel} from '../../../domain/models';
import {HttpStatusCode} from '../../protocols/http';
import {HttpGetClientSpy} from '../../test';
import {RemoteLoadSurveyList} from './remote-load-survey-list.usecase';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
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

  it('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const {sut, httpGetClientSpy} = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
