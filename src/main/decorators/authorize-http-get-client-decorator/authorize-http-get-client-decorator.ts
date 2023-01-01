import {IGetStorage} from '../../../data/protocols/cache/get-storage';
import {mockHttpResponse} from '../../../infra/http/test/mock-axios';
import {
  HttpGetParams,
  HttpReponse,
  HttpStatusCode,
  IHttpGetClient,
} from '../../../data/protocols/http';

export class AuthorizeHttpGetClientDecorator
  implements IHttpGetClient
{
  constructor(
    private readonly getStorage: IGetStorage,
    private readonly httpGetClient: IHttpGetClient
  ) {}
  async get(params: HttpGetParams): Promise<HttpReponse> {
    const account = this.getStorage.get('account');
    // console.log(account);

    // decorator in action
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken,
        },
      });
    }
    await this.httpGetClient.get(params);
    return {
      statusCode: HttpStatusCode.ok,
      body: undefined,
    };
  }
}
