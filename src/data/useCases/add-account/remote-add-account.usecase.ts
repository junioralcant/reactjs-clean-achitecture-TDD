import {
  EmailInUseError,
  UnexpectedError,
} from '../../../domain/errors';
import {IAddAccount} from '../../../domain/useCases';
import {HttpStatusCode, IHttpClient} from '../../protocols/http';

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteAddAccount.Model>
  ) {}

  async add(params: IAddAccount.Params): Promise<IAddAccount.Model> {
    const response = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body as IAddAccount.Model;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = IAddAccount.Model;
}
