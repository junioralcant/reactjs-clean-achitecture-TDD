import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

type Props = {
  MakeLogin: React.FC;
};

export function Router({MakeLogin}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
