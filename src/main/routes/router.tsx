import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {ApiContext} from '../../presentation/contexs/api/api-context';
import {MakeLogin} from '../factories/pages/login/login-factory';
import {MakeSignUp} from '../factories/pages/signup/signup-factory';
import {MakeSurveyList} from '../factories/pages/survey-list/survey-list-factory';
import {PrivateRouter} from '../private-route/private-route';
import {SurveyResult} from '../../presentation/pages/survey-result/survey-result';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';

export function Router() {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route
            path="/"
            element={
              <PrivateRouter>
                <MakeSurveyList />
              </PrivateRouter>
            }
          />
          <Route path="/surveys" element={<SurveyResult />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}
