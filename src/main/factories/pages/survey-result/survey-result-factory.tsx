import {useParams} from 'react-router-dom';
import {SurveyResult} from '../../../../presentation/pages/survey-result/survey-result';
import {makeRemoteLoadSurveyResult} from '../../usecases/load-survey-result/remote-load-survey-list-factory';
import {makeRemoteSaveSurveyResult} from '../../usecases/save-survey-result/remote-save-survey-list-factory';

export function MakeSurveyResult() {
  const {id} = useParams();
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id as string)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id as string)}
    />
  );
}
