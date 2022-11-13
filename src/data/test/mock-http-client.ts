import {
  HttpPostParams,
  IHttpPostClient,
} from '../protocols/http/http-post-client';
import {
  HttpReponse,
  HttpStatusCode,
} from '../protocols/http/http-response';

export class HttpPosClientSpy implements IHttpPostClient {
  url?: string;
  body?: object;
  response: HttpReponse = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpReponse> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}
