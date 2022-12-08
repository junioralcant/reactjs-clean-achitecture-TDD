import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {SignUp} from '../pages/signup/signup';

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
      </Routes>
    </BrowserRouter>
  );
}
