import {RemoteAuthentication} from '../../../../data/useCases/authentication/remote-authentication';
import {IAuthentication} from '../../../../domain/useCases';
import {makeApiUrl} from '../../http/api-url-factory';
import {makeAxiosHttpClient} from '../../http/axios-http-client-factory';

export function makeRemoteAuthentication(): IAuthentication {
  const url = makeApiUrl('login');
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteAuthentication(url, axiosHttpClient);
}
