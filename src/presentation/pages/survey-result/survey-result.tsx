import FlipMove from 'react-flip-move';
import {Footer} from '../../components/footer/footer';
import {Loading} from '../../components/loading/loading';
import './survey-result-styles.scss';
import {Calendar} from '../../components/calendar/calendar';
import {useEffect, useState} from 'react';
import {ILoadSurveyResult} from '../../../domain/useCases/load-survey-result';
import {ErrorList} from '../../components/erro/error';

type Props = {
  loadSurveyResult: ILoadSurveyResult;
};

export function SurveyResult({loadSurveyResult}: Props) {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as unknown as ILoadSurveyResult.Model,
  });

  useEffect(() => {
    async function loadSurvey() {
      await loadSurveyResult.load();
    }

    loadSurvey();
  }, []);

  return (
    <div className="surveyResult">
      {/* <Header /> */}

      <div data-testid="survey-result" className="contenWrap">
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className="calendarWrap" />
              <h2>Qual sua linguagem favorita?</h2>
            </hgroup>

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
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && (
          <ErrorList error={state.error} reload={() => {}} />
        )}
      </div>
      <Footer />
    </div>
  );
}
