import {AuthorizeHttpGetClientDecorator} from './authorize-http-get-client-decorator';
import {mockGetRequest} from '../../../data/test/mock-http/mock-http-get';
import {GetStorageSpy} from '../../../data/test';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpGetClientDecorator;
};

function makeSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

  return {
    sut,
    getStorageSpy,
  };
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', () => {
    const {sut, getStorageSpy} = makeSut();
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
