import {IHttpGetClient} from '../../../data/protocols/http';
import {AuthorizeHttpGetClientDecorator} from '../../decorators/authorize-http-get-client-decorator/authorize-http-get-client-decorator';
import {makeLocalStorageAdapterFactory} from '../cache/local-storage-adapter-factory';
import {makeAxiosHttpClient} from '../http/axios-http-client-factory';

export function makeAuthorizeHttpGetClientDecoratorFactory(): IHttpGetClient {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapterFactory(),
    makeAxiosHttpClient()
  );
}
