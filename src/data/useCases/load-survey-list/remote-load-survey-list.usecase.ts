import {IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient
  ) {}

  async loadAll() {
    await this.httpGetClient.get({url: this.url});
  }
}
