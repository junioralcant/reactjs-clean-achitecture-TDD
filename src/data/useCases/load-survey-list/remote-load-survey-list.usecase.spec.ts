import {faker} from '@faker-js/faker';
import {HttpGetClientSpy} from '../../test';
import {RemoteLoadSurveyList} from './remote-load-survey-list.usecase';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpGetClientSpy = new HttpGetClientSpy();
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
});
