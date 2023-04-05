import {UnexpectedError} from '../../../domain/errors';
import {AccessDeniedError} from '../../../domain/errors/access-denied-error';
import {HttpStatusCode, IHttpGetClient} from '../../protocols/http';
import {ILoadSurveyList} from '../../../domain/useCases/load-survey-list';
import {ILoadSurveyResult} from '../../../domain/useCases/load-survey-result';

export class RemoteLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<ILoadSurveyResult.Model | undefined> {
    const htttpResponse = await this.httpGetClient.get({
      url: this.url,
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
