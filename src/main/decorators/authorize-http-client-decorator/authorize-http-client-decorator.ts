import {IGetStorage} from '../../../data/protocols/cache/get-storage';
import {
  HttpClientRequest,
  HttpResponse,
  IHttpClient,
} from '../../../data/protocols/http';

export class AuthorizeHttpClientDecorator implements IHttpClient {
  constructor(
    private readonly getStorage: IGetStorage,
    private readonly httpGetClient: IHttpClient
  ) {}

  async request(data: HttpClientRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account');

    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      });
    }

    const httpResponse = await this.httpGetClient.request(data);

    return httpResponse;
  }
}
