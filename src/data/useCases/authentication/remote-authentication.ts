import { HttpPostClient } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    this.httpPosClient.post(this.url);
  }
}
