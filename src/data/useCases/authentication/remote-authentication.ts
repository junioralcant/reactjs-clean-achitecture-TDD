import {InvalidCredentilsError} from '../../../domain/errors';
import {UnexpectedError} from '../../../domain/errors';
import {IAuthentication} from '../../../domain/useCases';
import {IHttpClient, HttpStatusCode} from '../../protocols/http';

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPosClient: IHttpClient<RemoteAuthentication.Model>
  ) {}

  async auth({
    email,
    password,
  }: IAuthentication.Params): Promise<
    IAuthentication.Model | undefined
  > {
    const response = await this.httpPosClient.request({
      url: this.url,
      method: 'post',
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

export namespace RemoteAuthentication {
  export type Model = IAuthentication.Model;
}
