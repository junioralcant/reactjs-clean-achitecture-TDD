import {AxiosHttpClient} from '../../../infra/http/axios-http-client/axiost-http-client';

export function makeAxiosHttpClient(): AxiosHttpClient {
  return new AxiosHttpClient();
}
