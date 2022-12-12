import {HttpGetParams, IHttpGetClient} from '../../protocols/http/';

export class HttpGetClientSpy implements IHttpGetClient {
  url: string = '';

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}
