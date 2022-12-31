import {RemoteLoadSurveyList} from '../../../../data/useCases/load-survey-list/remote-load-survey-list.usecase';
import {ILoadSurveyList} from '../../../../domain/useCases';
import {makeApiUrl} from '../../http/api-url-factory';
import {makeAxiosHttpClient} from '../../http/axios-http-client-factory';

export function makeRemoteLoadSurveyList(): ILoadSurveyList {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAxiosHttpClient()
  );
}
