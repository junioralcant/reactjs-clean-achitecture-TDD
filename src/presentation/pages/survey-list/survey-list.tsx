import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {Icon, IconName} from '../../components/icon/icon';
import './survey-list-styles.scss';

export function SurveyList() {
  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className="surveyContent">
              <Icon
                className="iconWrap"
                iconName={IconName.thumbUp}
              />
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}
