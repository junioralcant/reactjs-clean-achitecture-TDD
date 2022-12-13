import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {SurveyList} from '../pages/survey-list/survey-list';

type Factory = {
  MakeLogin: React.FC;
  MakeSignUp: React.FC;
};

export function Router({MakeLogin, MakeSignUp}: Factory) {
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
