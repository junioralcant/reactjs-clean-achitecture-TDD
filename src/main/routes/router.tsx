import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {ApiContext} from '../../presentation/contexs/api/api-context';
import {SurveyList} from '../../presentation/pages/survey-list/survey-list';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/current-account-adapter';
import {MakeLogin} from '../factories/pages/login/login-factory';
import {MakeSignUp} from '../factories/pages/signup/signup-factory';
import {PrivateRouter} from '../private-route/private-route';

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
                <SurveyList />
              </PrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}
