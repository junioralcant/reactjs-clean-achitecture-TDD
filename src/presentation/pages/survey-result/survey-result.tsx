import FlipMove from 'react-flip-move';
import {Footer} from '../../components/footer/footer';
import {Loading} from '../../components/loading/loading';
import './survey-result-styles.scss';

export function SurveyResult() {
  return (
    <div className="surveyResult">
      {/* <Header /> */}

      <div className="contenWrap">
        <h2>Qual sua linguagem favorita?</h2>

        <FlipMove className="answersList">
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className="answer">TypeScript</span>
            <span className="percent">50%</span>
          </li>
          <li className="active">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className="answer">TypeScript</span>
            <span className="percent">50%</span>
          </li>
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
            <span className="answer">TypeScript</span>
            <span className="percent">50%</span>
          </li>
        </FlipMove>

        <button>Voltar</button>

        <Loading />
      </div>
      <Footer />
    </div>
  );
}
