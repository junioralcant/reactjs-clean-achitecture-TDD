import {IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient
  ) {}

  async load(): Promise<void> {
    this.httpGetClient.get({url: this.url});
  }
}
