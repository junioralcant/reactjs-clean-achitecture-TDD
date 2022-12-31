import {ILoadSurveyList} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {useEffect, useState} from 'react';
import {SurveyModel} from '../../../domain/models';
import {CreateContextSurvey} from './components/contex/contex';
import {ListItem} from './components/list/list';
import './survey-list-styles.scss';
import {ErrorList} from './components/erro/error';

type Props = {
  loadSurveyList: ILoadSurveyList;
};

export function SurveyList({loadSurveyList}: Props) {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[] | undefined,
    error: '',
    reload: false,
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
  }, [state.reload]);

  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <CreateContextSurvey.Provider value={{state, setState}}>
          {state.error ? <ErrorList /> : <ListItem />}
        </CreateContextSurvey.Provider>
      </div>

      <Footer />
    </div>
  );
}
