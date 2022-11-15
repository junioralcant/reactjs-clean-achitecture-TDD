import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Login } from '../pages/login/login';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
