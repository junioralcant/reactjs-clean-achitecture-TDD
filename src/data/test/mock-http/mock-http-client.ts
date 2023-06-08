import {faker} from '@faker-js/faker';
import {
  HttpClientRequest,
  HttpResponse,
  HttpStatusCode,
  IHttpClient,
} from '../../protocols/http';

export function mockHttpRequest(): HttpClientRequest {
  return {
    body: faker.datatype.json(),
    url: faker.internet.url(),
    method: faker.helpers.arrayElement([
      'get',
      'post',
      'put',
      'delete',
    ]),
    headers: faker.datatype.json(),
  };
}

export class HttpClientSpy<R> implements IHttpClient<R> {
  url?: string;
  body?: any;
  headers?: any;
  method?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(params: HttpClientRequest): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    this.method = params.method;
    this.headers = params.headers;
    return this.response;
  }
}
