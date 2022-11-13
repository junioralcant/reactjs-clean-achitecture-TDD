import { IHttpPostClient } from '../protocols/http/http-post-client';

export class HttpPosClientSpy implements IHttpPostClient {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
  }
}
