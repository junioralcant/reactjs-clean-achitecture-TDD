import {AccountModel} from '../../../domain/models';
import {
  AddAccountParams,
  IAddAccount,
} from '../../../domain/useCases';
import {IHttpPostClient} from '../../protocols/http';

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

    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    return accountModel;
  }
}
