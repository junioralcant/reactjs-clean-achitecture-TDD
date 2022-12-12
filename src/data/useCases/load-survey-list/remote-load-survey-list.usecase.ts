import {
  EmailInUseError,
  UnexpectedError,
} from '../../../domain/errors';
import {HttpStatusCode, IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient
  ) {}

  async loadAll() {
    const response = await this.httpGetClient.get({url: this.url});
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
