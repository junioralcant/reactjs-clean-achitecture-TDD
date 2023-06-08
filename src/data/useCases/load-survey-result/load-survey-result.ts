import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {HttpStatusCode, IHttpClient} from '../../protocols/http';
import {ILoadSurveyResult} from '../../../domain/useCases/load-survey-result';

export class RemoteLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<ILoadSurveyResult.Model | undefined> {
    const htttpResponse = await this.httpGetClient.request({
      url: this.url,
      method: 'get',
    });

    switch (htttpResponse.statusCode) {
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.ok:
        return htttpResponse.body;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = ILoadSurveyResult.Model;
}
