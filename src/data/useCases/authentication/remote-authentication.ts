import {InvalidCredentilsError} from '../../../domain/errors';
import {UnexpectedError} from '../../../domain/errors';
import {AccountModel} from '../../../domain/models';
import {
  AuthenticationParams,
  IAuthentication,
} from '../../../domain/useCases';
import {IHttpPostClient, HttpStatusCode} from '../../protocols/http';

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpPostClient<AccountModel>
  ) {}

  async auth({
    email,
    password,
  }: AuthenticationParams): Promise<AccountModel | undefined> {
    const response = await this.httpPosClient.post({
      url: this.url,
      body: {email, password},
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentilsError();
      default:
        throw new UnexpectedError();
    }
  }
}
