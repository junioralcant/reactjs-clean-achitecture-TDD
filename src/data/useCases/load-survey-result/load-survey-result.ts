import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient
  ) {}

  async load(): Promise<void> {
    const htttpResponse = await this.httpGetClient.get({
      url: this.url,
    });

    switch (htttpResponse.statusCode) {
      case 403:
        throw new AccessDeniedError();
      case 404:
        throw new UnexpectedError();
      default:
        break;
    }
  }
}
