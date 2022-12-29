import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import './survey-list-styles.scss';

export function SurveyList() {
  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}
