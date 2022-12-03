import {faker} from '@faker-js/faker';
import {RemoteAddAccount} from './remote-add-account.usecase';
import {HttpPosClientSpy} from '../../test/mock-http/mock-http-client';
import {AddAccountParams} from '../../../domain/useCases';
import {AccountModel} from '../../../domain/models';
import {mockAddAccountParams} from '../../../domain/test/mock-add-account';

type SutType = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPosClientSpy<AddAccountParams, AccountModel>;
};

function makeSut(url: string = faker.internet.url()): SutType {
  const httpPostClientSpy = new HttpPosClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
}
describe('RemoteAddAccount', () => {
  it('Should call HttpPosClient with correct URL', async () => {
    const url = faker.internet.domainName();
    const {sut, httpPostClientSpy} = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });
});