import {ILoadSurveyList} from '../../../domain/useCases';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {useEffect, useState, useContext} from 'react';
import {CreateContextSurvey} from './components/contex/contex';
import {ListItem} from './components/list/list';
import {ErrorList} from '../../components/erro/error';
import {useErrorHandler} from '../../hooks/use-error-handler';
import './survey-list-styles.scss';

type Props = {
  loadSurveyList: ILoadSurveyList;
};

export function SurveyList({loadSurveyList}: Props) {
  const handleErrorHook = useErrorHandler((error: Error) => {
    setState({...state, error: error.message});
  });

  const [state, setState] = useState({
    surveys: [] as ILoadSurveyList.Model[] | undefined,
    error: '',
    reload: false,
  });

  useEffect(() => {
    async function loadSurvey() {
      try {
        const surveys = await loadSurveyList.loadAll();

        setState({...state, surveys});
      } catch (error: any) {
        handleErrorHook(error);
      }
    }

    loadSurvey();
  }, [state.reload]);

  function reload() {
    setState({
      surveys: [],
      error: '',
      reload: !state.reload,
    });
  }

  return (
    <div className="surveyList">
      <Header />

      <div className="contenWrap">
        <h2>Enquetes</h2>
        <CreateContextSurvey.Provider value={{state, setState}}>
          {state.error ? (
            <ErrorList error={state.error} reload={reload} />
          ) : (
            <ListItem />
          )}
        </CreateContextSurvey.Provider>
      </div>

      <Footer />
    </div>
  );
}
