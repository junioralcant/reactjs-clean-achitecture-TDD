import {IHttpClient} from '../../protocols/http';
import {ISaveSurveyResult} from '../../../domain/useCases';

export class RemoteSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save(
    params: ISaveSurveyResult.Params
  ): Promise<ISaveSurveyResult.Model | undefined> {
    await this.httpGetClient.request({
      url: this.url,
      method: 'put',
    });

    return undefined;
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = ISaveSurveyResult.Model;
}
