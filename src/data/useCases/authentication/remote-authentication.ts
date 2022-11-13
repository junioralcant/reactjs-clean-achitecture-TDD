import { AuthenticationParams } from '../../../domain/useCases/authentication';
import { IHttpPostClient } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpPostClient
  ) {}

  async auth({
    email,
    password,
  }: AuthenticationParams): Promise<void> {
    this.httpPosClient.post({
      url: this.url,
      body: { email, password },
    });
  }
}
