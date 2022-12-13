import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import './survey-list-styles.scss';

export function SurveyList() {
  return (
    <div className="surveyList">
      <header className="headerWrap">
        <div className="headerContent">
          <Logo />
          <div className="logoutWrap">
            <span>Rodrigo</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className="surveyContent">
              <time>
                <span className="day">22</span>
                <span className="month">03</span>
                <span className="year">2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}
