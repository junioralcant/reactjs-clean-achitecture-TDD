import {useEffect, useState} from 'react';
import {Footer} from '../../components/footer/footer';
import {Loading} from '../../components/loading/loading';
import './survey-result-styles.scss';
import {Calendar} from '../../components/calendar/calendar';
import {ILoadSurveyResult} from '../../../domain/useCases/load-survey-result';
import {ErrorList} from '../../components/erro/error';

type Props = {
  loadSurveyResult: ILoadSurveyResult;
};

export function SurveyResult({loadSurveyResult}: Props) {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: undefined as ILoadSurveyResult.Model | undefined,
  });

  useEffect(() => {
    async function loadSurvey() {
      const surveyResult = await loadSurveyResult.load();

      setState({...state, surveyResult});
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
              <Calendar
                data-testid="calendar"
                date={state.surveyResult.date}
                className="calendarWrap"
              />
              <h2 data-testid="question">
                {state.surveyResult.question}
              </h2>
            </hgroup>

            <div data-testid="answers" className="answersList">
              {state.surveyResult.answers.map((answer) => (
                <li
                  data-testid="answer-wrap"
                  key={answer.answer}
                  className={
                    answer.isCurrentAccountAnswer ? 'active' : ''
                  }
                >
                  {answer.image && (
                    <img
                      data-testid="image"
                      src={answer.image}
                      alt={answer.answer}
                    />
                  )}
                  <span data-testid="answer" className="answer">
                    {answer.answer}
                  </span>
                  <span data-testid="percent" className="percent">
                    {answer.percent}%
                  </span>
                </li>
              ))}
            </div>

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
