import { InvalidCredentilsError } from '../../../domain/errors/invalid-credentials-erros';
import { UnexpectedError } from '../../../domain/errors/unexpecterd-erros';
import { AuthenticationParams } from '../../../domain/useCases/authentication';
import { IHttpPostClient } from '../../protocols/http/http-post-client';
import { HttpStatusCode } from '../../protocols/http/http-response';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpPostClient
  ) {}

  async auth({
    email,
    password,
  }: AuthenticationParams): Promise<void> {
    const response = await this.httpPosClient.post({
      url: this.url,
      body: { email, password },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentilsError();
      default:
        throw new UnexpectedError();
    }
  }
}
