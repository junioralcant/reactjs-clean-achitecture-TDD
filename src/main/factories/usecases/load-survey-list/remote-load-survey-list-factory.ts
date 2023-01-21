import {RemoteLoadSurveyList} from '../../../../data/useCases/load-survey-list/remote-load-survey-list.usecase';
import {ILoadSurveyList} from '../../../../domain/useCases';
import {makeAuthorizeHttpGetClientDecoratorFactory} from '../../decorators/authorize-http-get-client-decorator-factory';
import {makeApiUrl} from '../../http/api-url-factory';

export function makeRemoteLoadSurveyList(): ILoadSurveyList {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecoratorFactory()
  );
}
