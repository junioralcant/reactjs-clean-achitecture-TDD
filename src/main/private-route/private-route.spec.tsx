import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {
  BrowserRouter,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import {PrivateRouter} from './private-route';

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({initialEntries: ['/']});

    render(
      // @ts-expect-error
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<PrivateRouter />} />
        </Routes>
      </HistoryRouter>
    );
    expect(history.location.pathname).toBe('/login');
  });
});
