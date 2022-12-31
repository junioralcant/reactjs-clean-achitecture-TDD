import {ILoadSurveyList} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {SurveyItemEmpty} from './components/survey-item-empty/survey-item-empty';
import './survey-list-styles.scss';
import {useEffect, useState} from 'react';
import {SurveyModel} from '../../../domain/models';
import {SurveyItem} from './components/survey-item/survey-item';

type Props = {
  loadSurveyList: ILoadSurveyList;
};

export function SurveyList({loadSurveyList}: Props) {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[] | undefined,
    error: '',
  });

  useEffect(() => {
    async function loadSurvey() {
      try {
        const surveys = await loadSurveyList.loadAll();

        setState({...state, surveys});
      } catch (error: any) {
        setState({...state, error: error.message});
      }
    }

    loadSurvey();
  }, []);

  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        {state.error ? (
          <div>
            <span data-testid="error">{state.error}</span>
            <button>Recarregar</button>
          </div>
        ) : (
          <ul data-testid="survey-list">
            {state.surveys?.length ? (
              state.surveys.map((survey: SurveyModel) => (
                <SurveyItem key={survey.id} survey={survey} />
              ))
            ) : (
              <SurveyItemEmpty />
            )}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}
