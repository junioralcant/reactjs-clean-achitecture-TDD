import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {SignUp} from '../pages/signup/signup';

type Props = {
  MakeLogin: React.FC;
};

export function Router({MakeLogin}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
