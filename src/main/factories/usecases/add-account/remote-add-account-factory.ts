import {RemoteAddAccount} from '../../../../data/useCases/add-account/remote-add-account.usecase';
import {IAddAccount} from '../../../../domain/useCases';
import {makeApiUrl} from '../../http/api-url-factory';
import {makeAxiosHttpClient} from '../../http/axios-http-client-factory';

export function makeRemoteAddAccount(): IAddAccount {
  const url = makeApiUrl('/signup');
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteAddAccount(url, axiosHttpClient);
}
