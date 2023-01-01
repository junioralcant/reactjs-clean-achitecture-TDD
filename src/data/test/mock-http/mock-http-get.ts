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

export class HttpGetClientSpy<R> implements IHttpGetClient<R> {
  url: string = '';
  response: HttpReponse<R> = {
    statusCode: HttpStatusCode.ok,
  };
  async get(params: HttpGetParams): Promise<HttpReponse<R>> {
    this.url = params.url;
    return this.response;
  }
}
