import {render} from '@testing-library/react';
import {MemoryHistory} from 'history';
import {createMemoryHistory} from 'history';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import {PrivateRouter} from './private-route';

type SutType = {
  history: MemoryHistory;
};

function mackSut(): SutType {
  const history = createMemoryHistory({initialEntries: ['/']});
  render(
    // @ts-expect-error
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<PrivateRouter />} />
      </Routes>
    </HistoryRouter>
  );

  return {history};
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if token is empty', () => {
    const {history} = mackSut();
    expect(history.location.pathname).toBe('/login');
  });
});
