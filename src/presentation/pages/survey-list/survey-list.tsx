import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SurveyItemEmpty} from './components/survey-item-empty/survey-item-empty';
import './survey-list-styles.scss';

export function SurveyList() {
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
