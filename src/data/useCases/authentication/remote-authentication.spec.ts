import { faker } from '@faker-js/faker';
import { HttpPosClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { mockAuthentication } from '../../../domain/test/mock-authentication';

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
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpPosClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
