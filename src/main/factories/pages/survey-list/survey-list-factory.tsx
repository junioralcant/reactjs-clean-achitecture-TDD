import {SurveyList} from '../../../../presentation/pages/survey-list/survey-list';
import {makeRemoteLoadSurveyList} from '../../usecases/load-survey-list/remote-load-survey-list-factory';

export function MakeSurveyList() {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
}
