import { InvalidCredentilsError } from '../../../domain/errors/invalid-credentials-erros';
import { UnexpectedError } from '../../../domain/errors/unexpecterd-erros';
import { AccountModel } from '../../../domain/models/account.model';
import {
  AuthenticationParams,
  IAuthentication,
} from '../../../domain/useCases/authentication';
import { IHttpPostClient } from '../../protocols/http/http-post-client';
import { HttpStatusCode } from '../../protocols/http/http-response';

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth({
    email,
    password,
  }: AuthenticationParams): Promise<AccountModel | undefined> {
    const response = await this.httpPosClient.post({
      url: this.url,
      body: { email, password },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentilsError();
      default:
        throw new UnexpectedError();
    }
  }
}
