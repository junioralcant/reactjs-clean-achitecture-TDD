import {useEffect, useState} from 'react';
import {Footer} from '../../components/footer/footer';
import {Loading} from '../../components/loading/loading';
import './survey-result-styles.scss';
import {
  ISaveSurveyResult,
  ILoadSurveyResult,
} from '../../../domain/useCases';
import {useErrorHandler} from '../../hooks/use-error-handler';
import {Calendar} from '../../components/calendar/calendar';
import {ErrorList} from '../../components/erro/error';
import {Header} from '../../components/header/header';

type Props = {
  loadSurveyResult: ILoadSurveyResult;
  saveSurveyResult: ISaveSurveyResult;
};

export function SurveyResult({
  loadSurveyResult,
  saveSurveyResult,
}: Props) {
  const handleErrorHook = useErrorHandler((error: Error) => {
    setState({
      ...state,
      surveyResult: undefined,
      isLoading: false,
      error: error.message,
    });
  });

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: undefined as ILoadSurveyResult.Model | undefined,
    reload: false,
  });

  useEffect(() => {
    async function loadSurvey() {
      try {
        const surveyResult = await loadSurveyResult.load();

        setState({...state, surveyResult});
      } catch (error: any) {
        handleErrorHook(error);
      }
    }

    loadSurvey();
  }, [state.reload]);

  function reload() {
    setState({
      isLoading: false,
      surveyResult: undefined,
      error: '',
      reload: !state.reload,
    });
  }

  async function answerClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    answer: string
  ): Promise<void> {
    if (event.currentTarget.classList.contains('active')) {
      return;
    }

    try {
      setState((old) => ({...old, isLoading: true}));

      const surveyResult = await saveSurveyResult.save({
        answers: answer,
      });

      setState((old) => ({...old, surveyResult, isLoading: false}));
    } catch (error: any) {
      handleErrorHook(error);
    }
  }

  return (
    <div className="surveyResult">
      <Header />

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
                  onClick={(e) => answerClick(e, answer.answer)}
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
          <ErrorList error={state.error} reload={reload} />
        )}
      </div>
      <Footer />
    </div>
  );
}
