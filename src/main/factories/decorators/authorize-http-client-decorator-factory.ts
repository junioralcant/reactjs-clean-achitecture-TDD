import {IHttpClient} from '../../../data/protocols/http';
import {AuthorizeHttpClientDecorator} from '../../decorators/authorize-http-client-decorator/authorize-http-client-decorator';
import {makeLocalStorageAdapterFactory} from '../cache/local-storage-adapter-factory';
import {makeAxiosHttpClient} from '../http/axios-http-client-factory';

export function makeAuthorizeHttpClientDecoratorFactory(): IHttpClient {
  return new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapterFactory(),
    makeAxiosHttpClient()
  );
}
