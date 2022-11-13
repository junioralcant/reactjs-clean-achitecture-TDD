import {
  HttpPostParams,
  IHttpPostClient,
} from '../protocols/http/http-post-client';
import {
  HttpReponse,
  HttpStatusCode,
} from '../protocols/http/http-response';

export class HttpPosClientSpy<T, R> implements IHttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpReponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams<T>): Promise<HttpReponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}
