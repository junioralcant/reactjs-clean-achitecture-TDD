import { HttpPosClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPosClientSpy;
};

const makeSut = (
  url: string = faker.internet.domainName()
): SutTypes => {
  const httpPostClientSpy = new HttpPosClientSpy();
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
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
