import {RemoteSaveSurveyResult} from '../../../../data/useCases/save-survey-result/remote-save-survey-result.usecase';
import {ISaveSurveyResult} from '../../../../domain/useCases';
import {makeAuthorizeHttpClientDecoratorFactory} from '../../decorators/authorize-http-client-decorator-factory';
import {makeApiUrl} from '../../http/api-url-factory';

export function makeRemoteSaveSurveyResult(
  id: string
): ISaveSurveyResult {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecoratorFactory()
  );
}
