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
    private readonly httpPostClient: IHttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const accountModel: AccountModel = {
      accessToken: '',
    };

    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return accountModel;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
