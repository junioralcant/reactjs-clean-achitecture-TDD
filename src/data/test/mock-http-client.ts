import {
  HttpPostParams,
  IHttpPostClient,
} from '../protocols/http/http-post-client';

export class HttpPosClientSpy implements IHttpPostClient {
  url?: string;
  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
  }
}
