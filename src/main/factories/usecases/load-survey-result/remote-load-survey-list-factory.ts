import {RemoteLoadSurveyResult} from '../../../../data/useCases/load-survey-result/load-survey-result';
import {ILoadSurveyResult} from '../../../../domain/useCases/load-survey-result';
import {makeAuthorizeHttpGetClientDecoratorFactory} from '../../decorators/authorize-http-get-client-decorator-factory';
import {makeApiUrl} from '../../http/api-url-factory';

export function makeRemoteLoadSurveyResult(
  id: string
): ILoadSurveyResult {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpGetClientDecoratorFactory()
  );
}
