import {
  EmailInUseError,
  UnexpectedError,
} from '../../../domain/errors';
import {AccountModel} from '../../../domain/models';
import {
  AddAccountParams,
  IAddAccount,
} from '../../../domain/useCases';
import {HttpStatusCode, IHttpPostClient} from '../../protocols/http';

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body as AccountModel;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
