import {UnexpectedError} from '../../../domain/errors';
import {SurveyModel} from '../../../domain/models';
import {ILoadSurveyList} from '../../../domain/useCases';
import {HttpStatusCode, IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyList implements ILoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<SurveyModel[] | undefined> {
    const response = await this.httpGetClient.get({url: this.url});
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
        throw new UnexpectedError();
    }
  }
}
