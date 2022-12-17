import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {SurveyList} from '../../presentation/pages/survey-list/survey-list';
import {MakeLogin} from '../factories/pages/login/login-factory';
import {MakeSignUp} from '../factories/pages/signup/signup-factory';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignUp />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
}
