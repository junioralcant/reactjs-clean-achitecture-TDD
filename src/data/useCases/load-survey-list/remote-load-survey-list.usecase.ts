import {UnexpectedError} from '../../../domain/errors';
import {ILoadSurveyList} from '../../../domain/useCases';
import {HttpStatusCode, IHttpGetClient} from '../../protocols/http';

export class RemoteLoadSurveyList implements ILoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<
      RemoteLoadSurveyList.Model[]
    >
  ) {}

  async loadAll(): Promise<ILoadSurveyList.Model[] | undefined> {
    const response = await this.httpGetClient.get({url: this.url});
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = ILoadSurveyList.Model;
}
