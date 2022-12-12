import {
  HttpPostParams,
  IHttpPostClient,
  HttpReponse,
  HttpStatusCode,
} from '../../protocols/http';

export class HttpPosClientSpy<ResponseType>
  implements IHttpPostClient<ResponseType>
{
  url?: string;
  body?: any;
  response: HttpReponse<ResponseType> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(
    params: HttpPostParams
  ): Promise<HttpReponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}
