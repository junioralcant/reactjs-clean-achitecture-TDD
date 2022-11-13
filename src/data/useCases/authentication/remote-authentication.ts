import { IHttpPostClient } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpPostClient
  ) {}

  async auth(): Promise<void> {
    this.httpPosClient.post({
      url: this.url,
    });
  }
}
