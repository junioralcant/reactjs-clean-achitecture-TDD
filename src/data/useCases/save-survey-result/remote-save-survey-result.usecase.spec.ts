import {faker} from '@faker-js/faker';
import {HttpClientSpy} from '../../test';
import {RemoteSaveSurveyResult} from './remote-save-survey-result.usecase';

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
    await sut.save({answers: faker.random.words()});
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
  });
});
