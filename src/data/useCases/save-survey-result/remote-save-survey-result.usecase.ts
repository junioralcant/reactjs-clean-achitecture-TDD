import {HttpStatusCode, IHttpClient} from '../../protocols/http';
import {ISaveSurveyResult} from '../../../domain/useCases';
import {
  AccessDeniedError,
  UnexpectedError,
} from '../../../domain/errors';

export class RemoteSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(
    params: ISaveSurveyResult.Params
  ): Promise<ISaveSurveyResult.Model | undefined> {
    const httpResponse = await this.httpGetClient.request({
      url: this.url,
      method: 'put',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = ISaveSurveyResult.Model;
}
