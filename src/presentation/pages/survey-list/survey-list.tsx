import {ILoadSurveyList} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SurveyItemEmpty} from './components/survey-item-empty/survey-item-empty';
import './survey-list-styles.scss';
import {useEffect} from 'react';

type Props = {
  loadSurveyList: ILoadSurveyList;
};

export function SurveyList({loadSurveyList}: Props) {
  useEffect(() => {
    async function loadSurvey() {
      await loadSurveyList.loadAll();
    }

    loadSurvey();
  }, []);
  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  );
}
