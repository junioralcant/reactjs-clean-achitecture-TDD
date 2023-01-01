import {AuthorizeHttpGetClientDecorator} from './authorize-http-get-client-decorator';
import {mockGetRequest} from '../../../data/test/mock-http/mock-http-get';
import {GetStorageSpy} from '../../../data/test';

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe('account');
  });
});
