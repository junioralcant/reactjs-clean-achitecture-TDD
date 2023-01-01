import {faker} from '@faker-js/faker';

import {
  HttpGetParams,
  HttpReponse,
  HttpStatusCode,
  IHttpGetClient,
} from '../../protocols/http/';

export function mockGetRequest(): HttpGetParams {
  return {
    url: faker.internet.url(),
    headers: faker.datatype.json(),
  };
}

export class HttpGetClientSpy<R = any> implements IHttpGetClient<R> {
  url: string = '';
  headers?: any;
  response: HttpReponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpReponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return this.response;
  }
}
