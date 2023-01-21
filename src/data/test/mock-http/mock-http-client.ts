import {
  HttpPostParams,
  IHttpPostClient,
  HttpReponse,
  HttpStatusCode,
} from '../../protocols/http';

export class HttpPosClientSpy<R> implements IHttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpReponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpReponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}
